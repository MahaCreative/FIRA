<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\JenisPengaduan;
use Carbon\Carbon;
use Illuminate\Http\Request;

class JenisPengaduanController extends Controller
{
    public function index(Request $request)
    {
        $startDate = Carbon::now()->startOfMonth();
        $endDate = Carbon::now()->endOfMonth();
        $jenisPengaduan = JenisPengaduan::withCount(['pengaduan'])->latest()->get();

        return inertia('Admin/JenisPengaduan/Index', compact('jenisPengaduan'));
    }


    public function create(Request $request)
    {
        $request->validate(['nama' => 'required|string|min:6|max:50']);
        $jenis = JenisPengaduan::create(['nama' => $request->nama]);
        return redirect()->back();
    }

    public function delete(Request $request)
    {
        $jenis = JenisPengaduan::find($request->id);
        $jenis->delete();
        return redirect()->back();
    }
}
