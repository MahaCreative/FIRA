import useSweetAlert from "@/Components/SweetAlert";
import InputText from "@/Layouts/InputText";
import { router, useForm } from "@inertiajs/react";
import { Editor } from "@tinymce/tinymce-react";
import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

export default function Form({ setting }) {
    const { data, setData, post, reset, errors } = useForm({
        nama_kantor: setting.nama_kantor,
        deskripsi: setting.deskripsi,
        telph: setting.telph,
        alamat: setting.alamat,
        nama_pimpinan: setting.nama_pimpinan,
    });
    const showAlert = useSweetAlert();

    const [editorContent, setEditorContent] = useState("");
    const [initialContentSet, setInitialContentSet] = useState(false);
    const handleEditorChange = (content, editor) => {
        setData("deskripsi", content);
    };
    useEffect(() => {
        // Set the initial content only once
        if (!initialContentSet && data.deskripsi) {
            setEditorContent(data.deskripsi);
            setInitialContentSet(true);
        }
    }, [data.deskripsi, initialContentSet]);

    const submit = (e) => {
        e.preventDefault();
        showAlert({
            title: "Update Profile?",
            text: "Apakah anda yakin ingin memperbaharui profile perusahaan?",
            confirmText: "Yakin",
            cancelText: "Cancell",
            onConfirm: () => {
                post(route("admin.update-setting-apps"), {
                    onSuccess: () => {
                        Swal.fire({
                            title: "Sukses",
                            text: "Profile perusahaan berhasil diperbaharui",
                            icon: "success",
                        });
                    },
                    onError: () => {
                        Swal.fire({
                            title: "Gagal",
                            text: "Profile perusahaan gagal diperbaharui",
                            icon: "error",
                        });
                    },
                });
            },
            onCancel: () => {},
            icon: "warning",
        });
    };
    return (
        <form onSubmit={submit} className="w-full flex flex-col gap-3">
            <InputText
                className="w-full"
                name={"nama_kantor"}
                title={"Nama Kantor"}
                value={data.nama_kantor}
                errors={errors.nama_kantor}
                onChange={(e) =>
                    setData({ ...data, [e.target.name]: e.target.value })
                }
            />
            <InputText
                className="w-full"
                name={"telph"}
                title={"Nomor Telephone"}
                value={data.telph}
                errors={errors.telph}
                onChange={(e) =>
                    setData({ ...data, [e.target.name]: e.target.value })
                }
            />
            <InputText
                className="w-full"
                name={"alamat"}
                title={"Alamat"}
                value={data.alamat}
                errors={errors.alamat}
                onChange={(e) =>
                    setData({ ...data, [e.target.name]: e.target.value })
                }
            />
            <InputText
                className="w-full"
                name={"nama_pimpinan"}
                title={"Nama Pimpinan"}
                value={data.nama_pimpinan}
                errors={errors.nama_pimpinan}
                onChange={(e) =>
                    setData({ ...data, [e.target.name]: e.target.value })
                }
            />
            <Editor
                apiKey="lznar9zd7ui4asitqum3yik51ug6xvk7mhhmm4h72r4np1lw"
                init={{
                    selector: "textarea",
                    plugins:
                        "anchor autolink charmap codesample emoticons image link lists media searchreplace visualblocks wordcount linkchecker fullscreen",
                    toolbar:
                        "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | removeformat fullscreen ",
                }}
                onEditorChange={handleEditorChange}
                initialValue={editorContent}
            />
            <button className="bg-teal-600 hover:bg-teal-800 text-white p-2 rounded-md transition-all duration-300 ease-in-out ">
                Simpan
            </button>
        </form>
    );
}
