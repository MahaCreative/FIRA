<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SettingApps;
use Illuminate\Http\Request;

class SettingAppsController extends Controller
{
    public function index(Request $request)
    {
        $setting = SettingApps::first();
        return inertia('Admin/SettingApps/Index', compact('setting'));
    }
    public function updateLogo(Request $request)
    {

        $request->validate(['logo' => 'required|image|mimes:jpeg,png,jpg,gif,svg']);
        $logo = $request->file('logo')->store('logo');
        $setting = SettingApps::first();
        $setting->logo = $logo;
        $setting->save();
        return redirect()->back();
    }

    public function update(Request $request)
    {
        $attr = $request->validate([
            "nama_kantor" => 'required|string|min:7|max:30',
            "deskripsi" => 'required|string|min:7',
            "telph" => 'required|numeric|digits:12',
            "alamat" => 'required|string|min:7|max:255',
            "nama_pimpinan" => 'required|string|min:7|max:50',
        ]);
        $setting = SettingApps::first();
        $setting->update($attr);
        return redirect()->back();
    }

    public function updateLokasi(Request $request)
    {

        $setting = SettingApps::first();
        $setting->lat = $request->lat;
        $setting->long = $request->long;
        $setting->save();
        return redirect()->back();
    }

    public function updateEmail(Request $request)
    {
        $setting = SettingApps::first();
        $setting->email = $request->email;
        $setting->save();
        return redirect()->back();
    }

    public function updatePassword(Request $request)
    {
    }
}
