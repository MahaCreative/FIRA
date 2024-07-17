import React, { useEffect, useRef, useState } from "react";
import SidebarLink from "./SidebarLink";
import {
    AccountCircle,
    Build,
    Dashboard,
    ElectricCar,
    Home,
    Info,
    List,
    LocationOn,
    Person,
    PowerOff,
    Report,
    Settings,
    TuneOutlined,
    Work,
} from "@mui/icons-material";
import DropdownMenu from "./DropdownMenu";
import { usePage } from "@inertiajs/react";

export default function Sidebar({ children, open, setOpen }) {
    const sidebarRef = useRef();
    const { auth } = usePage().props;

    return (
        <>
            <div
                ref={sidebarRef}
                className={`${
                    open ? "w-[80%] md:w-1/2 lg:w-1/4 " : "w-0"
                }   overflow-x-hidden fixed z-[9999] bg-teal-600 h-screen transition-all duration-300 ease-in-out py-6`}
            >
                <p className="px-4 text-white font-light">General</p>
                <SidebarLink
                    title={"Dashboard"}
                    links={route("dashboard")}
                    active={route().current("dashboard")}
                    icon={<Dashboard color="inherit" fontSize="inherit" />}
                />
                <SidebarLink
                    title={"Home"}
                    links={route("home")}
                    icon={<Home color="inherit" fontSize="inherit" />}
                />
                {auth.user.role == "admin" && (
                    <>
                        <DropdownMenu
                            title={"master data"}
                            icon={
                                <Settings color="inherit" fontSize="inherit" />
                            }
                        >
                            <SidebarLink
                                title={"Setting Aplikasi"}
                                links={route("admin.setting-apps")}
                                icon={
                                    <LocationOn
                                        color="inherit"
                                        fontSize="inherit"
                                    />
                                }
                            />
                            <SidebarLink
                                title={"Data Wilayah"}
                                links={route("admin.data-wilayah-kerja")}
                                icon={
                                    <LocationOn
                                        color="inherit"
                                        fontSize="inherit"
                                    />
                                }
                            />
                            <SidebarLink
                                title={"Data Petugas"}
                                links={route("admin.petugas-lapangan")}
                                icon={
                                    <Work color="inherit" fontSize="inherit" />
                                }
                            />
                            <SidebarLink
                                title={"Jenis Pengaduan"}
                                links={route("admin.jenis-pengaduan")}
                                icon={
                                    <List color="inherit" fontSize="inherit" />
                                }
                            />
                        </DropdownMenu>

                        <DropdownMenu
                            title={"Menu Pelanggan"}
                            icon={
                                <AccountCircle
                                    color="inherit"
                                    fontSize="inherit"
                                />
                            }
                        >
                            <SidebarLink
                                title={"Data Pelanggan"}
                                links={route("admin.data-pelanggan")}
                                icon={
                                    <Person
                                        color="inherit"
                                        fontSize="inherit"
                                    />
                                }
                            />
                            {/* <SidebarLink
                        title={"Data Meteran Pelanggan"}
                        links={route("admin.petugas-lapangan")}
                        icon={
                            <ElectricCar color="inherit" fontSize="inherit" />
                        }
                    /> */}
                            <SidebarLink
                                title={"Pengaduan Pelanggan"}
                                links={route("admin.pengaduan-pelanggan")}
                                icon={
                                    <Report
                                        color="inherit"
                                        fontSize="inherit"
                                    />
                                }
                            />
                        </DropdownMenu>

                        <DropdownMenu
                            title={"Setting Blog"}
                            icon={<Build color="inherit" fontSize="inherit" />}
                        >
                            <SidebarLink
                                title={"Informasi"}
                                links={route("admin.informasi")}
                                icon={
                                    <Info color="inherit" fontSize="inherit" />
                                }
                            />
                            <SidebarLink
                                title={"Informasi Pemadaman"}
                                links={route("admin.informasi-pemadaman")}
                                icon={
                                    <PowerOff
                                        color="inherit"
                                        fontSize="inherit"
                                    />
                                }
                            />
                            <SidebarLink
                                title={"Slider"}
                                links={route("admin.slider")}
                                icon={
                                    <TuneOutlined
                                        color="inherit"
                                        fontSize="inherit"
                                    />
                                }
                            />
                        </DropdownMenu>
                    </>
                )}

                {auth.user.role == "petugas lapangan" && (
                    <>
                        <SidebarLink
                            title={"Pengaduan Pelanggan"}
                            links={route("admin.pengaduan-pelanggan")}
                            icon={<Report color="inherit" fontSize="inherit" />}
                        />
                        <DropdownMenu
                            title={"Setting Blog"}
                            icon={<Build color="inherit" fontSize="inherit" />}
                        >
                            <SidebarLink
                                title={"Informasi"}
                                links={route("admin.informasi")}
                                icon={
                                    <Info color="inherit" fontSize="inherit" />
                                }
                            />
                            <SidebarLink
                                title={"Informasi Pemadaman"}
                                links={route("admin.informasi-pemadaman")}
                                icon={
                                    <PowerOff
                                        color="inherit"
                                        fontSize="inherit"
                                    />
                                }
                            />
                            <SidebarLink
                                title={"Slider"}
                                links={route("admin.slider")}
                                icon={
                                    <TuneOutlined
                                        color="inherit"
                                        fontSize="inherit"
                                    />
                                }
                            />
                        </DropdownMenu>
                    </>
                )}
                {auth.user.role == "pelanggan" && (
                    <>
                        <SidebarLink
                            title={"Pengaduan Pelanggan"}
                            links={route("pelanggan.pengaduan-pelanggan")}
                            icon={<Report color="inherit" fontSize="inherit" />}
                        />
                    </>
                )}
            </div>
        </>
    );
}
