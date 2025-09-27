<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CommentLikes extends Model
{
    protected $table = "comment_likes";

    protected $fillable = [
        "commentId",
        "userId"
    ];

    protected $hidden = [
        "created_at",
        "updated_at"
    ];

    public function comment() {
        return $this->belongsTo(PostComments::class);
    }
}
