import Modal from "@/Components/Modal";
import AuthLayout from "@/Layouts/AuthLayout";
import { Close, Delete, Edit } from "@mui/icons-material";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import Form from "./Form";
import { Tooltip } from "@mui/material";
import { Link, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import useSweetAlert from "@/Components/SweetAlert";

export default function Index({ petugas }) {
    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            width: "50px",
        },
        {
            name: "Foto",
            selector: (row, index) => (
                <img
                    src={"/storage/" + row.image}
                    alt=""
                    className="w-[50px] rounded-full "
                />
            ),
            width: "70px",
        },
        {
            name: "Nama Petugas",
            selector: (row) => row.firstname + " " + row.lastname,
        },
        {
            name: "Telephone",
            selector: (row) => row.phone,
        },
        {
            name: "address",
            selector: (row) => row.address,
        },
        {
            name: "Tempat Tanggal Lahir",
            selector: (row) => row.tempat_lahir + ", " + row.tanggal_lahir,
        },
        {
            name: "Email",
            selector: (row) => row.email,
        },
        {
            name: "Wilayah Kerja",
            selector: (row) =>
                row.wilayah.length > 0
                    ? row.wilayah.map((item) => item.nama_wilayah + ", ")
                    : "Wilayah kerja belum ditentukan",
        },
        {
            name: "Aksi",
            selector: (row) => (
                <div className="flex gap-2 items-center">
                    <button
                        onClick={() => editHandler(row)}
                        className="bg-orange-500 py-1 px-1 rounded-md hover:bg-orange-700 transition-all duration-300 ease-in-out text-white leading-3 tracking-tighter"
                    >
                        <Tooltip title="Edit Petugas">
                            <Edit color="inherit" fontSize="inherit" />
                        </Tooltip>
                    </button>
                    <button
                        onClick={() => deleteHandler(row)}
                        className="bg-red-500 py-1 px-1 rounded-md hover:bg-red-700 transition-all duration-300 ease-in-out text-white leading-3 tracking-tighter"
                    >
                        <Tooltip title="Delete Petugas">
                            <Delete color="inherit" fontSize="inherit" />
                        </Tooltip>
                    </button>
                </div>
            ),
            width: "350px",
        },
    ];
    const showAlert = useSweetAlert();
    const [modal, setModal] = useState(false);
    const [model, setModel] = useState();
    const editHandler = (item) => {
        setModal(true);
        setModel(item);
    };
    const deleteHandler = (item) => {
        showAlert({
            title: "Hapus Petugas",
            text: "Apakah anda yakin ingin menghapus Petugas ini?",
            confirmText: "Update Petugas",
            onConfirm: () => {
                router.delete(
                    route("admin.petugas-lapangan-delete", { id: item.id }),
                    {
                        onSuccess: () => {
                            Swal.fire({
                                title: "Sukses",
                                text: "Berhasil menghapus data petugas",
                                icon: "success",
                            });
                        },
                    }
                );
            },
        });
    };
    return (
        <>
            <Modal onClose={() => setModal(false)} show={modal}>
                <div className="p-3 rounded-md bg-white max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-semibold">
                            {model ? "Edit Petugas" : "Tambah Petugas"}
                        </h1>
                        <button
                            onClick={() => setModal(false)}
                            className="tracking-tighter leading-3 p-2 rounded-md hover:bg-teal-700 hover:text-white transition-all duration-300 ease-in-out text-teal-500"
                        >
                            <Close />
                        </button>
                    </div>
                    <Form
                        model={model}
                        setModel={setModel}
                        onClose={setModal}
                    />
                </div>
            </Modal>
            <div className="flex gap-3 items-center my-3">
                <button
                    onClick={() => setModal(true)}
                    className="bg-blue-500 p-2 rounded-md hover:bg-blue-700 transition-all duration-300 ease-in-out text-white leading-3 tracking-tighter"
                >
                    Tambah Petugas
                </button>
                <Link
                    href={route("admin.cetak-petugas-lapangan")}
                    className="bg-green-500 p-2 rounded-md hover:bg-green-700 transition-all duration-300 ease-in-out text-white leading-3 tracking-tighter"
                >
                    Cetak Petugas
                </Link>
            </div>
            <DataTable data={petugas} columns={columns} dense pagination />
        </>
    );
}

Index.layout = (page) => <AuthLayout children={page} />;
