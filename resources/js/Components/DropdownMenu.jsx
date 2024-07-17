import { ArrowDropDown, Dashboard } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";

export default function DropdownMenu({ children, title, icon }) {
    const dropdownRef = useRef();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        let handler = (e) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);
    return (
        <div
            onClick={() => setOpen(true)}
            // onMouseEnter={() => setOpen(true)}
            ref={dropdownRef}
            className={`${
                open ? "bg-teal-800" : ""
            } px-4 flex flex-col gap-3  justify-between w-full py-2 hover:bg-teal-800 relative transition-all duration-300 ease-in-out`}
        >
            <div className="flex items-center justify-between">
                <div className="flex gap-4 items-center">
                    <div className=" text-white tracking-tighter leading-3">
                        {icon}
                    </div>
                    <p className="text-white capitalize">{title}</p>
                </div>
                <div
                    className={`${
                        open ? "" : "-rotate-90"
                    } text-white tracking-tighter leading-3 transition-all duration-300 ease-in-out`}
                >
                    <ArrowDropDown fontSize="inherit" color="inherit" />
                </div>
            </div>
            <div className="w-full h-full">
                <div
                    className={`${
                        open ? "max-h-[300px]" : "max-h-0"
                    } overflow-y-hidden transition-all duration-300 ease-in-out`}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}
