import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { GoogleMap, DirectionsService, DirectionsRenderer, Marker } from '@react-google-maps/api';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const paperContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  width: '80%',
  margin: '10px auto',
};

const styles = {
  paperStyle1: { padding: '20px', width: '80%', marginTop: '30px', height: 'fit-content' },
  paperStyle: { padding: '20px', width: '100%', marginTop: '20px' },
  errorStyle: { color: 'red', marginTop: '5px' },
  mapContainer: { marginTop: '20px', position: 'relative' },
  markerLabel: { position: 'absolute', top: '-30px', left: '-15px', backgroundColor: 'white', padding: '5px', borderRadius: '5px' },
};

const SimpleItinerary = () => {
  const [obiective, setObiective] = useState([]);
  const [oras, setOras] = useState('');
  const [oraStart, setOraStart] = useState('');
  const [oraEnd, setOraEnd] = useState('');
  const [pretMaxim, setPretMaxim] = useState('');
  const [error, setError] = useState('');
  const [response, setResponse] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [travelMode, setTravelMode] = useState('DRIVING');
  const [history, setHistory] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const loadGoogleMapScript = () => {
      const googleMapScript = document.createElement('script');
      googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCHK16A91qWhNwiaS6G4pmzOFGfO1ITIpI&libraries=places`;
      googleMapScript.onload = () => {
        setDirectionsService(new window.google.maps.DirectionsService());
      };
      document.head.append(googleMapScript);
    };

    loadGoogleMapScript();

    return () => {
      const googleMapScript = document.querySelector('script[src^="https://maps.googleapis.com"]');
      if (googleMapScript) {
        googleMapScript.remove();
      }
    };
  }, []);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('simpleItineraryHistory')) || [];
    setHistory(storedHistory.reverse());
    generateRecommendations(storedHistory.reverse());
  }, []);

  const handleOrasChange = (_, newValue) => {
    setOras(newValue);
    updateRecommendations(newValue, oraStart, oraEnd, pretMaxim);
  };

  const handleOraStartChange = (event) => {
    const value = event.target.value;
    if (!isNaN(value) && value >= 0 && value <= 24) {
      setOraStart(parseInt(value));
      updateRecommendations(oras, parseInt(value), oraEnd, pretMaxim);
    } else {
      setError('Ora de start trebuie să fie un număr între 0 și 24.');
    }
  };

  const handleOraEndChange = (event) => {
    const value = event.target.value;
    if (!isNaN(value) && value >= 0 && value <= 24) {
      setOraEnd(parseInt(value));
      updateRecommendations(oras, oraStart, parseInt(value), pretMaxim);
    } else {
      setError('Ora de sfârșit trebuie să fie un număr între 0 și 24.');
    }
  };

  const handlePretMaximChange = (event) => {
    const value = event.target.value;
    setPretMaxim(parseInt(value));
    updateRecommendations(oras, oraStart, oraEnd, parseInt(value));
  };

  const handleGenerateItinerary = async () => {
    if (oras && oraStart !== '' && oraEnd !== '' && pretMaxim !== '') {
      try {
        const response = await fetch(`http://localhost:8080/obiectiv/getItinerariu?oras=${oras}&oraStart=${oraStart}&oraEnd=${oraEnd}&pretMaxim=${pretMaxim}`);
        const data = await response.json();
        setObiective(data);
        setError('');
        setShowMap(false); 

        
        const newItinerary = { oras, oraStart, oraEnd, pretMaxim, date: new Date(), obiective: data };
        const storedHistory = JSON.parse(localStorage.getItem('simpleItineraryHistory')) || [];
        storedHistory.push(newItinerary);
        localStorage.setItem('simpleItineraryHistory', JSON.stringify(storedHistory));
        setHistory(storedHistory.reverse());

      } catch (error) {
        setError('A apărut o eroare în procesarea cererii.');
      }
    } else {
      setError('Te rog să completezi toate câmpurile.');
    }
  };

  const generateRecommendations = (history) => {
    if (history.length === 0) return;

    
    const cityFrequency = history.reduce((acc, curr) => {
      acc[curr.oras] = (acc[curr.oras] || 0) + 1;
      return acc;
    }, {});

    const recommendedCities = Object.keys(cityFrequency).sort((a, b) => cityFrequency[b] - cityFrequency[a]);
    setRecommendations(recommendedCities.slice(0, 3)); 
  };

  const updateRecommendations = (oras, oraStart, oraEnd, pretMaxim) => {
    const filteredHistory = history.filter(item => {
      return (oras ? item.oras === oras : true) &&
             (oraStart ? item.oraStart === oraStart : true) &&
             (oraEnd ? item.oraEnd === oraEnd : true) &&
             (pretMaxim ? item.pretMaxim === pretMaxim : true);
    });

    generateRecommendations(filteredHistory);
  };

  const handleRecommendationClick = (city) => {
    setOras(city);
    updateRecommendations(city, oraStart, oraEnd, pretMaxim);
  };

  const generateAndDisplayRoute = () => {
    if (!directionsService || obiective.length === 0) return;

    const startAddress = obiective[0].address;
    const endAddress = obiective[obiective.length - 1].address;

    const waypoints = obiective.slice(1, -1).map((obiectiv) => ({
      location: obiectiv.address,
      stopover: true,
    }));

    directionsService.route(
      {
        origin: startAddress,
        destination: endAddress,
        waypoints: waypoints,
        travelMode: travelMode,
      },
      (result, status) => {
        if (status === 'OK') {
          setResponse(result);
        } else {
          console.error(`Directions service failed due to ${status}`);
        }
      }
    );
  };

  useEffect(() => {
    if (showMap) {
      generateAndDisplayRoute();
    }
  }, [obiective, travelMode, showMap]);

  const onMapLoad = (map) => {
    
  };

  const handleShowMap = () => {
    setShowMap(true);
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    const title = 'ITINERARY';
    const titleWidth = doc.getStringUnitWidth(title) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const titleOffset = (doc.internal.pageSize.width - titleWidth) / 2;
    doc.text(title, titleOffset, 10);

    const tableColumn = ["Visiting Hour", "Name", "City", "Category", "Address", "Opening Hours", "Price (RON)", "Time (h)", "Rating"];
    const tableRows = [];

    obiective.forEach(obiectiv => {
      const obiectivData = [
        `${obiectiv.ora_propusa}:00`,
        obiectiv.name,
        obiectiv.oras,
        obiectiv.categorie,
        obiectiv.address,
        `${obiectiv.ora_deschidere}:00 - ${obiectiv.ora_inchidere}:00`,
        obiectiv.pret,
        obiectiv.timp,
        obiectiv.rating
      ];
      tableRows.push(obiectivData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save(`itinerary_${oras.toLowerCase()}.pdf`);
  };

  const handleNavigate = () => {
    if (window.google && obiective.length > 0) {
      
      const waypoints = obiective.slice(0, -1).map(obiectiv => ({ location: obiectiv.address, stopover: true }));

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          let gmapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${currentPosition.lat},${currentPosition.lng}&destination=${obiective[obiective.length - 1].address}&travelmode=${travelMode.toLowerCase()}`;
          if (waypoints.length > 0) {
            const waypointAddresses = waypoints.map(wp => wp.location).join('|');
            gmapsUrl += `&waypoints=${encodeURIComponent(waypointAddresses)}`;
          }

          window.open(gmapsUrl, '_blank');
        },
        (error) => {
          console.error(`Geolocation failed due to ${error.message}`);
        }
      );
    }
  };

  return (
    <Box textAlign="center">
      <Container maxWidth="xl" style={paperContainerStyle}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ ...styles.paperStyle1, paddingRight: '20px' }}>
              <h1 style={{ color: '#1888ff', marginBottom: '20px' }}>INSERT DETAILS</h1>
              <Autocomplete
                id="city-autocomplete"
                options={['Istanbul', 'Buffalo']}
                renderInput={(params) => (
                  <TextField {...params} label="City name" variant="outlined" fullWidth />
                )}
                value={oras}
                onChange={handleOrasChange}
                freeSolo
                autoHighlight
              />
              <TextField
                id="ora-start"
                label="Start hour"
                type="number"
                variant="outlined"
                fullWidth
                value={oraStart}
                onChange={handleOraStartChange}
                style={{ marginTop: '10px' }}
              />
              <TextField
                id="ora-end"
                label="End hour"
                type="number"
                variant="outlined"
                fullWidth
                value={oraEnd}
                onChange={handleOraEndChange}
                style={{ marginTop: '10px' }}
              />
              <TextField
                id="pret-maxim"
                label="Maximum price"
                type="number"
                variant="outlined"
                fullWidth
                value={pretMaxim}
                onChange={handlePretMaximChange}
                style={{ marginTop: '10px' }}
              />
              <FormControl fullWidth style={{ marginTop: '10px' }}>
                <InputLabel id="travel-mode-label">Travel Mode</InputLabel>
                <Select
                  labelId="travel-mode-label"
                  id="travel-mode-select"
                  value={travelMode}
                  label="Travel Mode"
                  onChange={(e) => setTravelMode(e.target.value)}
                >
                  <MenuItem value="DRIVING">Driving</MenuItem>
                  <MenuItem value="WALKING">Walking</MenuItem>
                </Select>
              </FormControl>
              {error && <p style={styles.errorStyle}>{error}</p>}
              <Button
                variant="contained"
                color="primary"
                onClick={handleGenerateItinerary}
                style={{ marginTop: '10px' }}
              >
                Generate Itinerary
              </Button>
              {recommendations.length > 0 && (
                <div>
                  <h3>Recommended Cities</h3>
                  <ul>
                    {recommendations.map((city, index) => (
                      <li key={index} onClick={() => handleRecommendationClick(city)} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
                        {city}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Paper>
          </Grid>
          {obiective.length > 0 && (
            <Grid item xs={12} md={6}>
              <Paper elevation={3} style={styles.paperStyle}>
                {obiective.map((obiectiv, index) => (
                  <Paper elevation={6} style={{ padding: "15px", margin: "10px auto", textAlign: "left", position: "relative" }} key={obiectiv.id}>
                    <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                      {String.fromCharCode(65 + index)}. {obiectiv.ora_propusa}:00
                    </div>
                    <div>
                      Name: {obiectiv.name} <br />
                      City: {obiectiv.oras} <br />
                      Category: {obiectiv.categorie} <br />
                      Address: {obiectiv.address} <br />
                      Program: {obiectiv.ora_deschidere}:00 - {obiectiv.ora_inchidere}:00<br />
                      Price: {obiectiv.pret} RON<br />
                      Time: {obiectiv.timp} h<br />
                      Rating: {obiectiv.rating} stars
                    </div>
                  </Paper>
                ))}
                <Box display="flex" justifyContent="center" marginTop="10px">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleShowMap}
                    style={{ marginRight: '10px' }}
                  >
                    Show Map
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleGeneratePDF}
                    style={{ marginRight: '10px' }}
                  >
                    Generate PDF
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleNavigate}
                  >
                    Navigate
                  </Button>
                </Box>
              </Paper>
            </Grid>
          )}
          {obiective.length > 0 && showMap && (
            <Grid item xs={12} style={styles.mapContainer}>
              <GoogleMap
                onLoad={onMapLoad}
                mapContainerStyle={{ width: "100%", height: "400px" }}
                zoom={14}
                center={{ lat: 37.77, lng: -122.447 }}
                options={{
                  disableDefaultUI: true,
                  zoomControl: true
                }}
              >
                {response && <DirectionsRenderer directions={response} />}
                {obiective.map((obiectiv, index) => (
                  <Marker
                    key={obiectiv.id}
                    position={{ lat: obiectiv.lat, lng: obiectiv.lng }}
                    label={{ text: String.fromCharCode(65 + index), fontWeight: 'bold', fontSize: '14px', ...styles.markerLabel }}
                  />
                ))}
              </GoogleMap>
            </Grid>
          )}
        </Grid>
      </Container>
      <Container maxWidth="xl" style={{ marginTop: '40px' }}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <h2>Itinerary History</h2>
          {history.length > 0 ? (
            history.map((item, index) => (
              <Paper
                elevation={6}
                style={{ padding: '15px', margin: '10px auto', textAlign: 'left', position: 'relative' }}
                key={index}
              >
                <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                  Itinerary {index + 1}
                </div>
                <div>
                  <p>City: {item.oras}</p>
                  <p>Start Hour: {item.oraStart}</p>
                  <p>End Hour: {item.oraEnd}</p>
                  <p>Maximum Price: {item.pretMaxim}</p>
                  <p>Date: {new Date(item.date).toLocaleString()}</p>
                  {item.obiective && (
                    <>
                      <p>Objectives:</p>
                      {item.obiective.map((obiectiv, i) => (
                        <div key={i} style={{ marginLeft: '20px' }}>
                          <p>{String.fromCharCode(65 + i)}. {obiectiv.name} ({obiectiv.categorie}) - {obiectiv.ora_propusa}:00</p>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </Paper>
            ))
          ) : (
            <p>No history available.</p>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default SimpleItinerary;
