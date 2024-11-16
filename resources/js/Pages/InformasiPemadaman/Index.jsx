import GuestLayout from "@/Layouts/GuestLayout";
import { Link } from "@inertiajs/react";
import moment from "moment";
import React from "react";

export default function Index({ pemadaman }) {
    console.log(pemadaman);
    return (
        <>
            <div className="py-6 px-4 md:px-8 lg:px-16">
                <h3 className="text-xl md:text-2xl lg:text-3xl text-teal-700 font-bold text-center">
                    Informasi Pemadaman
                </h3>
                {pemadaman && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 my-3">
                        {pemadaman.map((item, key) => (
                            <div key={key} className="flex flex-col gap-4">
                                <div className="w-full bg-teal-600 p-2 rounded-md flex justify-center items-center">
                                    <img
                                        src={"/iconPemadaman.jpg"}
                                        alt={item.judul}
                                        className="w-full h-[250px] object-cover"
                                    />
                                </div>
                                <div className="w-full">
                                    <h1 className="text-xl font-medium text-teal-700">
                                        {item.judul}
                                    </h1>

                                    <p>
                                        Jam Padam : {item.jam_padam} / Jam
                                        Selesai : {item.jam_selesai}
                                    </p>
                                    <p
                                        className="font-light line-clamp-5"
                                        dangerouslySetInnerHTML={{
                                            __html: item.deskripsi,
                                        }}
                                    />
                                    <Link
                                        href={route(
                                            "show-informasi-pemadaman",
                                            item.id
                                        )}
                                        as="button"
                                        className=" py-2  text-white bg-teal-500 px-5 rounded-md my-2"
                                    >
                                        Selengkapnya
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

Index.layout = (page) => (
    <GuestLayout children={page} title={"Informasi Pemadaman"} />
);
