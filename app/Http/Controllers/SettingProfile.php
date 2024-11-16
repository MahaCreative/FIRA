<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SettingProfile extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        return inertia('SettingProfile/Index', compact('user'));
    }

    public function gantiFoto(Request $request)
    {
        $request->validate(['image' => 'required|image|mimes:jpeg,png,jpg,gif,svg']);
        $foto = $request->file('image')->store('user');
        $request->user()->update(['image' => $foto]);

        return redirect()->back();
    }

    public function update(Request $request)
    {
        $user = $request->user();
        $attr = $request->validate([
            "firstname" => "required|string|min:3",
            "lastname" => "nullable|string|min:3",
            "phone" => "required|numeric|digits:12",
            "address" => "required|string|min:10",
            "tanggal_lahir" => "required|date|before:now",
            "tempat_lahir" => "required|string|min:4|max:25",
            "address" => "required|string|min:10",
            "tanggal_lahir" => "required|date|before:now",
            "tempat_lahir" => "required|string|min:4|max:25",
            "image" => "nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048",
        ]);

        if ($request->password) {
            $request->validate([
                "password" => "required|confirmed|alpha_dash|min:8",
            ]);
            $attr['password'] = bcrypt($request->password);
        }
        $user->update($attr);
    }
}
