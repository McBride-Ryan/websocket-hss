<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Events\NewTransactionEvent; // Make sure this path is correct
// If you have a Transaction model and want to create real data:
use App\Models\Transaction;
// use Illuminate\Support\Str; // For generating random strings if needed

class GenerateTransaction extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:generate-transaction';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generates a new dummy transaction and broadcasts it.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // 1. Generate/Simulate a new transaction
        $transactionData = Transaction::create([
            'id' => uniqid('txn_'), // Generate a unique ID for the transaction
            'amount' => rand(100, 50000) / 100, // Random amount between 1.00 and 500.00
            'currency' => 'USD',
            'description' => 'Automated payment for item ' . rand(1, 100),
            'timestamp' => now()->toDateTimeString(),
        ]);

        // 2. Broadcast the event
        event(new NewTransactionEvent($transactionData));

        $this->info("New transaction generated and broadcast: " . json_encode($transactionData));
    }
}
