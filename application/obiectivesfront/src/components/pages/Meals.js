import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

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

const Meals = () => {
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

  useEffect(() => {
    if (restaurant) {
      setRestaurant(prevRestaurant => ({ ...prevRestaurant, ora_propusa: oraMasa }));
    }
  }, [oraMasa]);

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
        const response2 = await fetch(`http://localhost:8080/restaurant/getRamdonByCategorieAndOra?oras=${oras}&categorie=Pranz&ora=${oraMasa}`);
        const response3 = await fetch(`http://localhost:8080/restaurant/getRamdonByCategorieAndOra?oras=${oras}&categorie=Mic Dejun&ora=${oraStart}`);
        const response4 = await fetch(`http://localhost:8080/restaurant/getRamdonByCategorieAndOra?oras=${oras}&categorie=Cina&ora=${oraEnd2}`);

        const [data1, data2, data3, data4] = await Promise.all([response1.json(), response2.json(), response3.json(), response4.json()]);

        data1.sort((a, b) => a.ora_propusa - b.ora_propusa);

        if (data2) {
          data2.ora_propusa = oraMasa;
          setRestaurant(data2);
        }
        setRestaurant2(data3);
        setRestaurant3(data4);

        setShowPaper(true);
      } catch (error) {
        setError('A apărut o eroare în procesarea cererii.');
      }
    } else {
      setError('Te rog să completezi toate câmpurile.');
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
                id="ora-masa"
                label="Masa hour"
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
                    Category: Mic Dejun <br />
                    Denumire: {restaurant2.name} <br />
                    Oras: {restaurant2.oras} <br />
                    Categorie: {restaurant2.categorie} <br />
                    Tematica: {restaurant2.tematica} <br />
                    Address: {restaurant2.address} <br />
                    Program: {restaurant2.ora_deschidere}:00 - {restaurant2.ora_inchidere}:00<br />
                    Pret: {restaurant2.pret} RON<br />
                    Timp: {restaurant2.timp} h<br />
                    Rating: {restaurant2.rating} stele
                  </Paper>
                )}
                {restaurant && (
                  <Paper elevation={6} style={styles.restaurantPaperStyle}>
                    <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                      {getCategoryLabel(restaurant.categorie)}<br />{restaurant.ora_propusa}:00
                    </div>
                    Category: Pranz <br />
                    Denumire: {restaurant.name} <br />
                    Oras: {restaurant.oras} <br />
                    Categorie: {restaurant.categorie} <br />
                    Tematica: {restaurant.tematica} <br />
                    Address: {restaurant.address} <br />
                    Program: {restaurant.ora_deschidere}:00 - {restaurant.ora_inchidere}:00<br />
                    Pret: {restaurant.pret} RON<br />
                    Timp: {restaurant.timp} h<br />
                    Rating: {restaurant.rating} stele
                  </Paper>
                )}
                {restaurant3 && (
                  <Paper elevation={6} style={styles.restaurantPaperStyle}>
                    <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                      {getCategoryLabel(restaurant3.categorie)}<br />{restaurant3.ora_propusa}:00
                    </div>
                    Category: Cina <br />
                    Denumire: {restaurant3.name} <br />
                    Oras: {restaurant3.oras} <br />
                    Categorie: {restaurant3.categorie} <br />
                    Tematica: {restaurant3.tematica} <br />
                    Address: {restaurant3.address} <br />
                    Program: {restaurant3.ora_deschidere}:00 - {restaurant3.ora_inchidere}:00<br />
                    Pret: {restaurant3.pret} RON<br />
                    Timp: {restaurant3.timp} h<br />
                    Rating: {restaurant3.rating} stele
                  </Paper>
                )}
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Meals;
