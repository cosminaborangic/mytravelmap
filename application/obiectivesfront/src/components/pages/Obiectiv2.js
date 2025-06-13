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
  restaurantPaperStyle: { padding: '15px', margin: '10px auto', textAlign: 'left', backgroundColor: '#ffffcc' },
};

const getCategoryLabel = (category) => {
  const capitalizedCategory = category.toUpperCase();
  return capitalizedCategory;
};

const Obiectiv2 = () => {
  const [obiective, setObiective] = useState([]);
  const [oras, setOras] = useState('');
  const [oraStart, setOraStart] = useState('');
  const [oraMasa, setMasa] = useState('');
  const [pretMaxim, setPretMaxim] = useState('');
  const [oraEnd, setOraEnd] = useState('');
  const [error, setError] = useState('');
  const [restaurant, setRestaurant] = useState(null);
  const [restaurant2, setRestaurant2] = useState(null);
  const [restaurant3, setRestaurant3] = useState(null);
  const [showPaper, setShowPaper] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [map, setMap] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [travelMode, setTravelMode] = useState('DRIVING');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (restaurant) {
      setRestaurant(prevRestaurant => ({ ...prevRestaurant, ora_propusa: oraMasa }));
    }
  }, [oraMasa]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('obiectiv2ItineraryHistory')) || [];
    setHistory(storedHistory);
  }, []);

  const handleOrasChange = (_, newValue) => {
    setOras(newValue);
  };

  const handleOraStartChange = (event) => {
    const value = event.target.value;
    if (!isNaN(value) && value >= 0 && value <= 24) {
      setOraStart(parseInt(value));
    } else {
      setError('Ora de start trebuie să fie un număr între 0 și 24.');
    }
  };

  const handleOraMasaChange = (event) => {
    const value = event.target.value;
    if (!isNaN(value) && value >= 0 && value <= 24) {
      setMasa(parseInt(value));
    } else {
      setError('Ora de masă trebuie să fie un număr între 0 și 24.');
    }
  };

  const handlePretMaximChange = (event) => {
    const value = event.target.value;
    setPretMaxim(parseInt(value));
    console.log('Valoare pentru pretMaxim:', value);
  };

  const handleOraEndChange = (event) => {
    const value = event.target.value;
    if (!isNaN(value) && value >= 0 && value <= 24) {
      setOraEnd(parseInt(value));
    } else {
      setError('Ora de sfârșit trebuie să fie un număr între 0 și 24.');
    }
  };

  const handleGenerateItinerary = async () => {
    if (oras && oraStart !== '' && oraMasa !== '' && oraEnd !== '' && pretMaxim !== '') {
      try {
        const oraStart2 = parseInt(oraStart) + 1;
        const oraEnd2 = parseInt(oraEnd) - 1;

        const response1 = await fetch(`http://localhost:8080/obiectiv/getItinerariu2?oras=${oras}&oraStart=${oraStart2}&pauza=${oraMasa}&oraEnd=${oraEnd2}&pretMaxim=${pretMaxim}`);
        const response2 = await fetch(`http://localhost:8080/restaurant/getRamdonByCategorieAndOra?oras=${oras}&categorie=Lunch&ora=${oraMasa}`);
        const response3 = await fetch(`http://localhost:8080/restaurant/getRamdonByCategorieAndOra?oras=${oras}&categorie=Breakfast&ora=${oraStart}`);
        const response4 = await fetch(`http://localhost:8080/restaurant/getRamdonByCategorieAndOra?oras=${oras}&categorie=Dinner&ora=${oraEnd2}`);

        const [data1, data2, data3, data4] = await Promise.all([response1.json(), response2.json(), response3.json(), response4.json()]);

        data1.sort((a, b) => a.ora_propusa - b.ora_propusa);

        if (data2) {
          data2.ora_propusa = oraMasa;
          setRestaurant(data2);
        }
        setRestaurant2(data3);
        setRestaurant3(data4);

        const restaurantIndex = data1.findIndex(obiectiv => obiectiv.ora_propusa > oraMasa);

        if (restaurantIndex !== -1 && data2) {
          data1.splice(restaurantIndex, 0, data2);
        }

        const updatedObiective = data1.map((obiectiv, index) => ({ ...obiectiv, litera: String.fromCharCode(65 + index) }));
        setObiective(updatedObiective);
        setError('');
        setShowPaper(true);
        setShowMap(false); // Reset map visibility to reload the route

        // Save to localStorage
        const newItinerary = { oras, oraStart, oraMasa, oraEnd, pretMaxim, date: new Date(), obiective: updatedObiective };
        const storedHistory = JSON.parse(localStorage.getItem('obiectiv2ItineraryHistory')) || [];
        storedHistory.push(newItinerary);
        localStorage.setItem('obiectiv2ItineraryHistory', JSON.stringify(storedHistory));
        setHistory(storedHistory);

      } catch (error) {
        setError('A apărut o eroare în procesarea cererii.');
      }
    } else {
      setError('Te rog să completezi toate câmpurile.');
    }
  };

  const handleShowMap = () => {
    if (window.google && map && obiective.length > 0) {
      if (directionsRenderer) {
        directionsRenderer.setMap(null); // Clear previous directions
      }
      const directionsService = new window.google.maps.DirectionsService();
      const newDirectionsRenderer = new window.google.maps.DirectionsRenderer({ map });
      setDirectionsRenderer(newDirectionsRenderer); // Store new directionsRenderer

      const waypoints = obiective.slice(1, -1).map(obiectiv => ({ location: obiectiv.address, stopover: true }));

      // Include restaurants in the waypoints
      if (restaurant2) waypoints.unshift({ location: restaurant2.address, stopover: true });
      if (restaurant3) waypoints.push({ location: restaurant3.address, stopover: true });

      directionsService.route(
        {
          origin: obiective[0].address,
          destination: restaurant3 ? restaurant3.address : obiective[obiective.length - 1].address,
          waypoints: waypoints,
          travelMode: travelMode,
        },
        (result, status) => {
          if (status === 'OK') {
            newDirectionsRenderer.setDirections(result);
            obiective.forEach((obiectiv, index) => {
              new window.google.maps.Marker({
                position: { lat: obiectiv.lat, lng: obiectiv.lng },
                map,
                label: (index + 1).toString(),
              });
            });
            if (restaurant2) {
              new window.google.maps.Marker({
                position: { lat: restaurant2.lat, lng: restaurant2.lng },
                map,
                label: 'R1',
              });
            }
            if (restaurant3) {
              new window.google.maps.Marker({
                position: { lat: restaurant3.lat, lng: restaurant3.lng },
                map,
                label: 'R2',
              });
            }
          } else {
            console.error(`Directions service failed due to ${status}`);
          }
        }
      );
    }
    setShowMap(true);
  };

  const handleNavigate = () => {
    if (window.google && obiective.length > 0) {
      const waypoints = [];

      if (restaurant2) {
        waypoints.push({ location: restaurant2.address, stopover: true });
      }

      obiective.forEach(obiectiv => {
        waypoints.push({ location: obiectiv.address, stopover: true });
      });

      if (restaurant3) {
        waypoints.push({ location: restaurant3.address, stopover: true });
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          let gmapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${currentPosition.lat},${currentPosition.lng}&destination=${restaurant3 ? restaurant3.address : obiective[obiective.length - 1].address}&travelmode=${travelMode.toLowerCase()}`;
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

  useEffect(() => {
    const loadGoogleMapScript = () => {
      const googleMapScript = document.createElement('script');
      googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCHK16A91qWhNwiaS6G4pmzOFGfO1ITIpI&libraries=places`;
      googleMapScript.onload = () => {
        setMap(new window.google.maps.Map(document.getElementById('map'), {
          zoom: 14,
          center: { lat: 37.77, lng: -122.447 },
          disableDefaultUI: true,
          zoomControl: true
        }));
      };
      document.head.append(googleMapScript);
    };

    loadGoogleMapScript();
  }, []);

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    const title = 'ATTRACTIONS LIST';
    const titleWidth = doc.getStringUnitWidth(title) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const titleOffset = (doc.internal.pageSize.width - titleWidth) / 2;
    doc.text(title, titleOffset, 10);

    const tableColumn = ["Visiting Hour", "Name", "City", "Category", "Address", "Opening Hours", "Price (RON)", "Time (h)", "Rating"];
    const tableRows = [];

    if (restaurant2) {
      tableRows.push([
        `${restaurant2.ora_propusa}:00`,
        restaurant2.name,
        restaurant2.oras,
        restaurant2.categorie,
        restaurant2.address,
        `${restaurant2.ora_deschidere}:00 - ${restaurant2.ora_inchidere}:00`,
        restaurant2.pret,
        restaurant2.timp,
        restaurant2.rating
      ]);
    }

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

    if (restaurant3) {
      tableRows.push([
        `${restaurant3.ora_propusa}:00`,
        restaurant3.name,
        restaurant3.oras,
        restaurant3.categorie,
        restaurant3.address,
        `${restaurant3.ora_deschidere}:00 - ${restaurant3.ora_inchidere}:00`,
        restaurant3.pret,
        restaurant3.timp,
        restaurant3.rating
      ]);
    }

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save(`itinerary_${oras.toLowerCase()}.pdf`);
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
                id="ora-masa"
                label="Lunch hour"
                type="number"
                variant="outlined"
                fullWidth
                value={oraMasa}
                onChange={handleOraMasaChange}
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
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            {showPaper && (
              <Paper elevation={3} style={styles.paperStyle}>
                {restaurant2 && (
                  <Paper elevation={6} style={styles.restaurantPaperStyle}>
                    <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                      {getCategoryLabel(restaurant2.categorie)}<br />{restaurant2.ora_propusa}:00
                    </div>
                    Category: Breakfast <br />
                    Name: {restaurant2.name} <br />
                    City: {restaurant2.oras} <br />
                    Category: {restaurant2.categorie} <br />
                    Theme: {restaurant2.tematica} <br />
                    Address: {restaurant2.address} <br />
                    Program: {restaurant2.ora_deschidere}:00 - {restaurant2.ora_inchidere}:00<br />
                    Price: {restaurant2.pret} RON<br />
                    Time: {restaurant2.timp} h<br />
                    Rating: {restaurant2.rating} stars
                  </Paper>
                )}
                {obiective.map((obiectiv, index) => (
                  <Paper elevation={6} style={{ ...styles.restaurantPaperStyle, backgroundColor: obiectiv === restaurant ? '#ffffcc' : 'transparent' }} key={index}>
                    <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                      {obiectiv === restaurant ? (
                        <>
                          {getCategoryLabel(restaurant.categorie)}<br />{restaurant.ora_propusa}:00
                          <br />
                          Category: Lunch <br />
                          Name: {restaurant.name} <br />
                          City: {restaurant.oras} <br />
                          Category: {restaurant.categorie} <br />
                          Theme: {restaurant.tematica} <br />
                          Address: {restaurant.address} <br />
                          Program: {restaurant.ora_deschidere}:00 - {restaurant.ora_inchidere}:00<br />
                          Price: {restaurant.pret} RON<br />
                          Time: {restaurant.timp} h<br />
                          Rating: {restaurant.rating} stars
                        </>
                      ) : (
                        <div>
                          {getCategoryLabel(obiectiv.categorie)}<br />{obiectiv.ora_propusa}:00
                        </div>
                      )}
                    </div>
                    <div>
                      {obiectiv !== restaurant && (
                        <>
                          {obiectiv.name} <br />
                          City: {obiectiv.oras} <br />
                          Address: {obiectiv.address} <br />
                          Program: {obiectiv.ora_deschidere}:00 - {obiectiv.ora_inchidere}:00<br />
                          Price: {obiectiv.pret} RON<br />
                          Time: {obiectiv.timp} h<br />
                          Rating: {obiectiv.rating} stars
                        </>
                      )}
                    </div>
                  </Paper>
                ))}
                {restaurant3 && (
                  <Paper elevation={6} style={styles.restaurantPaperStyle}>
                    <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                      {getCategoryLabel(restaurant3.categorie)}<br />{restaurant3.ora_propusa}:00
                    </div>
                    Category: Dinner <br />
                    Name: {restaurant3.name} <br />
                    City: {restaurant3.oras} <br />
                    Category: {restaurant3.categorie} <br />
                    Theme: {restaurant3.tematica} <br />
                    Address: {restaurant3.address} <br />
                    Program: {restaurant3.ora_deschidere}:00 - {restaurant3.ora_inchidere}:00<br />
                    Price: {restaurant3.pret} RON<br />
                    Time: {restaurant3.timp} h<br />
                    Rating: {restaurant3.rating} stars
                  </Paper>
                )}
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
            )}
          </Grid>
        </Grid>
      </Container>
      <div id="map" style={{ height: '400px', marginTop: '20px', display: showMap ? 'block' : 'none' }}></div>
      <Container maxWidth="xl" style={{ marginTop: '40px' }}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <h2>Itinerary History</h2>
          {history.length > 0 ? (
            history.slice().reverse().map((item, index) => (
              <Paper
                elevation={6}
                style={{ padding: '15px', margin: '10px auto', textAlign: 'left', position: 'relative' }}
                key={index}
              >
                <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                  Itinerary {history.length - index}
                </div>
                <div>
                  <p>City: {item.oras}</p>
                  <p>Start Hour: {item.oraStart}</p>
                  <p>Lunch Hour: {item.oraMasa}</p>
                  <p>End Hour: {item.oraEnd}</p>
                  <p>Maximum Price: {item.pretMaxim}</p>
                  <p>Date: {new Date(item.date).toLocaleString()}</p>
                  <p>Objectives:</p>
                  {item.obiective.map((obiectiv, i) => (
                    <div key={i} style={{ marginLeft: '20px' }}>
                      <p>{obiectiv.litera}. {obiectiv.name} ({obiectiv.categorie}) - {obiectiv.ora_propusa}:00</p>
                    </div>
                  ))}
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

export default Obiectiv2;
