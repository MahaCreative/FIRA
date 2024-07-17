import CetakLayouts from "@/Layouts/CetakLayouts";
import React from "react";
import DataTable from "react-data-table-component";

export default function Cetak({ pelanggan }) {
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
    ];
    return (
        <div>
            <DataTable columns={columns} data={pelanggan} />
        </div>
    );
}

Cetak.layout = (page) => (
    <CetakLayouts children={page} title={"Laporan Data Pelanggan Terdaftar"} />
);
