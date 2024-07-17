<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Informasi;
use App\Models\JenisPengaduan;
use App\Models\PengaduanPelanggan;
use App\Models\Slider;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $user = User::create([
            'firstname' => 'guntur',
            'lastname' => 'madjid',
            'phone' => '082194255717',
            'address' => 'Jl diponegoro',
            'tanggal_lahir' => '1998-01-17',
            'tempat_lahir' => 'makassar',
            'role' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('password'),
        ]);

        DB::table('roles')->insert([
            [
                'name' => 'admin',
                'guard_name' => 'web'
            ],
            [
                'name' => 'petugas lapangan',
                'guard_name' => 'web'
            ],
            [
                'name' => 'pelanggan',
                'guard_name' => 'web'
            ]
        ]);
        $user->assignRole('admin');

        Slider::create([
            'gambar' => 'Image/slider1.png'
        ]);
        Slider::create([
            'gambar' => 'Image/slider2.png'
        ]);
        Slider::create([
            'gambar' => 'Image/slider3.png'
        ]);
        Informasi::factory(10)->create();
        $this->call([
            SettingAppsSeeder::class,
        ]);
        User::factory(50)->create();
        JenisPengaduan::factory(10)->create();
    }
}
