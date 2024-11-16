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
        Schema::create('setting_apps', function (Blueprint $table) {
            $table->id();
            $table->string('nama_kantor');
            $table->string('logo')->default('Image/profile.png');
            $table->longText('deskripsi');
            $table->string('telph');
            $table->string('alamat');
            $table->string('nama_pimpinan');
            $table->string('long');
            $table->string('lat');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('setting_apps');
    }
};
