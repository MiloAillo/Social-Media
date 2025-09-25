<?php

use App\Http\Controllers\AccessController;
use App\Http\Controllers\KontenController;
use App\Http\Controllers\RelationController;
use App\Http\Controllers\userController;
use App\Models\Relation;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

// UserController
Route::middleware('auth:sanctum')->get('/users', [userController::class, 'getUsers']);
Route::middleware('auth:sanctum')->post('/editprofile', [userController::class, "updateUser"]);
Route::middleware('auth:sanctum')->post('/search', [userController::class, 'searchUsers']);
Route::middleware('auth:sanctum')->post('/updatePhoto', [userController::class, 'updatePhoto']);
Route::post('/user', [userController::class, "createUser"]);
Route::delete('/user', [userController::class, "deleteUser"]);

//AccessController
Route::post('/login', [AccessController::class, "login"]);
Route::middleware('auth:sanctum')->get('/logout', [AccessController::class, "logout"]);
Route::middleware('auth:sanctum')->get('/check', [AccessController::class, "check"]);

//KontenController
Route::middleware('auth:sanctum')->get('/post', [KontenController::class,'getKonten']);
Route::middleware('auth:sanctum')->post('/post', [KontenController::class,'postKonten']); 
Route::middleware('auth:sanctum')->delete('/post', [KontenController::class, "deleteKonten"]);      

// RelationController
Route::middleware('auth:sanctum')->post('/addRelation', [RelationController::class, 'addRelation']);
Route::middleware('auth:sanctum')->delete('/deleteRelation', [RelationController::class,'deleteRelation']);