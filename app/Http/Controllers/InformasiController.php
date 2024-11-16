<?php

namespace App\Http\Controllers;

use App\Models\Informasi;
use Illuminate\Http\Request;

class InformasiController extends Controller
{
    public function index()
    {
        $informasi = Informasi::latest()->get();

        return inertia('Informasi/Index', compact('informasi'));
    }
    public function show(Request $request, Informasi $informasi)
    {

        $all = Informasi::latest()->get();
        return inertia('Informasi/Show', compact('informasi', 'all'));
    }
}
