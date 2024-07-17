<?php

namespace Database\Seeders;

use App\Models\SettingApps;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SettingAppsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        SettingApps::create([
            'nama_kantor' => 'PLN UP 3 Mamuju',
            'telph' => '082194255717',
            'alamat' => 'Jl diponegoro',
            'nama_pimpinan' => 'Guntur madjid',
            'deskripsi' => 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia, cumque reiciendis necessitatibus eveniet nostrum esse distinctio aspernatur explicabo. Debitis facere, necessitatibus quos molestiae magnam ipsa aliquam tenetur quibusdam? Neque, odio voluptatem? Tenetur adipisci minus non repellat a? Obcaecati, voluptatem cum consectetur fugiat rerum quos cupiditate nihil qui quibusdam possimus commodi eveniet illo est accusantium asperiores quasi nobis laboriosam recusandae voluptate officia dignissimos! Suscipit quisquam, eos ex quaerat tempora voluptate at necessitatibus quae repudiandae debitis laudantium ullam delectus quam eius nam assumenda totam. Odit provident et ipsa similique voluptates hic minima numquam, modi qui ex atque dicta quasi voluptatibus. Magni cumque amet voluptate beatae facilis atque excepturi ratione incidunt, itaque id veniam libero ipsa repellat possimus in porro facere minima quo nulla non, impedit quidem fugit ad maiores? Non cupiditate sed at facere? Atque impedit dolor ratione voluptas odit fugiat numquam culpa. Tempora quae culpa, perspiciatis exercitationem maxime quis iure aliquam tenetur neque nulla alias possimus, voluptatibus quasi rerum eos nihil, earum expedita consequatur officia? Voluptatum, delectus sunt. Facere accusamus autem culpa mollitia sint eius nisi voluptatem dolore nesciunt itaque nemo corrupti voluptatibus cum, earum, eos magnam vitae molestias voluptas! Nostrum, eos laboriosam at dolorem aliquid distinctio quaerat autem perspiciatis cumque!
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia, cumque reiciendis necessitatibus eveniet nostrum esse distinctio aspernatur explicabo. Debitis facere, necessitatibus quos molestiae magnam ipsa aliquam tenetur quibusdam? Neque, odio voluptatem? Tenetur adipisci minus non repellat a? Obcaecati, voluptatem cum consectetur fugiat rerum quos cupiditate nihil qui quibusdam possimus commodi eveniet illo est accusantium asperiores quasi nobis laboriosam recusandae voluptate officia dignissimos! Suscipit quisquam, eos ex quaerat tempora voluptate at necessitatibus quae repudiandae debitis laudantium ullam delectus quam eius nam assumenda totam. Odit provident et ipsa similique voluptates hic minima numquam, modi qui ex atque dicta quasi voluptatibus. Magni cumque amet voluptate beatae facilis atque excepturi ratione incidunt, itaque id veniam libero ipsa repellat possimus in porro facere minima quo nulla non, impedit quidem fugit ad maiores? Non cupiditate sed at facere? Atque impedit dolor ratione voluptas odit fugiat numquam culpa. Tempora quae culpa, perspiciatis exercitationem maxime quis iure aliquam tenetur neque nulla alias possimus, voluptatibus quasi rerum eos nihil, earum expedita consequatur officia? Voluptatum, delectus sunt. Facere accusamus autem culpa mollitia sint eius nisi voluptatem dolore nesciunt itaque nemo corrupti voluptatibus cum, earum, eos magnam vitae molestias voluptas! Nostrum, eos laboriosam at dolorem aliquid distinctio quaerat autem perspiciatis cumque!',
            'long' => '118.89448120837064',
            'lat' => '-2.674218739577445',
        ]);
    }
}
