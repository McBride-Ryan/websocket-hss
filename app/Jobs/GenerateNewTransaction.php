<?php

namespace App\Jobs;

use App\Events\NewTransactionEvent;
use App\Models\Transaction;
use App\Models\Log as LogModel;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log; // Add this line
use App\Events\TransactionCreated;
class GenerateNewTransaction implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
{
    try {
        $transaction = Transaction::create([
            'timestamp' => now(),
            'amount' => rand(1000, 50000) / 100,
            'description' => collect(['Online Purchase', 'Utility Payment', 'Salary Payment'])->random(),
            'accountType' => collect(['checking', 'savings', 'credit'])->random(),
        ]);

        // TRIGGER THE BROADCAST HERE
        broadcast(new TransactionCreated($transaction));

        Log::info('Transaction Broadcasted: ' . $transaction->id);
    } catch (\Throwable $e) {
        Log::error('Job Failed: ' . $e->getMessage());
    }
}
}
