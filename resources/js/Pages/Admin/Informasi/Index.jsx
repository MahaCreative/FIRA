import useSweetAlert from "@/Components/SweetAlert";
import AuthLayout from "@/Layouts/AuthLayout";
import { Link, router } from "@inertiajs/react";
import { Add, Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { wrap } from "highcharts";
import React from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";

export default function Index({ informasi }) {
    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            width: "60px",
        },
        {
            name: "Thumbnail",
            selector: (row) => (
                <img
                    src={"/storage/" + row.foto}
                    alt=""
                    className="w-[50px] h-[50px] object-cover"
                />
            ),
            width: "100px",
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
            name: "Jumlah Views",
            selector: (row) => row.views + " Dilihat",
            width: "200px",
        },
        {
            name: "Aksi",
            selector: (row) => (
                <div className="flex gap-2 items-center">
                    <Link
                        as="button"
                        href={route("informasi.show", row.slug)}
                        className="bg-blue-500 py-1 px-1 rounded-md hover:bg-blue-700 transition-all duration-300 ease-in-out text-white leading-3 tracking-tighter"
                    >
                        <Tooltip title="Lihat Informasi">
                            <RemoveRedEye color="inherit" fontSize="inherit" />
                        </Tooltip>
                    </Link>
                    <Link
                        as="button"
                        href={route("informasi.show", row.slug)}
                        className="bg-orange-500 py-1 px-1 rounded-md hover:bg-orange-700 transition-all duration-300 ease-in-out text-white leading-3 tracking-tighter"
                    >
                        <Tooltip title="Edit Informasi">
                            <Edit color="inherit" fontSize="inherit" />
                        </Tooltip>
                    </Link>
                    <button
                        onClick={() => deleteInformasi(row)}
                        className="bg-red-500 py-1 px-1 rounded-md hover:bg-red-700 transition-all duration-300 ease-in-out text-white leading-3 tracking-tighter"
                    >
                        <Tooltip title="Delete Informasi">
                            <Delete color="inherit" fontSize="inherit" />
                        </Tooltip>
                    </button>
                </div>
            ),
        },
    ];
    const showAlert = useSweetAlert();
    const deleteInformasi = (row) => {
        showAlert({
            title: "Hapus informasi?",
            text: "Apakah anda yakin ingin menghapus informasi ini?",
            confirmText: "Ya Hapus",
            onConfirm: () => {
                router.delete(
                    route("admin.delete-informasi", { slug: row.slug }),
                    {
                        onSuccess: () => {
                            Swal.fire({
                                title: "Sukses",
                                text: "Berhasil menghapus data informasi",
                                icon: "success",
                            });
                        },
                    }
                );
            },
        });
    };
    return (
        <div>
            <div className="my-3">
                <Link
                    as="button"
                    href={route("admin.create-informasi")}
                    className="bg-blue-500 py-1 px-1 rounded-md hover:bg-blue-700 transition-all duration-300 ease-in-out text-white leading-3 tracking-tighter flex gap-3 items-center"
                >
                    <Add color="inherit" fontSize="inherit" />
                    <p>Tambah Informasi</p>
                </Link>
            </div>
            <DataTable
                data={informasi}
                columns={columns}
                dense
                highlightOnHover
                pagination
            />
        </div>
    );
}

Index.layout = (page) => <AuthLayout children={page} title={"Informasi"} />;
