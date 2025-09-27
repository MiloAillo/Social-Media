<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PostLikes extends Model
{
    protected $table = "post_likes";

    protected $fillable = [
        "postId",
        "userId"
    ];

    protected $hidden = [
        "created_at",
        "updated_at"
    ];

    public function konten() {
        return $this->belongsTo(Konten::class);
    }
}
