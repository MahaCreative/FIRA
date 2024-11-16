<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Informasi extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function getRouteKeyName()
    {
        return 'slug';
    }

    // Relasi dengan tabel kategori
    public function kategori()
    {
        return $this->belongsTo(Kategori::class);
    }
}
