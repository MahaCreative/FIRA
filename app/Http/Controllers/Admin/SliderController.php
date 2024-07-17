<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Slider;
use Illuminate\Http\Request;

class SliderController extends Controller
{
    public function index(Request $request)
    {
        $slider = Slider::latest()->get();
        return inertia('Admin/Slider/Index', compact('slider'));
    }
    public function create(Request $request)
    {
        $foto = $request->file('foto')->store('public/slider');
        Slider::create([
            'gambar' => $foto,
        ]);
        return redirect()->back();
    }

    public function delete(Request $request)
    {
        $slider = Slider::find($request->id);
        $slider->delete();
        return redirect()->back();
    }
}
