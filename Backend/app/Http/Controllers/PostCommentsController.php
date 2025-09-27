<?php

namespace App\Http\Controllers;

use App\Models\PostComments;
use Illuminate\Http\Request;

class PostCommentsController extends Controller
{
    function addComment(Request $request) {
        $validated = $request->validate([
            "postId" => ["numeric", "required"],
            "comment" => ["required", "max:200", "string"]
        ]);

        $user = $request->user();

        PostComments::query()->create([
            "userId" => $user->id,
            "postId" => $request->postId,
            "comment" => $request->comment
        ]);

        return response()->json(["status" => "success"], 200);
    }

    function deleteComment(Request $request) {
        $validated = $request->validate([
            "commentId" => ["required", "numeric"]
        ]);

        $user = $request->user();

        $comment = PostComments::query()->where("id", $request->commentId)
                            ->where("userId", $user->id)
                            ->first();

        if (!$comment) {
            return response()->json(["status"=> "error", "message" => "no comment found"], 400);
        }

        $comment->delete();
        return response()->json(["status"=> "success"], 200);
    }

    function getComments(Request $request) {
        $validated = $request->validate([
            "postId" => ["numeric", "required"]
        ]);

        $db = PostComments::with(["users", "replies.users:id,username,photo"])->withCount(["likes"])->where("postId", $request->postId)->latest()->get();

        return response()->json(["status"=> "success",""=> $db], 200);
    }
}
