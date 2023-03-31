<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

use App\Http\Controllers\DBContext;

class ApiGuard
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        //Log::channel('custom')->info("middleware");
        
        $accessToken = $request->header('Authorization');
        //$user = DBContext::getUser($request->user_id);

        if($accessToken==null)
            return response(["message" => "Unauthorized Access"]);

        $token = DBContext::verifyToken($accessToken);
        
        if($token)
        {
            return $next($request);
            // if($token->user_id == $user->id)
            // {
            //     return $next($request);
            // }
            // return response(["message" => "Unauthorized Access"], 401);
        }

        return response(["message" => "Invalid Resource Token, please login again"], 401);
    }
}
