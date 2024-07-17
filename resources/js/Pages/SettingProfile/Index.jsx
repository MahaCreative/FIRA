import AuthLayout from "@/Layouts/AuthLayout";
import { router } from "@inertiajs/react";
import React, { useRef } from "react";
import Form from "./Form";

export default function Index({ user }) {
    const inputRef = useRef();
    const gantiFoto = () => {
        inputRef.current.click();
    };
    const changeFoto = (e) => {
        router.post(route("ganti-foto"), {
            image: e.target.files[0],
        });
    };
    return (
        <div>
            <div className="flex flex-col md:flex-row gap-3 justify-between items-start">
                <div className="w-full relative md:w-1/3 h-[300px] bg-white rounded-md shadow-md shadow-gray-400/50 p-3 ">
                    <img
                        src={"/storage/" + user.image}
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
                            onClick={gantiFoto}
                            className="bg-teal-700/50 hover:bg-teal-700/90 backdrop-blur-sm text-white p-2 rounded-md transition-all duration-300 ease-in-out"
                        >
                            Ganti Foto
                        </button>
                    </div>
                </div>
                <div className="w-full h-[300px] bg-white rounded-md shadow-md shadow-gray-400/50 p-3 capitalize ">
                    <h3 className="text-teal-700 font-bold tracking-tighter text-3xl">
                        Profile User
                    </h3>
                    <div className="flex gap-3 items-start border-b border-teal-500 p-2">
                        <p className="w-[200px]">Firstname</p>
                        <p>: {user.firstname}</p>
                    </div>
                    <div className="flex gap-3 items-start border-b border-teal-500 p-2">
                        <p className="w-[200px]">lastname</p>
                        <p>: {user.lastname}</p>
                    </div>
                    <div className="flex gap-3 items-start border-b border-teal-500 p-2">
                        <p className="w-[200px]">Tempat, Tanggal Lahir</p>
                        <p>: {user.tempat_lahir + ", " + user.tanggal_lahir}</p>
                    </div>
                    <div className="flex gap-3 items-start border-b border-teal-500 p-2">
                        <p className="w-[200px]">Alamat</p>
                        <p>: {user.address}</p>
                    </div>
                    <div className="flex gap-3 items-start border-b border-teal-500 p-2">
                        <p className="w-[200px]">Nomor Wa</p>
                        <p>: {user.phone}</p>
                    </div>
                    <div className="flex gap-3 items-start border-b border-teal-500 p-2 ">
                        <p className="w-[200px]">Email</p>
                        <p className="lowercase">: {user.email}</p>
                    </div>
                </div>
            </div>
            <Form model={user} />
        </div>
    );
}

Index.layout = (page) => (
    <AuthLayout children={page} title={"Setting Profile"} />
);
