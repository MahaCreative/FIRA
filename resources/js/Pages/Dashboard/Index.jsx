import Maps from "@/Components/Maps";
import AuthLayout from "@/Layouts/AuthLayout";
import { Link, usePage } from "@inertiajs/react";
import { Group, LocationCity, Report } from "@mui/icons-material";
import moment from "moment";
import React from "react";
import { Marker, Popup, GeoJSON } from "react-leaflet";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as turf from "@turf/turf";
export default function Index({
    pengaduan,
    countWilayah,
    jenisPengaduan,
    countAdmin,
    countPelanggan,
    statJenisPengaduan,
    statPengaduanPerMouth,
    wilayah,
}) {
    const { setting } = usePage().props;
    const { auth } = usePage().props;
    const bulan = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
    ];
    const series = Object.keys(statPengaduanPerMouth).map((jenis_pengaduan) => {
        return {
            name: jenis_pengaduan,
            data: bulan.map(
                (bulanNama) =>
                    statPengaduanPerMouth[jenis_pengaduan][bulanNama] || 0
            ),
        };
    });
    console.log(series);
    const option = {
        chart: {
            type: "bar",
        },
        title: {
            text: "Statisitik Pengaduan Berdasarkan Jenis Pengaduan",
        },
        subtitle: {
            text: "Statistik jumlah pengaduan berdasarkan jenis",
        },
        xAxis: {
            categories: statJenisPengaduan.map((item) => item.nama),
        },
        yAxis: {
            title: {
                text: "Jumlah",
            },
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true,
                },
                enableMouseTracking: false,
            },
        },
        series: [
            {
                data: statJenisPengaduan.map((item) => item.pengaduan_count),
            },
        ],
    };
    const optionPerMonth = {
        chart: {
            type: "column",
        },
        title: {
            text: "Statisitik Pengaduan Jumlah Pengaduan Berdasarkan Tahun Terbaru",
        },
        subtitle: {
            text: "Statistik jumlah pengaduan berdasarkan jenis",
        },
        xAxis: {
            categories: [
                "Januari",
                "Februari",
                "Maret",
                "April",
                "Mei",
                "Juni",
                "Juli",
                "Agustus",
                "September",
                "Oktober",
                "November",
                "Desember",
            ],
        },
        yAxis: {
            min: 0,
            title: {
                text: "Jumlah Pengaduan",
                align: "high",
            },
            labels: {
                overflow: "justify",
            },
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true,
                },
            },
        },
        series: series,
    };

    return (
        <div className="">
            <div className="w-full tracking-tighter">
                {auth.user.role !== "pelanggan" && (
                    <div className="my-3 text-white grid grid-cols-2 md:grid-cols-4 transition-all duration-300 ease-in-out gap-3">
                        <div className="rounded-md py-1 px-4 bg-teal-500 flex justify-between items-center">
                            <div className="text-3xl md:text-3xl lg:text-5xl transition-all duration-300">
                                <Report color="inherit" fontSize="inherit" />
                            </div>
                            <div className="text-right">
                                <p className="font-extrabold text-xl md:text-3xl lg:text-5xl transition-all duration-300">
                                    {jenisPengaduan}
                                </p>
                                <p className="text-xs md:text-base lg:text-lg">
                                    Jumlah Jenis Pengaduan
                                </p>
                            </div>
                        </div>
                        <div className="rounded-md py-1 px-4 bg-teal-500 flex justify-between items-center">
                            <div className="text-3xl md:text-3xl lg:text-5xl transition-all duration-300">
                                <LocationCity
                                    color="inherit"
                                    fontSize="inherit"
                                />
                            </div>
                            <div className="text-right">
                                <p className="font-extrabold text-xl md:text-3xl lg:text-5xl transition-all duration-300">
                                    {countWilayah}
                                </p>
                                <p className="text-xs md:text-base lg:text-lg">
                                    Jumlah Wilayah Kerja
                                </p>
                            </div>
                        </div>
                        <div className="rounded-md py-1 px-4 bg-teal-500 flex justify-between items-center">
                            <div className="text-3xl md:text-3xl lg:text-5xl transition-all duration-300">
                                <Group color="inherit" fontSize="inherit" />
                            </div>
                            <div className="text-right">
                                <p className="font-extrabold text-xl md:text-3xl lg:text-5xl transition-all duration-300">
                                    {countAdmin}
                                </p>
                                <p className="text-xs md:text-base lg:text-lg">
                                    Jumlah Admin
                                </p>
                            </div>
                        </div>
                        <div className="rounded-md py-1 px-4 bg-teal-500 flex justify-between items-center">
                            <div className="text-3xl md:text-3xl lg:text-5xl transition-all duration-300">
                                <Group color="inherit" fontSize="inherit" />
                            </div>
                            <div className="text-right">
                                <p className="font-extrabold text-xl md:text-3xl lg:text-5xl transition-all duration-300">
                                    {countPelanggan}
                                </p>
                                <p className="text-xs md:text-base lg:text-lg">
                                    Jumlah Pelanggan Terdaftar
                                </p>
                            </div>
                        </div>
                    </div>
                )}
                <div className="my-1 transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-blue-700 bg-blue-500 py-2 rounded-md relative flex justify-between items-center leading-3 tracking-tighter px-4">
                    <div className="text-7xl text-white">
                        <Report color="inherit" fontSize="inherit" />
                    </div>
                    <div className="text-white font-bold text-right">
                        <p className="text-4xl">0</p>
                        <p>Jumlah Total Pengaduan</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                    <div className="transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-orange-700 bg-orange-500 py-2 rounded-md relative flex justify-between items-center leading-3 tracking-tighter px-4">
                        <div className="text-7xl text-white">
                            <Report color="inherit" fontSize="inherit" />
                        </div>
                        <div className="text-white font-bold text-right">
                            <p className="text-4xl">0</p>
                            <p>Jumlah Total Pengaduan</p>
                            <p className="font-light my-1 text-xs">
                                Menunggu Konfirmasi
                            </p>
                        </div>
                    </div>
                    <div className="transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-teal-700 bg-teal-500 py-2 rounded-md relative flex justify-between items-center leading-3 tracking-tighter px-4">
                        <div className="text-7xl text-white">
                            <Report color="inherit" fontSize="inherit" />
                        </div>
                        <div className="text-white font-bold text-right">
                            <p className="text-4xl">0</p>
                            <p>Jumlah Total Pengaduan</p>
                            <p className="font-light my-1 text-xs">
                                Pengaduan Di Proses
                            </p>
                        </div>
                    </div>
                    <div className="transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-green-700 bg-green-500 py-2 rounded-md relative flex justify-between items-center leading-3 tracking-tighter px-4">
                        <div className="text-7xl text-white">
                            <Report color="inherit" fontSize="inherit" />
                        </div>
                        <div className="text-white font-bold text-right">
                            <p className="text-4xl">0</p>
                            <p>Jumlah Total Pengaduan</p>
                            <p className="font-light my-1 text-xs">
                                Pengaduan Selesai
                            </p>
                        </div>
                    </div>
                    <div className="transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-red-700 bg-red-500 py-2 rounded-md relative flex justify-between items-center leading-3 tracking-tighter px-4">
                        <div className="text-7xl text-white">
                            <Report color="inherit" fontSize="inherit" />
                        </div>
                        <div className="text-white font-bold text-right">
                            <p className="text-4xl">0</p>
                            <p>Jumlah Total Pengaduan</p>
                            <p className="font-light my-1 text-xs">
                                Pengaduan Di Batalkan
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-full  gap-3  transition-all duration-300 ease-in-out">
                    <div className="w-full py-2 px-4 bg-white rounded-md shadow-md shadow-gray-500/50">
                        <h3 className="font-bold text-3xl tracking-tighter  text-teal-800">
                            Titik-Titik Lokasi Pengaduan Saat Ini
                        </h3>
                        <Maps
                            zoom={8}
                            position={[setting.lat, setting.long]}
                            style={{ width: "100%", height: "450px" }}
                        >
                            {wilayah.map((item, key) => {
                                const geojson = JSON.parse(item.geojson);
                                const centroid =
                                    turf.centroid(geojson).geometry.coordinates;

                                const textIcon = L.divIcon({
                                    html: `<div style="color: black; font-size: 12px">${item.nama_wilayah}</div>`,
                                    className: "", // Ensure no default styles are applied
                                });

                                return (
                                    <React.Fragment key={key}>
                                        <GeoJSON
                                            style={{ color: item.kode_warna }}
                                            data={geojson}
                                        />
                                        <Marker
                                            position={[
                                                centroid[1],
                                                centroid[0],
                                            ]}
                                            icon={textIcon}
                                        />
                                    </React.Fragment>
                                );
                            })}
                            {pengaduan.map((item, index) => (
                                <Marker position={[item.lat, item.long]}>
                                    <Popup>
                                        <a
                                            target="_blank"
                                            href={
                                                "/storage/" +
                                                item.foto_pengaduan
                                            }
                                        >
                                            <img
                                                src={
                                                    "/storage/" +
                                                    item.foto_pengaduan
                                                }
                                                alt=""
                                            />
                                        </a>
                                        <p className="text-teal-600 font-bold">
                                            {item.jenis.nama}
                                        </p>
                                        <p className="text-teal-600 font-bold">
                                            {item.telph}
                                        </p>
                                        <p>
                                            {moment(item.created_at).fromNow()}
                                        </p>
                                        <Link
                                            href={route(
                                                "pelanggan.show-pengaduan-pelanggan",
                                                {
                                                    kd_pengaduan:
                                                        item.kd_pengaduan,
                                                }
                                            )}
                                            className="text-sm text-teal-600"
                                        >
                                            Lihat Detail Pengaduan
                                        </Link>
                                    </Popup>
                                </Marker>
                            ))}
                        </Maps>
                    </div>
                    {auth.user.role !== "pelanggan" && (
                        <div className="py-3 my-3 px-4 rounded-md bg-white shadow-md shadow-gray-500/50">
                            <h3 className="font-bold text-3xl tracking-tighter  text-teal-800">
                                Informasi Grafik Pengaduan
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <HighchartsReact
                                    highcharts={Highcharts}
                                    options={option}
                                />
                                <HighchartsReact
                                    highcharts={Highcharts}
                                    options={optionPerMonth}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <p></p>
        </div>
    );
}

Index.layout = (page) => <AuthLayout children={page} title={"dashboard"} />;
