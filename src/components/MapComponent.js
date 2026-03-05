import { useState } from "react";
import axios from "axios";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
});

// Move map when search result changes
function ChangeMapView({ coords }) {
  const map = useMap();
  if (coords) {
    map.setView(coords, 16);
  }
  return null;
}

// Click picker
function LocationPicker({ setPosition }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    }
  });
  return null;
}

export default function MapComponent() {
  const [search, setSearch] = useState("");
  const [position, setPosition] = useState(null);

  const handleSearch = async () => {
    if (!search) return;

    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: search,
          format: "json",
          countrycodes: "ng", // restrict to Nigeria
          limit: 1
        }
      }
    );

    if (response.data.length > 0) {
      const { lat, lon } = response.data[0];
      setPosition([parseFloat(lat), parseFloat(lon)]);
    } else {
      alert("Area not found. Try searching nearby area.");
    }
  };

  console.log(position)

  return (
    <div>
      {/* Search Bar */}
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Search your area (e.g. Ikeja Lagos)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "8px", width: "300px" }}
        />
        <button
          onClick={handleSearch}
          style={{ padding: "8px", marginLeft: "5px" }}
        >
          Search
        </button>
      </div>

      <MapContainer
        center={[6.5244, 3.3792]}
        zoom={13}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ChangeMapView coords={position} />
        <LocationPicker setPosition={setPosition} />

        {position && (
          <Marker position={position}>
            <Popup>
              <strong>Selected Location</strong>
              <br />
              Latitude: {position[0]}
              <br />
              Longitude: {position[1]}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}