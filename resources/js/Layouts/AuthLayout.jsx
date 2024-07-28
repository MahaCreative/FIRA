import MenuDropdown from "@/Components/MenuDropdown";
import Sidebar from "@/Components/Sidebar";
import { Head, Link, usePage } from "@inertiajs/react";
import { Badge } from "@mui/base";
import { motion } from "framer-motion";
import {
    Close,
    Dashboard,
    NotificationAdd,
    Widgets,
} from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";

export default function AuthLayout({ children, title }) {
    const sidebarRef = useRef();
    const { auth } = usePage().props;
    const { countPengaduan } = usePage().props;
    const [open, setOpen] = useState(false);
    const [notif, setNotif] = useState(false);
    const [dataNotif, setDataNotif] = useState([]);
    const audio = useRef();
    const widgetRef = useRef();
    const closeNotif = () => {
        setNotif(false);
        setDataNotif([]);
    };

    Echo.channel("aduan").listen("AduanEvent", (data) => {
        setDataNotif(data.data);
        setNotif(true);

        const playAudio = async () => {
            try {
                await audio.current.play();
                console.log("Audio played automatically");
            } catch (err) {
                console.log("Error attempting to play:", err);
                // If autoplay is prevented, handle it here
            }
        };
        playAudio();
        setTimeout(() => {
            audio.current.pause();
            audio.current.currentTime = 0;
            closeNotif();
        }, 5000);
    });

    return (
        <div>
            <Head title={title} />

            <div className="overflow-x-hidden overflow-y-visible max-w-full relative scrollbar-none">
                {notif && (
                    <audio
                        ref={audio}
                        src="./success.mp3"
                        autoPlay
                        loop
                    ></audio>
                )}
                <div className="relative">
                    <div className="bg-teal-500  w-full flex justify-between items-center fixed z-[9999]">
                        <div className="px-4 py-1">
                            <button
                                ref={widgetRef}
                                onClick={() => setOpen(!open)}
                                className="text-white text-xl hover:bg-teal-700 hover:text-teal-500 duration-300 ease-in-out transition-all p-2 rounded-md"
                            >
                                <Widgets color="inherit" fontSize="inherit" />
                            </button>
                        </div>
                        <div className="flex gap-x-3 items-center px-4">
                            <MenuDropdown auth={auth} />
                            <Link
                                href={
                                    auth.user.role == "pelanggan"
                                        ? route("pelanggan.pengaduan-pelanggan")
                                        : route("admin.pengaduan-pelanggan")
                                }
                                className="text-white text-xl hover:bg-teal-700 hover:text-teal-500 duration-300 ease-in-out transition-all p-2 rounded-md hover:cursor-pointer"
                            >
                                <Badge
                                    badgeContent={countPengaduan}
                                    color="error"
                                    overlap="circular"
                                    invisible={countPengaduan === 0}
                                >
                                    <NotificationAdd
                                        color="inherit"
                                        fontSize="inherit"
                                    />
                                </Badge>
                            </Link>
                        </div>
                    </div>
                    <div className="relative top-12">
                        <Sidebar
                            widgetRef={widgetRef}
                            open={open}
                            setOpen={setOpen}
                        />
                    </div>
                </div>
                <div className="relative top-16 ">
                    <div className="py-2 border-b border-teal-700 w-full flex gap-3 px-8 text-teal-800 items-center leading-none ">
                        <Link
                            as="div"
                            href={route("dashboard")}
                            className="flex items-center gap-2 hover:cursor-pointer "
                        >
                            <div className="text-xs leading-none">
                                <Dashboard color="inherit" fontSize="inherit" />
                            </div>
                            <p className="leading-none capitalize">Dashboard</p>
                        </Link>
                        <p className="leading-none">/</p>
                        <p className="capitalize">{title}</p>
                    </div>
                    <div className="py-2 px-4 scrollbar-thin ">{children}</div>
                </div>

                <motion.div
                    animate={notif ? "open" : "closed"}
                    initial="closed"
                    variants={{
                        open: { x: 0, opacity: 1 },
                        closed: { x: 500, opacity: 0.5 },
                    }}
                    transition={{ duration: 0.5 }}
                    className="absolute top-[50%] z-[999999]  w-[450px] right-10 bg-white/40  py-2 px-3 rounded-md backdrop-blur-sm "
                >
                    <div className="flex justify-between gap-3 items-center">
                        <h3 className="tracking-tighter font-extrabold text-black">
                            Ada 1 pengaduan baru yang telah diadukan pelanggan
                        </h3>
                        <div
                            onClick={closeNotif}
                            className="py-2 px-2 leading-3 tracking-tighter rounded-md hover:bg-red-500 hover:text-white cursor-pointer transition-all ease-in-out duration-300"
                        >
                            <Close color="inherit" fontSize="inherit" />
                        </div>
                    </div>
                    {notif && (
                        <>
                            <div className="flex gap-3 items-center">
                                <img
                                    src={
                                        "./storage/" + dataNotif.foto_pengaduan
                                    }
                                    alt=""
                                    className="w-[50px] h-[50px] object-cover"
                                />
                                <p className="text-sm text-blue-500 md:text-lg font-bold">
                                    {dataNotif.judul_pengaduan}
                                </p>
                            </div>
                            <p className="text-xs tracking-tighter ">
                                {dataNotif.deskripsi_pengaduan}
                            </p>
                            <Link
                                href={route(
                                    "pelanggan.show-pengaduan-pelanggan",
                                    { kd_pengaduan: dataNotif.kd_pengaduan }
                                )}
                                className="text-blue-500 font-bold hover:text-blue-800"
                            >
                                Lihat Pengaduan
                            </Link>
                        </>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
