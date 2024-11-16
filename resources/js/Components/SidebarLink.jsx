import { Link } from "@inertiajs/react";
import { Widgets } from "@mui/icons-material";
import React from "react";

export default function SidebarLink({ icon, active, title, links, ...props }) {
    return (
        <Link
            {...props}
            href={links}
            className={`${
                active ? "bg-teal-700" : ""
            } flex gap-3 items-center hover:bg-teal-700 py-3 px-4 transition-all duration-300 ease-in-out my-1`}
        >
            {/* {icon && ( */}
            <p className="text-lg tracking-tighter leading-3 text-white">
                {icon}
            </p>
            {/* )} */}
            <p className="text-white tracking-tighter font-medium leading-none">
                {title}
            </p>
        </Link>
    );
}
