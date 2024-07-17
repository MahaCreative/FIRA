<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class DataPelanggan extends Controller
{
    public function index(Request $request)
    {
        $query = User::query()->where('role', 'pelanggan');
        $pelanggan = $query->latest()->get();
        return inertia('Admin/DataPelanggan/Index', compact('pelanggan'));
    }

    public function cetak(Request $request)
    {
        $query = User::query()->where('role', 'pelanggan');
        $pelanggan = $query->latest()->get();
        return inertia('Admin/DataPelanggan/Cetak', compact('pelanggan'));
    }
}
