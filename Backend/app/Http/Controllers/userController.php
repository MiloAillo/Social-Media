<?php

namespace App\Http\Controllers;

use App\Models\Users;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

use function PHPUnit\Framework\isArray;

class userController extends Controller
{
    public function getUsers() {
        $data = Users::get();

        return response()->json(["status"=>"ok", "data"=>$data], 200);
    }

    public function createUser(Request $request) {
        $validated = $request->validate([
            "username" => ['required', 'string', "min:6" , 'unique:pengguna,username'],
            "email" => ['required', 'email', 'unique:users,email'],
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
            "username" => ["min:6", "lowercase", "regex:/^[a-z0-9_-]+$/", "unique:pengguna,username"], 
            "name" => ["string", "min:6", "not_regex:/^[0-9_-]+$/"],
            "image" => ["file", "mimes:jpg,png,jpeg", "max:2048"]  ,
            "description" => ["string"]
        ]);

        $user = $request->user();
        $hasImage = false;
        $filteredRequest = $request->except("image");

        if($request->hasFile("image")) {
            $hasImage = true;
            $image = $request->file("image");

            $extension = $image->getClientOriginalExtension();
            $filename = Str::uuid() . "pp" . "." . $extension;
            $path = $image->storeAs("pfp", $filename, "public");
            $link = url(Storage::url($path));

            $request->offsetUnset("image");
            $filteredRequest["photo"] = $link;
        }
        
        Users::query()->where("id", $user->id)->update($filteredRequest);
        return response()->json(["status"=>"success"], 200);
    }

    public function searchUsers(Request $request) {
        $db = Users::query()->where("username", "like", "%".$request->users.'%')
                        ->orWhere('name', "like", "%".$request->users.'%')
                        ->get();

        return response()->json($db, 200);
    }
}
