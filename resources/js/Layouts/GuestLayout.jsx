import { Head, Link, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Maps from "@/Components/Maps";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import { Home } from "@mui/icons-material";
export default function GuestLayout({ title, children }) {
    const { setting } = usePage().props;
    const { slider } = usePage().props;
    const { auth } = usePage().props;
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 3000,
        autoplay: true,
        arrows: false,
    };
    const [viewAll, setViewAll] = useState(false);
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
        <div className="">
            <Head title={title} />
            <div className="tracking-tighter font-nuito w-screen overflow-x-hidden">
                {/* Navbar */}
                <div className="bg-white py-2 px-4 flex justify-between items-center border-b border-teal-700">
                    <div className="flex gap-3 items-center">
                        <img
                            src={"/storage/" + setting.logo}
                            className="w-8"
                            alt=""
                        />
                        <h3 className="font-medium capitalize tracking-tighter text-teal-700 transition-all duration-300 ease-in-out text-xs md:text-sm lg:text-base">
                            {setting.nama_kantor}
                        </h3>
                    </div>
                    <div className="flex gap-3 items-center">
                        <Link
                            href={route("home")}
                            className={`${
                                route().current("home")
                                    ? "bg-teal-700 text-white border "
                                    : "text-teal-700"
                            } "transition-all text-xs md:text-sm lg:text-base rounded-md hover:bg-teal-700 hover:text-white  py-1 px-2 border-teal-900 transition-all duration-300 ease-in-out "`}
                        >
                            Home
                        </Link>
                        <Link
                            href={route("informasi")}
                            className={`${
                                route().current("informasi")
                                    ? "bg-teal-700 text-white border "
                                    : "text-teal-700"
                            } "transition-all text-xs md:text-sm lg:text-base rounded-md hover:bg-teal-700 hover:text-white  py-1 px-2 border-teal-900 transition-all duration-300 ease-in-out "`}
                        >
                            Informasi
                        </Link>
                        <Link
                            href={route("informasi-pemadaman")}
                            className={`${
                                route().current("informasi-pemadaman")
                                    ? "bg-teal-700 text-white border "
                                    : "text-teal-700"
                            } "transition-all text-xs md:text-sm lg:text-base rounded-md hover:bg-teal-700 hover:text-white  py-1 px-2 border-teal-900 transition-all duration-300 ease-in-out "`}
                        >
                            Informasi Pemadaman
                        </Link>
                        {auth.user ? (
                            <>
                                <Link
                                    href={route("dashboard")}
                                    className={`${
                                        route().current("dashboard")
                                            ? "bg-teal-700 text-white border "
                                            : "text-teal-700"
                                    } "transition-all text-xs md:text-sm lg:text-base rounded-md hover:bg-teal-700 hover:text-white  py-1 px-2 border-teal-900 transition-all duration-300 ease-in-out "`}
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href={route("logout")}
                                    className={`${
                                        route().current("logout")
                                            ? "bg-teal-700 text-white border "
                                            : "text-teal-700"
                                    } "transition-all text-xs md:text-sm lg:text-base rounded-md hover:bg-teal-700 hover:text-white  py-1 px-2 border-teal-900 transition-all duration-300 ease-in-out "`}
                                >
                                    Logout
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    href={route("login")}
                                    className={`${
                                        route().current("login")
                                            ? "bg-teal-700 text-white border "
                                            : "text-teal-700"
                                    } "transition-all text-xs md:text-sm lg:text-base rounded-md hover:bg-teal-700 hover:text-white  py-1 px-2 border-teal-900 transition-all duration-300 ease-in-out "`}
                                >
                                    Login
                                </Link>
                                <Link
                                    href={route("register")}
                                    className={`${
                                        route().current("register")
                                            ? "bg-teal-700 text-white border "
                                            : "text-teal-700"
                                    } "transition-all text-xs md:text-sm lg:text-base rounded-md hover:bg-teal-700 hover:text-white  py-1 px-2 border-teal-900 transition-all duration-300 ease-in-out "`}
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
                {/* Container */}
                <div className="w-full">
                    <div>
                        <Slider {...settings}>
                            {slider.map((item, key) => (
                                <div className="w-full">
                                    <img
                                        key={key}
                                        src={"/storage/" + item.gambar}
                                        className="h-[300px] w-full object-cover"
                                    />
                                </div>
                            ))}
                        </Slider>
                    </div>
                    <div className=" w-full px-4 md:px-8 lg:px-16 bg-[url('bg.jpg')] bg-cover transition-all duration-300 ease-in-out">
                        <h3 className="text-xl text-teal-700 capitalize font-bold text-center my-5">
                            Sejarah dan Peta Lokasi {setting.nama_kantor}
                        </h3>
                        <div>
                            <div className="w-full flex justify-between items-start flex-col md:flex-row gap-2 md:gap-8 transition-all duration-300 ease-in-out">
                                <div className="w-full">
                                    <h3 className="text-xl text-teal-700 capitalize font-bold">
                                        Sejarah
                                        {setting.nama_kantor}
                                    </h3>
                                    <p
                                        className={`${
                                            viewAll ? "" : "line-clamp-6"
                                        } font-thin tracking-tighter transition-all ease-in-out duration-300`}
                                        dangerouslySetInnerHTML={{
                                            __html: setting.deskripsi,
                                        }}
                                    />

                                    <div>
                                        <p className="font-medium tracking-tighter text-teal-700">
                                            Nama Pimpinan :{" "}
                                            {setting.nama_pimpinan}
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
                                            position={[
                                                setting.lat,
                                                setting.long,
                                            ]}
                                        >
                                            <Popup>
                                                <p className="font-medium tracking-tighter text-teal-700">
                                                    Nama Pimpinan :{" "}
                                                    {setting.nama_pimpinan}
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
                        </div>
                    </div>
                    {children}
                </div>
                {/* Footer */}
                <div className=" px-4 md:px-8 lg:px-16 py-6 transition-all ease-in-out duration-300 relative overflow-x-hidden">
                    <div className="absolute left-0 top-0 w-full h-full ">
                        <img
                            src="/background.jpg"
                            alt=""
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex flex-col-reverse md:flex-row-reverse md:gap-8 gap-4 justify-between items-start transition-all duration-300 ease-in-out relative">
                        <div className="flex flex-col w-1/3">
                            <Link
                                href={route("home")}
                                className={`${
                                    route().current("home")
                                        ? "bg-teal-700 text-white border "
                                        : "text-white"
                                } "transition-all text-xs md:text-sm lg:text-base rounded-md hover:bg-teal-700 hover:text-white  py-1 px-2 border-teal-900 transition-all duration-300 ease-in-out "`}
                            >
                                Home
                            </Link>
                            <Link
                                href={route("informasi")}
                                className={`${
                                    route().current("informasi")
                                        ? "bg-teal-700 text-white border "
                                        : "text-white"
                                } "transition-all text-xs md:text-sm lg:text-base rounded-md hover:bg-teal-700 hover:text-white  py-1 px-2 border-teal-900 transition-all duration-300 ease-in-out "`}
                            >
                                Informasi
                            </Link>
                            <Link
                                href={route("informasi-pemadaman")}
                                className={`${
                                    route().current("informasi-pemadaman")
                                        ? "bg-teal-700 text-white border "
                                        : "text-white"
                                } "transition-all text-xs md:text-sm lg:text-base rounded-md hover:bg-teal-700 hover:text-white  py-1 px-2 border-teal-900 transition-all duration-300 ease-in-out "`}
                            >
                                Informasi Pemadaman
                            </Link>
                            {auth.user ? (
                                <>
                                    <Link
                                        href={route("dashboard")}
                                        className={`${
                                            route().current("dashboard")
                                                ? "bg-teal-700 text-white border "
                                                : "text-white"
                                        } "transition-all text-xs md:text-sm lg:text-base rounded-md hover:bg-teal-700 hover:text-white  py-1 px-2 border-teal-900 transition-all duration-300 ease-in-out "`}
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        href={route("logout")}
                                        className={`${
                                            route().current("logout")
                                                ? "bg-teal-700 text-white border "
                                                : "text-white"
                                        } "transition-all text-xs md:text-sm lg:text-base rounded-md hover:bg-teal-700 hover:text-white  py-1 px-2 border-teal-900 transition-all duration-300 ease-in-out "`}
                                    >
                                        Logout
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href={route("login")}
                                        className={`${
                                            route().current("a")
                                                ? "bg-teal-700 text-white border "
                                                : "text-white"
                                        } "transition-all text-xs md:text-sm lg:text-base rounded-md hover:bg-teal-700 hover:text-white  py-1 px-2 border-teal-900 transition-all duration-300 ease-in-out "`}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href={route("register")}
                                        className={`${
                                            route().current("a")
                                                ? "bg-teal-700 text-white border "
                                                : "text-white"
                                        } "transition-all text-xs md:text-sm lg:text-base rounded-md hover:bg-teal-700 hover:text-white  py-1 px-2 border-teal-900 transition-all duration-300 ease-in-out "`}
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                        <div className="w-full">
                            <p className="font-medium tracking-tighter text-black">
                                {setting.nama_kantor}
                            </p>
                            <p className="font-medium tracking-tighter text-black">
                                Nama Pimpinan : {setting.nama_pimpinan}
                            </p>
                            <p className="font-medium tracking-tighter text-black">
                                Address : {setting.alamat}
                            </p>
                            <p className="font-medium tracking-tighter text-black">
                                Phone : {setting.telph}
                            </p>
                            <div className="rounded-lg overflow-hidden">
                                <Maps
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
                                                Nama Pimpinan :{" "}
                                                {setting.nama_pimpinan}
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
                    </div>
                </div>
            </div>
        </div>
    );
}
