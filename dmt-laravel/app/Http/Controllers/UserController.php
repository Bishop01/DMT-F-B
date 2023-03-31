<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use App\Models\Route;
use App\Models\User;
use App\Models\Ticket;
use App\Models\Product;
use App\Models\Support;

use App\Models\Transaction;
use App\Models\Station;
use App\Mail\PassResetMail;
use App\Mail\invoiceMail;
use Mail;
use DB;
use Carbon\Carbon;

use App\Http\Controllers\DBContext;

class UserController extends Controller
{
    public static function test()
    {
        Log::channel('custom')->info(Carbon::now());
        return;
    }

    public function getUser(request $request)
    {
        $user = DBContext::getUser($request->user_id);
        if ($user)
            return response($user);

        return response(['message' => $request]);
    }

    public function update(request $request)
    {
        try {
            $token = DBContext::getUserByToken($request->header('Authorization'));
            $user = $token->user;

            $target = DBContext::getUser($request->id);

            //return $target;
            if($user->role == 0)
            {
                $validator = Validator::make($request->all(),[
                    "name"=>"required|min:5|max:20",
                    'dob'=>'required',
                    'phone'=>'required|max:11|regex:/^([0-9\s\-\+\(\)]*)$/',
                    "nid"=>"nullable|min:13|max:13"
                ]);

                if($validator->fails())
                {
                    return response(["modelState"=>"error", "error"=>$validator->messages(), "success"=>""], 200);
                }
                $target->name = $request->name;
                $target->nid = $request->nid;
                $target->dob = $request->dob;
                $target->phone = $request->phone;
            }
            else if($user->role == 1)
            {
                $validator = Validator::make($request->all(),[
                    "name"=>"required|min:5|max:20",
                    'dob'=>'required',
                    'phone'=>'required|max:11|regex:/^([0-9\s\-\+\(\)]*)$/',
                    "nid"=>"nullable|min:12|max:12",
                    "role"=>"required",
                    "email"=>"email|required"
                ]);
                if($validator->fails())
                {
                    return response(["modelState"=>"error", "error"=>$validator->messages(), "success"=>""], 200);
                }
                $target->name = $request->name;
                $target->nid = $request->nid;
                $target->dob = $request->dob;
                $target->phone = $request->phone;
                $target->email = $request->email;
                $target->role = $request->role;
            }
            $target->save();
            return response(["user"=>$target, "success"=>"Profile updated successfully", "error"=>""], 200);
        } catch (\Throwable $th) {
            return response(["error"=>"Server under maintenance", "success"=>""], 500);
        }
    }

    public function getRoute()
    {
        $details = Route::all();
        return $details;
    }

    public function updateProfilePassword(Request $request)
    {
        try {
            $user = DBContext::getUser($request->id);
            if(Hash::check($request->currentPassword, $user->password)){
                $user->password = Hash::make($request->newPassword);
                $user->save();
                return response(["error"=>"", "success"=>"Password updated successfully"], 200); 
            }
            return response(["error"=>"Current password is wrong.", "success"=>""], 200);
        } catch (\Throwable $th) {
            return response(["error"=>"Server under maintenance", "success"=>""], 500);
        }
    }
    public function refund(Request $request){
        $ticket_id = $request->ticket_id;
        $transaction = Transaction::where('ticket_id',$request->ticket_id)->with('user','ticket','ticket.route')->first();

        if($transaction->status == "paid"){
            $transaction->status = "refunded";
            $transaction->method = "Refunded to WALLET";
            $transaction->save();
            $user = User::where('id', $transaction->user_id)->first();
            $user->wallet = $user->wallet + $transaction->ticket->route->price;
            $user->save();
           
            DB::table('refunds')->insert([
                'date' => date('Y-m-d'),
                'user_id' => $transaction->user_id,
                'transaction_id' => $transaction->id,
                'ticket_id' => $transaction->ticket->id
            ]);
            $ticket = Ticket::where('id', $transaction->ticket_id)->first();
            if($ticket->status == "active"){
                $ticket->status = "refunded";
                $ticket->save();
                return response(["code"=>"200", "message"=>"Refunded successfully"]); 
                }       
        }   
        $ticket = Ticket::where('id', $ticket_id)->first();
        if($ticket->status == "refunded"){
            return response(["code"=>"201", "message"=>"Already Refunded"]); 
        }
    }
    public function getTransactionsByUserID(Request $request){
        try {
            $transactions = Transaction::where('user_id', $request->id)->with('user')->with('ticket')->with('ticket.route')->get();
            return response(["error"=>"", "success"=>"", "transactions"=>$transactions], 200);
        } catch (\Throwable $th) {
            return response(["error"=>"Server under maintenance", "success"=>""], 500);
        }
    }
    public function getSupportByUserID(Request $request){
        try {
            $support = Support::where('user_id', $request->id)->get();
            return response(["message"=>"Success", "code"=>"200", "requests"=>$support]);
        } catch (\Throwable $th) {
            return response(["message"=>"Server under maintenance", "code"=>"201"]);
        }
    }

    public function getStation()
    {
        $details = Station::all();
        return $details;
    }
    public function passwordupdate(Request $request)
    {
        /*$user = User::where('email', $request->email)->first();
        $user->password = Hash::make($request->password);
        $user->resettoken = "";
        $user->save();*/
        $user = User::where('email', $request->email)->first();
        if ($request->otp == $user->resettoken && $request->email == $user->email) {
                
                $user = User::where('email', $request->email)->first();
                $user->password = Hash::make($request->password);
                $user->resettoken = null;
                $user->save();
                return response([
                    'message' => "Password Updated",'code' =>'updated']);
        }
        return response([
            'message' => "Error",'code' =>'error']);
    }

    public function passwordreset(request $request)
    {
        $validate = $request->validate([
            'email' => ['required', 'email'],
        ]);
        $user = User::where('email', $request->email)->first();
        if ($user) {
            $user->resettoken = "DMT" .rand(1111,9999);
            $user->save();
            $user = User::where('email', $request->email)->first();
            $name = $user->name;
            //$resetlink = "http://127.0.0.1:3000/passwordupdate/" . $user->resettoken;
            $details = [
                'title' => 'Reset your Password',
                'user' =>  $name,
                'url' => $user->resettoken
            ];
            if ($request->otp == "") {
                Mail::to($user->email)->send(new PassResetMail($details));
                return response(['message' => "Check your email",'code' =>'success']);
            } 
            }
                       
        else if (!$user) {
            return response(['message' => "The provided credentials do not match our records.",'code' =>'failed']);
        }
    }


    public function walletRecharge(request $request)
    {
        $amount = $request->amount;
        $user_id = $request->user_id;
        $url = 'https://sandbox.aamarpay.com/request.php'; // live url https://secure.aamarpay.com/request.php
        $fields = array(
            'store_id' => 'aamarpaytest', //store id will be aamarpay,  contact integration@aamarpay.com for test/live id
            'amount' => $amount, //transaction amount
            'payment_type' => 'VISA', //no need to change
            'currency' => 'BDT',  //currenct will be USD/BDT
            'tran_id' =>  'GGXX'.rand(44444,554445), //transaction id must be unique from your end
            'cus_name' => 'NA',  //customer name
            'cus_email' => 'NA@mail.com', //customer email address
            'cus_add1' => 'Dhaka',  //customer address
            'cus_add2' => 'NA', //customer address
            'cus_city' => 'Dhaka',  //customer city
            'cus_state' => 'Dhaka',  //state
            'cus_postcode' => '1206', //postcode or zipcode
            'cus_country' => 'Bangladesh',  //country
            'cus_phone' => '1231231231231', //customer phone number
            'cus_fax' => 'Not¬Applicable',  //fax
            'ship_name' => 'ship name', //ship name
            'ship_add1' => 'NA',  //ship address
            'ship_add2' => 'NA',
            'ship_city' => 'Dhaka', 
            'ship_state' => 'Dhaka',
            'opt_a' => 'NA', //ticketid
            'opt_b' => $user_id, //user_id
            'ship_postcode' => '1212', 
            'ship_country' => 'Bangladesh',
            'desc' => 'description', 
            'success_url' => 'http://127.0.0.1:8000/rechargesuccess', //your success route
            'fail_url' => 'http://127.0.0.1:8000/fail', //your fail route
            'cancel_url' => 'http://localhost/amarpay/cancel.php', //your cancel url
            'signature_key' => 'dbb74894e82415a2f7ff0ec3a97e4183'); //signature key will provided aamarpay, contact integration@aamarpay.com for test/live signature key

        $fields_string = http_build_query($fields);
     
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_VERBOSE, true);
        curl_setopt($ch, CURLOPT_URL, $url);  
  
        curl_setopt($ch, CURLOPT_POSTFIELDS, $fields_string);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $url_forward = str_replace('"', '', stripslashes(curl_exec($ch)));	
        curl_close($ch);
        return response([
            "message" => "true",
            "method" => "wallet_recharge",
            "payment_url" => 'https://sandbox.aamarpay.com'.$url_forward,
        ]);

    }
    public function confirmCheckout(request $request)
    {
        $route_id = $request->route_id;
        $user_id = $request->user_id;
        $payment_method = $request->payment_method;
        $route_price = $request->price;
        if ($payment_method == "wallet") {
            $user = User::find($user_id);
            $user->exists = true;
            $user->wallet = $user->wallet - $route_price;
            $user->save();

            $ticket = new Ticket();
            $ticket->route_id = $route_id;
            $ticket->save();

            $transaction = new Transaction();
            $transaction->status = 'paid';
            $transaction->method = "Wallet";
            $transaction->date = date('Y-m-d');
            $transaction->user_id = $user_id;
            $transaction->ticket_id = $ticket->id;
            $transaction->transaction_id = "WLT_" . Str::random(10);
            $transaction->save();

            $transaction = Transaction::where('ticket_id', $transaction->ticket_id)->with('user', 'ticket', 'ticket.route')->first();
            $name = $transaction->user->name;
            $mail = $transaction->user->email;
            $ticketid = $transaction->ticket_id;
            $paymentmethod = $transaction->method;
            $price = $transaction->ticket->route->price;
            $mail_details = [

                'title' => 'invoice',
                'user' =>  $name,
                'ticketid' => $ticketid,
                'paymentmethod' => $paymentmethod,
                'price' => $price
            ];
            //Mail::to($mail)->send(new invoiceMail($mail_details));

            return response([
                "message" => "Payment Successful",
                "method" => "wallet",
                "balance" => $user->wallet,
                "ticketid" => $ticketid,
            ]);
        } else if ($payment_method == "gateway") {
            //generate QR
            //$value = $request->session()->get('route');
            $ticket = new Ticket();
            $ticket->route_id = $route_id;
            $ticket->status = "inactive";
            //session()->put('ticketid',$ticket->id);
            $ticket->save();

            $transaction = new Transaction();
            $transaction->status = 'unpaid';
            $transaction->method = "amarpay";
            $transaction->date = date('Y-m-d');
            $transaction->user_id = $user_id;
            $transaction->ticket_id = $ticket->id;
            $transaction->transaction_id = "AMR_" . Str::random(10);
            $transaction->save();
            $tran_id = $transaction->transaction_id;
            $ticketid = $transaction->ticket_id;

            $url = 'https://sandbox.aamarpay.com/request.php'; // live url https://secure.aamarpay.com/request.php
            $fields = array(
                'store_id' => 'aamarpaytest', //store id will be aamarpay,  contact integration@aamarpay.com for test/live id
                'amount' => $route_price, //transaction amount
                'payment_type' => 'VISA', //no need to change
                'currency' => 'BDT',  //currenct will be USD/BDT
                'tran_id' =>  $tran_id, //transaction id must be unique from your end
                'cus_name' => 'NA',  //customer name
                'cus_email' => 'NA@mail.com', //customer email address
                'cus_add1' => 'Dhaka',  //customer address
                'cus_add2' => 'NA', //customer address
                'cus_city' => 'Dhaka',  //customer city
                'cus_state' => 'Dhaka',  //state
                'cus_postcode' => '1206', //postcode or zipcode
                'cus_country' => 'Bangladesh',  //country
                'cus_phone' => '1231231231231', //customer phone number
                'cus_fax' => 'Not¬Applicable',  //fax
                'ship_name' => 'ship name', //ship name
                'ship_add1' => 'NA',  //ship address
                'ship_add2' => 'NA',
                'ship_city' => 'Dhaka', 
                'ship_state' => 'Dhaka',
                'opt_a' => $ticketid, //ticketid
                'opt_b' => $user_id, //user_id
                'ship_postcode' => '1212', 
                'ship_country' => 'Bangladesh',
                'desc' => 'description', 
                'success_url' => 'http://127.0.0.1:8000/success', //your success route
                'fail_url' => 'http://127.0.0.1:8000/fail', //your fail route
                'cancel_url' => 'http://localhost/amarpay/cancel.php', //your cancel url
                'signature_key' => 'dbb74894e82415a2f7ff0ec3a97e4183'); //signature key will provided aamarpay, contact integration@aamarpay.com for test/live signature key

            $fields_string = http_build_query($fields);
         
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_VERBOSE, true);
            curl_setopt($ch, CURLOPT_URL, $url);  
      
            curl_setopt($ch, CURLOPT_POSTFIELDS, $fields_string);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            $url_forward = str_replace('"', '', stripslashes(curl_exec($ch)));	
            curl_close($ch);
            return response([
                "message" => "true",
                "method" => "gateway",
                "payment_url" => 'https://sandbox.aamarpay.com'.$url_forward,
                "ticketid" => $ticketid,
            ]);
            //echo 'https://sandbox.aamarpay.com'.$url_forward;
            /*$response = Http::post('https://sandbox.aamarpay.com/jsonpost.php', [

                'store_id' => 'aamarpaytest', //store id will be aamarpay,  contact integration@aamarpay.com for test/live id
                'amount' =>  $route_price, //transaction amount
                'payment_type' => 'VISA', //no need to change
                'currency' => 'BDT',  //currenct will be USD/BDT
                'tran_id' =>  $tran_id, //transaction id must be unique from your end
                'cus_name' => 'NA',  //customer name
                'cus_email' => 'NA@mail.com', //customer email address
                'cus_add1' => 'Dhaka',  //customer address
                'cus_add2' => 'NA', //customer address
                'cus_city' => 'Dhaka',  //customer city
                'cus_state' => 'Dhaka',  //state
                'cus_postcode' => '1206', //postcode or zipcode
                'cus_country' => 'Bangladesh',  //country
                'cus_phone' => '1231231231231', //customer phone number
                'cus_fax' => 'Not¬Applicable',  //fax
                'ship_name' => 'ship name', //ship name
                'ship_add1' => 'NA',  //ship address
                'ship_add2' => 'NA',
                'ship_city' => 'Dhaka',
                'ship_state' => 'Dhaka',
                'opt_a' => $ticketid, //ticketid
                'opt_b' => $user_id, //user_id
                'ship_postcode' => '1212',
                'ship_country' => 'Bangladesh',
                'desc' => 'description',
                'success_url' => 'http://127.0.0.1:8000/success', //your success route
                'fail_url' => 'http://127.0.0.1:3000/fail', //your fail route
                'cancel_url' => 'http://localhost/amarpay/cancel.php', //your cancel url
                'signature_key' => 'dbb74894e82415a2f7ff0ec3a97e4183', //signature key will provided aamarpay, contact integration@aamarpay.com for test/live signature key
                'type' => 'json'
            ]);
            $jsonData = $response->json();
            return $jsonData;*/
        }
    }
}
