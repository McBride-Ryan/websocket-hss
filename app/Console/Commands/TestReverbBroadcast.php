<?php

namespace App\Console\Commands;

use App\Events\NewTransactionEvent;
use App\Models\Transaction;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Throwable;

class TestReverbBroadcast extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test:reverb-broadcast {--id= : Optional transaction ID for logging}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Tests broadcasting a NewTransactionEvent to Reverb and logs any errors.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $transactionId = $this->option('id') ?? Str::random(8); // Generate a random ID if not provided

        $this->info("Attempting to broadcast NewTransactionEvent for ID: {$transactionId}");
        Log::info("Attempting to broadcast NewTransactionEvent for ID: {$transactionId}");

        try {
            $transaction = Transaction::factory()->make([
                'id' => $transactionId, // Use the provided/generated ID for clarity in logs
                'timestamp' => now(),
                'amount' => 999.99,
                'description' => 'Test Command Broadcast',
                'accountType' => 'savings',
            ]);

            // This is the line that attempts the broadcast
            event(new NewTransactionEvent($transaction));

            $this->info("NewTransactionEvent dispatched. Check Reverb console for 'Dispatching event...'");
            Log::info("NewTransactionEvent dispatched for ID: {$transactionId}.");

        } catch (Throwable $e) {
            $this->error("Error broadcasting event: {$e->getMessage()}");
            $this->error("Stack Trace:");
            $this->error($e->getTraceAsString());
            Log::error("Error broadcasting NewTransactionEvent for ID: {$transactionId}: " . $e->getMessage(), [
                'exception' => $e,
                'trace' => $e->getTraceAsString(),
            ]);
        }
    }
}
