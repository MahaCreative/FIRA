<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('informasi_pemadamen', function (Blueprint $table) {
            $table->id();
            $table->foreignId('wilayah_kerja_id')->constrained('wilayah_kerjas')->onDelete('cascade');
            $table->string('judul');
            $table->string('deskripsi');
            $table->string('jam_padam');
            $table->string('jam_selesai')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('informasi_pemadamen');
    }
};
