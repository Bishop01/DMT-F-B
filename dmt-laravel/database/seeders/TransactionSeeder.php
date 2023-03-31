<?php

namespace Database\Seeders;
use App\Models\Transaction;
use App\Models\User;

use Illuminate\Database\Seeder;
use DB;
use Str;
class TransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $ticket_arr = 'App\Models\Ticket'::pluck('id'); 
        //Transaction::factory()->count(50)->create();
        foreach ($ticket_arr as $ticket) {
            $user = User::pluck('id');
            $method_arr = ['amarpay','wallet'];
            $method = $method_arr[rand(0,1)];
            
            if($method == 'wallet')
            {

                DB::table('transactions')->insert([
                    'status' => 'paid',
                    'date' => '2022-12-'.rand(10, 30),
                    'method' => $method,
                    'user_id' => $user[rand(1, 50)],
                    'ticket_id' => $ticket,
                    'transaction_id' => "WLT_" . Str::random(10)
                ]);
            }
            else
            {
                DB::table('transactions')->insert([
                    'status' => 'paid',
                    'date' => '2022-12-'.rand(10, 30),
                    'method' => $method,
                    'user_id' => $user[rand(1, 50)],
                    'ticket_id' => $ticket,
                    'transaction_id' => "AMR_" . Str::random(10)
                ]);
            }
        }
        //$this->i += 1;
       // $ticket = $ticket_arr[$this->$i];  

           
            
        /*for($i = 1;$i<=120;$i++)
        {
            DB::table('transactions')->insert([
                'id' => $i,
                'status' => 'paid',
                'date' => '2022-12-'.rand(10, 30),
                'method' => 'wallet',
                'user_id' => $user[rand(1, 30)],
                'ticket_id' => $i,
                'transaction_id' => "WLT_" . Str::random(10)
            ]);
        }
        for($i = 121;$i<=180;$i++)
        {
            DB::table('transactions')->insert([
                'id' => $i,
                'status' => 'paid',
                'date' => '2022-12-'.rand(10, 30),
                'method' => 'wallet',
                'user_id' => 'Bishop',
                'ticket_id' => rand(30,60),
                'transaction_id' => "WLT_" . Str::random(10)
            ]);        
        }
        for($i = 181;$i<=310;$i++)
        {
            DB::table('transactions')->insert([
                'id' => $i,
                'status' => 'paid',
                'date' => '2022-12-'.rand(10, 30),
                'method' => 'amarpay',
                'user_id' => 'Mahmud',
                'ticket_id' => rand(60,100),
                'transaction_id' => "AMR_" . Str::random(10)
            ]);        
        }*/
    }
}
