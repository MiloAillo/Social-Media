<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Relation extends Model
{
    protected $table = "relations";

    protected $fillable = [
        "follower",
        "following"
    ];

    protected $hidden = [
        "created_at",
        "updated_at"
    ];

    public function follower() {
        return $this->belongsTo(Users::class, "follower");
    }

    public function following() {
        return $this->belongsTo(Users::class, "following");
    }
}
