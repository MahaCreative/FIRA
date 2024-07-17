import { Head, usePage } from "@inertiajs/react";
import moment from "moment";
import React from "react";

export default function CetakLayouts({ title, children }) {
    const { setting } = usePage().props;
    const { auth } = usePage().props;
    return (
        <div className="px-16 py-3">
            <Head title={title} />
            <div className="flex justify-center w-full">
                <div className="flex w-full gap-3 items-center px-16 py-3 border-b border-black">
                    <img
                        src={"/storage/" + setting.logo}
                        alt=""
                        className="w-[50px] h-[50px] object-cover"
                    />

                    <div className="flex gap-3 justify-between w-full">
                        <div className="text-left">
                            <h3 className="uppercase font-bold text-2xl tracking-tighter">
                                {setting.nama_kantor}
                            </h3>
                            <p className="text-sm italic capitalize">
                                {setting.alamat}
                            </p>
                        </div>
                        <div>
                            <h3 className="font-bold text-xl">{title}</h3>
                            <p className="text-xs">
                                Tanggal Cetak :{" "}
                                {moment(new Date()).format("DD-MMMM-YYYY")}
                            </p>
                            <p className="capitalize text-xs italic">
                                Cetak By :{" "}
                                {auth.user.firstname + " " + auth.user.lastname}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* content */}
            <div>{children}</div>
        </div>
    );
}
