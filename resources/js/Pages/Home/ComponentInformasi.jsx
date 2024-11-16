import { Link } from "@inertiajs/react";
import moment from "moment";
import React from "react";

export default function ComponentInformasi({ informasi }) {
    return (
        <>
            {informasi.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 my-3">
                    {informasi.map((item, key) => (
                        <div key={key} className="flex flex-col gap-4">
                            <div className="w-full bg-teal-600 p-2 rounded-md flex justify-center items-center">
                                <img
                                    src={"/storage/" + item.foto}
                                    alt={item.judul}
                                    className="w-full h-[250px] object-cover"
                                />
                            </div>
                            <div className="w-full">
                                <h1 className="text-xl font-medium text-teal-700">
                                    {item.judul}
                                </h1>
                                <p>Post By: {item.post_by}</p>
                                <p>{moment(item.created_at).fromNow()}</p>
                                <p
                                    className="font-light line-clamp-5"
                                    dangerouslySetInnerHTML={{
                                        __html: item.deskripsi,
                                    }}
                                />
                                <Link
                                    href={route("informasi.show", item.slug)}
                                    as="button"
                                    className=" py-2  text-white bg-teal-500 px-5 rounded-md my-2"
                                >
                                    Selengkapnya
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Belum ada informasi yang telah ditambahkan</p>
            )}
        </>
    );
}
