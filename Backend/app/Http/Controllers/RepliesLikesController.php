<?php

namespace App\Http\Controllers;

use App\Models\Replies;
use App\Models\RepliesLikes;
use Illuminate\Http\Request;

class RepliesLikesController extends Controller
{
    function addLike(Request $request) {
        $validated = $request->validate([
            "replyId" => ["required", "numeric"],
        ]);

        $user = $request->user();

        try {
            Replies::query()->where("id", $request->replyId)->firstOrFail();
        } catch (\Throwable $th) {
            return response()->json(["status" => "error", "message" => "reply not found"], 400);
        }

        try {
            RepliesLikes::query()->create([
                "replyId" => $request->replyId,
                "userId" => $user->id
            ]);        
        } catch (\Throwable $th) {
            return response()->json(["status" => "error", "message" => "you already liked this comment!"], 400);
        }

        return response()->json(["status" => "success"], 200);
    }

    function deleteLike(Request $request) {
        $validated = $request->validate([
            "replyId" => ["required", "numeric"],
        ]);

        $user = $request->user();

        $db = RepliesLikes::query()->where("userId", $user->id)
                                ->where("replyId", $request->replyId)
                                ->first();

        if(!$db) {
            return response()->json(["status"=> "error", "message" => "no comment found"],400);
        }

        $db->delete();
        return response()->json(["status"=> "success"],200);
    }}
