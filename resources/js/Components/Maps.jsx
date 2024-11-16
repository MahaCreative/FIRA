import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
export default function Maps({
    onMapClick,
    position,
    children,
    zoom = 9,

    ...props
}) {
    function LocationMarker() {
        useMapEvents({
            dblclick(e) {
                const { lat, lng } = e.latlng;
                onMapClick({ lat, lng });
            },
        });

        return null;
    }
    return (
        <MapContainer center={position} zoom={zoom} {...props}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
            {children}
        </MapContainer>
    );
}
