<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController; // Import your new controller
use App\Http\Controllers\API\TransactionAPIController; // Import your API controller

Route::get('/', [HomeController::class, 'dashboard']);
Route::get('/about', [HomeController::class, 'about']);

// API Endpoints
Route::get('api/transactions', [TransactionAPIController::class, 'index']); // For data refreshes
Route::post('api/transactions', [TransactionAPIController::class, 'store'])->name('api.transactions.store');

// NEW: Add this line for the SSE stream
Route::get('api/transactions/stream', [TransactionAPIController::class, 'stream'])->name('api.transactions.stream');
