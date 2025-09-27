<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AccessController extends Controller
{
    public function login(Request $request) {
        $validated = $request->validate([
            "email" => ['required', "max:100", 'email'],
            "password" => [],
        ]);

        if ($request->email === null && $request->password === null) {
            return response()->json(["status"=>"401", "message"=>"butuh email dan password"], 400);
        }

        if(!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(["status"=>"error", "message"=>"Email atau password salah"], 401);
        }

        $user = Auth::user();
        
        /** @var \App\Models\Users $user */
        $token = $user->createToken('id')->plainTextToken;

        return response()->json(["status"=>"ok", "token"=>$token], 200);
    }

    public function logout(Request $request) {
        $request->user()->currentAccessToken()->delete();
    }

    public function check(Request $request) { // unused, yet
        $user = $request->user();
        return response()->json(["status"=>"success", "user"=>$user], 200);
    }
}
