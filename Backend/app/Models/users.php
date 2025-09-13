<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Users extends Authenticatable
{
    use HasApiTokens;

    protected $table = 'pengguna';

    protected $fillable = [
        'username',
        'email',
        'password',
        'name',
        'photo',
        'description',
    ];

    protected $hidden = [
        'password',
    ];
}
