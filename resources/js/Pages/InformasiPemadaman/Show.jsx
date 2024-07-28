import React, { useEffect, useRef } from "react";
import ComponentInformasi from "../Home/ComponentInformasi";
import moment from "moment";
import GuestLayout from "@/Layouts/GuestLayout";

export default function Show({ pemadaman }) {
    const showRef = useRef();
    useEffect(() => {
        showRef.current.scrollIntoView({ behavior: "smooth" });
    });
    return (
        <div
            ref={showRef}
            className="px-4 md:px-8 lg:px-16 py-6 transition-all duration-300 ease-in-out"
        >
            <div className="flex flex-col md:flex-row gap-4 items-start transition-all duration-300 ease-in-out">
                <div className="w-full">
                    <h3 className="  text-xl md:text-2xl lg:text-3xl text-teal-700 font-bold ">
                        Show Informasi Pemadaman {pemadaman.judul}
                    </h3>
                    <div className="flex justify-between items-center my-2">
                        <p>Pemadaman Dimulai Jam: {pemadaman.jam_padam}</p>
                        <p>Pemadaman Selesai: {pemadaman.jam_selesai}</p>
                    </div>
                    <img
                        src={"/iconPemadaman.jpg"}
                        alt={pemadaman.judul}
                        className="w-full h-[350px] object-cover"
                    />
                    <div>
                        <p
                            className="font-light line-clamp-5"
                            dangerouslySetInnerHTML={{
                                __html: pemadaman.deskripsi,
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

Show.layout = (page) => (
    <GuestLayout children={page} title={"Show Informasi Pemadaman"} />
);
