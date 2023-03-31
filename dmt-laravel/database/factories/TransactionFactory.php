<?php

namespace Database\Factories;
use App\Models\User;
use DB;
use Str;
use Illuminate\Database\Eloquent\Factories\Factory;

class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    //public static $i;
    public function definition()
    {
        $method_arr = ['amarpay','wallet'];
        $method = $method_arr[rand(0,1)];
        $user = User::pluck('id');
        $ticket_arr = 'App\Models\Ticket'::pluck('id');  
        //$this->i += 1;
       // $ticket = $ticket_arr[$this->$i];  

            if($method == 'wallet')
            {
                return [
                    'status' => 'paid',
                    'date' => Carbon::today()->subDays(rand(0, 500))->addSeconds(rand(0, 86400)),
                    'method' => $method,
                    'user_id' => $user[rand(1, 50)],
                    'ticket_id' => $ticket,
                    'transaction_id' => "WLT_" . Str::random(10)
            ];
            }
            else
            {
                return [
                    'status' => 'paid',
                    'date' => Carbon::today()->subDays(rand(0, 500))->addSeconds(rand(0, 86400)),
                    'method' => $method,
                    'user_id' => $user[rand(1, 50)],
                    'ticket_id' => $ticket,
                    'transaction_id' => "AMR_" . Str::random(10)
            ];
            }
        
       
       
    }
}
