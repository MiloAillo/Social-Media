<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Users extends Authenticatable
{
    use HasApiTokens;

    protected $table = 'pengguna';

    protected $fillable = [
        'id', // auto added
        'username', // editable G:1
        'email', // future authentication
        'password', // future authentication
        'name', // editable G:1
        'photo', // editable G:2
        'description', // editable G:1
    ];

    protected $hidden = [
        'password',
        'created_at',
        'updated_at',
        'email',
        'pivot'
    ];

    public function konten() {
        return $this->hasMany(Konten::class, "userId");
    }

    public function follower() {
        return $this->belongsToMany(
            Users::class,
            "relations",
            "following",
            "follower"
        );
    }

    public function following() {
        return $this->belongsToMany(
            Users::class,
            "relations",
            "follower",
            "following"
        );
    }
}
