<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Informasi;
use Illuminate\Http\Request;

class InformasiController extends Controller
{
    public function index(Request $req)
    {
        $query = Informasi::query();
        $informasi = $query->latest()->get();
        return inertia('Admin/Informasi/Index', compact('informasi'));
    }
    public function create(Request $request)
    {
        return inertia('Admin/Informasi/Create');
    }

    public function store(Request $request)
    {
        $attr = $request->validate([
            'judul' => 'required|min:10',
            "foto" => "required|image|mimes:jpeg,png,jpg,gif,svg|max:2048",
            'deskripsi' => 'required|min:10',

        ]);
        // $attr['post_by'] = $request->user()->firstname;
        $attr['post_by'] = "abg";
        $attr['slug'] = \Str::slug($request->judul);

        $attr['foto'] = $request->file('foto')->store('public/informasi');
        Informasi::create($attr);

        return redirect()->back();
    }

    public function update(Request $req, $slug)
    {
        $informasi = Informasi::where('slug', $slug)->first();

        return inertia('Admin/Informasi/Create', ['informasi' => $informasi]);
    }

    public function storeUpdate(Request $request)
    {
        $informasi = Informasi::where('slug', $request->slug)->first();
        $attr = $request->validate([
            'judul' => 'required|min:10',
            "foto" => "required|image|mimes:jpeg,png,jpg,gif,svg|max:2048",
            'deskripsi' => 'required|min:10',

        ]);
        $attr['foto'] = $informasi->foto;
        if ($request->file('foto')) {
            $request->validate([
                'foto' => 'image|mimes:jpg,jpeg,png,svg'
            ]);
            $attr['foto'] = $request->file('foto')->store('public/informasi');
        }
        // $attr['post_by'] = $request->user()->firstname;
        $attr['post_by'] = "abg";
        $attr['slug'] = \Str::slug($request->judul);
        $informasi->update($attr);
    }

    public function delete(Request $request)
    {
        $informasi = Informasi::where('slug', $request->slug)->first();
        $informasi->delete();
        return redirect()->back();
    }


    public function uploadImage(Request $request)
    {
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            // Simpan file di folder 'public/uploads'
            $path = $file->storeAs('public/uploads', $filename);

            // Buat URL untuk file yang diunggah
            $url = asset('storage/uploads/' . $filename);
            return response()->json(['location' => $url]);
        }

        return response()->json(['error' => 'No file uploaded'], 400);
    }
}
