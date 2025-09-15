<?php

namespace App\Http\Controllers;

use App\Models\Users;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class userController extends Controller
{
    public function getUsers() {
        $data = Users::get();

        return response()->json(["status"=>"ok", "data"=>$data], 200);
    }

    public function createUser(Request $request) {
        $validated = $request->validate([
            "username" => ['required', 'string', 'unique:pengguna,username'],
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
        Users::where("id", $request->id)->update($request->all());

        return response()->json(["status"=>"ok"], 200);
    }
}
