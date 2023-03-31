<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class RegisterController extends Controller
{
    public function register(Request $request){
        try {
            $validator = Validator::make($request->all(),[
                "id"=>"required|unique:users,id|min:4",
                "name"=>"required|min:5|max:20",
                "password"=>"required|min:4|same:confirmPassword",
                "confirmPassword"=>"required|min:4",
                'email'=>'email|unique:users,email',
                'dob'=>'required',
                'phone'=>'required|max:11|regex:/^([0-9\s\-\+\(\)]*)$/'
            ]);
    
            if($validator->fails())
            {
                return response(["modelState"=>"error", "error"=>$validator->messages(), "success"=>""], 200);
            }
    
            $passenger = new User();
            $passenger->id = $request->id;
            $passenger->name = $request->name;
            $passenger->email = $request->email;
            $passenger->phone = $request->phone;
            $passenger->password = Hash::make($request->password);
            $passenger->dob = $request->dob;
            $passenger->save();
            return response(["error"=>"", "success"=>"Registration Successful"], 200);
        } catch (\Throwable $th) {
            return response(["error"=>"Server under maintenance", "success"=>""], 500);
        }
    }
}