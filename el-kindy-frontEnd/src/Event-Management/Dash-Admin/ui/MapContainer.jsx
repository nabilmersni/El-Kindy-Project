// LeafletMapComponent.js
import React, { useEffect, useState } from 'react';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import axios from 'axios'; // Import Axios for making HTTP requests

function LeafletMapComponent({ handlePlaceSelect }) {
  const [mapState, setMapState] = useState({
    zoom: 6,
    center: [33.8869, 9.5375]
  });

  useEffect(() => {
    const map = L.map('map-container').setView(mapState.center, mapState.zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const handleMapClick = async (e) => {
      const { lat, lng } = e.latlng;
      
      // Make a request to a geocoding API to get the address from the coordinates
      try {
        const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=2194d84fa01f48b29b7855cf77d7810d`);
        
        if (response.data.results.length > 0) {
          const place = response.data.results[0].formatted;
          handlePlaceSelect(place);
        } else {
          console.error("No results found");
        }
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };

    map.on('click', handleMapClick);

    return () => {
      map.off('click', handleMapClick);
      map.remove();
    };
  }, [handlePlaceSelect, mapState]);

  return <div id="map-container" style={{ height: '400px' }}></div>;
}

export default LeafletMapComponent;
