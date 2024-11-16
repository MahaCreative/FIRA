import CetakLayouts from "@/Layouts/CetakLayouts";
import moment from "moment";
import React from "react";
import DataTable from "react-data-table-component";

export default function Cetak({ pengaduan, filter }) {
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
    ];
    return (
        <div>
            <DataTable data={pengaduan} columns={columns} />
        </div>
    );
}

Cetak.layout = (page) => (
    <CetakLayouts children={page} title={"Laporan Pengaduan Pelanggan"} />
);
