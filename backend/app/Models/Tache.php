<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Tache extends Model
{
    use HasFactory;

    // Les champs qui peuvent être remplis via create() ou update()
    protected $fillable = [
        'text',
        'completed',
        // 'user_id', // si tu ajoutes la relation avec utilisateur
    ];

    // Si tu veux que 'completed' soit toujours un booléen
    protected $casts = [
        'completed' => 'boolean',
    ];
}
