<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WilayahKerja extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $cats = [
        'geojson' => 'array'
    ];

    public function petugas()
    {
        return $this->belongsToMany(User::class, 'wilayah_petugas', 'wilayah_id', 'user_id');
    }
}
