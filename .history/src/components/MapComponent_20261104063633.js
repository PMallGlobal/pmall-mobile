import { useState, useEffect } from "react";
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
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
});

function ChangeMapView({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.flyTo(coords, 16, { animate: true, duration: 1.5 });
    }
  }, [coords, map]);
  return null;
}

function LocationPicker({ setPosition }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    }
  });
  return null;
}

export default function MapComponent({ onLocationSelect }) {
  const [search, setSearch] = useState("");
  const [position, setPosition] = useState(null);
  const [addressText, setAddressText] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle Search
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return;

    setLoading(true);
    try {
      const response = await axios.get("https://nominatim.openstreetmap.org/search", {
        params: {
          q: search,
          format: "json",
          countrycodes: "ng", // restrict to Nigeria
          limit: 1,
          addressdetails: 1
        }
      });

      if (response.data.length > 0) {
        const { lat, lon, display_name } = response.data[0];
        setPosition([parseFloat(lat), parseFloat(lon)]);
        setAddressText(display_name);
        if (onLocationSelect) onLocationSelect(display_name, [parseFloat(lat), parseFloat(lon)]);
      } else {
        alert("Area not found. Try searching a nearby landmark.");
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Reverse Geocoding (When user clicks the map)
  useEffect(() => {
    if (!position) return;
    
    // Don't reverse geocode if position was just set by search (already has address)
    const getAddress = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://nominatim.openstreetmap.org/reverse", {
          params: {
            lat: position[0],
            lon: position[1],
            format: "json",
          }
        });
        if (response.data && response.data.display_name) {
          setAddressText(response.data.display_name);
          if (onLocationSelect) onLocationSelect(response.data.display_name, position);
        }
      } catch (error) {
        console.error("Reverse geocode error:", error);
      } finally {
        setLoading(false);
      }
    };

    // Only reverse geocode if we don't have an address for this position yet
    // (simple heuristic: if address is empty or search query doesn't match)
    if (!addressText) {
       getAddress();
    }
  }, [position]); // removed addressText from deps to prevent infinite loops

  return (
    <div className="map-wrapper">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="map-search-bar">
        <input
          type="text"
          placeholder="Search area, street, or landmark..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "..." : <SearchIcon />}
        </button>
      </form>

      {/* Map Container */}
      <div className="map-container-inner">
        <MapContainer
          center={[6.5244, 3.3792]} // Default Lagos
          zoom={13}
          style={{ height: "300px", width: "100%", borderRadius: "12px", zIndex: 0 }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <ChangeMapView coords={position} />
          <LocationPicker setPosition={setPosition} />

          {position && (
            <Marker position={position}>
              <Popup>Selected Location</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>

      {/* Selected Address Display */}
      {addressText && (
        <div className="map-address-card">
          <LocationOnIcon className="text-purple-600" />
          <p>{addressText}</p>
        </div>
      )}
    </div>
  );
}