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
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("login.post"), {
            onSuccess: () => {
                Swal.fire({
                    title: "Sukses",
                    text: "Anda berhasil login",
                    icon: "success",
                });
            },
            onError: () => {
                Swal.fire({
                    title: "Gagal Login",
                    text: "Upps... Login gagal, periksa kembali isian yang anda masukkan",
                    icon: "error",
                });
            },
            preserveScroll: true,
        });
    };
    return (
        <div className="py-6 px-4 md:px-8 lg:px-16">
            <h3 className="my-3 text-xl font-bold text-teal-700">
                Login Akun{" "}
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

                <div className="flex gap-3 items-center">
                    <button className=" py-2 my-3 text-white bg-teal-500 px-5 rounded-md">
                        Login
                    </button>
                    <Link
                        href={route("register")}
                        className="text-md italic text-teal-500"
                    >
                        Register jika belum punya akun?
                    </Link>
                </div>
            </form>
        </div>
    );
}

Index.layout = (page) => <GuestLayout children={page} title={"Login"} />;
