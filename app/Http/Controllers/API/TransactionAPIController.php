<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionAPIController extends Controller
{
    public function index(Request $request)
    {
        $transactions = Transaction::latest()->take(50)->get();

        // If request is from Axios (fetchTransactions)
        if ($request->wantsJson()) {
            return response()->json($transactions);
        }

        // If request is standard page load
        return Inertia::render('Dashboard', [
            'initialTransactions' => $transactions
        ]);
    }

    public function stream(Request $request)
    {
        // Clean any buffer to avoid source leaks or corruption
        if (ob_get_level()) ob_end_clean();

        return new StreamedResponse(function () use ($request) {
            $lastId = $request->query('last_id', 0);

            while (true) {
                if (connection_aborted()) break;

                $newTransactions = Transaction::where('id', '>', $lastId)
                    ->orderBy('timestamp', 'desc')
                    ->get();

                if ($newTransactions->isNotEmpty()) {
                    $lastId = $newTransactions->max('id');
                    echo "data: " . json_encode($newTransactions) . "\n\n";
                } else {
                    echo ": heartbeat\n\n";
                }

                flush();
                sleep(5);
            }
        }, 200, [
            'Content-Type' => 'text/event-stream',
            'X-Accel-Buffering' => 'no',
            'Cache-Control' => 'no-cache',
        ]);
    }
    public function store(Request $request)
    {
        $transaction = Transaction::create($request->all());

        // Ensure broadcast happens here too for manual adds
        broadcast(new \App\Events\TransactionCreated($transaction))->toOthers();

        return response()->json($transaction);
    }
}
