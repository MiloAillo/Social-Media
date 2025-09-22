<?php

namespace App\Http\Controllers;

use App\Models\Konten;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class KontenController extends Controller
{
    function postKonten(Request $request) {
        $validated = $request->validate([
            "tittle" => ["required", "min:8"],
            "content" => ["required", "min:10"],
            "images.*" => ["mimes:jpg,jpeg,png", "max:2048"]
        ]);

        $user = $request->user();
        $images = $request->file("images");
        $filesname = [];
        $hasImage = false;

        if(count($images) > 3) {
            return response()->json(["status" => "error", "message"=> "only 3 images allowed per post"],400);
        }

        if($request->hasFile("images")) {
            $hasImage = true;
            foreach($images as $image) {
                $filename = time() . Str::uuid() . "-" . $image->getClientOriginalName();
                $image->storeAs("post", $filename, "public");
                $filesname[] = $filename;
            }
        }

        if($hasImage) {
            konten::create([
                "userId" => $user->id,
                "tittle" => $request->tittle,
                "content" => $request->content,
                "images" => $filesname
            ]);
        } else {
           konten::create([
                "userId" => $user->id,
                "tittle" => $request->tittle,
                "content" => $request->content
            ]); 
        }

        return response(["status"=> "success","message"=> "post uploaded successfully"],200);
    }
}
