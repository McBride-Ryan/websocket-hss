<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Transaction;

class TransactionApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_transactions_endpoint_returns_200_and_data()
    {
        $transaction1 = Transaction::factory()->create([
            'amount' => 100.50,
            'description' => 'Shopping',
            'accountType' => 'checking',
            'timestamp' => now()->subDays(1),
        ]);

        $transaction2 = Transaction::factory()->create([
            'amount' => 25.00,
            'description' => 'Coffee',
            'accountType' => 'savings',
            'timestamp' => now(),
        ]);

        $response = $this->getJson('/api/transactions');

        $response->assertStatus(200);

        $response->assertJsonStructure([
            'data' => [
                '*' => [ // '*' indicates that there can be multiple items in the array
                    'id',
                    'amount',
                    'description',
                    'accountType',
                    'timestamp',
                    // Add other expected fields from your Transaction model here
                    'created_at',
                    'updated_at',
                ]
            ]
        ]);

        $response->assertJson([
            'data' => [
                [
                    'id' => $transaction2->id,
                    'amount' => $transaction2->amount,
                    'description' => $transaction2->description,
                    'accountType' => $transaction2->accountType,
                ],
                [
                    'id' => $transaction1->id,
                    'amount' => $transaction1->amount,
                    'description' => $transaction1->description,
                    'accountType' => $transaction1->accountType,
                ],
            ]
        ]);

        // Optionally, assert the count of transactions returned.
        $response->assertJsonCount(2, 'data');
    }

    public function test_transactions_endpoint_returns_empty_data_when_no_transactions()
    {
        $response = $this->getJson('/api/transactions');

        $response->assertStatus(200);

        $response->assertJson([
            'data' => []
        ]);

        $response->assertJsonCount(0, 'data');
    }
}
