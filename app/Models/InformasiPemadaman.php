<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InformasiPemadaman extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function wilayah()
    {
        return $this->belongsTo(WilayahKerja::class, 'wilayah_kerja_id');
    }
}
