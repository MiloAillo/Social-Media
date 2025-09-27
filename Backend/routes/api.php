<?php

use App\Http\Controllers\AccessController;
use App\Http\Controllers\CommentsLikesController;
use App\Http\Controllers\KontenController;
use App\Http\Controllers\OtherUserController;
use App\Http\Controllers\PostCommentsController;
use App\Http\Controllers\PostLikesController;
use App\Http\Controllers\RelationController;
use App\Http\Controllers\RepliesController;
use App\Http\Controllers\RepliesLikesController;
use App\Http\Controllers\userController;
use App\Models\Relation;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

// UserController
Route::middleware('auth:sanctum')->post('/editprofile', [userController::class, "updateUser"]);
Route::middleware('auth:sanctum')->post('/search', [userController::class, 'searchUsers']);
Route::middleware('auth:sanctum')->post('/updatePhoto', [userController::class, 'updatePhoto']);
Route::middleware('auth:sanctum')->get('/deletePhoto', [userController::class, 'deletePhoto']);
Route::middleware('auth:sanctum')->get('/userProfile', [userController::class, 'userProfile']);
Route::middleware('auth:sanctum')->get('/userFollowers', [userController::class, 'userFollowers']);
Route::middleware('auth:sanctum')->get('/userFollowings', [userController::class, 'userFollowings']);
Route::post('/user', [userController::class, "createUser"]);
Route::delete('/user', [userController::class, "deleteUser"]);

// OtherUserController
Route::middleware('auth:sanctum')->get('/getProfile', [OtherUserController::class, 'getProfile']);
Route::middleware('auth:sanctum')->get('/getFollowers', [OtherUserController::class, 'getFollowers']);
Route::middleware('auth:sanctum')->get('/getFollowings', [OtherUserController::class, 'getFollowings']);

//AccessController
Route::post('/login', [AccessController::class, "login"]);
Route::middleware('auth:sanctum')->delete('/logout', [AccessController::class, "logout"]);
Route::middleware('auth:sanctum')->get('/check', [AccessController::class, "check"]);

//KontenController
Route::middleware('auth:sanctum')->get('/post', [KontenController::class,'getKonten']);
Route::middleware('auth:sanctum')->post('/post', [KontenController::class,'postKonten']); 
Route::middleware('auth:sanctum')->delete('/post', [KontenController::class, "deleteKonten"]);      

// RelationController
Route::middleware('auth:sanctum')->post('/addRelation', [RelationController::class, 'addRelation']);
Route::middleware('auth:sanctum')->delete('/deleteRelation', [RelationController::class,'deleteRelation']);

// PostLikesController
Route::middleware('auth:sanctum')->post('/addLike', [PostLikesController::class, 'addLike']);
Route::middleware('auth:sanctum')->delete('/deleteLike', [PostLikesController::class, 'deleteLike']);

// PostCommentsController
Route::middleware('auth:sanctum')->post('/addComment', [PostCommentsController::class, 'addComment']);
Route::middleware('auth:sanctum')->delete('/deleteComment', [PostCommentsController::class, 'deleteComment']);
Route::middleware('auth:sanctum')->post('/getComments', [PostCommentsController::class, 'getComments']);

// RepliesController
Route::middleware('auth:sanctum')->post('/addReply', [RepliesController::class, 'addReply']);
Route::middleware('auth:sanctum')->delete('/deleteReply', [RepliesController::class, 'deleteReply']);

// CommentsLikesController
Route::middleware('auth:sanctum')->post('/addLikeComment', [CommentsLikesController::class, 'addLike']);
Route::middleware('auth:sanctum')->delete('/deleteLikeComment', [CommentsLikesController::class, 'deleteLike']);

// RepliesLikesController
Route::middleware('auth:sanctum')->post('/addLikeReply', [RepliesLikesController::class, 'addLike']);
Route::middleware('auth:sanctum')->delete('/deleteLikeReply', [RepliesLikesController::class, 'deleteLike']);


