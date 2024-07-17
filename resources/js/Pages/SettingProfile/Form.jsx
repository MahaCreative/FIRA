import InputText from "@/Layouts/InputText";
import { useForm } from "@inertiajs/react";
import React, { useEffect } from "react";

export default function Form({ onClose, model, setModel }) {
    const { data, setData, post, reset, errors } = useForm({
        firstname: "",
        lastname: "",
        phone: "",
        address: "",
        tanggal_lahir: "",
        tempat_lahir: "",

        email: "",
        password: "",
    });
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

            email: model ? model.email : "",
            password: model ? model.password : "",
        });
    }, [model]);

    const update = (e) => {
        e.preventDefault();
        post(route("update-profile"), {
            onSuccess: () => {
                reset();
            },
        });
    };
    return (
        <form onSubmit={update}>
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
                    required
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
