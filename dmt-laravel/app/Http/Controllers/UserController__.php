<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use App\Models\Route;
use App\Models\User;
use App\Models\Ticket;
use App\Models\Product;
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

    public function getUser(Request $request)
    {
        //return response(['message'=>$request->id]);
        $user = DBContext::getUser($request->user_id);
        if($user)
            return response($user);

        return response(['message'=>$request]);
    }

    public function getRoute()
    {
        $details = Route::all();
        return $details;
    }

    public function getStation()
    {
        $details = Station::all();
        return $details;
    }

    public function getRoutePrice(Request $request)
    {
        $details = Route::where([
            'station_1' => $request->station1,
            'station_2' => $request->station2
        ])->first();
        return $details;
    }
    
    public function passwordupdate(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        $user->password = Hash::make($request->password);
        $user->resettoken = "";
        $user->save();
        return response(['message'=>"Password Updated"]);        
    }

    public function passwordreset(Request $request)
    {
        $validate = $request->validate([
            'email' => ['required', 'email'],
        ]);
        $user = User::where('email', $request->email)->first();
        if($user){
            $user->resettoken = "DMT".Str::random(10);
            $user->save();
            $user = User::where('email', $request->email)->first();
            $name = $user->name;
            $resetlink = "http://127.0.0.1:3000/passwordupdate/".$user->resettoken;
            $details = [    
                'title' => 'Reset your Password',
                'user' =>  $name,
                'url' => $resetlink
            ];    
    
            Mail::to($user->email)->send(new PassResetMail($details));
            return response(['message'=>"Check your email"]);        
        }
        else if(!$user)
        {
            return response(['message'=>"The provided credentials do not match our records."]);        
        }

    }

    public function confirmCheckout(Request $request)
    {
        $route_id = $request->route_id;
        $user_id = $request->user_id;
        $payment_method = $request->payment_method;
        $route_price = $request->price;
        if($payment_method == "wallet")
        {
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
            $transaction->transaction_id = "WLT_".Str::random(10);
            $transaction->save();

            $transaction = Transaction::where('ticket_id',$transaction->ticket_id)->with('user','ticket','ticket.route')->first();
            $name = $transaction->user->name;
            $mail= $transaction->user->email;
            $ticketid = $transaction->ticket_id;
            $paymentmethod = $transaction->method;
            $price=$transaction->ticket->route->price;
            $mail_details = [
    
                'title' => 'invoice',
                'user' =>  $name,
                'ticketid' => $ticketid,
                'paymentmethod'=>$paymentmethod,
                'price' =>$price
            ];    
            //Mail::to($mail)->send(new invoiceMail($mail_details));
            
            return response([
                "message"=>"Payment Successful",
                "balance"=>$user->wallet,
                "ticketid"=>$ticketid,
            ]);
        }
        else if($payment_method == "amarpay")
        {
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
            $transaction->transaction_id = "AMR_".Str::random(10);
            //session()->put('ticket_id', $transaction->ticket_id);
            //session()->put('transaction_id',$transaction->transaction_id);
            $transaction->save();
            $tran_id = $transaction->transaction_id;
            $ticketid = $transaction->ticket_id;
            //$ami = new amarpay();
            //$ami->index($request,$transaction);
            $response = Http::post('https://sandbox.aamarpay.com/jsonpost.php', [

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
                'success_url' => 'http://127.0.0.1:3000/success', //your success route
                'fail_url' => 'http://127.0.0.1:3000/fail', //your fail route
                'cancel_url' => 'http://localhost/amarpay/cancel.php', //your cancel url
                'signature_key' => 'dbb74894e82415a2f7ff0ec3a97e4183', //signature key will provided aamarpay, contact integration@aamarpay.com for test/live signature key
                'type' =>'json'
            ]);
            $jsonData = $response->json();
            return $jsonData;
        }
    }

}