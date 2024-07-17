import AuthLayout from "@/Layouts/AuthLayout";
import InputText from "@/Layouts/InputText";
import { useForm } from "@inertiajs/react";
import { Editor } from "@tinymce/tinymce-react";

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Create(props) {
    const informasi = props.informasi;
    const { data, setData, post, reset, errors } = useForm({
        judul: "",
        deskripsi: "",
        foto: "",
    });
    const handleEditorChange = (content, editor) => {
        setData("deskripsi", content);
        console.log(content);
    };
    const [editorContent, setEditorContent] = useState("");
    const [initialContentSet, setInitialContentSet] = useState(false);
    useEffect(() => {
        // Set the initial content only once
        if (!initialContentSet && data.deskripsi) {
            setEditorContent(data.deskripsi);
            setInitialContentSet(true);
        }
    }, [data.deskripsi, initialContentSet]);
    const submit = async (e) => {
        e.preventDefault();
        post("/admin/create-informasi", {
            onSuccess: () => {
                Swal.fire({
                    title: "Sukses",
                    text: "Berhasil menambahkan 1 informasi baru.",
                    icon: "success",
                });
                setModel(null);
            },
            onError: () => {
                Swal.fire({
                    title: "Error",
                    text: "Upps... Gagal menambahkan 1 informasi baru, silahkan periksa isian anda kemabali.",
                    icon: "error",
                });
            },
            preserveScroll: true,
            preserveState: true,
        });
    };

    useEffect(() => {
        if (informasi) {
            setData({
                slug: informasi.slug,
                judul: informasi.judul,
                deskripsi: informasi.deskripsi,
                foto: informasi.foto,
            });
        }
    }, [informasi]);
    const update = (e) => {
        e.preventDefault();
        post("/admin/update-informasi", {
            onSuccess: () => {
                Swal.fire({
                    title: "Sukses",
                    text: "Berhasil mengubah data informasi.",
                    icon: "success",
                });
                setModel(null);
            },
            onError: () => {
                Swal.fire({
                    title: "Error",
                    text: "Upps... Gagal mengubah data informasi , silahkan periksa isian anda kemabali.",
                    icon: "error",
                });
            },
            preserveScroll: true,
            preserveState: true,
        });
    };
    return (
        <form className="w-full" onSubmit={informasi ? update : submit}>
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3 my-3">
                <InputText
                    name="judul"
                    title="Judul"
                    className="w-full"
                    errors={errors.judul}
                    value={data.judul}
                    onChange={(e) =>
                        setData({ ...data, judul: e.target.value })
                    }
                />
                <div>
                    <InputText
                        type="file"
                        name="judul"
                        title="Judul"
                        errors={errors.foto}
                        onChange={(e) =>
                            setData({ ...data, foto: e.target.files[0] })
                        }
                        className="w-full"
                    />
                </div>
            </div>
            {informasi && (
                <p className="bg-slate-300 p-1 rounded-md my-3">
                    Jika tidak ingin mengganti foto informasi, biarkan kosong.
                </p>
            )}
            <button className="bg-blue-500 p-2 rounded-md hover:bg-blue-700 transition-all duration-300 ease-in-out text-white mb-3 w-full">
                {informasi ? "Update Informasi" : "Simpan Informasi"}
            </button>
            <Editor
                apiKey="lznar9zd7ui4asitqum3yik51ug6xvk7mhhmm4h72r4np1lw"
                init={{
                    selector: "textarea",
                    plugins:
                        "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker fullscreen",
                    toolbar:
                        "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat fullscreen ",
                }}
                onEditorChange={handleEditorChange}
                initialValue={editorContent}
            />
        </form>
    );
}

Create.layout = (page) => (
    <AuthLayout children={page} title={"Create Informasi"} />
);
