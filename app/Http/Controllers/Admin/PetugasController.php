<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class PetugasController extends Controller
{
    public function index(Request $request)
    {
        $query = User::query();

        $petugas = $query->where('role', 'petugas lapangan')->with('wilayah')->latest()->get();
        return inertia('Admin/PetugasLapangan/Index', compact('petugas'));
    }

    public function store(Request $request)
    {

        $attr = $request->validate([
            "firstname" => "required|string|min:3",
            "lastname" => "nullable|string|min:3",
            "phone" => "required|numeric|digits:12|unique:users,phone",
            "address" => "required|string|min:6",
            "tanggal_lahir" => "required|date|before:now",
            "tempat_lahir" => "required|string|min:4|max:25",
            "image" => "nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048",
            "email" => "required|email|unique:users,email",
            "password" => "required|confirmed|alpha_dash|min:8",
        ]);
        $attr['role'] = 'petugas lapangan';
        $attr['image'] = $request->file('image') ? $request->file('image')->store('Form/user') : null;
        $user = User::create($attr);

        $user->assignRole('pelanggan');
        return redirect()->back();
    }

    public function update(Request $request)
    {

        $user = User::findOrFail($request->id);
        $attr = $request->validate([
            "firstname" => "required|string|min:3",
            "lastname" => "nullable|string|min:3",
            "phone" => "required|numeric|digits:12",
            "address" => "required|string|min:6",
            "tanggal_lahir" => "required|date|before:now",
            "tempat_lahir" => "required|string|min:4|max:25",
            "email" => "required|email|unique:users,email," . $user->id,

        ]);
        $attr['image'] = $user->image;

        if ($request->file('image')) {
            $attr['image'] = $request->file('image')->store('Form/user');
        }
        if ($request->password) {
            $request->validate([
                "password" => "required|confirmed|alpha_dash|min:8",
            ]);
            $attr['password'] = bcrypt($request->password);
        }
        $user->update($attr);
        return redirect()->back();
    }

    public function delete(Request $request)
    {

        $user = User::findOrFail($request->id);
        $user->delete();
        return redirect()->back();
    }

    public function cetak(Request $request)
    {
        $petugas = User::where('role', '=', 'petugas lapangan')->with('wilayah')->get();
        return inertia('Admin/PetugasLapangan/Cetak', compact('petugas'));
    }
}
