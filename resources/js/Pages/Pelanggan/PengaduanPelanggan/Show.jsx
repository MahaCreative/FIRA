import Maps from "@/Components/Maps";
import AuthLayout from "@/Layouts/AuthLayout";
import InputText from "@/Layouts/InputText";
import { useForm, usePage } from "@inertiajs/react";
import { List } from "@mui/icons-material";
import React, { useState } from "react";
import { GeoJSON, Marker } from "react-leaflet";
import * as turf from "@turf/turf";
import L from "leaflet";
import useSweetAlert from "@/Components/SweetAlert";
import ResponseAlert from "@/Components/ResponseAlert";
import moment from "moment";
import { MenuItem, Select } from "@mui/material";
export default function Show({ pengaduan, wilayah }) {
    const responseAlert = ResponseAlert();
    const showAlert = useSweetAlert();
    const [location, setLocation] = useState();
    const { setting } = usePage().props;
    const { auth } = usePage().props;
    const { data, setData, post, reset, errors } = useForm({
        id: pengaduan.id,
        kd_pengaduan: pengaduan.kd_pengaduan,
        judul_pengaduan: pengaduan.judul_pengaduan,
        deskripsi_pengaduan: pengaduan.deskripsi_pengaduan,
        foto_pengaduan: pengaduan.foto_pengaduan,
        telph: pengaduan.telph,
        jenis_pengaduan_id: pengaduan.jenis_pengaduan_id,
        jenis_pengaduan: pengaduan.jenis.nama,
        wilayah: pengaduan.wilayah,
        lat: pengaduan.lat,
        long: pengaduan.long,
        tanggal_proses: pengaduan.tanggal_proses,
        status_lapangan: "",
        status_pengaduan: "",
        nama_petugas_menangani: auth.user.firstname,
        solusi_pengangan: "",
        foto_penganan: "",
    });
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("petugas.proses-pengaduan-pelanggan"));
    };
    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-start gap-3">
                <div className="w-full md:w-1/3 py-2 px-3 rounded-md shadow-md shadow-gray-500/50 min-h-[260px]  overflow-y-auto">
                    <a href={"/storage/" + data.foto_pengaduan} target="_blank">
                        <img
                            src={"/storage/" + data.foto_pengaduan}
                            alt=""
                            className="w-full h-full object-cover"
                        />
                    </a>
                </div>
                <div className="w-full py-2 px-3 rounded-md shadow-md shadow-gray-500/50 min-h-[260px] overflow-y-auto">
                    <h3 className="text-teal-700 capitalize font-bold text-xl">
                        Informasi Pengaduan
                    </h3>
                    <div action="" className="w-full">
                        <InputText
                            disabled
                            className="w-full"
                            title={"Tanggal Pengaduan"}
                            name="kd_pengaduan"
                            value={moment(pengaduan.created_at).format(
                                "DD-MM-YYYY"
                            )}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-3">
                            <InputText
                                disabled
                                className="w-full"
                                title={"Jenis Pengaduan"}
                                name="kd_pengaduan"
                                value={data.kd_pengaduan}
                                errors={errors.kd_pengaduan}
                            />
                            <InputText
                                disabled
                                className="w-full"
                                title={"Jenis Pengaduan"}
                                name="jenis_pengaduan"
                                value={data.jenis_pengaduan}
                                errors={errors.jenis_pengaduan}
                            />
                            <InputText
                                disabled
                                className="w-full"
                                title={"Judul Pengaduan"}
                                name="judul_pengaduan"
                                value={data.judul_pengaduan}
                                errors={errors.judul_pengaduan}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                            <InputText
                                disabled
                                className="w-full"
                                title={"Nomor Whatsaap Pelapor"}
                                name="telph"
                                value={data.telph}
                                errors={errors.telph}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="my-2">
                            <InputText
                                disabled
                                className="w-full"
                                title={"Deskripsi Pengaduan"}
                                name="deskripsi_pengaduan"
                                errors={errors.deskripsi_pengaduan}
                                value={data.deskripsi_pengaduan}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <h3 className="text-teal-700 capitalize font-bold text-xl">
                            Penanganan Pengaduan
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-3">
                            <InputText
                                disabled
                                className="w-full"
                                title={"Tanggal Pengaduan"}
                                name="kd_pengaduan"
                                value={
                                    data.tanggal_proses
                                        ? moment(
                                              pengaduan.tanggal_proses
                                          ).format("DD-MM-YYYY")
                                        : "Belum di tangani"
                                }
                            />
                            <InputText
                                disabled
                                className="w-full"
                                title={"Tanggal Pengaduan"}
                                name="kd_pengaduan"
                                value={
                                    pengaduan.nama_petugas_menangani
                                        ? pengaduan.nama_petugas_menangani
                                        : "Belum di tangani"
                                }
                            />
                            <InputText
                                disabled
                                className="w-full"
                                title={"Solusi Penanganan"}
                                name="kd_pengaduan"
                                value={
                                    pengaduan.solusi_pengangan
                                        ? pengaduan.solusi_pengangan
                                        : "Belum di tangani"
                                }
                            />
                            <InputText
                                disabled
                                className="w-full"
                                title={"Solusi Penanganan"}
                                name="kd_pengaduan"
                                value={
                                    pengaduan.status_pengaduan
                                        ? pengaduan.status_pengaduan
                                        : "Belum di tangani"
                                }
                            />
                        </div>

                        <InputText
                            disabled
                            className="w-full"
                            title={"Fakta Lapangan"}
                            name="kd_pengaduan"
                            value={
                                pengaduan.status_lapangan
                                    ? pengaduan.status_lapangan
                                    : "Belum di tangani"
                            }
                        />
                        {pengaduan.foto_penganan ? (
                            <div className="my-3">
                                <a
                                    href={"/storage/" + pengaduan.foto_penganan}
                                    target="_blank"
                                >
                                    <img
                                        src={
                                            "/storage/" +
                                            pengaduan.foto_penganan
                                        }
                                        className="w-full h-[200px] object-cover "
                                    />
                                </a>
                            </div>
                        ) : (
                            "Belum ada foto penanganan oleh petugas"
                        )}
                    </div>
                </div>
            </div>
            <div className="my-3 flex items-start gap-3">
                <div className="w-full py-2 px-3 rounded-md shadow-md shadow-gray-500/50 min-h-[260px] max-h-[500px] overflow-y-auto">
                    <Maps
                        position={[setting.lat, setting.long]}
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
                                </React.Fragment>
                            );
                        })}
                        <Marker position={[data.lat, data.long]}></Marker>
                    </Maps>
                </div>
                {auth.user.role == "petugas lapangan" && (
                    <div className="w-full py-2 px-3 rounded-md shadow-mdshadow-gray-500/50 min-h-[260px] max-h-[500px] overflow-y-auto">
                        <h3 className="text-teal-700 capitalize font-bold text-xl">
                            Form Penanganan Pengaduan
                        </h3>
                        <form
                            onSubmit={submitHandler}
                            className="my-3 flex flex-col gap-3"
                        >
                            <InputText
                                disabled
                                className="w-full"
                                title={"Tanggal Proses Pengaduan"}
                                value={moment(new Date()).format("DD-MM-YYYY")}
                            />
                            <InputText
                                disabled
                                className="w-full capitalize"
                                title={"Nama Petugas"}
                                value={data.nama_petugas_menangani}
                            />
                            <InputText
                                className="w-full"
                                title={"Solusi Penanganan"}
                                name="solusi_pengangan"
                                value={data.solusi_pengangan}
                                errors={errors.solusi_pengangan}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                            <InputText
                                type="file"
                                className="w-full"
                                title={"Foto Penanganan"}
                                name="foto_penganan"
                                errors={errors.foto_penganan}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.files[0],
                                    })
                                }
                            />
                            <div className="flex flex-col md:flex-row gap-3 justify-between">
                                <Select
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                    className="w-full"
                                    name="status_lapangan"
                                    error={errors.status_lapangan}
                                    value={data.status_lapangan}
                                    label="Status Lapangan"
                                    helperText={errors.status_lapangan}
                                >
                                    <MenuItem disabled selected value="">
                                        Pilih Status Penanganan
                                    </MenuItem>
                                    <MenuItem value="sesuai fakta">
                                        Sesuai Fakta
                                    </MenuItem>
                                    <MenuItem value="tidak sesuai fakta">
                                        Tidak Sesuai Fakta
                                    </MenuItem>
                                </Select>
                                <Select
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                    className="w-full"
                                    name="status_pengaduan"
                                    error={errors.status_pengaduan}
                                    value={data.status_pengaduan}
                                    label="Status Pengaduan"
                                    helperText={errors.status_pengaduan}
                                >
                                    <MenuItem disabled selected value="">
                                        Pilih Status Pengaduan
                                    </MenuItem>
                                    <MenuItem value="di proses">
                                        Di Proses
                                    </MenuItem>
                                    <MenuItem value="selesai">Selesai</MenuItem>
                                    <MenuItem value="di batalkan">
                                        Di Batalkan
                                    </MenuItem>
                                </Select>
                            </div>
                            <button className="bg-blue-500  rounded-md p-2 hover:bg-blue-700 transition-all duration-300 ease-in-out text-white leading-3 tracking-tighter">
                                Proses Pengaduan
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

Show.layout = (page) => (
    <AuthLayout children={page} title={"Buat Pengaduan Baru"} />
);
