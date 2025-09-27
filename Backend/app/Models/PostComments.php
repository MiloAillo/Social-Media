<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PostComments extends Model
{
    protected $fillable = [
        "userId",
        "postId",
        "comment"
    ];

    protected $hidden = [
        "updated_at"
    ];

    protected $casts = [
        "created_at" => "datetime:Y-m-d h:i"
    ];

    public function konten() {
        return $this->belongsTo(Konten::class);
    }

    public function users() {
        return $this->belongsTo(Users::class, "userId");
    }

    public function replies() {
        return $this->hasMany(Replies::class, "commentId");
    }

    public function likes() {
        return $this->hasMany(CommentLikes::class, "commentId");
    }
}
