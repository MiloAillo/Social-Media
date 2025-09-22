<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class konten extends Model
{
    protected $table = "konten";

    protected $fillable = [
        "tittle",
        "content",
        "images",
        "userId"
    ];

    protected $hidden = [
        "id",
        "userId",
        "created_at",
        "updated_at",
    ];

    protected $casts = [
        "images" => "array"
    ];
}
