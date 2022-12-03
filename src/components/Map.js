import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const Map = ({ data }) => {
  return (
    <div>
      <MapContainer
        center={[data[6].address.geo.lat, data[6].address.geo.lng]}
        zoom={1}
        scrollWheelZoom={false}
        style={{ width: "100%", height: "100vh" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data.map((item) => (
          <Marker position={[item.address.geo.lat, item.address.geo.lng]}>
            <Popup>{item.address.city}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
