<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class KontenController extends Controller
{
    function post(Request $request) {
        $validated = $request->validate([
            "tittle" => ["required", "min:8"],
            "content" => ["required", "min:10"],
            "images" => ["mimes:jpg,jpeg,png", "max:2048"]
        ]);
    }
}
