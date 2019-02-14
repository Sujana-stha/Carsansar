<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\User;
use Validator;
use Lcobucci\JWT\Parser;

class AuthenticationController extends Controller
{
    public $successStatus = 200;

    // public function login(Request $request) {
    //     $user = User::where('email', $request->email)->first();

    //     if ($user){
    //         if ($request->password == $user->password) {
    //             $token = $user->createToken('Laravel Password Grant Client')->accessToken;
    //             //print_r($token);exit;
    //             $response = ['token' => $token];
    //             return response($response, 200);
    //         } else {
    //             $response = 'Password mismatch';
    //             return response($response, 422);
    //         }
    //     } else {
    //         $response = 'User doesn\'t exist';
    //         return response($response, 422);
    //     }

    // }

    /**
     * login api
     *
     * @return \Illuminate\Http\Response
     */
    public function login(){
        if(Auth::attempt(['email' => request('email'), 'password' => request('password')])){
            $user = Auth::user();
            $success['token'] =  $user->createToken('MyApp')->accessToken;
            return response()->json(['success' => $success], $this->successStatus);
        }
        else{
            return response()->json(['error'=>'Unauthorised'], 401);
        }
    }

    public function logout(Request $request) {
        $value = $request->bearerToken();
        $id = (new Parser())->parse($value)->getHeader('jti');
        $token= $request->user()->tokens->find($id);
        $token->revoke();

        $response = 'You have been successfully logged out!';
        return response($response, 200);
    }

    /**
     * Register api
     *
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'c_password' => 'required|same:password',
        ]);

        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);            
        }

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        $success['token'] =  $user->createToken('Laravel Password Grant Client')->accessToken;
        $success['name'] =  $user->name;

        return response()->json(['success'=>$success], $this->successStatus);
    }
}
