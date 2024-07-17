import ResponseAlert from "@/Components/ResponseAlert";
import useSweetAlert from "@/Components/SweetAlert";
import AuthLayout from "@/Layouts/AuthLayout";
import { Link, router } from "@inertiajs/react";
import { Add, Delete, RemoveRedEye, Report } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import moment from "moment";
import React, { useState } from "react";
import DataTable from "react-data-table-component";

export default function Index({ pengaduan }) {
    const [params, setParams] = useState({ cari: "", status_pengaduan: "" });
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
        },
        {
            name: "Judul Laporan",
            selector: (row, index) => row.judul_pengaduan,
            width: "150px",
            wrap: true,
        },
        {
            name: "Jenis Pengaduan",
            selector: (row, index) => row.jenis.nama,
            width: "150px",
            wrap: true,
        },
        {
            name: "Nama Pelapor",
            selector: (row, index) =>
                row.pelanggan.firstname + " " + row.pelanggan.lastname,
            width: "130px",
            wrap: true,
        },
        {
            name: "Deskripsi Pengaduan",
            selector: (row, index) => row.deskripsi_pengaduan,
            width: "250px",
            wrap: true,
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
        },
        {
            name: "Nama Petugas Menangani",
            selector: (row, index) => (
                <p>
                    {row.nama_petugas_menangani
                        ? row.nama_petugas_menangani
                        : "Belum Ditangani"}
                </p>
            ),
            width: "200px",
            wrap: true,
        },
        {
            name: "Tanggal Pengaduan",
            selector: (row, index) => moment(row.created_at).format("LL"),
            width: "200px",
            wrap: true,
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
                    {row.status_pengaduan === "menunggu konfirmasi" && (
                        <button
                            onClick={() => deletePengaduan(row)}
                            className="bg-red-500 py-1 px-1 rounded-md hover:bg-red-700 transition-all duration-300 ease-in-out text-white leading-3 tracking-tighter"
                        >
                            <Tooltip title="Delete Pengaduan">
                                <Delete color="inherit" fontSize="inherit" />
                            </Tooltip>
                        </button>
                    )}
                </div>
            ),
        },
    ];
    const responseAlert = ResponseAlert();
    const showAlert = useSweetAlert();
    const deletePengaduan = (row) => {
        showAlert({
            title: "Apakah anda yakin?",
            text: "Anda tidak akan dapat mengembalikan ini!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            onConfirm: () => {
                router.delete(
                    route("pelanggan.pengaduan-pelanggan.delete", {
                        id: row.id,
                    }),

                    {
                        onError: () => {
                            responseAlert({
                                title: "Gagal",
                                text: "Gagal menghapus pengaduan",
                                icon: "error",
                            });
                        },
                        onSuccess: () => {
                            responseAlert({
                                title: "Sucess",
                                text: "Penghapusan pengaduan berhasil",
                                icon: "success",
                            });
                        },
                    }
                );
            },
            onCancel: () => {
                responseAlert({
                    title: "Sucess",
                    text: "Penghapusan aduan berhasil dibatalkan",
                    icon: "success",
                });
            },
        });
    };
    return (
        <div>
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
            <div className="flex gap-3 items-center">
                <Link
                    as="button"
                    href={route("pelanggan.create-pengaduan-pelanggan")}
                    className="bg-blue-500 flex gap-3 items-center py-1 px-1 rounded-md hover:bg-blue-700 transition-all duration-300 ease-in-out text-white leading-3 tracking-tighter"
                >
                    <Add color="inherit" fontSize="inherit" />
                    <p>Ajukan Pengaduan Baru</p>
                </Link>
            </div>
            <DataTable data={pengaduan} columns={columns} dense pagination />
        </div>
    );
}

Index.layout = (page) => (
    <AuthLayout children={page} title={"Pengaduan Saya"} />
);
