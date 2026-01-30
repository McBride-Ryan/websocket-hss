<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Transaction; // Make sure to import your Transaction model

class TransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Use your TransactionFactory to create 100 transactions
        Transaction::factory()->count(10)->create();

        $this->command->info('10 transactions seeded successfully!');
    }
}
