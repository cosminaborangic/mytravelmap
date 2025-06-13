import React, { useState, useEffect } from "react";
import { GoogleMap, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";

const Map = () => {
  const [mode, setMode] = useState("DRIVING");
  const [response, setResponse] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);

  useEffect(() => {
    if (!directionsService) return;

    const calculateAndDisplayRoute = () => {
      const startAddress = "Bereketzade, 34421 Beyoğlu/İstanbul, Turcia";
      const stopAddress = "Sultan Ahmet, Ayasofya Meydanı No:1, 34122 Fatih/İstanbul, Turcia";
      const endAddress = "Vişnezade, Dolmabahçe Cd., 34357 Beşiktaş/İstanbul, Turcia";

      const waypoints = [
        { location: stopAddress, stopover: true }
      ];

      directionsService.route(
        {
          origin: startAddress,
          destination: endAddress,
          waypoints: waypoints,
          travelMode: mode
        },
        (result, status) => {
          if (status === "OK") {
            setResponse(result);
          } else {
            console.error(`Directions service failed due to ${status}`);
          }
        }
      );
    };

    calculateAndDisplayRoute();
  }, [mode, directionsService]);

  const onMapLoad = (map) => {
    setDirectionsService(new window.google.maps.DirectionsService());
  };

  const onModeChange = (event) => {
    setMode(event.target.value);
  };

  return (
    <GoogleMap
      onLoad={onMapLoad}
      mapContainerStyle={{ width: "100%", height: "400px" }}
      zoom={14}
      center={{ lat: 37.77, lng: -122.447 }}
      options={{
        disableDefaultUI: true,
        zoomControl: true
      }}
      apiKey="AIzaSyCHK16A91qWhNwiaS6G4pmzOFGfO1ITIpI" 
    >
      {response && <DirectionsRenderer directions={response} />}
      <div id="floating-panel">
        <b>Mode of Travel: </b>
        <select id="mode" value={mode} onChange={onModeChange}>
          <option value="DRIVING">Driving</option>
          <option value="WALKING">Walking</option>
          <option value="BICYCLING">Bicycling</option>
          <option value="TRANSIT">Transit</option>
        </select>
      </div>
    </GoogleMap>
  );
};

export default Map;
