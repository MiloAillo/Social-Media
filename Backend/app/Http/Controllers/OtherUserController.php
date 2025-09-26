<?php

namespace App\Http\Controllers;

use App\Models\Users;
use Illuminate\Http\Request;

class OtherUserController extends Controller
{
    public function getProfile(Request $request) {
        $validated = $request->validate([
            "userId" => ["required", "numeric"]
        ]);

        $userData = Users::find($request->userId);
        $countFollower = $userData->follower()->count();
        $countFollowing = $userData->following()->count();
        $post = $userData->konten()->get();
        return response()->json([
            "userData" => $userData,
            "follower" => $countFollower,
            "following" => $countFollowing,
            "konten" => $post
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
