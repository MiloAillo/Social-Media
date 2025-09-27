<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Replies extends Model
{
    protected $fillable = [
        "userId",
        "commentId",
        "comment"
    ];

    protected $hidden = [
        "updated_at"
    ];

    protected $casts = [
        "created_at" => "datetime:Y-m-d h:i"
    ];

    public function comment() {
        return $this->belongsTo(PostComments::class);
    }

    public function users() {
        return $this->belongsTo(Users::class, "userId");
    }

    public function likes() {
        return $this->hasMany(RepliesLikes::class, "replyId");
    }
}
