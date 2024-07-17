import React, { useEffect, useRef, useState } from "react";
import * as turf from "@turf/turf";
import {
    FeatureGroup,
    MapContainer,
    TileLayer,
    GeoJSON,
    Popup,
    Marker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { EditControl } from "react-leaflet-draw";
import L, { divIcon } from "leaflet";
export default function DrawMap({ setModal, setData, data, allWilayah }) {
    const featureGroupRef = useRef(null);
    const [geojsonData, setGeojsonData] = useState(null);
    const handleCreated = (e) => {
        const layer = e.layer;
        const geojson = layer.toGeoJSON();
        setModal(true);

        setData({
            ...data,
            geojson: JSON.stringify(geojson),
            geostring: JSON.stringify(geojson, null, 2),
        });
    };
    console.log(allWilayah);
    const setIcon = (feature, latlng) => {
        return L.marker(latlng, {
            icon: L.divIcon({
                className: "custom-icon",
                html: "<div>" + "RRRRR" + "</div>",
                iconSize: [40, 40],
            }),
        });
    };
    const pointToLayer = (feature, latlng) => {
        return L.marker(latlng, {
            icon: L.divIcon({
                className: "custom-icon",
                html: `<div>${feature.properties.name}</div>`,
                iconSize: [40, 40],
            }),
        });
    };
    return (
        <>
            <MapContainer
                center={[-2.674218739577445, 118.89448120837064]}
                zoom={16}
                style={{ height: "80vh", width: "100%" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <FeatureGroup ref={featureGroupRef}>
                    <EditControl
                        position="topleft"
                        onCreated={handleCreated}
                        draw={{
                            rectangle: false,
                            polyline: false,
                            polygon: true,
                            circle: true,
                            marker: false,
                            circlemarker: false,
                        }}
                    />
                </FeatureGroup>
                {allWilayah.map((item, key) => {
                    const geojson = JSON.parse(item.geojson);
                    const centroid =
                        turf.centroid(geojson).geometry.coordinates;

                    const textIcon = L.divIcon({
                        html: `<div style="color: black; font-size: 12px">${item.nama_wilayah}</div>`,
                        className: "", // Ensure no default styles are applied
                    });

                    return (
                        <React.Fragment key={key}>
                            <GeoJSON
                                style={{ color: item.kode_warna }}
                                data={geojson}
                            />
                            <Marker
                                position={[centroid[1], centroid[0]]}
                                icon={textIcon}
                            />
                        </React.Fragment>
                    );
                })}
            </MapContainer>
        </>
    );
}
function calculateCenter(geojson) {
    // Anda dapat menyesuaikan logika ini sesuai dengan format GeoJSON Anda
    // Misalnya, untuk Polygon, Anda dapat menghitung titik tengah dari koordinat
    // Untuk contoh sederhana, kita akan menggunakan titik pertama dari GeoJSON
    const coordinates = geojson.geometry.coordinates[0]; // Ambil koordinat
    const lat = coordinates[0][1]; // Ambil latitude
    const lng = coordinates[0][0]; // Ambil longitude
    return [lat, lng]; // Kembalikan posisi titik tengah
}
