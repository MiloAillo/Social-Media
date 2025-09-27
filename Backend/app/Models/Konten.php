<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

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
        "updated_at",
    ];

    protected $casts = [
        "images" => "array",
        "created_at" => "datetime:Y-m-d h:i"
    ];

    protected $appends = [
        "short_content"
    ];

    public function getShortContentAttribute() {
        return Str::limit($this->content, 200);
    }

    public function pengguna() {
        return $this->belongsTo(Users::class, "userId");
    }

    public function likes() {
        return $this->belongsToMany(Users::class, "post_likes", "postId", "userId");
    }

    public function comments() {
        return $this->hasMany(PostComments::class, "postId");
    }
}
