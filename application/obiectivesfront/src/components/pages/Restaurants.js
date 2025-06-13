import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Container, Paper, TextField, Typography, FormControlLabel, Checkbox, Button, Grid } from '@mui/material';
import Autocomplete from '@mui/lab/Autocomplete';

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [oras, setOras] = useState('');
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTematica, setSelectedTematica] = useState('');
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    fetchAllRestaurants();
    loadGoogleMapScript();
  }, []);

  useEffect(() => {
    if (mapLoaded && filteredRestaurants.length > 0) {
      initMap();
    }
  }, [mapLoaded, filteredRestaurants]);

  const loadGoogleMapScript = () => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCHK16A91qWhNwiaS6G4pmzOFGfO1ITIpI&libraries=places`;
    script.onload = () => setMapLoaded(true);
    document.head.appendChild(script);
  };

  const fetchAllRestaurants = () => {
    setFetching(true);
    fetch('http://localhost:8080/restaurant/getAll')
      .then(res => res.json())
      .then((result) => {
        setRestaurants(result);
        setFilteredRestaurants(result);
        setFetching(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setFetching(false);
        setError('Error fetching data. Please try again.');
      });
  };

  const fetchData = () => {
    setFetching(true);
    fetch(`http://localhost:8080/restaurant/getAllByOras?oras=${oras}`)
      .then(res => res.json())
      .then((result) => {
        setRestaurants(result);
        setFilteredRestaurants(result);
        setFetching(false);
        if (result.length === 0) {
          setError('No restaurants found for the entered city.');
        } else {
          setError('');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setFetching(false);
        setError('Error fetching data. Please try again.');
      });
  };

  useEffect(() => {
    if (oras) {
      fetchData();
    } else {
      fetchAllRestaurants();
      setError('');
    }
  }, [oras]);

  const handleOrasChange = (e, value) => {
    setOras(value);
    if (!value || !['Istanbul', 'Buffalo'].includes(value)) {
      setError('City not found in the list.');
    } else {
      setError('');
    }
  };

  const handleFilter = () => {
    let filtered = restaurants;

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(restaurant =>
        selectedCategories.includes(restaurant.categorie.toLowerCase())
      );
    }

    if (selectedTematica !== '') {
      filtered = filtered.filter(restaurant =>
        restaurant.tematica.toLowerCase() === selectedTematica.toLowerCase()
      );
    }

    setFilteredRestaurants(filtered);
  };

  const categoriiPredefinite = ['Breakfast', 'Lunch', 'Dinner'];
  const tematiciPredefinite = ['Traditional', 'Steak', 'Vegetarian'];

  const initMap = () => {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 34.84555, lng: -111.8035 },
      zoom: 12,
    });

    filteredRestaurants.forEach((restaurant, index) => {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: restaurant.address }, (results, status) => {
        if (status === window.google.maps.GeocoderStatus.OK && results[0]) {
          const marker = new window.google.maps.Marker({
            position: results[0].geometry.location,
            map: map,
            title: restaurant.name,
            label: `${index + 1}`,
          });

          const infowindow = new window.google.maps.InfoWindow({
            content: `
              <div>
                <h3>${restaurant.name}</h3>
                <p><strong>City:</strong> ${restaurant.oras}</p>
                <p><strong>Category:</strong> ${restaurant.categorie}</p>
                <p><strong>Tematica:</strong> ${restaurant.tematica}</p>
                <p><strong>Address:</strong> ${restaurant.address}</p>
                <p><strong>Opening Hours:</strong> ${restaurant.ora_deschidere}:00 - ${restaurant.ora_inchidere}:00</p>
                <p><strong>Price:</strong> ${restaurant.pret} RON</p>
                <p><strong>Duration:</strong> ${restaurant.timp} h</p>
                <p><strong>Rating:</strong> ${restaurant.rating} stars</p>
              </div>
            `,
          });

          marker.addListener('click', () => {
            infowindow.open(map, marker);
          });
        }
      });
    });
  };

  return (
    <Box
      textAlign="center"
      mt={4}
      style={{
        backgroundImage: 'url(https://source.unsplash.com/random?restaurant)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '20px',
        minHeight: '100vh',
        margin: 0,
      }}
    >
      <style>{`
        body, html {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
        }

        #root {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
      `}</style>
      <Container maxWidth="xl" style={{ margin: 0, padding: 0 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ padding: '20px' }}>
              <h1 style={{ color: "#1888ff", marginBottom: "20px" }}>INSERT CITY</h1>
              <form noValidate autoComplete="off">
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
              </form>
              {error && oras && <Typography variant="body2" style={{ color: 'red' }}>{error}</Typography>}
            </Paper>
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
              <Typography variant="h6" style={{ marginBottom: "20px" }}>Restaurants List</Typography>
              {!fetching && filteredRestaurants.length > 0 && (
                filteredRestaurants.map(restaurant => (
                  <Paper elevation={6} style={{ padding: '15px', margin: '10px 0', textAlign: 'left' }} key={restaurant.id}>
                    <Typography variant="h6">{restaurant.name}</Typography>
                    <Typography variant="body1">City: {restaurant.oras}</Typography>
                    <Typography variant="body1">Category: {restaurant.categorie}</Typography>
                    <Typography variant="body1">Theme: {restaurant.tematica}</Typography>
                    <Typography variant="body1">Address: {restaurant.address}</Typography>
                    <Typography variant="body1">Opening Hours: {restaurant.ora_deschidere}:00 - {restaurant.ora_inchidere}:00</Typography>
                    <Typography variant="body1">Price: {restaurant.pret} RON</Typography>
                    <Typography variant="body1">Duration: {restaurant.timp} h</Typography>
                    <Typography variant="body1">Rating: {restaurant.rating} stars</Typography>
                  </Paper>
                ))
              )}
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ padding: '20px' }}>
              <Typography variant="h6" style={{ marginBottom: "20px" }}>Filter by Category</Typography>
              <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                {categoriiPredefinite.map((categorie) => (
                  <FormControlLabel
                    key={categorie}
                    control={
                      <Checkbox
                        checked={selectedCategories.includes(categorie.toLowerCase())}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          setSelectedCategories(prevState => {
                            if (isChecked) {
                              return [...prevState, categorie.toLowerCase()];
                            } else {
                              return prevState.filter(cat => cat !== categorie.toLowerCase());
                            }
                          });
                        }}
                        name={categorie}
                      />
                    }
                    label={categorie}
                    style={{ margin: '0 10px' }}
                  />
                ))}
              </div>
            </Paper>
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
              <Typography variant="h6" style={{ marginBottom: "20px" }}>Filter by Tematica</Typography>
              <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                {tematiciPredefinite.map((tematica) => (
                  <FormControlLabel
                    key={tematica}
                    control={
                      <Checkbox
                        checked={selectedTematica === tematica}
                        onChange={(e) => setSelectedTematica(e.target.checked ? tematica : '')}
                        name={tematica}
                      />
                    }
                    label={tematica}
                    style={{ margin: '0 10px' }}
                  />
                ))}
              </div>
            </Paper>
            <Button variant="contained" onClick={handleFilter} style={{ marginTop: '20px' }}>Filter</Button>
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
              <div id="map" style={{ height: '60vh', width: '100%' }}></div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
