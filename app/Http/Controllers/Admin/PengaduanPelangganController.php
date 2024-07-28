<?php

namespace App\Http\Controllers\Admin;

use App\Events\AduanEvent;
use App\Events\ProsesPengaduan;
use App\Http\Controllers\Controller;
use App\Models\JenisPengaduan;
use App\Models\PengaduanPelanggan;
use App\Models\WilayahKerja;
use Illuminate\Http\Request;

class PengaduanPelangganController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        if ($user->role == 'admin') {

            $query = PengaduanPelanggan::query()->with('jenis', 'pelanggan', 'petugas');
        }
        if ($user->role == 'petugas lapangan') {
            $wilayah = $user->wilayah()->pluck('nama_wilayah');

            $query = PengaduanPelanggan::query()->with('jenis', 'pelanggan', 'petugas')->whereIn(
                'wilayah',
                $wilayah
            );
        }

        if ($request->cari) {
            $query->orWhere('judul_pengaduan', 'like', '%' . $request->cari . '%')
                ->orWhere('kd_pengaduan', 'like', '%' . $request->cari . '%');
        }
        if ($request->cari_petugas) {
            $query->whereHas('petugas', function ($que) use ($request) {
                $que->where('firstname', 'like', '%' . $request->cari_petugas . '%');
            });
        }
        if ($request->wilayah) {
            $query->where('wilayah', 'like', '%' . $request->wilayah . '%');
        }
        if ($request->dari_tanggal) {
            $query->whereDate('created_at', '>=', $request->dari_tanggal);
        }
        if ($request->sampai_tanggal) {
            $query->whereDate('created_at', '<=', $request->sampai_tanggal);
        }
        if ($request->status_pengaduan) {
            $query->where('status_pengaduan', $request->status_pengaduan);
        }
        if ($request->status) {
            $query->where('status', $request->status);
        }
        if ($request->jenis_pengaduan) {
            $query->whereHas('jenis', function ($que) use ($request) {
                $que->where('nama', 'like', '%' . $request->jenis_pengaduan . '%');
            });
        }
        $pengaduan = $query->latest()->get();
        $wilayah = WilayahKerja::latest()->get();
        return inertia('Admin/PengaduanPelanggan/Index', compact('pengaduan', 'wilayah'));
    }

    public function pengaduan(Request $request)
    {
        $query = PengaduanPelanggan::query()->with('jenis', 'pelanggan', 'petugas')->where('pelanggan_id', $request->user()->id);
        $pengaduan = $query->latest()->get();

        return inertia('Pelanggan/PengaduanPelanggan/Index', compact('pengaduan'));
    }

    public function show(Request $request)
    {
        $pengaduan = PengaduanPelanggan::with('jenis', 'pelanggan', 'petugas')->where('kd_pengaduan', $request->kd_pengaduan)->first();


        return inertia('Pelanggan/PengaduanPelanggan/Show', compact('pengaduan'));
    }

    public function create(Request $request)
    {
        $jenisPengaduan = JenisPengaduan::latest()->get();
        $wilayah = WilayahKerja::latest()->get();
        return inertia('Pelanggan/PengaduanPelanggan/Create', compact('jenisPengaduan', 'wilayah'));
    }

    public function store(Request $request)
    {


        $attr = $request->validate([
            "judul_pengaduan" => 'required|min:10|max:255',
            "deskripsi_pengaduan" => 'required|string|min:25',
            "foto_pengaduan" => 'required|image|mimes:jpg,png,jpg',
            "telph" => 'required|numeric|digits:12',
            "jenis_pengaduan_id" => 'required',
            "wilayah" => 'required',
            "lat" => 'required',
            "long" => "required"
        ]);
        $image = $request->file('foto_pengaduan')->store('foto_pengaduan');
        $jenisPengaduan = JenisPengaduan::findOrFail($request->jenis_pengaduan_id);

        $pengaduan = PengaduanPelanggan::create([
            'kd_pengaduan' => now()->format('dmy') . $request->user()->id . PengaduanPelanggan::count() + 1,
            "wilayah" => $request->wilayah,
            "jenis_pengaduan_id" => $request->jenis_pengaduan_id,
            "pelanggan_id" => $request->user()->id,
            "judul_pengaduan" => $request->judul_pengaduan,
            "deskripsi_pengaduan" => $request->deskripsi_pengaduan,
            "foto_pengaduan" => $image,
            "lat" => $request->lat,
            "long" => $request->long,
            "telph" => $request->telph,
        ]);
        $wilayah = WilayahKerja::with('petugas')->where('nama_wilayah', $request->wilayah)->first();
        foreach ($wilayah->petugas as $item) {
            $data = array(
                'target' => $item->phone,
                'message' => "
Terdapat 1 pengaduan baru yang perlu ditangani segera, silahkan menghubungi pelapor untuk informasi lebih lanjut tentang pengaduan yang diajukan
Jenis Pengaduan : *$jenisPengaduan->nama*
Judul Pengauan : *$request->judul_pengaduan*
WhatsApp Pelapor: *$request->telph*
Lihat langsung detail pengaduan melalui link berikut
https://aduanplnpangale.site/pelanggan/show-pengaduan-pelanggan?kd_pelanggan=$pengaduan->kd_pengaduan
                ",
                'countryCode' => '62', //optional
            );
            $this->message($data);
        }
        broadcast(new AduanEvent($pengaduan))->toOthers();
        return redirect()->back();
    }

    public function delete(Request $request)
    {

        $pengaduan = PengaduanPelanggan::find($request->id);
        $pengaduan->delete();
        return redirect()->back();
    }
    public function prosesPengaduan(Request $request)
    {

        $request->validate([
            "status_lapangan" => 'required',
            "status_pengaduan" => 'required',
            "solusi_pengangan" => 'required|string|min:25',
            "foto_penganan" => 'required|image|mimes:jpg,png,jpg',
        ]);
        $namaPetugas = $request->user()->firstname . " " . $request->user()->lastname;
        $petugsaId = $request->user()->id;
        $tanggalProses = now();
        $status_lapangan = $request->status_lapangan;
        $status_pengaduan = $request->status_pengaduan;
        $solusi_pengangan = $request->solusi_pengangan;
        $foto_penganan = $request->file('foto_penganan')->store('pengaduan/foto_pengangan');
        $pengaduan = PengaduanPelanggan::findOrFail($request->id);

        $pengaduan->update([
            'nama_petugas_menangani' => $namaPetugas,
            "status_lapangan" => $status_lapangan,
            "status_pengaduan" => $status_pengaduan,
            "solusi_pengangan" => $solusi_pengangan,
            "foto_penganan" => $foto_penganan,
            "petugas_id" => $petugsaId,
            "tanggal_proses" => $tanggalProses,
        ]);
    }

    public function cetak(Request $request)
    {
        $user = $request->user();
        $filter = $request->all();
        if ($user->role == 'admin') {

            $query = PengaduanPelanggan::query()->with('jenis', 'pelanggan', 'petugas');
        }
        if ($user->role == 'petugas lapangan') {
            $wilayah = $user->wilayah()->pluck('nama_wilayah');

            $query = PengaduanPelanggan::query()->with('jenis', 'pelanggan', 'petugas')->whereIn(
                'wilayah',
                $wilayah
            );
        }

        if ($request->cari) {
            $query->orWhere('judul_pengaduan', 'like', '%' . $request->cari . '%')
                ->orWhere('kd_pengaduan', 'like', '%' . $request->cari . '%');
        }
        if ($request->cari_petugas) {
            $query->whereHas('petugas', function ($que) use ($request) {
                $que->where('firstname', 'like', '%' . $request->cari_petugas . '%');
            });
        }
        if ($request->wilayah) {
            $query->where('wilayah', 'like', '%' . $request->wilayah . '%');
        }
        if ($request->dari_tanggal) {
            $query->whereDate('created_at', '>=', $request->dari_tanggal);
        }
        if ($request->sampai_tanggal) {
            $query->whereDate('created_at', '<=', $request->sampai_tanggal);
        }
        if ($request->status_pengaduan) {
            $query->where('status_pengaduan', $request->status_pengaduan);
        }
        if ($request->status) {
            $query->where('status', $request->status);
        }
        if ($request->jenis_pengaduan) {
            $query->whereHas('jenis', function ($que) use ($request) {
                $que->where('nama', 'like', '%' . $request->jenis_pengaduan . '%');
            });
        }
        $pengaduan = $query->latest()->get();
        $wilayah = WilayahKerja::latest()->get();
        return inertia('Admin/PengaduanPelanggan/Cetak', compact('pengaduan', 'wilayah', 'filter'));
    }

    public function message($data)
    {

        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://api.fonnte.com/send',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => $data,
            CURLOPT_HTTPHEADER => array(
                'Authorization: oAMf+vjnQeV9gmqAGRb8' //change TOKEN to your actual token
            ),
        ));

        $response = curl_exec($curl);
        if (curl_errno($curl)) {
            $error_msg = curl_error($curl);
        }
        curl_close($curl);
    }
}
