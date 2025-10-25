<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TacheController;


// Route::middleware('auth:sanctum')->group(function () {
//     Route::get('taches', [TacheController::class, 'index']);
//     Route::post('taches', [TacheController::class, 'store']);
//     Route::get('taches/{id}', [TacheController::class, 'show']);
//     Route::put('taches/{id}', [TacheController::class, 'update']);
//     Route::delete('taches/{id}', [TacheController::class, 'destroy']);
// });



Route::get('taches', [TacheController::class, 'index']);

Route::post('taches', [TacheController::class, 'store']);

Route::get('taches/{id}', [TacheController::class, 'show']);

Route::put('taches/{id}', [TacheController::class, 'update']);

Route::delete('taches/{id}', [TacheController::class, 'destroy']);
