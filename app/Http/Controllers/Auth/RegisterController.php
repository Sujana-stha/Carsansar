<?php

namespace App\Http\Controllers\Auth;

//use App\Address;
use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = '/';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //$this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */

    public $successStatus = 200;
    
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'username' => 'required|string|max:45',
            'first_name' => 'required|string|max:45',
            'last_name' => 'required|string|max:45',
            'email' => 'required|string|email|max:255|unique:users',
            'role' => 'required',
            'company_id'=> 'required|integer',
            'password' => 'required|string|min:6|confirmed',
            'password_confirmation' => 'required|string|min:6',
            // 'address1' => 'required|string|max:255',
            // 'city' => 'required|string|max:255',
            // 'state' => 'required|string|max:255',
            // 'zip' => 'required|max:6',
            // 'phone' => 'required|max:10'
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(array $data)
    {
        return User::create([
            'username' => $data['username'],
            'email' => $data['email'],
            'role' => $data['role'],
            'company_id'=> $data['company_id'],
            'password' => Hash::make($data['password']),
        ]);
    }

    public function register(Request $request){
        $this->validator($request->all())->validate();

        $user_check = User::where('email', $request['email'])->first();
        if($user_check){
            // the user already exists
            return response()->json(["message" => "The user already exists"], 400);
        }

        $user = User::create([
            'username' => $request['username'],
            'first_name' => $request['first_name'],
            'last_name' => $request['last_name'],
            'email' => $request['email'],
            'role' => $request['role'],
            'company_id'=> $request['company_id'],
            'password' => Hash::make($request['password']),
            //'userTypeId' => User::BUYER
        ]);

        // Address::create([
        //     'address1' => $request['address1'],
        //     'address2' => $request['address2'],
        //     'city' => $request['city'],
        //     'state' => $request['state'],
        //     'zip' => $request['zip'],
        //     'phone' => $request['phone'],
        //     'userId' => $user->id
        // ]);

        return response()->json(['data'=>$user],$this->successStatus);
    }
}
