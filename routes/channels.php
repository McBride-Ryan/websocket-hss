<?php
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('transactions', function () {
    return true; // Public for now
});
