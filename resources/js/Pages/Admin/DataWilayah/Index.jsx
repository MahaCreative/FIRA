import Modal from "@/Components/Modal";
import AuthLayout from "@/Layouts/AuthLayout";
import * as turf from "@turf/turf";
import { Add, Close, Delete, RemoveRedEye } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { GeoJSON, Marker, Tooltip as leafletTooltip } from "react-leaflet";
import LihatPetugas from "./LihatPetugas";
import { Tooltip } from "@mui/material";
import { Link, router } from "@inertiajs/react";
import Maps from "@/Components/Maps";
import Swal from "sweetalert2";

export default function Index({ wilayah }) {
    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            width: "50px",
        },
        {
            name: "Nama Wilayah",
            selector: (row) => (
                <div className="flex gap-2 items-center">
                    <p
                        style={{
                            width: 10,
                            height: 10,
                            background: row.kode_warna,
                        }}
                    ></p>
                    <p>{row.nama_wilayah}</p>
                </div>
            ),
            width: "200px",
        },
        {
            name: "Geojson",
            selector: (row) => row.geojson,
            width: "350px",
        },
        {
            name: "Jumlah Teknisi",
            selector: (row) => row.petugas_count + " Teknisi Terdaftar",
            width: "350px",
        },
        {
            name: "Aksi",
            selector: (row) => (
                <div className="flex gap-2 items-center">
                    <button
                        onClick={() => lihatPetugas(row)}
                        className="bg-blue-500 py-1 px-1 rounded-md hover:bg-blue-700 transition-all duration-300 ease-in-out text-white leading-3 tracking-tighter"
                    >
                        <Tooltip title="Lihat Petugas">
                            <RemoveRedEye color="inherit" fontSize="inherit" />
                        </Tooltip>
                    </button>
                    <button
                        onClick={() => deleteWilayah(row)}
                        className="bg-red-500 py-1 px-1 rounded-md hover:bg-red-700 transition-all duration-300 ease-in-out text-white leading-3 tracking-tighter"
                    >
                        <Tooltip title="Delete Wilayah">
                            <Delete color="inherit" fontSize="inherit" />
                        </Tooltip>
                    </button>
                </div>
            ),
            width: "350px",
        },
    ];

    const [modalLihat, setModalLihat] = useState(false);
    const [model, setModel] = useState(null);
    const lihatPetugas = (item) => {
        setModel(item);
        setModalLihat(true);
    };
    const deleteWilayah = (item) => {
        router.delete(
            route("admin.data-wilayah-kerja.delete", {
                id: item.id,
            }),
            {
                onSuccess: () => {
                    Swal.fire({
                        title: "Sukses",
                        text: "Berhasil menghapus data wilayah kerja baru",
                        icon: "success",
                    });
                },
                onError: () => {
                    Swal.fire({
                        title: "Gagal",
                        text: "Upps... gagal menghapus wilayah kerja baru",
                        icon: "error",
                    });
                },
                preserveScroll: true,
            }
        );
    };

    return (
        <div className="py-3 px-2">
            <Modal
                show={modalLihat}
                onClose={() => {
                    setModalLihat(false);
                    setModel(null);
                }}
            >
                <div className="p-3 rounded-md bg-white min-h-[50vh] max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-semibold">Lihat Petugas</h1>
                        <button
                            onClick={() => {
                                setModalLihat(false);
                                setModel(null);
                            }}
                            className="tracking-tighter leading-3 p-2 rounded-md hover:bg-teal-700 hover:text-white transition-all duration-300 ease-in-out text-teal-500"
                        >
                            <Close />
                        </button>
                    </div>
                    <LihatPetugas
                        model={model}
                        onClose={() => {
                            setModalLihat(false), setModel(null);
                        }}
                    />
                </div>
            </Modal>
            <div className="my-3">
                <Link
                    as="button"
                    href={route("admin.data-wilayah-kerja.create")}
                    className="bg-blue-500 py-1 px-1 rounded-md hover:bg-blue-700 transition-all duration-300 ease-in-out text-white leading-3 tracking-tighter flex gap-3 items-center"
                >
                    <Add color="inherit" fontSize="inherit" />
                    <p>Tambah Wilayah</p>
                </Link>
            </div>
            <DataTable data={wilayah} columns={columns} />
            <div className="my-3">
                <Maps
                    position={[-7.7978, 110.37]}
                    zoom={20}
                    style={{
                        height: "350px",
                        width: "100%",
                        margin: "auto",
                        overflow: "hidden", // pastikan overflow tersembunyi
                    }}
                >
                    {wilayah.map((item, key) => {
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
                </Maps>
            </div>
        </div>
    );
}

Index.layout = (page) => <AuthLayout children={page} />;
