import GuestLayout from "@/Layouts/GuestLayout";
import InputText from "@/Layouts/InputText";
import { Link, useForm } from "@inertiajs/react";
import React from "react";
import Swal from "sweetalert2";

export default function Index() {
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
        no_meter: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("register.post"), {
            onSuccess: () => {
                Swal.fire({
                    title: "Sukses",
                    text: "Anda berhasil login",
                    icon: "success",
                });
            },
            onError: () => {
                Swal.fire({
                    title: "Error",
                    text: "Upps... Gagal mendaftarkan akun baru, silahkan periksa kembali isian anda.",
                    icon: "error",
                });
            },
            preserveScroll: true,
        });
    };
    return (
        <div className="py-6 px-4 md:px-8 lg:px-16">
            <h3 className="my-3 text-xl font-bold text-teal-700">
                Register Akun{" "}
            </h3>
            <form onSubmit={submit}>
                <InputText
                    required
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
                    required
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
                    required
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
                <div className="grid grid-cols-2 gap-3 my-3">
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
                        title={"Nomor Meter"}
                        name={"no_meter"}
                        value={data.no_meter}
                        errors={errors.no_meter}
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
                <div className="flex gap-3 items-center">
                    <button className=" py-2 my-3 text-white bg-teal-500 px-5 rounded-md">
                        Register
                    </button>
                    <Link
                        href={route("login")}
                        className="text-md italic text-teal-500"
                    >
                        Login jika telah punya akun?
                    </Link>
                </div>
            </form>
        </div>
    );
}

Index.layout = (page) => <GuestLayout children={page} title={"Register"} />;
