import GuestLayout from "@/Layouts/GuestLayout";
import React from "react";

import { info } from "autoprefixer";
import ComponentInformasi from "./ComponentInformasi";

export default function Index(props) {
    const informasi = props.informasi;
    return (
        <>
            <div id="informasi" className="py-6 px-4 md:px-8 lg:px-16">
                <h3 className="text-xl md:text-2xl lg:text-3xl text-teal-700 font-bold text-center">
                    Info Layanan
                </h3>
                <ComponentInformasi informasi={informasi} />
            </div>
        </>
    );
}

Index.layout = (page) => <GuestLayout children={page} title={"Home"} />;
