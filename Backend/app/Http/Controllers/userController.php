<?php

namespace App\Http\Controllers;

use App\Models\Users;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class userController extends Controller
{
    public function createUser(Request $request) {
        $validated = $request->validate([
            "username" => ['required', 'string', "min:6", "max:100", "lowercase", "regex:/^[a-z0-9_-]+$/", 'unique:pengguna,username'],
            "email" => ['required', "max;100", 'email', 'unique:users,email'],
            "password" => ['required', 'string', 'min:6'] 
        ]);

        Users::insert([
            "username"=>$validated['username'],
            "email"=>$validated['email'],
            "password"=>Hash::make($validated['password']),
        ]);

        return response()->json(["status"=>"ok"], 200);
    }

    public function deleteUser(Request $request) {
        Users::where("id", $request->id)->delete();

        return response()->json(["status"=>"ok"], 200);
    }

    public function updateUser(Request $request) {
        $validated = $request->validate([
            "username" => ["string", "min:6", "max:100", "lowercase", "regex:/^[a-z0-9_-]+$/", "unique:pengguna,username"], 
            "name" => ["string", "min:6", "max:100", "regex:/^[a-zA-Z ]+$/"],
            "description" => ["string", "max:150"]
        ]);

        $user = $request->user();
        
        Users::query()->where("id", $user->id)->update($request->all());
        return response()->json(["status"=>"success"], 200);
    }

    public function updatePhoto(Request $request) {
        $validated = $request->validate([
            "image" => ["required", "mimes:jpg,png,jpeg", "max:2048"]
        ]);

        $user = $request->user();
        $image = $request->file('image');
        $filename = Str::uuid().'.'.$image->getClientOriginalExtension();

        $oldImage = Users::query()->where('id', $user->id)->value('photo');
        if($oldImage) {
            $filteredUrl = Str::replace(url('storage')."/", "", $oldImage);
            Storage::disk('public')->delete($filteredUrl);
        }
        
        $path = $image->storeAs('pfp', $filename, "public");
        $url = url(Storage::url($path));

        Users::query()->where('id', $user->id)->update(["photo" => $url]);

        return response()->json(["status" => "success", "message" => $filteredUrl], 200);
    }

    public function searchUsers(Request $request) {
        $validated = $request->validate([
            "users" => ["required", "string"],
        ]);

        $db = Users::query()->where("username", "like", "%".$request->users.'%')
                        ->orWhere('name', "like", "%".$request->users.'%')
                        ->get();

        return response()->json($db, 200);
    }

    public function userProfile(Request $request) {
        $user = $request->user();

        $userData = Users::find($user->id);
        $countFollower = $userData->follower()->count();
        $countFollowing = $userData->following()->count();
        $post = $userData->konten;
        return response()->json([
            "userData" => $userData,
            "follower" => $countFollower,
            "following" => $countFollowing,
            "konten" => $post
        ], 200);
    }

    public function userFollowers(Request $request) {
        $user = $request->user();

        $userData = Users::find($user->id)->follower()->get(['pengguna.id', 'pengguna.username', 'pengguna.photo']);
        return response()->json($userData, 200);     
    }

    public function userFollowings(Request $request) {
        $user = $request->user();

        $userData = Users::find($user->id)->following()->get(['pengguna.id', 'pengguna.username', 'pengguna.photo']);
        return response()->json($userData, 200);        
    }
}
