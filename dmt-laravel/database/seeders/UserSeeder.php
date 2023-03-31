<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::factory()->count(200)->create();
        $users = [
            [
                "id"=> "Bish0p",
                "name"=> "Bishop",
                "password"=> "$2y$10\$bsDvKkOp8kn4QJeu.zmsfurmyW656hOrtrqdyXJfznIMlAIdtSK/2",
                "email" => "20-42650-1@student.aiub.edu",
                "phone" => "01875609450",
                "nid" => "123456789012",
                "dob" => "01-01-2002",
                "wallet" => "10000",
                "role" => 1
            ],
            [
                "id"=> "Mahmud",
                "name"=> "Mahmud",
                "password"=> "$2y$10\$bsDvKkOp8kn4QJeu.zmsfurmyW656hOrtrqdyXJfznIMlAIdtSK/2",
                "email" => "mzkamol@gmail.com",
                "phone" => "01878958985",
                "nid" => "123456789012",
                "dob" => "01-01-2002",
                "wallet" => "5000",
                "role" => 1
            ],
        ];
        foreach ($users as $key => $user) {
            User::create($user);
        }
    }
}
