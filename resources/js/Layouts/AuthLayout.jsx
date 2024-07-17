import MenuDropdown from "@/Components/MenuDropdown";
import Sidebar from "@/Components/Sidebar";
import { Head, Link, usePage } from "@inertiajs/react";
import { Badge } from "@mui/base";
import { Dashboard, NotificationAdd, Widgets } from "@mui/icons-material";
import React, { useRef, useState } from "react";

export default function AuthLayout({ children, title }) {
    const sidebarRef = useRef();
    const { auth } = usePage().props;
    const { countPengaduan } = usePage().props;
    const [open, setOpen] = useState(false);
    return (
        <>
            <Head title={title} />
            <div className="">
                <div className="relative">
                    <div className="bg-teal-500  w-full flex justify-between items-center fixed z-[9999]">
                        <div className="px-4 py-2">
                            <button
                                onClick={() => setOpen(!open)}
                                className="text-white text-xl hover:bg-teal-700 hover:text-teal-500 duration-300 ease-in-out transition-all p-2 rounded-md"
                            >
                                <Widgets color="inherit" fontSize="inherit" />
                            </button>
                        </div>
                        <div className="flex gap-3 items-center px-4">
                            <MenuDropdown auth={auth} />
                            <Link className="text-white text-xl hover:bg-teal-700 hover:text-teal-500 duration-300 ease-in-out transition-all p-2 rounded-md hover:cursor-pointer">
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
                    <div className="relative top-14">
                        <Sidebar open={open} setOpen={setOpen} />
                    </div>
                </div>
                <div className="relative top-16">
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
                    <div className="py-2 px-4">{children}</div>
                </div>
            </div>
        </>
    );
}
