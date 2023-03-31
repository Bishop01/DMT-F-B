<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Carbon\Carbon;
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {

        return [

            "id"=> Str::random(6),
            "name"=> $this->faker->name(),
            "password"=> "$2y$10\$bsDvKkOp8kn4QJeu.zmsfurmyW656hOrtrqdyXJfznIMlAIdtSK/2",
            "email" => Str::random(6).'@dummy.com',
            "phone" => "01875609450",
            "nid" => "123456789012",
            "dob" => "01-01-2002",
            "wallet" => "10000",
            "role" => 0,
            'registrationDate' => Carbon::today()->subDays(rand(0, 500))->addSeconds(rand(0, 86400))
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function unverified()
    {

    }
}
