import AuthLayout from "@/Layouts/AuthLayout";
import InputText from "@/Layouts/InputText";
import { Link, router } from "@inertiajs/react";
import { Add, Delete } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import React, { useRef } from "react";
import Swal from "sweetalert2";

export default function Index({ slider }) {
    const deleteSlider = (item) => {
        router.delete(route("admin.slider-delete", { id: item.id }), {
            onSuccess: () => {
                Swal.fire({
                    title: "Sukses",
                    text: "Berhasil menghapus 1 sldier",
                    icon: "success",
                });
            },
        });
    };
    const [data, setData] = React.useState({ foto: "" });
    const inputRef = useRef();
    const addSlider = () => {
        router.post(
            route("admin.slider-create"),
            {
                foto: data.foto,
            },
            {
                onSuccess: () => {
                    Swal.fire({
                        title: "Sukses",
                        text: "Berhasil menambahkan 1 sldier baru",
                        icon: "success",
                    });
                },
            }
        );
    };
    const handleChange = (e) => {
        setData({ ...data, foto: e.target.files[0] });
    };
    return (
        <div>
            <div className="my-3 flex gap-3 items-center">
                <InputText ref={inputRef} type="file" onChange={handleChange} />
                <button
                    onClick={addSlider}
                    className="bg-blue-500 p-4 rounded-md hover:bg-blue-700 transition-all duration-300 ease-in-out text-white leading-3 tracking-tighter flex gap-3 items-center"
                >
                    <Add color="inherit" fontSize="inherit" />
                    <p>Tambah Slider</p>
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {slider.map((item, index) => (
                    <div className="w-full relative">
                        <img
                            src={"/storage/" + item.gambar}
                            alt=""
                            className="w-full h-[250px] object-cover"
                        />
                        <button
                            onClick={() => deleteSlider(item)}
                            className="absolute top-3 right-3 bg-red-500 text-white tracking-tighter leading-3 hover:bg-red-700 p-2 rounded-md"
                        >
                            <Tooltip title="Delete Slider">
                                <Delete color="inherit" fontSize="inherit" />
                            </Tooltip>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
Index.layout = (page) => <AuthLayout children={page} title={"Kelola Slider"} />;
