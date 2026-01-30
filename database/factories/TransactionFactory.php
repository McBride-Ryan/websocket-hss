<?php

namespace Database\Factories;

use App\Models\Transaction; // Import your Transaction model
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Transaction::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $accountTypes = ['checking', 'savings', 'credit'];

        return [
            'timestamp' => $this->faker->dateTimeBetween('-1 year', 'now'), // Random date within the last year
            'amount' => $this->faker->randomFloat(2, 1, 1000), // Random decimal between 1.00 and 1000.00 with 2 decimal places
            'description' => $this->faker->sentence(6), // A sentence with 6 words
            'accountType' => $this->faker->randomElement($accountTypes), // Randomly pick an account type
        ];
    }
}
