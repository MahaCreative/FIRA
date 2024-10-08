<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JenisPengaduan extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function pengaduan()
    {
        return $this->hasMany(PengaduanPelanggan::class, 'jenis_pengaduan_id', 'id');
    }
}
