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
export default function Create({ jenisPengaduan, wilayah }) {
    const responseAlert = ResponseAlert();
    const showAlert = useSweetAlert();
    const [location, setLocation] = useState();
    const { data, setData, post, reset, errors } = useForm({
        judul_pengaduan: "",
        deskripsi_pengaduan: "",
        foto_pengaduan: "",
        telph: "",
        jenis_pengaduan_id: "",
        jenis_pengaduan: "",
        wilayah: "",
    });
    const { setting } = usePage().props;
    const pilihPengaduan = (item) => {
        setData({
            ...data,
            jenis_pengaduan: item.nama,
            jenis_pengaduan_id: item.id,
        });
    };
    const handleMapClick = ({ lat, lng }) => {
        let wilayahName = "";

        wilayah.forEach((item) => {
            let geojson;
            try {
                geojson = JSON.parse(item.geojson);
            } catch (error) {
                console.error("Invalid GeoJSON format for item:", item);
                return;
            }

            // Check if geojson is a feature and has geometry
            if (
                geojson.type === "Feature" &&
                geojson.geometry &&
                geojson.geometry.type === "Polygon"
            ) {
                const point = turf.point([lng, lat]);
                const polygon = turf.polygon(geojson.geometry.coordinates);

                if (turf.booleanPointInPolygon(point, polygon)) {
                    wilayahName = item.nama_wilayah;
                }
            } else {
                console.error(
                    "GeoJSON is not a valid Polygon feature for item:",
                    item
                );
            }
        });
        if (wilayahName == "") {
            responseAlert({
                title: "Errors",
                icon: "error",
                text: "Titik lokasi yang anda pilih tidak terdaftar dalam wilayah kerja kami",
            });
        } else {
            showAlert({
                title: "Pilih wilayah?",
                text:
                    "Anda yakin lokasi pengaduan anda berada di wilayah " +
                    wilayahName +
                    " ?",
                confirmText: "Yakin",
                onConfirm: () => {
                    setData({
                        ...data,
                        wilayah: wilayahName,
                        lat: lat,
                        long: lng,
                    });
                    setLocation({ ...location, lat: lat, long: lng });
                    console.log(location);
                },
                onCancel: () => {
                    wilayahName = "";
                },
            });
        }
    };

    const submit = (e) => {
        e.preventDefault();
        if (data.wilayah == "") {
            responseAlert({
                title: "Errors",
                icon: "error",
                text: "Silahkan pilih lokasi pengaduan terlebih dahulu",
            });
        } else {
            showAlert({
                title: "Kirim Pengaduan?",
                icon: "warning",
                text: "Apakah pengaduan yang anda ingin ajukan sudah benar?",
                onConfirm: () => {
                    post(route("pelanggan.pengaduan-pelanggan.store"), {
                        onError: () => {
                            responseAlert({
                                title: "Gagal",
                                icon: "error",
                                text: "Pengaduan anda gagal diajukan, silahkan melakukan pengecekan pada formulir pengaduan anda, pastikan setiap isian tidak ada text merah dibawahnya",
                            });
                        },
                        onSuccess: () => {
                            responseAlert({
                                title: "Sukses",
                                icon: "success",
                                text: "Pengaduan anda telah berhasil dikirim, silahkan menunggu konfirmasi petugas",
                            });
                            reset();
                            setLocation();
                        },
                    });
                },
                onCancel: () => {},
            });
        }
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-start gap-3">
                <div className="w-full md:w-1/3 py-2 px-3 rounded-md shadow-md shadow-gray-500/50 min-h-[260px] max-h-[260px] overflow-y-auto">
                    <h1 className="text-xl font-bold text-teal-700 tracking-tighter">
                        Silahkan Memilih Jenis Pengaduan
                    </h1>
                    {jenisPengaduan.map((item, key) => (
                        <div
                            onClick={() => pilihPengaduan(item)}
                            className={`${
                                data.jenis_pengaduan_id === item.id
                                    ? "bg-teal-500 text-white"
                                    : "text-teal-900"
                            } flex gap-3 items-center hover:bg-teal-400 hover:text-white  font-bold hover:cursor-pointer transition-all duration-300 ease-in-out py-1 px-3`}
                            key={key}
                        >
                            <div className="tracking-tighter leading-3  text-2xl">
                                <List color="inherit" fontSize="inherit" />
                            </div>
                            <p className="capitalize">{item.nama}</p>
                        </div>
                    ))}
                </div>
                <div className="w-full py-2 px-3 rounded-md shadow-md shadow-gray-500/50 min-h-[260px] max-h-[500px] overflow-y-auto">
                    <form onSubmit={submit} action="" className="w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <InputText
                                disabled
                                className="w-full"
                                title={"Jenis Pengaduan"}
                                name="jenis_pengaduan"
                                value={data.jenis_pengaduan}
                                errors={errors.jenis_pengaduan}
                            />
                            <InputText
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
                            <InputText
                                type="file"
                                className="w-full"
                                title={"Foto Pengaduan"}
                                name="foto_pengaduan"
                                errors={errors.foto_pengaduan}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.files[0],
                                    })
                                }
                            />
                        </div>
                        <div className="my-2">
                            <InputText
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
                        <button className="bg-blue-500  rounded-md p-2 hover:bg-blue-700 transition-all duration-300 ease-in-out text-white leading-3 tracking-tighter">
                            Kirim Pengaduan
                        </button>
                    </form>
                </div>
            </div>
            <div className="my-3">
                <p className="py-2 px-3 rounded-md bg-gray-500/50 my-3 inline-block">
                    Silahkan double click Maps untuk menandai titik lokasi
                    pengaduan anda
                </p>
                <Maps
                    onMapClick={handleMapClick}
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
                    {location && (
                        <Marker
                            position={[location.lat, location.long]}
                        ></Marker>
                    )}
                </Maps>
            </div>
        </div>
    );
}

Create.layout = (page) => (
    <AuthLayout children={page} title={"Buat Pengaduan Baru"} />
);
