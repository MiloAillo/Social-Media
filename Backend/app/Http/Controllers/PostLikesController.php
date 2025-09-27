<?php

namespace App\Http\Controllers;

use App\Models\Konten;
use App\Models\PostLikes;
use Illuminate\Http\Request;

class PostLikesController extends Controller
{
    function addLike(Request $request) {
        $validated = $request->validate([
            "postId" => ["required", "numeric"],
        ]);

        $user = $request->user();

        try {
            Konten::query()->where("id", $request->postId)->firstOrFail();
        } catch (\Throwable $th) {
            return response()->json(["status" => "error", "message" => "post not found", "db" => $th->getMessage()], 400);
        }

        try {
            PostLikes::query()->create([
                "postId" => $request->postId,
                "userId" => $user->id
            ]);        
        } catch (\Throwable $th) {
            return response()->json(["status" => "error", "message" => "you already liked this post!"], 401);
        }

        return response()->json(["status" => "success"], 200);
    }

    function deleteLike(Request $request) {
        $validated = $request->validate([
            "postId" => ["required", "numeric"],
        ]);

        $user = $request->user();

        $db = PostLikes::query()->where("userId", $user->id)
                                ->where("postId", $request->postId)
                                ->first();

        if(!$db) {
            return response()->json(["status"=> "error", "message" => "no comment found"],400);
        }

        $db->delete();
        return response()->json(["status"=> "success"],200);
    }
}
