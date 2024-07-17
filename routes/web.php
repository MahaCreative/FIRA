<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\DataPelanggan;
use App\Http\Controllers\Admin\DataWilayahController;
use App\Http\Controllers\Admin\InformasiController as AdminInformasiController;
use App\Http\Controllers\Admin\InformasiPemadamanController as AdminInformasiPemadamanController;
use App\Http\Controllers\Admin\JenisPengaduanController;
use App\Http\Controllers\Admin\PengaduanPelangganController;
use App\Http\Controllers\Admin\PetugasController;
use App\Http\Controllers\Admin\SettingAppsController;
use App\Http\Controllers\Admin\SliderController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\InformasiController;
use App\Http\Controllers\InformasiPemadamanController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SettingProfile;
use App\Models\PengaduanPelanggan;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group(['middelware' => 'guset'], function () {
    Route::get('login', [AuthController::class, 'login'])->name('login');
    Route::post('login', [AuthController::class, 'loginPost'])->name('login.post');
    Route::get('register', [AuthController::class, 'register'])->name('register');
    Route::post('register', [AuthController::class, 'registerPost'])->name('register.post');
});


Route::get('', [HomeController::class, 'index'])->name('home');
Route::get('informasi', [InformasiController::class, 'index'])->name('informasi');
Route::get('informasi-show/{informasi}', [InformasiController::class, 'show'])->name('informasi.show');
Route::get('informasi-pemadaman', [InformasiPemadamanController::class, 'index'])->name('informasi-pemadaman');

Route::get('logout', [AuthController::class, 'logout'])->name('logout');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('data-pelanggan', [DataPelanggan::class, 'index'])->name('admin.data-pelanggan');
    Route::get('cetak-data-pelanggan', [DataPelanggan::class, 'cetak'])->name('admin.cetak-data-pelanggan');
    Route::get('admin/pengaduan-pelanggan', [PengaduanPelangganController::class, 'index'])->name('admin.pengaduan-pelanggan');
    Route::get('admin/cetak-pengaduan-pelanggan', [PengaduanPelangganController::class, 'cetak'])->name('admin.cetak-pengaduan-pelanggan');

    Route::get('admin/informasi', [AdminInformasiController::class, 'index'])->name('admin.informasi');
    Route::get('admin/create-informasi', [AdminInformasiController::class, 'create'])->name('admin.create-informasi');
    Route::post('admin/create-informasi', [AdminInformasiController::class, 'store'])->name('admin.create-informasi.post');
    Route::get('admin/update-informasi/{slug}', [AdminInformasiController::class, 'update'])->name('admin.create-informasi.update');
    Route::post('admin/update-informasi', [AdminInformasiController::class, 'storeUpdate'])->name('admin.create-informasi.update-store');
    Route::delete('admin/delete-informasi', [AdminInformasiController::class, 'delete'])->name('admin.delete-informasi');

    Route::get('admin/informasi-pemadaman', [AdminInformasiPemadamanController::class, 'index'])->name('admin.informasi-pemadaman');
    Route::get('admin/informasi-pemadaman-create', [AdminInformasiPemadamanController::class, 'create'])->name('admin.informasi-pemadaman-create');
    Route::post('admin/informasi-pemadaman-create', [AdminInformasiPemadamanController::class, 'store'])->name('admin.informasi-pemadaman-post');
    Route::delete('admin/informasi-pemadaman-delete', [AdminInformasiPemadamanController::class, 'delete'])->name('admin.informasi-pemadaman-delete');

    Route::get('admin/slider', [SliderController::class, 'index'])->name('admin.slider');
    Route::post('admin/slider-create', [SliderController::class, 'create'])->name('admin.slider-create');
    Route::delete('admin/slider-delete', [SliderController::class, 'delete'])->name('admin.slider-delete');

    Route::get('pelanggan/show-pengaduan-pelanggan', [PengaduanPelangganController::class, 'show'])->name('pelanggan.show-pengaduan-pelanggan');
});




// For Admin
Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('admin/setting-applikasi', [SettingAppsController::class, 'index'])->name('admin.setting-apps');
    Route::post('admin/update-logo', [SettingAppsController::class, 'updateLogo'])->name('admin.update-logo');
    Route::post('admin/update-setting-applikasi', [SettingAppsController::class, 'update'])->name('admin.update-setting-apps');
    Route::post('admin/update-lokasi', [SettingAppsController::class, 'updateLokasi'])->name('admin.update-lokasi');

    Route::get('admin/data-wilayah-kerja', [DataWilayahController::class, 'index'])->name('admin.data-wilayah-kerja');
    Route::get('admin/data-wilayah-kerja/create', [DataWilayahController::class, 'create'])->name('admin.data-wilayah-kerja.create');
    Route::post('admin/data-wilayah-kerja/create', [DataWilayahController::class, 'store'])->name('admin.data-wilayah-kerja.create.post');
    Route::delete('admin/data-wilayah-kerja/delete', [DataWilayahController::class, 'delete'])->name('admin.data-wilayah-kerja.delete');
    Route::post('admin/tambah-petugas', [DataWilayahController::class, 'tambahPetugas'])->name('admin.tambah-petugas');
    Route::delete('admin/delete-petugas', [DataWilayahController::class, 'deletePetugas'])->name('admin.delete-petugas');

    Route::get('admin/data-petugas-lapangan', [PetugasController::class, 'index'])->name('admin.petugas-lapangan');
    Route::get('admin/cetak-petugas-lapangan', [PetugasController::class, 'cetak'])->name('admin.cetak-petugas-lapangan');
    Route::post('admin/data-petugas-lapangan-store', [PetugasController::class, 'store'])->name('admin.petugas-lapangan-store');
    Route::post('admin/data-petugas-lapangan-update', [PetugasController::class, 'update'])->name('admin.petugas-lapangan-update');
    Route::delete('admin/data-petugas-lapangan-delete', [PetugasController::class, 'delete'])->name('admin.petugas-lapangan-delete');

    Route::get('admin/jenis-pengaduan', [JenisPengaduanController::class, 'index'])->name('admin.jenis-pengaduan');
    Route::post('admin/jenis-create', [JenisPengaduanController::class, 'create'])->name('admin.jenis-pengaduan-create');
    Route::delete('admin/jenis-delete', [JenisPengaduanController::class, 'delete'])->name('admin.jenis-pengaduan-delete');
});

ROute::middleware(['auth', /*'role:petugas lapangan'*/])->group(function () {
    Route::post('petugas-lapangan/proses-pengaduan-pelanggan/', [PengaduanPelangganController::class, 'prosesPengaduan'])->name('petugas.proses-pengaduan-pelanggan');
});

Route::middleware(['auth', 'role:pelanggan'])->group(function () {
    Route::get('pelanggan/pengaduan-pelanggan', [PengaduanPelangganController::class, 'pengaduan'])->name('pelanggan.pengaduan-pelanggan');
    Route::get('pelanggan/create-pengaduan-pelanggan', [PengaduanPelangganController::class, 'create'])->name('pelanggan.create-pengaduan-pelanggan');

    Route::post('pelanggan/store-pengaduan-pelanggan', [PengaduanPelangganController::class, 'store'])->name('pelanggan.pengaduan-pelanggan.store');
    Route::delete('pelanggan/delete-pengaduan-pelanggan', [PengaduanPelangganController::class, 'delete'])->name('pelanggan.pengaduan-pelanggan.delete');
});

Route::get('setting-profile', [SettingProfile::class, 'index'])->name('setting-profile');
Route::post('ganti-foto', [SettingProfile::class, 'gantiFoto'])->name('ganti-foto');
Route::post('update-profile', [SettingProfile::class, 'update'])->name('update-profile');
