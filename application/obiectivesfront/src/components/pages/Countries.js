import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Container, Paper } from '@mui/material';
import Autocomplete from '@mui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

export default function Countries() {
  const paperContainerStyle = {
    display: 'flex',
    flexDirection: 'column', 
    alignItems: 'center', 
    width: '90%',
    margin: '50px auto 50px auto', 
  };
  const searchPaperStyle = { padding: '20px', width: '45%', marginBottom: '20px' };
  const listPaperStyle = { padding: '20px', width: '90%' }; 

  const [obiective, setObiective] = useState([]);
  const [oras, setOras] = useState('');
  const [continent, setContinent] = useState('');
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState('');
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    setFetching(true);
    fetch('http://localhost:8080/tara/getAll')
      .then(res => res.json())
      .then((result) => {
        setObiective(result);
        setFetching(false);
        setError('');
        setInitialDataLoaded(true);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setFetching(false);
        setError('Error fetching data. Please try again.');
      });
  }, []);

  const handleOrasChange = (e, value) => {
    setOras(value);
    setFetching(true);
    fetch(`http://localhost:8080/tara/getAllByName?name=${value}`)
      .then(res => res.json())
      .then((result) => {
        setObiective(result);
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

  const handleContinentChange = (e, value) => {
    setContinent(value);
    setFetching(true);
    fetch(`http://localhost:8080/tara/getAllByContinent?continent=${value}`)
      .then(res => res.json())
      .then((result) => {
        setObiective(result);
        setFetching(false);
        if (result.length === 0) {
          setError('No countries found for the selected continent.');
        } else {
          setError('');
          fetchCitiesForContinent(value);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setFetching(false);
        setError('Error fetching data. Please try again.');
      });
  };

  const fetchCitiesForContinent = (continent) => {
    fetch(`http://localhost:8080/oras/getAllByContinent?continent=${continent}`)
      .then(res => res.json())
      .then((cities) => {
        setCities(cities);
      })
      .catch(error => {
        console.error('Error fetching cities data:', error);
      });
  };

  const handleClear = () => {
    setOras('');
    setContinent('');
    setFetching(false);
    setError('');
    if (initialDataLoaded) {
      setObiective([]);
    }
  };

  // Opțiunile pentru țară
  const countryOptions = ['Turcia', 'Romania', 'Marea Britanie', 'Franța', 'Germania', 'Italia', 'Spania'];

  return (
    <Box textAlign="center">
      <Container maxWidth="xl" style={paperContainerStyle}>
        <Paper elevation={3} style={searchPaperStyle}>
          <h1 style={{ color: "1888ff", marginBottom: "20px" }}>SEARCH COUNTRY</h1>
          <form noValidate autoComplete="off">
            <Autocomplete
              id="city-autocomplete"
              options={countryOptions}
              renderInput={(params) => (
                <TextField {...params} label="Country name" variant="outlined" fullWidth style={{ marginBottom: '10px' }} />
              )}
              value={oras}
              onChange={handleOrasChange}
              freeSolo
              autoHighlight
            />
          </form>
          {error && oras && <p style={{ color: 'red' }}>{error}</p>}
        </Paper>

        <Paper elevation={3} style={searchPaperStyle}>
          <h1 style={{ color: "1888ff", marginBottom: "20px" }}>SEARCH CONTINENT</h1>
          <form noValidate autoComplete="off">
            <Autocomplete
              id="continent-autocomplete"
              options={['Europa', 'Asia', 'Africa', 'America de Nord', 'America de Sud', 'Australia', 'Antarctica']}
              renderInput={(params) => (
                <TextField {...params} label="Continent name" variant="outlined" fullWidth style={{ marginBottom: '10px' }} />
              )}
              value={continent}
              onChange={handleContinentChange}
              freeSolo
              autoHighlight
            />
          </form>
          {error && continent && <p style={{ color: 'red' }}>{error}</p>}
        </Paper>

        {(initialDataLoaded || fetching) && (
          <Paper elevation={3} style={listPaperStyle}>
            {obiective.map(obiectiv => (
              <Paper elevation={6} style={{ padding: "15px", margin: "10px auto", textAlign: "left" }} key={obiectiv.id}>
                <div>
                  Denumire: {obiectiv.name} <br />
                  Continent: {obiectiv.continent} <br />
                  Descriere: {obiectiv.descriere} <br />
                  Gastronomie: {obiectiv.gastronomie} <br />
                  Siguranta: {obiectiv.siguranta} <br />
                  Reguli: {obiectiv.reguli} <br />
                </div>
              </Paper>
            ))}
          </Paper>
        )}
      </Container>
    </Box>
  );
}
