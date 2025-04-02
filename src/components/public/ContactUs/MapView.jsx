import React from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon issues in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
});

const OpenStreetMapComponent = () => {
  // Replace with your specific location coordinates
  const position = [22.3150350, 73.1951679]; // Example: Mumbai coordinates

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="max-w-7xl mx-auto mt-16"
    >
      <div className="bg-white rounded-lg shadow-lg p-4">
        <MapContainer 
          center={position} 
          zoom={15} 
          scrollWheelZoom={false}
          className="h-64 w-full rounded-lg"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              Exact Location <br /> Coordinates: {position.join(', ')}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </motion.div>
  );
};

export default OpenStreetMapComponent;