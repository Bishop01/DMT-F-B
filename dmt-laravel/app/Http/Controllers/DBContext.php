<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use App\Models\Route;
use App\Models\User;
use App\Models\Ticket;
use App\Models\Product;
use App\Models\Transaction;
use App\Models\Token;
use App\Models\Station;
use Carbon\Carbon;

class DBContext extends Controller
{
    public static function test($text)
    {
        Log::channel('custom')->info($text);
        return;
    }

    public static function getUser($id)
    {
        $user = User::where('id',$id)->first();
        return $user;
    }
    public static function getUserByToken($token)
    {
        $user = Token::where('accessToken',$token)->with('user')->first();
        return $user;
    }
    public static function getUsers()
    {
        $users = User::get();
        return $users;
    }

    public static function verifyToken($tk)
    {
        $token = Token::where('accessToken',$tk)->where('expired_at',null)->with('user')->first();
        //Log::channel('custom')->info($token);
        return $token;
    }

    public static function getAccessToken($id)
    {
        //Log::channel('custom')->info($id);
        $token = Token::where('user_id',$id)->where('expired_at',null)->with('user')->first();
        return $token;
    }
}