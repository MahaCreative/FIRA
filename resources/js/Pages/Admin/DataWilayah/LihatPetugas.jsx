import { router, useForm, usePage } from "@inertiajs/react";
import { Add, Delete } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import ReactSelect from "react-select";
import Swal from "sweetalert2";

export default function LihatPetugas({ model, onClose }) {
    const { petugas } = usePage().props;
    const { data, setData, post, reset, errors } = useForm({
        wilayah_id: "",
        petugas_id: "",
    });
    const columnsPetugas = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            width: "50px",
        },
        {
            name: "Nama",
            selector: (row) => row.firstname,
            width: "200px",
        },
        {
            name: "Aksi",
            selector: (row) => (
                <div className="flex gap-2 items-center">
                    <button
                        onClick={() => removePetugas(row)}
                        className="bg-red-500 py-1 px-1 rounded-md hover:bg-red-700 transition-all duration-300 ease-in-out text-white leading-3 tracking-tighter"
                    >
                        <Tooltip title="Hapus Petugas">
                            <Delete color="inherit" fontSize="inherit" />
                        </Tooltip>
                    </button>
                </div>
            ),
            width: "350px",
        },
    ];
    const tambahPetugas = () => {
        post(route("admin.tambah-petugas"), {
            onSuccess: () => {
                Swal.fire({
                    title: "Sukses",
                    text: "Berhasil menambahkan petugas ke wilayah kerja yang  sedang dipilih",
                    icon: "success",
                });
                onClose();
            },
            onError: () => {
                Swal.fire({
                    title: "Gagal",
                    text: "Upps... gagal menambahkan petugas pada wilayah kerja yang sedang dipilih",
                    icon: "error",
                });
                onClose();
            },
        });
    };
    const removePetugas = (row) => {
        router.delete(
            route("admin.delete-petugas", {
                wilayah_id: model.id,
                petugas_id: row.id,
            }),
            {
                onSuccess: () => {
                    Swal.fire({
                        title: "Sukses",
                        text: "Berhasil menghapus petugas dari wilayah kerja yang  sedang dipilih",
                        icon: "success",
                    });
                    onClose();
                },
                onError: () => {
                    Swal.fire({
                        title: "Gagal",
                        text: "Upps... gagal menambahkan petugas pada wilayah kerja yang sedang dipilih",
                        icon: "error",
                    });
                    onClose();
                },
                preserveScroll: true,
            }
        );
    };
    useEffect(() => {
        setData({ ...data, wilayah_id: model ? model.id : "" });
    }, [model]);

    return (
        <>
            <div className="flex gap-3 items-center">
                <ReactSelect
                    onChange={(e) => setData("petugas_id", e.value)}
                    options={petugas.map((item) => ({
                        label: item.firstname,
                        value: item.id,
                    }))}
                />
                <button
                    onClick={tambahPetugas}
                    className="bg-blue-500 py-1 px-1 rounded-md hover:bg-blue-700 transition-all duration-300 ease-in-out text-white leading-3 tracking-tighter"
                >
                    <Tooltip title="Tambah Petugas">
                        <Add color="inherit" fontSize="inherit" />
                    </Tooltip>
                </button>
            </div>
            <DataTable data={model?.petugas} columns={columnsPetugas} />
        </>
    );
}
