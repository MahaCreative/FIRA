<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PengaduanPelanggan extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function jenis()
    {
        return $this->belongsTo(JenisPengaduan::class, 'jenis_pengaduan_id');
    }
    public function pelanggan()
    {
        return $this->belongsTo(User::class, 'pelanggan_id');
    }
    public function petugas()
    {
        return $this->belongsTo(User::class, 'petugas_id');
    }
}
