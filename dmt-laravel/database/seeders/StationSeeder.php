<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Station;

class StationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $coords = [
            [
                'id' => 'Mirpur-12',
                'latitude' => 23.8280,
                'longitude' => 90.3640,
            ],
            [
                'id' => 'Purobi',
                'latitude' => 23.8190,
                'longitude' => 90.3652,
            ],
            [
                'id' => 'Mirpur-11',
                'latitude' => 23.8167,
                'longitude' => 90.3661,
            ],
            [
                'id' => 'Mirpur-10',
                'latitude' => 23.8069,
                'longitude' => 90.3687,
            ],
            [
                'id' => 'Kazipara',
                'latitude' => 23.7972,
                'longitude' => 90.3728,
            ],
            [
                'id' => 'Shewrapara',
                'latitude' => 23.7881,
                'longitude' => 90.3737,
            ],
            [
                'id' => 'Agargaon',
                'latitude' => 23.7792,
                'longitude' => 90.3737,
            ],
            [
                'id' => 'Farmgate',
                'latitude' => 23.7561,
                'longitude' => 90.3872,
            ],
            [
                'id' => 'Banglamotors',
                'latitude' => 23.7468,
                'longitude' => 90.3934,
            ],
            [
                'id' => 'Shahbag',
                'latitude' => 23.7397,
                'longitude' => 90.3943,
            ],
        ];

        foreach ($coords as $key => $coord) {
            Station::create($coord);
        }
    }
}
