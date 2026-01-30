<?php

namespace App\Events;

use App\Models\Transaction;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class NewTransactionEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $transaction; // This property will be available in the frontend event data

    /**
     * Create a new event instance.
     */
    public function __construct(Transaction $transaction)
    {
        $this->transaction = $transaction;
        Log::info('NewTransactionEvent created for transaction ID: ' . $this->transaction->id);
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        $channel = new Channel('transactions');
        Log::info('NewTransactionEvent broadcasting on channel: ' . $channel->name);
        return [
            $channel, // Public channel for all transactions
        ];
    }

    /**
     * The event's broadcast name.
     *
     * @return string
     */
    public function broadcastAs(): string
    {
        Log::info('NewTransactionEvent broadcast as: new-transaction');
        return 'new-transaction'; // This is the event name the frontend will listen for
    }
}
