<?php

namespace App\Http\Controllers;

use App\Models\Informasi;
use App\Models\Slider;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(Request $request)
    {

        $informasi = Informasi::latest()->get();

        return inertia('Home/Index', compact('informasi'));
    }
}
