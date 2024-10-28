<?php

use App\Http\Controllers\api\BookController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/books', [BookController::class, 'index']);
Route::post('/books/new', [BookController::class, 'store']);
Route::get('/books/{id}', [BookController::class, 'show']);
Route::put('/books/{id}/update', [BookController::class, 'update']);
Route::delete('/books/{id}/delete', [BookController::class, 'destroy']);
Route::post('/books/search', [BookController::class, 'search']);