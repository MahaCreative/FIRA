import useSweetAlert from "@/Components/SweetAlert";
import InputText from "@/Layouts/InputText";
import { useForm } from "@inertiajs/react";
import React, { useEffect } from "react";
import Swal from "sweetalert2";

export default function Form({ onClose, model, setModel }) {
    const { data, setData, post, reset, errors } = useForm({
        firstname: "",
        lastname: "",
        phone: "",
        address: "",
        tanggal_lahir: "",
        tempat_lahir: "",
        image: "",
        email: "",
        password: "",
    });
    const showAlert = useSweetAlert();
    useEffect(() => {
        setData({
            ...data,
            id: model ? model.id : "",
            firstname: model ? model.firstname : "",
            lastname: model ? model.lastname : "",
            phone: model ? model.phone : "",
            address: model ? model.address : "",
            tanggal_lahir: model ? model.tanggal_lahir : "",
            tempat_lahir: model ? model.tempat_lahir : "",
            image: model ? model.image : "",
            email: model ? model.email : "",
            password: model ? model.password : "",
        });
    }, [model]);
    const submit = (e) => {
        e.preventDefault();
        post(route("admin.petugas-lapangan-store"), {
            onSuccess: () => {
                Swal.fire({
                    title: "Sukses",
                    text: "Berhasil menambahkan 1 data petugas baru",
                    icon: "success",
                });
                reset();
                onClose(false);
                setModel(null);
            },
            onError: () => {
                Swal.fire({
                    title: "Error",
                    text: "Upps... Gagal menambahkan 1 data petugas, silahkan periksa isian anda kembali",
                    icon: "error",
                }).then((result) => {
                    if (result.isConfirmed) {
                        onClose(true);
                    }
                });
            },
        });
    };
    const update = (e) => {
        e.preventDefault();
        onClose(false);
        showAlert({
            title: "Perbaharui data petugas?",
            text: "Apakah anda yakin ingin memperbaharui data petugas?",
            confirmText: "Ya, Update Petugas",
            onConfirm: () => {
                post(route("admin.petugas-lapangan-update"), {
                    onSuccess: () => {
                        Swal.fire({
                            title: "Sukses",
                            text: "Berhasil memperbaharui data petugas",
                            icon: "success",
                        });
                        reset();
                        onClose(false);
                        setModel(null);
                    },
                    onError: () => {
                        Swal.fire({
                            title: "Error",
                            text: "Upps... Gagal memperbaharui data petugas, silahkan periksa isian anda kembali",
                            icon: "error",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                onClose(true);
                            }
                        });
                    },
                    preserveScroll: true,
                    preserveState: true,
                });
            },
            onCancel: () => {
                onClose(true);
            },
        });
    };
    return (
        <form onSubmit={model ? update : submit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-3">
                <InputText
                    required
                    className="w-full"
                    title={"Nama Depan"}
                    name={"firstname"}
                    value={data.firstname}
                    errors={errors.firstname}
                    onChange={(e) =>
                        setData({
                            ...data,
                            [e.target.name]: e.target.value,
                        })
                    }
                />
                <InputText
                    className="w-full"
                    title={"Nama Belakang"}
                    name={"lastname"}
                    value={data.lastname}
                    errors={errors.lastname}
                    onChange={(e) =>
                        setData({
                            ...data,
                            [e.target.name]: e.target.value,
                        })
                    }
                />
                <InputText
                    required
                    className="w-full"
                    title={"Nomor WhatsApp"}
                    name={"phone"}
                    value={data.phone}
                    errors={errors.phone}
                    onChange={(e) =>
                        setData({
                            ...data,
                            [e.target.name]: e.target.value,
                        })
                    }
                />
                <InputText
                    required
                    className="w-full"
                    title={"Alamat"}
                    name={"address"}
                    value={data.address}
                    errors={errors.address}
                    onChange={(e) =>
                        setData({
                            ...data,
                            [e.target.name]: e.target.value,
                        })
                    }
                />
                <InputText
                    required
                    className="w-full"
                    title={"Tempat Lahir"}
                    name={"tempat_lahir"}
                    value={data.tempat_lahir}
                    errors={errors.tempat_lahir}
                    onChange={(e) =>
                        setData({
                            ...data,
                            [e.target.name]: e.target.value,
                        })
                    }
                />
                <InputText
                    required
                    type="date"
                    className="w-full"
                    title={"Tanggal Lahir"}
                    name={"tanggal_lahir"}
                    value={data.tanggal_lahir}
                    errors={errors.tanggal_lahir}
                    onChange={(e) =>
                        setData({
                            ...data,
                            [e.target.name]: e.target.value,
                        })
                    }
                />
                <InputText
                    type="file"
                    className="w-full"
                    title={"Foto"}
                    name={"image"}
                    errors={errors.image}
                    onChange={(e) =>
                        setData({
                            ...data,
                            [e.target.name]: e.target.files[0],
                        })
                    }
                />
            </div>
            <div className="flex flex-col gap-3">
                <InputText
                    className="w-full"
                    title={"Email"}
                    name={"email"}
                    value={data.email}
                    errors={errors.email}
                    onChange={(e) =>
                        setData({ ...data, [e.target.name]: e.target.value })
                    }
                />
                <InputText
                    type="password"
                    className="w-full"
                    title={"Password"}
                    name={"password"}
                    value={data.password}
                    errors={errors.password}
                    onChange={(e) =>
                        setData({ ...data, [e.target.name]: e.target.value })
                    }
                />
                <InputText
                    type="password"
                    className="w-full"
                    title={"Konfirmasi Password"}
                    name={"password_confirmation"}
                    value={data.password_confirmation}
                    errors={errors.password_confirmation}
                    onChange={(e) =>
                        setData({ ...data, [e.target.name]: e.target.value })
                    }
                />
            </div>
            <div className="flex gap-3 items-center">
                <button className=" py-2 my-3 text-white bg-teal-500 px-5 rounded-md">
                    Submit
                </button>
            </div>
        </form>
    );
}
