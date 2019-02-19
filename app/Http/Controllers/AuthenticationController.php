<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AuthenticationController extends Controller
{
    //
    public function logoutAPI(){
        //$user = Auth::;
        // print_r(Auth::check());
        if (Auth::check()) {
            Auth::user()->AauthAcessToken()->delete();
            return response("logged out", 200);
        }else{
            return response("log out failed!",400);
        }

        
    }
}
