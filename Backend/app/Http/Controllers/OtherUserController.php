<?php

namespace App\Http\Controllers;

use App\Models\Relation;
use App\Models\Users;
use Illuminate\Http\Request;

use function PHPUnit\Framework\isEmpty;

class OtherUserController extends Controller
{
    public function getProfile(Request $request) {
        $validated = $request->validate([
            "userId" => ["required", "numeric"]
        ]);

        $userId = $request->user()->id;

        $userData = Users::find($request->userId);
        
        if (!$userData) {
            return response()->json(["status" => "error", "message" => "no user found"] ,400);
        }

        $countFollower = $userData->follower()->count();
        $countFollowing = $userData->following()->count();
        $post = $userData->konten()->withCount(["likes", "comments"])->get()->makeHidden(['content']);
        $isFollowing = $userData->follower()->where("pengguna.id", $userId)->exists();
        return response()->json([
            "userData" => $userData,
            "follower" => $countFollower,
            "following" => $countFollowing,
            "konten" => $post,
            "isFollowing" => $isFollowing
        ], 200);
    }

    public function getFollowers(Request $request) {
        $validated = $request->validate([
            "userId" => ["required", "numeric"]
        ]);

        $userData = Users::find($request->userId)->follower()->get(['pengguna.id', 'pengguna.username', 'pengguna.photo']);
        return response()->json($userData, 200);     
    }

    public function getFollowings(Request $request) {
        $validated = $request->validate([
            "userId" => ["required", "numeric"]
        ]);

        $userData = Users::find($request->userId)->following()->get(['pengguna.id', 'pengguna.username', 'pengguna.photo']);
        return response()->json($userData, 200);        
    }
}
