<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RepliesLikes extends Model
{
    protected $table = "replies_likes";

    protected $fillable = [
        "replyId",
        "userId"
    ];

    protected $hidden = [
        "created_at",
        "updated_at"
    ];

    public function reply() {
        return $this->belongsTo(Replies::class);
    }}
