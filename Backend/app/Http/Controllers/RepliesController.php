<?php

namespace App\Http\Controllers;

use App\Models\PostComments;
use App\Models\Replies;
use Illuminate\Http\Request;

class RepliesController extends Controller
{
    function addReply(Request $request) {
        $validated = $request->validate([
            "commentId" => ["numeric", "required"],
            "comment" => ["required", "max:200", "string"]
        ]);
 
        $user = $request->user();

        $comment = PostComments::query()->where("id", $request->commentId)->first();
        if (!$comment) {
            return response()->json(["status" => "error", "message" => "no comment found"], 400);
        }

        Replies::query()->create([
            "userId" => $user->id,
            "commentId" => $request->commentId,
            "comment" => $request->comment
        ]);

        return response()->json(["status" => "success"], 200);
    }

    function deleteReply(Request $request) {
        $validated = $request->validate([
            "replyId" => ["required", "numeric"]
        ]);

        $user = $request->user();

        $comment = Replies::query()->where("id", $request->replyId)
                            ->where("userId", $user->id)
                            ->first();

        if (!$comment) {
            return response()->json(["status"=> "error", "message" => "no reply found"], 400);
        }

        $comment->delete();
        return response()->json(["status"=> "success"], 200);
    }
}
