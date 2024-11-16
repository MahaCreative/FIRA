<?php

namespace App\Http\Middleware;

use App\Models\PengaduanPelanggan;
use App\Models\SettingApps;
use App\Models\Slider;
use App\Models\User;
use App\Models\WilayahKerja;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $slider = Slider::latest()->get();
        $setting = SettingApps::first();
        $countPengaduan = PengaduanPelanggan::where('status_pengaduan', 'menunggu konfirmasi')->count();
        $wilayah = WilayahKerja::latest()->get();
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'slider' => $slider,
            'setting' => $setting,
            'petugas' => User::where('role', 'petugas lapangan')->latest()->get(),
            'countPengaduan' => $countPengaduan,
            'wilayah' => $wilayah,
        ];
    }
}
