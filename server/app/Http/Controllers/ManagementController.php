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

    public function userList(Request $request)
    {
        $result = User::leftJoin('univ_list', 'univ_list.univ_id', '=', 'user.univ_id')->select('user.*', 'univ_list.univ_id', 'univ_list.univ_name_ch_full', 'univ_list.univ_name_ch', 'univ_list.univ_name_en')->get();
        return response()->json($result);
    }
    public function editUser(Request $request, $u_id)
    {

    }
}
