<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class konten extends Model
{
    protected $table = "konten";

    protected $fillable = [
        "id",
        "tittle",
        "content",
        "images",
        "userId"
    ];

    protected $hidden = [
        "userId",
        "created_at",
        "updated_at",
    ];

    protected $casts = [
        "images" => "array"
    ];

    public function pengguna() {
        return $this->belongsTo(Users::class, "userId");
    }
}
