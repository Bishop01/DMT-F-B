<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Route;

class RouteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $routes = [
            [
                'station_1' => 'Agargaon',
                'station_2' => 'Farmgate',
                'price' => 10
            ],
            [
                'station_1' => 'Agargaon',
                'station_2' => 'Banglamotors',
                'price' => 20
            ],
            [
                'station_1' => 'Agargaon',
                'station_2' => 'Kazipara',
                'price' => 30
            ],
            [
                'station_1' => 'Agargaon',
                'station_2' => 'Mirpur-10',
                'price' => 40
            ],
            [
                'station_1' => 'Agargaon',
                'station_2' => 'Mirpur-11',
                'price' => 50
            ],
            [
                'station_1' => 'Agargaon',
                'station_2' => 'Mirpur-12',
                'price' => 60
            ],
            [
                'station_1' => 'Farmgate',
                'station_2' => 'Kazipara',
                'price' => 10
            ],
            [
                'station_1' => 'Farmgate',
                'station_2' => 'Banglamotors',
                'price' => 10
            ],
            [
                'station_1' => 'Farmgate',
                'station_2' => 'Mirpur-10',
                'price' => 20
            ],
            [
                'station_1' => 'Farmgate',
                'station_2' => 'Mirpur-11',
                'price' => 30
            ],
            [
                'station_1' => 'Farmgate',
                'station_2' => 'Mirpur-12',
                'price' => 40
            ],
            [
                'station_1' => 'Kazipara',
                'station_2' => 'Shewrapara',
                'price' => 10
            ],
            [
                'station_1' => 'Kazipara',
                'station_2' => 'Mirpur-10',
                'price' => 10
            ],
            [
                'station_1' => 'Kazipara',
                'station_2' => 'Mirpur-11',
                'price' => 20
            ],
            [
                'station_1' => 'Kazipara',
                'station_2' => 'Mirpur-12',
                'price' => 30
            ],
            [
                'station_1' => 'Mirpur-10',
                'station_2' => 'Mirpur-11',
                'price' => 10
            ],
            [
                'station_1' => 'Mirpur-10',
                'station_2' => 'Mirpur-12',
                'price' => 20
            ],
            [
                'station_1' => 'Mirpur-10',
                'station_2' => 'Purobi',
                'price' => 20
            ],
            [
                'station_1' => 'Mirpur-11',
                'station_2' => 'Mirpur-12',
                'price' => 10
            ],
        ];
        foreach ($routes as $key => $route) {
            Route::create($route);
        }
    }
}
