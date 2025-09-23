<?php

use App\Http\Controllers\AccessController;
use App\Http\Controllers\KontenController;
use App\Http\Controllers\userController;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

// UserController
Route::middleware('auth:sanctum')->get('/users', [userController::class, 'getUsers']);
Route::post('/user', [userController::class, "createUser"]);
Route::middleware('auth:sanctum')->post('/editprofile', [userController::class, "updateUser"]);
Route::delete('/user', [userController::class, "deleteUser"]);

//AccessController
Route::post('/login', [AccessController::class, "login"]);
Route::middleware('auth:sanctum')->get('/logout', [AccessController::class, "logout"]);
Route::middleware('auth:sanctum')->get('/check', [AccessController::class, "check"]);

//KontenController
Route::middleware('auth:sanctum')->get('/post', [KontenController::class,'getKonten']);
Route::middleware('auth:sanctum')->post('/post', [KontenController::class,'postKonten']); 
Route::middleware('auth:sanctum')->delete('/post', [KontenController::class, "deleteKonten"]);                                 // kurang get post dan post posts, frontend post up to 3 image, backend terima image, parse path nya dan masukkin path ke db encoded json, image masuk storage, get nya return link image nya.