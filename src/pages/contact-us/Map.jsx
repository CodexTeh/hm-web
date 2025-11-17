import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const Map = ({ selectedLocation, rtl }) => {
  const [MapComponents, setMapComponents] = useState(null);
  const [customIcon, setCustomIcon] = useState(null);

  // Dynamically import Leaflet and react-leaflet
  useEffect(() => {
    const loadMapLibraries = async () => {
      // Dynamically import Leaflet
      const Leaflet = await import('leaflet');
      const L = Leaflet.default;
      
      // Dynamically import react-leaflet components
      const ReactLeaflet = await import('react-leaflet');
      const { MapContainer, TileLayer, Marker, Popup, useMap } = ReactLeaflet;
      
      // Create custom icon after Leaflet is loaded
      const icon = new L.Icon({
        iconUrl: markerIcon,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: markerShadow,
        shadowSize: [41, 41],
      });
      
      setCustomIcon(icon);
      setMapComponents({ MapContainer, TileLayer, Marker, Popup, useMap });
    };
    
    loadMapLibraries();
  }, []);

  // Show loading state until libraries are loaded
  if (!MapComponents || !customIcon) {
    return (
      <div style={{ 
        height: '100%', 
        width: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        borderRadius: 8,
        backgroundColor: '#f5f5f5'
      }}>
        Loading map...
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, Popup, useMap } = MapComponents;

  // Map center updater for selected location (must be a separate component to use useMap hook)
  const MapCenterUpdater = ({ lat, lng }) => {
    const map = useMap();
    useEffect(() => {
      map.setView([lat, lng], map.getZoom());
    }, [lat, lng, map]);
    return null;
  };

  // Create MapCenterUpdater component with useMap hook access
  const MapContent = () => (
    <>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker icon={customIcon} position={[selectedLocation.lat, selectedLocation.lng]}>
        <Popup>{rtl ? selectedLocation.name_ar : selectedLocation.name_en}</Popup>
      </Marker>
      <MapCenterUpdater lat={selectedLocation.lat} lng={selectedLocation.lng} />
    </>
  );

  return (
    <MapContainer
      center={[selectedLocation.lat, selectedLocation.lng]}
      zoom={15}
      style={{ height: '100%', width: '100%', borderRadius: 8 }}
    >
      <MapContent />
    </MapContainer>
  );
};

export default Map;

