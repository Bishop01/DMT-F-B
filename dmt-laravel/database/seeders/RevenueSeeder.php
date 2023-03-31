<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Revenue;

class RevenueSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $revenues = [
            [
                'tickets_sold_app' => 12,
                'tickets_sold_manual' => 31,
                'revenue_app' => 190,
                'revenue_manual' => 620,
                'revenue_total' => 810,
                'date' => '2022-12-06'
            ],
			[
                'tickets_sold_app' => 14,
                'tickets_sold_manual' => 41,
                'revenue_app' => 200,
                'revenue_manual' => 570,
                'revenue_total' => 770,
                'date' => '2022-12-07'
            ],
			[
                'tickets_sold_app' => 11,
                'tickets_sold_manual' => 24,
                'revenue_app' => 200,
                'revenue_manual' => 400,
                'revenue_total' => 600,
                'date' => '2022-12-08'
            ],
			[
                'tickets_sold_app' => 20,
                'tickets_sold_manual' => 40,
                'revenue_app' => 400,
                'revenue_manual' => 820,
                'revenue_total' => 1220,
                'date' => '2022-12-09'
            ],
			[
                'tickets_sold_app' => 10,
                'tickets_sold_manual' => 25,
                'revenue_app' => 200,
                'revenue_manual' => 400,
                'revenue_total' => 600,
                'date' => '2022-12-10'
            ],
            [
                'tickets_sold_app' => 14,
                'tickets_sold_manual' => 29,
                'revenue_app' => 420,
                'revenue_manual' => 480,
                'revenue_total' => 900,
                'date' => '2022-12-11'
            ],
            [
                'tickets_sold_app' => 20,
                'tickets_sold_manual' => 36,
                'revenue_app' => 500,
                'revenue_manual' => 980,
                'revenue_total' => 1480,
                'date' => '2022-12-12'
            ],
        ];
        foreach ($revenues as $key => $revenue) {
            Revenue::create($revenue);
        }
    }
}
