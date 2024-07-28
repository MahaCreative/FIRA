<?php

namespace App\Http\Controllers;

use App\Models\InformasiPemadaman;
use Illuminate\Http\Request;

class InformasiPemadamanController extends Controller
{
    public function index(Request $request)
    {
        $pemadaman = InformasiPemadaman::latest()->get();

        return inertia('InformasiPemadaman/Index', compact('pemadaman'));
    }
    public  function show(Request $request, $id)
    {
        $pemadaman = InformasiPemadaman::find($id);

        return inertia('InformasiPemadaman/Show', compact('pemadaman'));
    }
}
