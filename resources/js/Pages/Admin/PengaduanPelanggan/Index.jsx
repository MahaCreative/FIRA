import Maps from "@/Components/Maps";
import AuthLayout from "@/Layouts/AuthLayout";
import { Link, router, usePage } from "@inertiajs/react";
import {
    Close,
    Home,
    Print,
    RemoveRedEye,
    Report,
    Search,
} from "@mui/icons-material";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Marker, Popup, GeoJSON } from "react-leaflet";
import * as turf from "@turf/turf";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import { Tooltip, debounce } from "@mui/material";
import InputText from "@/Layouts/InputText";
import Modal from "@/Components/Modal";
export default function Index({ pengaduan, wilayah }) {
    const { setting } = usePage().props;
    const [showWilayah, setShowWilayah] = useState(false);
    const { auth } = usePage().props;
    const [modalFilter, setModalFilter] = useState(false);
    const [params, setParams] = useState({
        cari_petugas: "",
        cari: "",
        status_pengaduan: "",
        dari_tanggal: "",
        sampai_tanggal: "",
        jenis_pengaduan: "",
        wilayah: "",
    });
    const [filter, setFilter] = useState({
        stat_kd_pengaduan: true,
        stat_judul_pengaduan: true,
        stat_deskripsi_pengaduan: true,
        stat_status_lapangan: true,
        stat_status_pengaduan: true,
        stat_tanggal_proses: true,
        stat_nama_petugas_menangani: true,
        stat_solusi_pengangan: false,
        stat_foto_penganan: false,
        stat_foto_pengaduan: false,
        stat_lat: false,
        stat_long: false,
        stat_telph: false,
        stat_wilayah: false,
    });
    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            width: "50px",
        },
        {
            name: "Kode Pengaduan",
            selector: (row, index) => row.kd_pengaduan,
            width: "130px",
            wrap: true,
            omit: filter.stat_kd_pengaduan ? false : true,
        },
        {
            name: "Judul Laporan",
            selector: (row, index) => row.judul_pengaduan,
            width: "150px",
            wrap: true,
            omit: filter.stat_judul_pengaduan ? false : true,
        },
        {
            name: "Jenis Pengaduan",
            selector: (row, index) => row.jenis.nama,
            width: "150px",
            wrap: true,
            omit: filter.stat_judul_pengaduan ? false : true,
        },
        {
            name: "Nama Pelapor",
            selector: (row, index) =>
                row.pelanggan.firstname + " " + row.pelanggan.lastname,
            width: "130px",
            wrap: true,
        },
        {
            name: "Wilayah",
            selector: (row, index) => row.wilayah,
            width: "130px",
            wrap: true,
            omit: filter.stat_wilayah ? false : true,
        },
        {
            name: "Deskripsi Pengaduan",
            selector: (row, index) => row.deskripsi_pengaduan,
            width: "250px",
            wrap: true,
            omit: filter.stat_deskripsi_pengaduan ? false : true,
        },
        {
            name: "Solusi Penanganan",
            selector: (row, index) => row.solusi_pengangan,
            width: "250px",
            wrap: true,
            omit: filter.stat_solusi_pengangan ? false : true,
        },
        {
            name: "Foto Pengaduan",
            selector: (row, index) => (
                <a href={"/storage/" + row.foto_pengaduan} target="_blank">
                    <img
                        src={"/storage/" + row.foto_pengaduan}
                        alt=""
                        className="w-[100px] h-[50px] object-cover"
                    />
                </a>
            ),
            width: "150px",
            wrap: true,
            omit: filter.stat_foto_pengaduan ? false : true,
        },
        {
            name: "Foto Penanganan",
            selector: (row, index) => (
                <a href={"/storage/" + row.foto_penganan} target="_blank">
                    <img
                        src={"/storage/" + row.foto_penganan}
                        alt=""
                        className="w-[100px] h-[50px] object-cover"
                    />
                </a>
            ),
            width: "150px",
            wrap: true,
            omit: filter.stat_foto_penganan ? false : true,
        },

        {
            name: "Status Pengaduan",
            selector: (row, index) => (
                <p
                    className={`${
                        row.status_pengaduan == "menunggu konfirmasi"
                            ? "bg-orange-500"
                            : row.status_pengaduan == "selesai"
                            ? "bg-green-500"
                            : row.status_pengaduan == "di proses"
                            ? "bg-blue-500"
                            : "bg-red-500"
                    } text-white p-1`}
                >
                    {row.status_pengaduan}
                </p>
            ),
            width: "170px",
            wrap: true,
            omit: filter.stat_status_pengaduan ? false : true,
        },
        {
            name: "Status Lapangan",
            selector: (row, index) => (
                <p
                    className={`${
                        row.status_lapangan == "menunggu pengecekan"
                            ? "bg-orange-500"
                            : row.status_lapangan == "sesuai fakta"
                            ? "bg-green-500"
                            : "bg-red-500"
                    } text-white p-1`}
                >
                    {row.status_lapangan}
                </p>
            ),
            width: "180px",
            wrap: true,
            omit: filter.stat_status_lapangan ? false : true,
        },
        {
            name: "Petugas Menangani",
            selector: (row, index) => (
                <p>
                    {row.nama_petugas_menangani
                        ? row.nama_petugas_menangani
                        : "Belum Ditangani"}
                </p>
            ),
            width: "150px",
            wrap: true,
            omit: filter.stat_nama_petugas_menangani ? false : true,
        },
        {
            name: "Tanggal Pengaduan",
            selector: (row, index) =>
                moment(row.created_at).format("DD-MM-YYYY"),
            width: "140px",
            wrap: true,
        },
        {
            name: "Tanggal Proses",
            selector: (row, index) =>
                moment(row.tanggal_proses).format("DD-MM-YYYY"),
            width: "140px",
            wrap: true,
            omit: filter.stat_tanggal_proses ? false : true,
        },
        {
            name: "Aksi",
            selector: (row) => (
                <div className="flex gap-2 items-center">
                    <Link
                        as="button"
                        href={route("pelanggan.show-pengaduan-pelanggan", {
                            kd_pengaduan: row.kd_pengaduan,
                        })}
                        className="bg-blue-500 py-1 px-1 rounded-md hover:bg-blue-700 transition-all duration-300 ease-in-out text-white leading-3 tracking-tighter"
                    >
                        <Tooltip title="Show Pengaduan">
                            <RemoveRedEye color="inherit" fontSize="inherit" />
                        </Tooltip>
                    </Link>
                </div>
            ),
        },
    ];

    const createCustomIcon = (status) => {
        let color;
        switch (status) {
            case "menunggu konfirmasi":
                color = "bg-orange-500"; // Ganti dengan warna yang diinginkan
                break;
            // Tambahkan kondisi lain jika diperlukan
            case "di proses":
                color = "bg-blue-500"; // Ganti dengan warna yang diinginkan
                break;
            // Tambahkan kondisi lain jika diperlukan
            case "di batalkan":
                color = "bg-red-500"; // Ganti dengan warna yang diinginkan
                break;
            case "selesai":
                color = "bg-green-500"; // Ganti dengan warna yang diinginkan
                break;
            default:
                color = "blue"; // Warna default
        }

        return new L.DivIcon({
            html: `<div>
             ${ReactDOMServer.renderToString(
                 <div
                     className={`${color} backdrop-blur-sm rounded-full h-[30px] w-[30px] text-white text-xl flex justify-center items-center tracking-tighter leading-3`}
                     style={{ fontSize: "24px" }}
                 >
                     <Home color="inherit" fontSize="inherit" />
                 </div>
             )}
           </div>`,
            className: "custom-icon",
            iconSize: [32, 32],
        });
    };
    const reload = useCallback(
        debounce((query) => {
            router.get(
                route("admin.pengaduan-pelanggan"),
                query,
                { preserveScroll: true, preserveState: true },
                300
            );
        }),
        []
    );
    useEffect(() => reload(params), [params]);
    return (
        <div>
            <Modal show={modalFilter} onClose={() => setModalFilter(false)}>
                <div className="p-3 rounded-md bg-white max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-semibold">Filter Data</h1>
                        <button
                            onClick={() => setModalFilter(false)}
                            className="tracking-tighter leading-3 p-2 rounded-md hover:bg-teal-700 hover:text-white transition-all duration-300 ease-in-out text-teal-500"
                        >
                            <Close />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                        {auth.user.role == "admin" && (
                            <>
                                <InputText
                                    name="cari"
                                    title={"Cari"}
                                    value={params.cari}
                                    onChange={(e) =>
                                        setParams({
                                            ...params,
                                            cari: e.target.value,
                                        })
                                    }
                                />
                                <InputText
                                    name="cari_petugas"
                                    title={"Cari Petugas"}
                                    value={params.cari_petugas}
                                    onChange={(e) =>
                                        setParams({
                                            ...params,
                                            cari_petugas: e.target.value,
                                        })
                                    }
                                />
                                <InputText
                                    name="wilayah"
                                    title={"Cari wilayah"}
                                    value={params.wilayah}
                                    onChange={(e) =>
                                        setParams({
                                            ...params,
                                            wilayah: e.target.value,
                                        })
                                    }
                                />
                            </>
                        )}

                        {auth.user.role == "petugas lapangan" && (
                            <InputText
                                name="cari"
                                title={"Cari"}
                                value={params.cari}
                                onChange={(e) =>
                                    setParams({
                                        ...params,
                                        cari: e.target.value,
                                    })
                                }
                            />
                        )}
                        <InputText
                            className="w-full"
                            type="date"
                            name="dari_tanggal"
                            title={"Pengaduan Dari Tanggal"}
                            value={params.dari_tanggal}
                            onChange={(e) =>
                                setParams({
                                    ...params,
                                    dari_tanggal: e.target.value,
                                })
                            }
                        />
                        <InputText
                            type="date"
                            className="w-full"
                            name="sampai_tanggal"
                            title={"Pengadaun Sampai Tanggal"}
                            value={params.sampai_tanggal}
                            onChange={(e) =>
                                setParams({
                                    ...params,
                                    sampai_tanggal: e.target.value,
                                })
                            }
                        />
                        <InputText
                            className="w-full"
                            name="jenis_pengaduan"
                            title={"Jenis Pengaduan"}
                            value={params.jenis_pengaduan}
                            onChange={(e) =>
                                setParams({
                                    ...params,
                                    jenis_pengaduan: e.target.value,
                                })
                            }
                        />
                    </div>
                    <p className="bg-gray-300 py-2 px-3 rounded-md  text-xs my-2">
                        Checklist dibawah akan mengatur tampilan data yang akan
                        tampil di tabel, jika tidak terceklist maka data tidak
                        akan tampil di tabel
                    </p>
                    <div className="my-3 flex flex-wrap gap-3 items-center">
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                name="stat_kd_pengaduan"
                                checked={filter.stat_kd_pengaduan}
                                onChange={(e) =>
                                    setFilter({
                                        ...filter,
                                        [e.target.name]: e.target.checked,
                                    })
                                }
                            />
                            <label htmlFor="stat_kd_pengaduan">
                                Show Kode Pengaduan
                            </label>
                        </div>
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                name="stat_judul_pengaduan"
                                checked={filter.stat_judul_pengaduan}
                                onChange={(e) =>
                                    setFilter({
                                        ...filter,
                                        [e.target.name]: e.target.checked,
                                    })
                                }
                            />
                            <label htmlFor="stat_kd_pengaduan">
                                Show Judul Pengaduan
                            </label>
                        </div>
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                name="stat_deskripsi_pengaduan"
                                checked={filter.stat_deskripsi_pengaduan}
                                onChange={(e) =>
                                    setFilter({
                                        ...filter,
                                        [e.target.name]: e.target.checked,
                                    })
                                }
                            />
                            <label htmlFor="stat_deskripsi_pengaduan">
                                Show Deksripsi Pengaduan
                            </label>
                        </div>
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                name="stat_wilayah"
                                checked={filter.stat_wilayah}
                                onChange={(e) =>
                                    setFilter({
                                        ...filter,
                                        [e.target.name]: e.target.checked,
                                    })
                                }
                            />
                            <label htmlFor="stat_wilayah">Show wilayah</label>
                        </div>
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                name="stat_status_lapangan"
                                checked={filter.stat_status_lapangan}
                                onChange={(e) =>
                                    setFilter({
                                        ...filter,
                                        [e.target.name]: e.target.checked,
                                    })
                                }
                            />
                            <label htmlFor="stat_status_lapangan">
                                Show Status Lapangan
                            </label>
                        </div>
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                name="stat_status_pengaduan"
                                checked={filter.stat_status_pengaduan}
                                onChange={(e) =>
                                    setFilter({
                                        ...filter,
                                        [e.target.name]: e.target.checked,
                                    })
                                }
                            />
                            <label htmlFor="stat_status_pengaduan">
                                Show Status Pengaduan
                            </label>
                        </div>
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                name="stat_tanggal_proses"
                                checked={filter.stat_tanggal_proses}
                                onChange={(e) =>
                                    setFilter({
                                        ...filter,
                                        [e.target.name]: e.target.checked,
                                    })
                                }
                            />
                            <label htmlFor="stat_tanggal_proses">
                                Show Tanggal Proses
                            </label>
                        </div>
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                name="stat_nama_petugas_menangani"
                                checked={filter.stat_nama_petugas_menangani}
                                onChange={(e) =>
                                    setFilter({
                                        ...filter,
                                        [e.target.name]: e.target.checked,
                                    })
                                }
                            />
                            <label htmlFor="stat_nama_petugas_menangani">
                                Show Nama Petugas
                            </label>
                        </div>
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                name="stat_foto_penganan"
                                checked={filter.stat_foto_penganan}
                                onChange={(e) =>
                                    setFilter({
                                        ...filter,
                                        [e.target.name]: e.target.checked,
                                    })
                                }
                            />
                            <label htmlFor="stat_foto_penganan">
                                Show Foto Penanganan
                            </label>
                        </div>
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                name="stat_foto_pengaduan"
                                checked={filter.stat_foto_pengaduan}
                                onChange={(e) =>
                                    setFilter({
                                        ...filter,
                                        [e.target.name]: e.target.checked,
                                    })
                                }
                            />
                            <label htmlFor="stat_foto_pengaduan">
                                Show Foto Pengaduan
                            </label>
                        </div>
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                name="telph"
                                checked={filter.telph}
                                onChange={(e) =>
                                    setFilter({
                                        ...filter,
                                        [e.target.name]: e.target.checked,
                                    })
                                }
                            />
                            <label htmlFor="telph">Show telph</label>
                        </div>
                    </div>
                    <Link
                        href={route("admin.cetak-pengaduan-pelanggan", filter)}
                        className="bg-green-500 flex items-center gap-3 p-2 rounded-md text-white hover:bg-green-800 transition-all duration-300 ease-in-out"
                    >
                        <Print color="inherit" fontSize="inherit" />
                        <p>Cetak Laporan</p>
                    </Link>
                </div>
            </Modal>
            <div className="my-3">
                <div
                    onClick={() =>
                        setParams({
                            ...params,
                            status_pengaduan: "",
                        })
                    }
                    className="my-1 transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-blue-700 bg-blue-500 py-2 rounded-md relative flex justify-between items-center leading-3 tracking-tighter px-4"
                >
                    <div className="text-7xl text-white">
                        <Report color="inherit" fontSize="inherit" />
                    </div>
                    <div className="text-white font-bold text-right">
                        <p className="text-4xl">{pengaduan.length}</p>
                        <p>Jumlah Total Pengaduan</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                    <div
                        onClick={() =>
                            setParams({
                                ...params,
                                status_pengaduan: "menunggu konfirmasi",
                            })
                        }
                        className="transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-orange-700 bg-orange-500 py-2 rounded-md relative flex justify-between items-center leading-3 tracking-tighter px-4"
                    >
                        <div className="text-7xl text-white">
                            <Report color="inherit" fontSize="inherit" />
                        </div>
                        <div className="text-white font-bold text-right">
                            <p className="text-4xl">
                                {
                                    pengaduan.filter(
                                        (item) =>
                                            item.status_pengaduan ===
                                            "menunggu konfirmasi"
                                    ).length
                                }
                            </p>
                            <p>Jumlah Total Pengaduan</p>
                            <p className="font-light my-1 text-xs">
                                Menunggu Konfirmasi
                            </p>
                        </div>
                    </div>
                    <div
                        onClick={() =>
                            setParams({
                                ...params,
                                status_pengaduan: "di proses",
                            })
                        }
                        className="transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-teal-700 bg-teal-500 py-2 rounded-md relative flex justify-between items-center leading-3 tracking-tighter px-4"
                    >
                        <div className="text-7xl text-white">
                            <Report color="inherit" fontSize="inherit" />
                        </div>
                        <div className="text-white font-bold text-right">
                            <p className="text-4xl">
                                {
                                    pengaduan.filter(
                                        (item) =>
                                            item.status_pengaduan ===
                                            "di proses"
                                    ).length
                                }
                            </p>
                            <p>Jumlah Total Pengaduan</p>
                            <p className="font-light my-1 text-xs">
                                Pengaduan Di Proses
                            </p>
                        </div>
                    </div>
                    <div
                        onClick={() =>
                            setParams({
                                ...params,
                                status_pengaduan: "selesai",
                            })
                        }
                        className="transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-green-700 bg-green-500 py-2 rounded-md relative flex justify-between items-center leading-3 tracking-tighter px-4"
                    >
                        <div className="text-7xl text-white">
                            <Report color="inherit" fontSize="inherit" />
                        </div>
                        <div className="text-white font-bold text-right">
                            <p className="text-4xl">
                                {
                                    pengaduan.filter(
                                        (item) =>
                                            item.status_pengaduan === "selesai"
                                    ).length
                                }
                            </p>
                            <p>Jumlah Total Pengaduan</p>
                            <p className="font-light my-1 text-xs">
                                Pengaduan Selesai
                            </p>
                        </div>
                    </div>
                    <div
                        onClick={() =>
                            setParams({
                                ...params,
                                status_pengaduan: "di batalkan",
                            })
                        }
                        className="transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-red-700 bg-red-500 py-2 rounded-md relative flex justify-between items-center leading-3 tracking-tighter px-4"
                    >
                        <div className="text-7xl text-white">
                            <Report color="inherit" fontSize="inherit" />
                        </div>
                        <div className="text-white font-bold text-right">
                            <p className="text-4xl">
                                {
                                    pengaduan.filter(
                                        (item) =>
                                            item.status_pengaduan ===
                                            "di batalkan"
                                    ).length
                                }
                            </p>
                            <p>Jumlah Total Pengaduan</p>
                            <p className="font-light my-1 text-xs">
                                Pengaduan Di Batalkan
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center gap-3">
                <div className="flex gap-2">
                    <button
                        onClick={() => setModalFilter(true)}
                        className="bg-green-500 flex items-center gap-3 p-2 rounded-md text-white hover:bg-green-800 transition-all duration-300 ease-in-out"
                    >
                        <Print color="inherit" fontSize="inherit" />
                        <p>Filter / Cetak Laporan</p>
                    </button>
                </div>
                <InputText
                    value={params.cari}
                    title={"Cari"}
                    onChange={(e) =>
                        setParams({ ...params, cari: e.target.value })
                    }
                    type="text"
                />
            </div>
            <DataTable data={pengaduan} columns={columns} dense pagination />

            <div className="my-3">
                <button
                    onClick={() => setShowWilayah(!showWilayah)}
                    className={`${
                        showWilayah ? "bg-red-500" : "bg-blue-500"
                    }  text-white px-4 py-2 rounded-md mb-3`}
                >
                    {showWilayah ? "Sembunyikan Wilayah" : "Tampilkan Wilayah"}
                </button>
                <Maps
                    position={[setting.lat, setting.long]}
                    style={{
                        height: "250px",
                        width: "100%",
                        margin: "auto",
                        overflow: "hidden", // pastikan overflow tersembunyi
                    }}
                >
                    {showWilayah &&
                        wilayah.map((item, key) => {
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
                                        position={[centroid[1], centroid[0]]}
                                        icon={textIcon}
                                    />
                                </React.Fragment>
                            );
                        })}

                    {pengaduan.map((item, index) => (
                        <Marker
                            icon={createCustomIcon(item.status_pengaduan)}
                            key={index}
                            position={[item.lat, item.long]}
                        >
                            <Popup>
                                <a
                                    target="_blank"
                                    href={"/storage/" + item.foto_pengaduan}
                                >
                                    <img
                                        src={"/storage/" + item.foto_pengaduan}
                                        alt=""
                                    />
                                </a>
                                <p className="text-teal-600 font-bold">
                                    {item.jenis.nama}
                                </p>
                                <p className="text-teal-600 font-bold">
                                    {item.telph}
                                </p>
                                <p>{moment(item.created_at).fromNow()}</p>
                                <Link className="text-sm text-teal-600">
                                    Lihat Detail Pengaduan
                                </Link>
                            </Popup>
                        </Marker>
                    ))}
                </Maps>
            </div>
        </div>
    );
}

Index.layout = (page) => (
    <AuthLayout children={page} title={"Pengaduan Pelanggan"} />
);
