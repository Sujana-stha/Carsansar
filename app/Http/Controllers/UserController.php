<?php


namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Auth;
use Validator;
use Config;


class UserController extends Controller
{


    public $successStatus = 200;


    /**
     * login api
     *
     * @return \Illuminate\Http\Response
     */
    public function login(){
        if(Auth::attempt(['email' => request('email'), 'password' => request('password')])){
            $user = Auth::user();
            $success['token'] =  $user->createToken('whrepo')->accessToken;
            return response()->json(['success' => $success], $this->successStatus);
        }
        else{
            return response()->json(['error'=>'Unauthorised'], 401);
        }
    }


    /**
     * Register api
     *
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required',
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email',
            'role'=> 'required',
            'password' => 'required',
            'c_password' => 'required|same:password',
        ]);


        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);            
        }


        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        $success['token'] =  $user->createToken('whrepo')->accessToken;
        $success['username'] =  $user->username;


        return response()->json(['success'=>$success], $this->successStatus);
    }
    

    /**
     * details api
     *
     * @return \Illuminate\Http\Response
     */
    public function details()
    {
        // $user = Auth::user();
        $user = User::with('CompanyId:id,company_cd,name')->find(Auth::user());
        return response()->json($user);
    }

    public function signout()
    {
        // $user = Auth::user();
        // return response()->json(['success' => $user], $this->successStatus);
        if (Auth::check()) {
            Auth::user()->AauthAcessToken()->delete();
            $success = "logged out successfully!";
            return response()->json(['success' => $success], 200);
        }else{
            return response()->json(['error' => "logged out failed!"], 401);
        }
        //Auth::logout();
        
    }
    public function getUsers(Request $request) {
        $column = "id";
        $order ="desc";
        if($request->column && $request->order) {
            $column = $request->column;
            $order = $request->order;
        } 
        $users = User::with('CompanyId:id,name')->orderBy($column, $order)->paginate(config('app_env.NO_OF_ROWS'));
        return $users;
    }

    public function show(User $user) {
        // $user = User::with('CompanyId:id,company_cd,name')->find($id);
        return $user;
    }

    public function validateUsername(Request $request) {
        $data = $request->get('username');
        $username = User::where('username', '=', $data)->count();
        return $username;
    }

    public function updateUser(Request $request, User $user) {
        dd($request->all());exit;
        $user->update($request->all()); 
        return response()->json($user, 200);
    }
}
