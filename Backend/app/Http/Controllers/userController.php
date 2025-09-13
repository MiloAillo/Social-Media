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
        Users::insert([
            "username"=>$request->username,
            "email"=>$request->email,
            "password"=>Hash::make($request->password),
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
