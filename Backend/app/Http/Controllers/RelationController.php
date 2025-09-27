<?php

namespace App\Http\Controllers;

use App\Models\Relation;
use Illuminate\Http\Request;
use LDAP\Result;

class RelationController extends Controller
{
    function addRelation(Request $request) {
        $validated = $request->validate([
            "user" => ["required", "numeric", "exists:pengguna,id"]
        ]);

        $user = $request->user();
        if($user->id == $request->user) {
            return response()->json(["status" => "error", "message" => "you cannot follow yourself!"], 401);
            exit;
        }
        $db = Relation::query()->create(["follower" => $user->id, "following" => $request->user]);        

        return response()->json(["status" => "success", "message" => $db], 200);
    }

    function deleteRelation(Request $request) {
        $validated = $request->validate([
            "user" => ["required", "numeric", "exists:pengguna,id"]
        ]);

        $user = $request->user();

        $db = Relation::where('follower', $user->id)
                      ->where('following', $request->user)
                      ->delete();

        if ($db) {
            return response()->json(["status" => "success", "message" => "relation removed"], 200);
        } else {
            return response()->json(["status" => "error", "message" => "nothing to delete"], 400);
        }
    }
}
