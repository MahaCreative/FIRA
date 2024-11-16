<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\JenisPengaduan;
use App\Models\PengaduanPelanggan;
use App\Models\User;
use App\Models\WilayahKerja;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {

        $countWilayah = WilayahKerja::count();
        $jenisPengaduan = JenisPengaduan::count();
        $countAdmin = User::whereNot('role', 'pelanggan')->count();
        $countPelanggan = User::where('role', 'pelanggan')->count();
        $user = $request->user();
        if ($user->role == 'admin') {

            $pengaduan = PengaduanPelanggan::with('jenis')->latest()->get();
        }
        if ($user->role == 'petugas lapangan') {
            $wilayah = $user->wilayah()->pluck('nama_wilayah');
            $pengaduan = PengaduanPelanggan::with('jenis')->whereIn(
                'wilayah',
                $wilayah
            )->latest()->get();
        }
        if ($user->role == 'pelanggan') {

            $pengaduan = PengaduanPelanggan::with('jenis')->where('pelanggan_id', $user->id)->latest()->get();
        }



        $statJenisPengaduan = JenisPengaduan::withCount('pengaduan')->get();
        $statPengaduan = PengaduanPelanggan::selectRaw('jenis_pengaduans.nama as jenis_pengaduan, MONTH(pengaduan_pelanggans.created_at) as bulan, COUNT(*) as jumlah')
            ->join('jenis_pengaduans', 'pengaduan_pelanggans.jenis_pengaduan_id', '=', 'jenis_pengaduans.id')
            ->whereYear('pengaduan_pelanggans.created_at', 2023)
            ->groupBy('jenis_pengaduans.nama', 'bulan')
            ->orderBy('bulan')
            ->get();
        $wilayah = WilayahKerja::latest()->get();
        // Mengubah hasil menjadi array dengan bulan sebagai kunci
        $statPengaduanPerMouth = [];
        foreach ($statPengaduan as $p) {
            $statPengaduanPerMouth[$p->jenis_pengaduan][Carbon::create()->month($p->bulan)->locale('id')->isoFormat('MMMM')] = $p->jumlah;
        }

        return inertia('Dashboard/Index', compact(
            'pengaduan',
            'countWilayah',
            'jenisPengaduan',
            'countAdmin',
            'countPelanggan',
            'statJenisPengaduan',
            'statPengaduanPerMouth',
            'wilayah'
        ));
    }
}
