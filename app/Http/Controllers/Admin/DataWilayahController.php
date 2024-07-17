<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\WilayahKerja;
use Illuminate\Http\Request;

class DataWilayahController extends Controller
{
    public function index(Request $request)
    {
        $wilayah = WilayahKerja::with('petugas')->withCount('petugas')->latest()->get();

        return inertia('Admin/DataWilayah/Index', compact('wilayah'));
    }

    public function create()
    {
        $allWilayah = WilayahKerja::all();

        return inertia('Admin/DataWilayah/Form', compact('allWilayah'));
    }

    public function store(Request $request)
    {

        $attr = $request->validate(
            [
                'nama_wilayah' => 'required|string|min:6',
                'geojson' => 'required|json',
                'kode_warna' => 'required|string',
            ]
        );
        $data = WilayahKerja::create($attr);
        return redirect()->back()->with(['type' => 'success', 'message' => 'Data wilayah berhasil ditambahkan']);
    }
    public function delete(Request $request)
    {

        $wilayah = WilayahKerja::findOrFail($request->id);
        $wilayah->delete();
        return redirect()->back();
    }

    public function tambahPetugas(Request $request)
    {
        $wilayah = WilayahKerja::findOrFail($request->wilayah_id);
        $wilayah->petugas()->syncWithoutDetaching([$request->petugas_id]);
        return redirect()->back();
    }

    public function deletePetugas(Request $request)
    {
        $wilayah = WilayahKerja::findOrFail($request->wilayah_id);
        $wilayah->petugas()->detach($request->petugas_id);
        return redirect()->back();
    }
}
