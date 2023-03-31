<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Ticket;

use DB;
class TicketSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Ticket::factory()->count(200)->create();



        
      /*  for($i = 1;$i<=50;$i++)
            {
                DB::table('tickets')->insert([
                    'id' => $i,
                    'route_id' => rand(69, 76),
                    'status' => 'active',
                ]);        
            }
            for($i = 51;$i<=70;$i++)
            {
                DB::table('tickets')->insert([
                    'id' => $i,
                    'route_id' => rand(69, 76),
                    'status' => 'used',
                ]);        
            }
            for($i = 71;$i<=100;$i++)
            {
                DB::table('tickets')->insert([
                    'id' => $i,
                    'route_id' => rand(69, 76),
                    'status' => 'inactive',
                ]);        
            }*/
        /*$tickets = [
            [
                'price' => '20',
                'route_id' => '1'
            ],
            [
                'price' => '30',
                'route_id' => '2'
            ],
            [
                'price' => '35',
                'route_id' => '3'
            ],
            [
                'price' => '30',
                'route_id' => '4'
            ],
            [
                'price' => '40',
                'route_id' => '5'
            ],
            [
                'price' => '60',
                'route_id' => '6'
            ],
            [
                'price' => '80',
                'route_id' => '7'
            ],
            [
                'price' => '40',
                'route_id' => '8'
            ]
        ];
        foreach($tickets as $key => $ticket) {
            Ticket::create($ticket);
        }*/
    }
}
