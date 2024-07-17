import { Link } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";

export default function MenuDropdown({ auth }) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef();
    useEffect(() => {
        let handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("click", handler);
        return () => document.removeEventListener("click", handler);
    });
    return (
        <>
            <div
                ref={menuRef}
                onClick={() => setOpen(true)}
                className="relative flex gap-3 items-center hover:cursor-pointer hover:bg-teal-600 py-2 px-4 rounded-md transition-all duration-300 ease-in-out"
            >
                <img
                    src={"/storage/" + auth.user.image}
                    alt=""
                    className="w-10"
                />
                <p className="text-white capitalize font-medium">
                    {auth.user.firstname}
                </p>
                <div
                    className={`${
                        open
                            ? "min-h-[90px] max-h-full top-16 opacity-100 py-2 px-4"
                            : "top-10 max-h-0 opacity-40"
                    } overflow-y-hidden rounded-md  transition-all duration-300 ease-in-out  absolute  right-0  bg-white shadow-sm shadow-gray-400/50`}
                >
                    <Link
                        href={route("logout")}
                        className="hover:text-teal-500 block py-2 border-b border-teal-700"
                    >
                        Logout
                    </Link>
                    <Link
                        href={route("setting-profile")}
                        className="hover:text-teal-500 block py-2"
                    >
                        SettingProfile
                    </Link>
                </div>
            </div>
        </>
    );
}
