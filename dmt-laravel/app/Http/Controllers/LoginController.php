<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Str;
use Storage;
use Carbon\Carbon;

use App\Models\User;
use App\Models\Token;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        try {
            //$header = $request->header('Authorization');
        $user = User::where('email', $request->email)->first();
        
        if ($user && Hash::check($request->password, $user->password))
        {
            $token = DBContext::getAccessToken($user->id);
            
            if($token)
            {
                return response(["success"=>$token]);
            }

            $token = new Token();
            //$token->accessToken = Hash::make($accessToken);
            $token->accessToken = Str::random(60);
            $token->user_id = $user->id;
            $token->save();

            return response(["success"=>$token, "error"=>""], 200);
        }

        return response([
            "error"=>"Invalid email or password",
            "success"=>""
        ], 200);
        } catch (\Throwable $th) {
            return response(["error"=>"Server under maintenance","success"=>""], 500);
        }
    }
}
