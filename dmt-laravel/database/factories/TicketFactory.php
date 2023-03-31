<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Route;

class TicketFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $route = 'App\Models\Route'::pluck('id');       
        $status = ["active","used"];
        return [
            "route_id"=> $route[rand(1,18)],
            "status"=> $status[rand(0,1)]
        ];
    }
}
