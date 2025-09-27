<?php

namespace App\Http\Controllers;

use App\Models\CommentLikes;
use App\Models\PostComments;
use Illuminate\Http\Request;

class CommentsLikesController extends Controller
{
    function addLike(Request $request) {
        $validated = $request->validate([
            "commentId" => ["required", "numeric"],
        ]);

        $user = $request->user();

        try {
            PostComments::query()->where("id", $request->commentId)->firstOrFail();
        } catch (\Throwable $th) {
            return response()->json(["status" => "error", "message" => "comment not found"], 400);
        }

        try {
            CommentLikes::query()->create([
                "commentId" => $request->commentId,
                "userId" => $user->id
            ]);        
        } catch (\Throwable $th) {
            return response()->json(["status" => "error", "message" => "you already liked this comment!"], 401);
        }

        return response()->json(["status" => "success"], 200);
    }

    function deleteLike(Request $request) {
        $validated = $request->validate([
            "commentId" => ["required", "numeric"],
        ]);

        $user = $request->user();

        $db = CommentLikes::query()->where("userId", $user->id)
                                ->where("commentId", $request->commentId)
                                ->first();

        if(!$db) {
            return response()->json(["status"=> "error", "message" => "no comment found"],400);
        }

        $db->delete();
        return response()->json(["status"=> "success"],200);
    }
}
