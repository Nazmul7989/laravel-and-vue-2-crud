<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;


Route::get('/', function () {
    return view('welcome');
});


Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

//Post route
Route::get('/post',[PostController::class,'index']);
Route::post('/post/create',[PostController::class,'store']);
Route::get('/post/edit/{id}',[PostController::class,'edit']);
Route::put('/post/update/{id}',[PostController::class,'update']);
Route::delete('/post/delete/{id}',[PostController::class,'destroy']);
