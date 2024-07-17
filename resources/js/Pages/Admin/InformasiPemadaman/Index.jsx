import AuthLayout from "@/Layouts/AuthLayout";
import { Link, router } from "@inertiajs/react";
import { Add, Delete, RemoveRedEye } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import React from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";

export default function Index({ informasiPemadaman }) {
    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            width: "60px",
        },
        {
            name: "Judul Informasi",
            selector: (row) => row.judul,
            width: "250px",
        },
        {
            name: "Deskripsi",
            selector: (row) => (
                <p
                    className="line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: row.deskripsi }}
                />
            ),
            width: "350px",
            wrap: true,
        },
        {
            name: "Wilayah",
            selector: (row) => row.wilayah.nama_wilayah,
            width: "150px",
            wrap: true,
        },
        {
            name: "Jam Padam",
            selector: (row) => row.jam_padam,
            width: "150px",
            wrap: true,
        },
        {
            name: "Jam Selesai",
            selector: (row) => row.jam_selesai,
            width: "150px",
            wrap: true,
        },
        {
            name: "Aksi",
            selector: (row) => (
                <div className="flex gap-2 items-center">
                    <Link
                        as="button"
                        // href={route("informasi.show", row.slug)}
                        className="bg-blue-500 py-1 px-1 rounded-md hover:bg-blue-700 transition-all duration-300 ease-in-out text-white leading-3 tracking-tighter"
                    >
                        <Tooltip title="Lihat Informasi Pemadaman">
                            <RemoveRedEye color="inherit" fontSize="inherit" />
                        </Tooltip>
                    </Link>
                    <button
                        onClick={() => deleteInformasi(row)}
                        className="bg-red-500 py-1 px-1 rounded-md hover:bg-red-700 transition-all duration-300 ease-in-out text-white leading-3 tracking-tighter"
                    >
                        <Tooltip title="Delete Informasi Pemadaman">
                            <Delete color="inherit" fontSize="inherit" />
                        </Tooltip>
                    </button>
                </div>
            ),
        },
    ];

    const deleteInformasi = (row) => {
        showAlert({
            title: "Hapus Informasi Pemadaman?",
            text: "Apakah anda yakin ingin menghapus informasi pemadaman?",
            confirmText: "Ya, Hapus",
            onConfirm: () => {
                router.delete(
                    route("admin.informasi-pemadaman-delete", { id: row.id }),
                    {
                        onSuccess: () => {
                            Swal.fire({
                                title: "Sukses",
                                text: "Berhasil menghapus 1 informasi pemadaman",
                                icon: "success",
                            });
                            setModel(null);
                        },
                        onError: () => {
                            Swal.fire({
                                title: "Error",
                                text: "Upps... Gagal menghapus informasi pemadaman",
                                icon: "error",
                            });
                        },
                        preserveScroll: true,
                        preserveState: true,
                    }
                );
            },
            onCancel: () => {},
        });
    };
    return (
        <div>
            <div className="my-3">
                <Link
                    as="button"
                    href={route("admin.informasi-pemadaman-create")}
                    className="bg-blue-500 py-1 px-1 rounded-md hover:bg-blue-700 transition-all duration-300 ease-in-out text-white leading-3 tracking-tighter flex gap-3 items-center"
                >
                    <Add color="inherit" fontSize="inherit" />
                    <p>Tambah Informasi Pemadaman</p>
                </Link>
            </div>
            <DataTable data={informasiPemadaman} columns={columns} />
        </div>
    );
}

Index.layout = (page) => (
    <AuthLayout children={page} title={"Informasi Pemadaman Listrik"} />
);
