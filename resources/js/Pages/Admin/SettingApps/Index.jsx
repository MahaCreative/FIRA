import Maps from "@/Components/Maps";
import AuthLayout from "@/Layouts/AuthLayout";
import React, { useEffect, useRef, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import Form from "./Form";
import { router } from "@inertiajs/react";
import { Home } from "@mui/icons-material";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import Swal from "sweetalert2";
export default function Index({ setting }) {
    const [viewAll, setViewAll] = useState(false);
    const inputRef = useRef();
    const gantiFoto = () => {
        inputRef.current.click();
    };
    const changeFoto = (e) => {
        router.post(
            route("admin.update-logo"),
            { logo: e.target.files[0] },
            {
                onSuccess: () => {
                    Swal.fire({
                        title: "Sukses",
                        text: "Berhasil memperbaharui Logo",
                        icon: "success",
                    });
                },
            }
        );
    };

    const handleMapClick = ({ lat, lng }) => {
        router.post(
            route("admin.update-lokasi"),
            { lat: lat, long: lng },
            {
                onSuccess: () => {
                    Swal.fire({
                        title: "Sukses",
                        text: "Berhasil memperbaharui lokasi perusahaan",
                        icon: "success",
                    });
                },
            }
        );
    };
    const customIcon = new L.DivIcon({
        html: `<div >
           ${ReactDOMServer.renderToString(
               <div className="bg-blue-500/50 backdrop-blur-sm rounded-full h-[30px] w-[30px] text-white text-xl flex justify-center items-center tracking-tighter leading-3">
                   <Home color="inherit" fontSize="inherit" />
               </div>
           )}
         </div>`,
        className: "custom-icon",
        iconSize: [32, 32],
    });
    return (
        <div>
            <div className="w-full flex justify-between items-start flex-col md:flex-row gap-2 md:gap-8 transition-all duration-300 ease-in-out">
                <div className="w-full">
                    <h3 className="text-xl text-teal-700 capitalize font-bold">
                        {"Profile " + setting.nama_kantor}
                    </h3>
                    <p
                        className={`${
                            viewAll ? "" : "line-clamp-6"
                        } font-thin tracking-tighter transition-all ease-in-out duration-300`}
                        dangerouslySetInnerHTML={{ __html: setting.deskripsi }}
                    />

                    <div>
                        <p className="font-medium tracking-tighter text-teal-700">
                            Nama Pimpinan : {setting.nama_pimpinan}
                        </p>
                        <p className="font-medium tracking-tighter text-teal-700">
                            Address : {setting.alamat}
                        </p>
                        <p className="font-medium tracking-tighter text-teal-700">
                            Phone : {setting.telph}
                        </p>
                    </div>
                    <button
                        onClick={() => setViewAll(!viewAll)}
                        className="animate-bounce py-2 my-3 text-white bg-teal-500 px-5 rounded-md"
                    >
                        Selengkapnya
                    </button>
                </div>
                <div className="w-full">
                    <h3 className="text-xl text-teal-700 capitalize font-bold my-2">
                        Lokasi {setting.nama_kantor}
                    </h3>

                    <Maps
                        onMapClick={handleMapClick}
                        zoom={20}
                        position={[setting.lat, setting.long]}
                        style={{
                            height: "250px",
                            width: "100%",
                            margin: "auto",
                            overflow: "hidden", // pastikan overflow tersembunyi
                        }}
                    >
                        <Marker
                            icon={customIcon}
                            position={[setting.lat, setting.long]}
                        >
                            <Popup>
                                <p className="font-medium tracking-tighter text-teal-700">
                                    Nama Pimpinan : {setting.nama_pimpinan}
                                </p>
                                <p className="font-medium tracking-tighter text-teal-700">
                                    Address : {setting.alamat}
                                </p>
                                <p className="font-medium tracking-tighter text-teal-700">
                                    Phone : {setting.telph}
                                </p>
                            </Popup>
                        </Marker>
                    </Maps>
                </div>
            </div>
            <div className="my-3 flex flex-col md:flex-row justify-between items-start gap-3">
                <div className="w-full relative md:w-1/3 h-[300px] bg-white rounded-md shadow-md shadow-gray-400/50 p-3 ">
                    <img
                        src={"/storage/" + setting.logo}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                    <input
                        type="file"
                        ref={inputRef}
                        onChange={changeFoto}
                        className="hidden"
                    />
                    <div className="absolute bottom-3 left-0 w-full flex items-center justify-center">
                        <button
                            type="button"
                            onClick={gantiFoto}
                            className="bg-teal-700/50 hover:bg-teal-700/90 backdrop-blur-sm text-white p-2 rounded-md transition-all duration-300 ease-in-out"
                        >
                            Ganti Foto
                        </button>
                    </div>
                </div>
                <Form setting={setting} />
            </div>
        </div>
    );
}

Index.layout = (page) => (
    <AuthLayout children={page} title={"Setting Applikasi"} />
);
