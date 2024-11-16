import AuthLayout from "@/Layouts/AuthLayout";
import InputText from "@/Layouts/InputText";
import { router, useForm } from "@inertiajs/react";
import { Add, Delete } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import React from "react";
import DataTable from "react-data-table-component";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import useSweetAlert from "@/Components/SweetAlert";
import Swal from "sweetalert2";
export default function Index({ jenisPengaduan }) {
    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            width: "50px",
        },
        {
            name: "Jenis Pengaduan",
            selector: (row) => row.nama,
        },
        {
            name: "Jumlah Pengaduan Bulan Ini",
            selector: (row) => row.pengaduan_count + " Pengaduan Pelanggan",
        },
        {
            name: "Aksi",
            selector: (row) => (
                <div className="flex gap-2 items-center">
                    <button
                        onClick={() => deletePengaduan(row)}
                        className="bg-red-500 py-1 px-1 rounded-md hover:bg-red-700 transition-all duration-300 ease-in-out text-white leading-3 tracking-tighter"
                    >
                        <Tooltip title="Delete Jenis Pengaduan">
                            <Delete color="inherit" fontSize="inherit" />
                        </Tooltip>
                    </button>
                </div>
            ),
            width: "350px",
        },
    ];
    const showAlert = useSweetAlert();
    const { data, setData, post, reset, errors } = useForm({ nama: "" });
    const deletePengaduan = (row) => {
        showAlert({
            title: "Hapus Jenis Pengaduan?",
            text: "Apakah anda yakin ingin menghapus 1 jenis pengaduan ?",
            confirmText: "Ya, Hapus",
            onConfirm: () => {
                router.delete(
                    route("admin.jenis-pengaduan-delete", { id: row.id }),
                    {
                        onSuccess: () => {
                            Swal.fire({
                                title: "Sukses",
                                text: "Berhasil menghapus 1 jenis pengaduan",
                                icon: "success",
                            });
                            reset();
                            onClose(false);
                            setModel(null);
                        },
                        onError: () => {
                            Swal.fire({
                                title: "Error",
                                text: "Upps... Gagal menghapus jenis pengadauan baru",
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
    const seriesData = jenisPengaduan.map((item, index) => ({
        name: item.nama,
        y: item.pengaduan_count,
        color: Highcharts.getOptions().colors[index], // Menggunakan warna default Highcharts
    }));
    const option = {
        chart: {
            type: "bar",
        },
        title: {
            text: "Grafik Jumlah Pengaduan per Jenis",
        },
        xAxis: {
            categories: jenisPengaduan.map((item) => item.nama),
            title: {
                text: "Jenis Pengaduan",
            },
        },
        yAxis: {
            title: {
                text: "Jumlah Pengaduan",
            },
        },
        series: [
            {
                name: "Jumlah Pengaduan",
                data: seriesData,
            },
        ],
    };
    const submit = () => {
        showAlert({
            title: "Tambah Jenis Pengaduan?",
            text: "Apakah anda yakin ingin menambahkan 1 jenis pengaduan baru?",
            confirmText: "Ya, Tambahkan",
            onConfirm: () => {
                post(route("admin.jenis-pengaduan-create"), {
                    onSuccess: () => {
                        Swal.fire({
                            title: "Sukses",
                            text: "Berhasil menambahkan 1 jenis pengaduan baru",
                            icon: "success",
                        });
                        reset();

                        setModel(null);
                    },
                    onError: () => {
                        Swal.fire({
                            title: "Error",
                            text: "Upps... Gagal menambahkan jenis pengadauan baru, silahkan periksa isian anda kembali",
                            icon: "error",
                        });
                    },
                    preserveScroll: true,
                    preserveState: true,
                });
            },
            onCancel: () => {},
        });
    };
    return (
        <div className="w-full">
            <div className="flex gap-3 items-center w-full">
                <InputText
                    className="w-full block"
                    name={"nama"}
                    title={"Jenis Pengaduan"}
                    onChange={(e) => setData({ ...data, nama: e.target.value })}
                    value={data.nama}
                    errors={errors.nama}
                />
                <button
                    onClick={submit}
                    className="bg-blue-500 py-3 px-3 rounded-md hover:bg-blue-700 transition-all duration-300 ease-in-out text-white leading-3 tracking-tighter"
                >
                    <Add color="inherit" fontSize="inherit" />
                </button>
            </div>
            <div className="flex flex-col gap-3 items-start justify-between">
                <div className="w-full">
                    <DataTable data={jenisPengaduan} columns={columns} />
                </div>
                <div className="w-full">
                    <HighchartsReact highcharts={Highcharts} options={option} />
                </div>
            </div>
        </div>
    );
}

Index.layout = (page) => (
    <AuthLayout children={page} title={"Jenis Pengaduan"} />
);
