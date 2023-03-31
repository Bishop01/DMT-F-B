<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Http;
use App\Models\Transaction;
use Illuminate\Support\Facades\Redirect;
use App\Models\User;
use App\Models\Ticket;
use App\Mail\invoiceMail;
use Mail;

class amarpay extends Controller
{
    /*public function index(Request $request,$transaction){
        $route_id = $request->route_id;
        $user_id = $request->user_id;
        $route_price = $request->price;
        $tran_id = $transaction->transaction_id;
        $ticketid = $transaction->ticket_id;
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
                'success_url' => 'http://127.0.0.1:3000/api/success', //your success route
                'fail_url' => 'http://127.0.0.1:3000/fail', //your fail route
                'cancel_url' => 'http://localhost/amarpay/cancel.php', //your cancel url
                'signature_key' => 'dbb74894e82415a2f7ff0ec3a97e4183', //signature key will provided aamarpay, contact integration@aamarpay.com for test/live signature key
                'type' =>'json'
      ]);
        $jsonData = $response->json();
        return 
    }*/
    public function recharge_success(Request $request){
      //echo $request->pay_status;
      if($request->pay_status == "Successful"){
        $user = User::where('id', $request->opt_b)->first();
        //dd($user);
        $user->wallet = $user->wallet + (int)$request->amount;
        $user->save();
        echo '<!DOCTYPE html><head>
    
        <script src="https://cdn.tailwindcss.com"></script>  </head>
      
        <body class="bg-gray-900">
          <div class="flex items-center justify-center bg-white h-screen w-100 h-100">
            <div>
              <div class="flex flex-col items-center space-y-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="text-green-600 w-28 h-28" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h1 class="text-4xl font-bold">Payment Successful!</h1>
              </div>
            </div>
          </div>
        </body>
      </html>';
      }
    }
    public function success(Request $request){
      //dd($request);

      if($request->pay_status == "Successful"){
        $ticket = ticket::where('id', $request->opt_a)->first();
        $ticket->status = "active";
        $ticket->save();

        $transaction = Transaction::where('transaction_id', $request->mer_txnid)->first();
        //dd($customer);
        $transaction->status = "paid";
        $transaction->save();
        $transaction = Transaction::where('ticket_id',$transaction->ticket_id)->with('user','ticket','ticket.route')->first();
        $name = $transaction->user->name;
        $mail= $transaction->user->email;
        $ticketid = $transaction->ticket_id;
        $paymentmethod = $transaction->method;
        $price=$transaction->ticket->route->price;
        $details = [

            'title' => 'invoice',
            'user' =>  $name,
            'ticketid' => $ticketid,
            'paymentmethod'=>$paymentmethod,
            'price' =>$price
        ];    
        Mail::to($mail)->send(new invoiceMail($details));
        echo '<!DOCTYPE html><head>
    
          <script src="https://cdn.tailwindcss.com"></script>  </head>
        
          <body class="bg-gray-900">
            <div class="flex items-center justify-center bg-white h-screen w-100 h-100">
              <div>
                <div class="flex flex-col items-center space-y-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="text-green-600 w-28 h-28" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h1 class="text-4xl font-bold">Payment Successful!</h1>
                </div>
              </div>
            </div>
          </body>
        </html>';
      }
    }
    public function fail(Request $request){
      echo '<!DOCTYPE html><head>
    
      <script src="https://cdn.tailwindcss.com"></script>  </head>
    
      <body class="bg-gray-900">
        <div class="flex items-center justify-center bg-white h-screen w-100 h-100">
          <div>
            <div class="flex flex-col items-center space-y-2">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="text-red-600 w-28 h-28">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
      </svg>
      <h1 class="text-4xl font-bold">Ticket Verification Failed!</h1>
            </div>
          </div>
        </div>
      </body>
    </html>';
      //return redirect(route('profile', $request->opt_b));
    }
}
