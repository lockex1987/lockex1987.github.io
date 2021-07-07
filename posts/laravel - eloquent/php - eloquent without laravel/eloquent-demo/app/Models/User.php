<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    public $timestamps = false;

    protected $table = 'user';

    // Ẩn cột password ở JSON trả về
    protected $hidden = [
        'password'
    ];
}
