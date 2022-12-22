<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UnivList;

class MainController extends Controller
{
    public function univList()
    {
        $result = UnivList::all();
        return response()->json($result);
    }
}
