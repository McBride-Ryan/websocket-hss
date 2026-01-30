<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $table = 'transactions';

    protected $primaryKey = 'id';

    protected $fillable = [
        'timestamp',
        'amount',
        'description',
        'accountType',
    ];

    protected $casts = [
        'timestamp' => 'datetime',
    ];

    protected $guarded = [];

}
