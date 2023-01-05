<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;
use Validator;
use App\Models\Admin;
use App\Models\User;
use Mail;
use App\Mods\SendMail;
use Illuminate\Support\Facades\Storage;

class ManagementController extends Controller
{
    // construct
    public function __construct()
    {
        $this->middleware('auth:admin',['except'=>[]]);
    }

    public function userList()
    {
        $result = User::leftJoin('univ_list', 'univ_list.univ_id', '=', 'user.univ_id')->select('user.*', 'univ_list.univ_id', 'univ_list.univ_name_ch_full', 'univ_list.univ_name_ch', 'univ_list.univ_name_en')->get();
        return response()->json($result);
    }
    public function userData($u_id)
    {
        $result = User::leftJoin('univ_list', 'univ_list.univ_id', '=', 'user.univ_id')->select('user.*', 'univ_list.univ_id', 'univ_list.univ_name_ch_full', 'univ_list.univ_name_ch', 'univ_list.univ_name_en')->where('u_id', $u_id)->first();
        return response()->json($result);
    }
    public function editUser(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'u_id' => 'required|exists:user,u_id',
            'account' => 'required|unique:user,account',
            'name' => 'required',
            'univ_id' => 'required|size:5',
            'verify_type' => 'required|integer',
            'identity' => 'required|integer',
            'verification' => 'required|integer',
            'valid_until' => 'required|date',
            'remarks' => 'string|nullable',
        ]);
        if ($validator->fails()) {
            $failedRules = $validator->failed();
            if (isset($failedRules['u_id']['Required'])) {
                return response()->json(['status' => 'U07', 'field' => 'u_id'], 200);
            } else if (isset($failedRules['u_id']['Exists'])) {
                return response()->json(['status' => 'U01', 'field' => 'u_id'], 200);
            } else if (isset($failedRules['account']['Required'])) {
                return response()->json(['status' => 'U03'], 200);
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
            } else if (isset($failedRules['verify_type']['Required'])) {
                return response()->json(['status' => 'U07', 'field' => 'verify_type'], 200);
            } else if (isset($failedRules['verify_type']['Integer'])) {
                return response()->json(['status' => 'U08', 'field' => 'verify_type'], 200);
            } else if (isset($failedRules['verification']['Required'])) {
                return response()->json(['status' => 'U07', 'field' => 'verification'], 200);
            } else if (isset($failedRules['verification']['Integer'])) {
                return response()->json(['status' => 'U08', 'field' => 'verification'], 200);
            } else if (isset($failedRules['valid_until']['Required'])) {
                return response()->json(['status' => 'U07', 'field' => 'valid_until'], 200);
            } else if (isset($failedRules['valid_until']['Date'])) {
                return response()->json(['status' => 'U08', 'field' => 'valid_until'], 200);
            }
            return response()->json($validator->errors(), 400);
        }
        $temp = $request->all();
        $u_id = $temp['u_id'];
        unset($temp['u_id']);
        User::where('u_id',$u_id)->update($temp);
        return response()->json(['status'=>'A01']);
    }
}
