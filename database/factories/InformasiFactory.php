<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Informasi>
 */
class InformasiFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'judul' => $judul = fake()->sentence(3),
            'slug' => \Str::slug($judul),
            'deskripsi' => fake()->paragraph(20),
            'foto' => fake()->randomElement(['Image/slider1.png', 'Image/slider2.png', 'Image/slider3.png']),
            'post_by' => fake()->name(),
        ];
    }
}
