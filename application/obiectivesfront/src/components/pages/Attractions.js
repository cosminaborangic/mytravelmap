import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Container, Paper, TextField, Button, Typography, FormControlLabel, Checkbox, Grid } from '@mui/material';
import Autocomplete from '@mui/lab/Autocomplete';

export default function Attractions() {
  const [obiective, setObiective] = useState([]);
  const [oras, setOras] = useState('');
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredObiective, setFilteredObiective] = useState([]);

  useEffect(() => {
    fetchAllObiective();
  }, []);

  const fetchAllObiective = () => {
    setFetching(true);
    fetch('http://localhost:8080/obiectiv/getAll')
      .then(res => res.json())
      .then((result) => {
        setObiective(result);
        setFilteredObiective(result);
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
    fetch(`http://localhost:8080/obiectiv/getAllByOras?oras=${oras}`)
      .then(res => res.json())
      .then((result) => {
        setObiective(result);
        setFilteredObiective(result);
        setFetching(false);
        if (result.length === 0) {
          setError('No attractions found for the entered city.');
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
      fetchAllObiective();
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

  const handleClear = () => {
    setOras('');
    fetchAllObiective();
    setError('');
  };

  const handleFilter = () => {
    if (selectedCategories.length === 0) {
      setFilteredObiective(obiective);
    } else {
      const filtered = obiective.filter(obiectiv => selectedCategories.includes(obiectiv.categorie.toLowerCase()));
      setFilteredObiective(filtered);
    }
  };

  useEffect(() => {
    const initMap = () => {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 34.84555, lng: -111.8035 },
        zoom: 12,
      });

      filteredObiective.forEach((obiectiv, index) => {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address: obiectiv.address }, (results, status) => {
          if (status === window.google.maps.GeocoderStatus.OK && results[0]) {
            const marker = new window.google.maps.Marker({
              position: results[0].geometry.location,
              map: map,
              title: obiectiv.name,
              label: `${index + 1}`,
            });

            const infowindow = new window.google.maps.InfoWindow({
              content: `
                <div>
                  <h3>${obiectiv.name}</h3>
                  <p><strong>Oras:</strong> ${obiectiv.oras}</p>
                  <p><strong>Categorie:</strong> ${obiectiv.categorie}</p>
                  <p><strong>Adresa:</strong> ${obiectiv.address}</p>
                  <p><strong>Program:</strong> ${obiectiv.ora_deschidere}:00 - ${obiectiv.ora_inchidere}:00</p>
                  <p><strong>Pret:</strong> ${obiectiv.pret} RON</p>
                  <p><strong>Timp:</strong> ${obiectiv.timp} h</p>
                  <p><strong>Rating:</strong> ${obiectiv.rating} stele</p>
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

    if (window.google && filteredObiective.length > 0) {
      initMap();
    } else {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCHK16A91qWhNwiaS6G4pmzOFGfO1ITIpI&libraries=places`;
      script.onload = initMap;
      document.head.appendChild(script);
    }
  }, [filteredObiective]);

  const categoriiPredefinite = ['Religion', 'History', 'Nature', 'Castle', 'Art', 'Entertainment'];

  return (
    <Box
      textAlign="center"
      mt={4}
      style={{
        backgroundImage: 'url(https://source.unsplash.com/random?landscape)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '20px',
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="xl">
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
              <Typography variant="h6" gutterBottom>
                Attractions List
              </Typography>
              {!fetching && filteredObiective.length > 0 && (
                filteredObiective.map(obiectiv => (
                  <Paper elevation={6} style={{ padding: '15px', margin: '10px 0', textAlign: 'left' }} key={obiectiv.id}>
                    <Typography variant="h6">{obiectiv.name}</Typography>
                    <Typography variant="body1">City: {obiectiv.oras}</Typography>
                    <Typography variant="body1">Category: {obiectiv.categorie}</Typography>
                    <Typography variant="body1">Address: {obiectiv.address}</Typography>
                    <Typography variant="body1">Program: {obiectiv.ora_deschidere}:00 - {obiectiv.ora_inchidere}:00</Typography>
                    <Typography variant="body1">Price: {obiectiv.pret} RON</Typography>
                    <Typography variant="body1">Time: {obiectiv.timp} h</Typography>
                    <Typography variant="body1">Rating: {obiectiv.rating} stars</Typography>
                  </Paper>
                ))
              )}
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ padding: '20px' }}>
              <Typography variant="h6" gutterBottom>
                Filter by category
              </Typography>
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
              <Button variant="contained" onClick={handleFilter}>Filter</Button>
            </Paper>
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
              <div id="map" style={{ height: '60vh', width: '100%' }}></div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
