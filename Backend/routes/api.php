<?php

use App\Http\Controllers\AccessController;
use App\Http\Controllers\userController;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

// UserController
Route::middleware('auth:sanctum')->get('/users', [userController::class, 'getUsers']);
Route::post('/user', [userController::class, "createUser"]);
Route::patch('/user', [userController::class, "updateUser"]);
Route::delete('/user', [userController::class, "deleteUser"]);

//AccessController
Route::post('/login', [AccessController::class, "login"]);
Route::middleware('auth:sanctum')->get('/logout', [AccessController::class, "logout"]);
Route::middleware('auth:sanctum')->get('/check', [AccessController::class, "check"]);