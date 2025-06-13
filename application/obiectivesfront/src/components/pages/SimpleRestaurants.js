import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Container, Paper, Typography, TextField, Button, MenuItem } from '@mui/material';

export default function SimpleRestaurants() {
  const paperContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    justifyContent: 'center',
  };
  const mapContainerStyle = {
    height: '60vh',
    width: '80vw',
    marginBottom: '20px',
    borderRadius: '10px',
  };
  const filterContainerStyle = {
    width: '80%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const [restaurante, setRestaurante] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState('');
  const [categorie, setCategorie] = useState('');
  const [tematica, setTematica] = useState('');
  const [filteredRestaurante, setFilteredRestaurante] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetching(true);
        const response = await fetch(`http://localhost:8080/restaurant/getAll`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setRestaurante(data);
        setFilteredRestaurante(data);
        setError('');
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again.');
      } finally {
        setFetching(false);
      }
    };

    fetchData();
  }, []);

  const handleFilter = () => {
    let filtered = [...restaurante];

    if (categorie.trim() !== '') {
      filtered = filtered.filter(restaurant => restaurant.categorie.toLowerCase() === categorie.toLowerCase());
    }

    if (tematica.trim() !== '') {
      filtered = filtered.filter(restaurant => restaurant.tematica.toLowerCase() === tematica.toLowerCase());
    }

    setFilteredRestaurante(filtered);
  };

  useEffect(() => {
    const initMap = () => {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 34.84555, lng: -111.8035 },
        zoom: 12,
      });

      filteredRestaurante.forEach((restaurant, index) => {
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
                  <p><strong>Theme:</strong> ${restaurant.tematica}</p>
                  <p><strong>Address:</strong> ${restaurant.address}</p>
                  <p><strong>Program:</strong> ${restaurant.ora_deschidere}:00 - ${restaurant.ora_inchidere}:00</p>
                  <p><strong>Price:</strong> ${restaurant.pret} RON</p>
                  <p><strong>Time:</strong> ${restaurant.timp} h</p>
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

    if (window.google) {
      initMap();
    } else {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCHK16A91qWhNwiaS6G4pmzOFGfO1ITIpI&libraries=places`;
      script.onload = initMap;
      document.head.appendChild(script);
    }
  }, [filteredRestaurante]);

  const categoriiPredefinite = ['Breakfast', 'Lunch', 'Dinner'];
  const tematiciPredefinite = ['Traditional', 'Steak'];

  return (
    <Box textAlign="center">
      <Container maxWidth="xl" style={paperContainerStyle}>
        <Paper elevation={3} sx={mapContainerStyle}>
          <div id="map" style={{ height: '100%', width: '100%' }}></div>
        </Paper>
        <Paper elevation={3} sx={{ padding: '20px', width: '80%', borderRadius: '10px' }}>
          <Typography variant="h6" gutterBottom>
            Filter by category or theme
          </Typography>
          <div style={filterContainerStyle}>
            <TextField
              select
              label="Category"
              variant="outlined"
              value={categorie}
              onChange={(e) => setCategorie(e.target.value)}
              style={{ width: '50%', marginRight: '10px' }}
            >
              {categoriiPredefinite.map((categorie) => (
                <MenuItem key={categorie} value={categorie}>
                  {categorie}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Theme"
              variant="outlined"
              value={tematica}
              onChange={(e) => setTematica(e.target.value)}
              style={{ width: '50%', marginRight: '10px' }}
            >
              {tematiciPredefinite.map((tematica) => (
                <MenuItem key={tematica} value={tematica}>
                  {tematica}
                </MenuItem>
              ))}
            </TextField>
            <Button variant="contained" onClick={handleFilter}>Filter</Button>
          </div>
        </Paper>
      </Container>
    </Box>
  );
}
