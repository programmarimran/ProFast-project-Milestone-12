import React, { useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Swal from "sweetalert2";
const MapComponent = ({ serviceAreadata }) => {
  console.log(serviceAreadata);
  const searchRef = useRef();
  // const [searchText, setSearchText] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const ChangeView = ({ center, zoom }) => {
    const map = useMap();
    map.flyTo(center, zoom, {
      animate: true,
      duration: 1, 
    });
    return null;
  };

  // console.log(searchText);
  const handleSearch = () => {
    const searchText = searchRef.current.value;
    const match = serviceAreadata.find((item) =>
      item.city.toLowerCase().includes(searchText.toLowerCase().trim())
    );
   if (match) {
  setSelectedDistrict(match);
} else {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "This location is not valid. Try again!",
    confirmButtonColor: "#d33"
  });
}
  };
  return (
    <div className="h-[800px] rounded-xl overflow-hidden shadow border border-gray-300">
      {/* 🔍 Search Box */}
      <div className="flex justify-center my-4 gap-2">
        <input
          type="text"
          placeholder="Search district..."
          className="input input-bordered w-full max-w-xs"
          ref={searchRef}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>
      <MapContainer
        center={[23.8103, 90.4125]}
        zoom={8}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {serviceAreadata.map((district, index) => (
          <Marker
            key={index}
            position={[district.latitude, district.longitude]}
          >
            <Popup>
              <div>
                <h1 className=" font-extrabold text-lg">{district.city}</h1>
                <div>
                  {district.covered_area.map((area, indx) => (
                    <p className="" key={indx}>
                      {area}
                    </p>
                  ))}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
        {/* Auto Zoom to searched district */}
        {selectedDistrict && (
          <ChangeView
            center={[selectedDistrict.latitude, selectedDistrict.longitude]}
            zoom={12}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
