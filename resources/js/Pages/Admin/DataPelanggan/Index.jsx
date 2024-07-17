import AuthLayout from "@/Layouts/AuthLayout";
import InputText from "@/Layouts/InputText";
import { Link } from "@inertiajs/react";
import { Print } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import React from "react";
import DataTable from "react-data-table-component";

export default function Index({ pelanggan }) {
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
            <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                    <Link
                        href={route("admin.cetak-data-pelanggan")}
                        className="bg-blue-500 gap-2 items-center py-2 px-3 rounded-md hover:bg-blue-700 transition-all duration-300 ease-in-out text-white leading-3 tracking-tighter"
                    >
                        <Tooltip title="Cetak Laporan Pelanggan">
                            <div className="flex items-center gap-2">
                                <Print color="inherit" fontSize="inherit" />
                                <p>Cetak Pelanggan</p>
                            </div>
                        </Tooltip>
                    </Link>
                </div>
                <InputText name={"cari"} title={"Cari Pelanggan"} />
            </div>
            <DataTable columns={columns} data={pelanggan} dense pagination />
        </div>
    );
}

Index.layout = (page) => (
    <AuthLayout children={page} title={"Data Pelanggan"} />
);
