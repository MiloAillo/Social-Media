<?php

namespace App\Http\Controllers;

use App\Models\Konten;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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
        $filespath = [];
        $hasImage = false;

        if($request->hasFile("images")) {
            if(count($images) > 3) {
                return response()->json(["status" => "error", "message"=> "only 3 images allowed per post"],400);
            }
            $hasImage = true;
            foreach($images as $image) {
                $filename = time() . Str::uuid() . "." . $image->getClientOriginalExtension();
                $path = $image->storeAs("post", $filename, "public");
                $filespath[] = url(Storage::url($path));
            }
        }

        if($hasImage) {
            Konten::create([
                "userId" => $user->id,
                "tittle" => $request->tittle,
                "content" => $request->content,
                "images" => $filespath
            ]);
        } else {
           Konten::create([
                "userId" => $user->id,
                "tittle" => $request->tittle,
                "content" => $request->content
            ]); 
        }

        return response(["status"=> "success","message"=> "post uploaded successfully"],200);
    }

    function getKonten() {
        $res = Konten::with(['pengguna:id,username,photo'])->get();   
        return response()->json($res,200);
    }

    function deleteKonten(Request $request) {
        $validated = $request->validate([
            "kontenId" => ["required", "numeric"]
        ]);

        $user = $request->user();

        $post = Konten::where("id", $request->kontenId)->where("userId", $user->id)->FirstOrFail();
        $post->delete();

        return response(["status"=> "success","message"=> "Konten deleted"],200);
    }
}
