<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\InformasiPemadaman;
use Illuminate\Http\Request;

class InformasiPemadamanController extends Controller
{
    public function index(Request $request)
    {
        $query = InformasiPemadaman::query()->with('wilayah');
        $informasiPemadaman = $query->latest()->get();
        return inertia('Admin/InformasiPemadaman/Index', compact('informasiPemadaman'));
    }

    public function create(Request $request)
    {
        return inertia('Admin/InformasiPemadaman/Create');
    }

    public function store(Request $request)
    {

        $attr = $request->validate([
            "judul" =>  "required|string|min:10",
            "deskripsi" =>  "nullable|string|min:25",
            "jam_padam" =>  "required",
            "jam_selesai" =>  "nullable",
            "wilayah_kerja_id" =>  "required",
        ]);
        $attr['deskripsi'] = 'abg';
        $informasi = InformasiPemadaman::create($attr);
        return redirect()->back();
    }

    public function delete(Request $request)
    {
        $informasiPemadaman = InformasiPemadaman::findOrFail($request->id);
        $informasiPemadaman->delete();
        return redirect()->back();
    }
}
