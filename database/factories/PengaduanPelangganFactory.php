<?php

namespace Database\Factories;

use App\Models\JenisPengaduan;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PengaduanPelanggan>
 */
class PengaduanPelangganFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    function generateRandomCoordinates($latitude, $longitude, $radiusInKm = 10)
    {
        // Convert latitude and longitude from degrees to radians
        $latitude = deg2rad($latitude);
        $longitude = deg2rad($longitude);

        // Radius of the Earth in km
        $earthRadius = 6371;

        // Generate a random distance (in km) within the radius
        $distance = sqrt(mt_rand(0, 100) / 100) * $radiusInKm;

        // Generate a random angle (in radians)
        $angle = deg2rad(mt_rand(0, 360));

        // Calculate the new latitude
        $newLatitude = asin(sin($latitude) * cos($distance / $earthRadius) +
            cos($latitude) * sin($distance / $earthRadius) * cos($angle));

        // Calculate the new longitude
        $newLongitude = $longitude + atan2(
            sin($angle) * sin($distance / $earthRadius) * cos($latitude),
            cos($distance / $earthRadius) - sin($latitude) * sin($newLatitude)
        );

        // Convert back from radians to degrees
        $newLatitude = rad2deg($newLatitude);
        $newLongitude = rad2deg($newLongitude);

        return [
            'lat' => $newLatitude,
            'long' => $newLongitude,
        ];
    }
    public function definition(): array
    {
        $jenisPengaduan = JenisPengaduan::get();
        $coordinates = $this->generateRandomCoordinates(-2.674218739577445, 118.89448120837064);
        return [
            "jenis_pengaduan_id" => rand(1, count($jenisPengaduan) - 1),
            "pelanggan_id" => fake()->randomElement(User::where('role', 'pelanggan')->get()->pluck('id')),
            "judul_pengaduan" => fake()->sentence(),
            "deskripsi_pengaduan" => fake()->paragraph(3),
            "nama_petugas_menangani" => fake()->name(),
            "foto_pengaduan" => 'Image/slider1.png',
            'lat' => $coordinates['lat'],
            'long' => $coordinates['long'],
            'telph' => fake()->phoneNumber(),
            'created_at' => fake()->dateTimeBetween('-3 years', 'now'),
            'status_pengaduan' => fake()->randomElement(['di proses', 'menunggu konfirmasi', 'selesai', 'di batalkan'])
        ];
    }
}
