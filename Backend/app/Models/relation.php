<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class relation extends Model
{
    protected $table = "relations";

    protected $fillable = [
        "follower",
        "following"
    ];

    public function followerPengguna() {
        return $this->belongsTo(Users::class, "follower");
    }

    public function followingPengguna() {
        return $this->belongsTo(Users::class, "following");
    }
}
