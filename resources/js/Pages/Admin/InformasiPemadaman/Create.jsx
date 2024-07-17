import AuthLayout from "@/Layouts/AuthLayout";
import InputText from "@/Layouts/InputText";
import { useForm, usePage } from "@inertiajs/react";
import zIndex from "@mui/material/styles/zIndex";
import { Editor } from "@tinymce/tinymce-react";

import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";
import Swal from "sweetalert2";

export default function Create(props) {
    const informasi = props.informasi;
    const { wilayah } = usePage().props;
    const { data, setData, post, reset, errors } = useForm({
        judul: "",
        deskripsi: "",
        jam_padam: "",
        jam_selesai: "",
        wilayah_kerja_id: "",
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
        post(route("admin.informasi-pemadaman-post"), {
            onSuccess: () => {
                Swal.fire({
                    title: "Sukses",
                    text: "Berhasil menambahkan 1 informasi pemadaman baru.",
                    icon: "success",
                });
                setModel(null);
            },
            onError: () => {
                Swal.fire({
                    title: "Error",
                    text: "Upps... Gagal menambahkan 1 informasi pemadaman baru, silahkan periksa isian anda kemabali.",
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
                jam_padam: informasi.jam_padam,
                jam_selesai: informasi.jam_selesai,
                wilayah_kerja_id: informasi.wilayah_kerja_id,
            });
        }
    }, [informasi]);
    const update = (e) => {
        e.preventDefault();
        post("/admin/update-informasi", {
            onSuccess: () => {
                Swal.fire({
                    title: "Sukses",
                    text: "Berhasil mengupdate informasi pemadaman",
                    icon: "success",
                });
                setModel(null);
            },
            onError: () => {
                Swal.fire({
                    title: "Error",
                    text: "Upps... Gagal mengupdate informasi pemadaman",
                    icon: "error",
                });
            },
            preserveScroll: true,
            preserveState: true,
        });
    };
    return (
        <form className="w-full" onSubmit={informasi ? update : submit}>
            <ReactSelect
                options={wilayah.map((item) => ({
                    value: item.id,
                    label: item.nama_wilayah,
                }))}
                onChange={(e) =>
                    setData({ ...data, wilayah_kerja_id: e.value })
                }
                styles={{ zIndex: 9999, background: "black" }}
            />
            <div className="w-full grid grid-cols-1 gap-3 my-3 relative">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
                    <InputText
                        type="time"
                        name="jam_padam"
                        title="Jam Padam"
                        errors={errors.jam_padam}
                        onChange={(e) =>
                            setData({ ...data, jam_padam: e.target.value })
                        }
                        value={data.jam_padam}
                        className="w-full"
                    />
                    <InputText
                        type="time"
                        name="jam_selesai"
                        title="Jam Selesai"
                        errors={errors.jam_selesai}
                        onChange={(e) =>
                            setData({ ...data, jam_selesai: e.target.value })
                        }
                        value={data.jam_selesai}
                        className="w-full"
                    />
                </div>
            </div>

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
    <AuthLayout children={page} title={"Create Informasi Pemadaman"} />
);
