

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Container, Paper } from '@mui/material';
import Autocomplete from '@mui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { Chart } from 'react-google-charts';

export default function ContinentsMap() {
  const paperContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '90%',
    margin: '20px auto 50px auto', // Adjusted margin for top
  };
  const searchPaperStyle = { padding: '20px', width: '45%', marginBottom: '20px' };
  const mapPaperStyle = { padding: '20px', width: '90%' };

  const [continent, setContinent] = useState('');
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState('');

  const continents = [
    { name: 'Europe', code: '150' },
    { name: 'Asia', code: '142' },
    { name: 'Africa', code: '002' },
    { name: 'America de Nord', code: '021' },
    { name: 'America de Sud', code: '005' },
    { name: 'Australia', code: '009' },
    { name: 'Antarctica', code: 'AQ' },
  ];

  const continentCodes = {
    'Europe': '150',
    'Asia': '142',
    'Africa': '002',
    'America de Nord': '021',
    'America de Sud': '005',
    'Australia': '009',
    'Antarctica': 'AQ',
  };

  const countryData = {
    'Europe': [
      ['Country', 'Popularity'],
      ['Albania', 100],
      ['Andorra', 50],
      ['Austria', 200],
      ['Belarus', 150],
      ['Belgium', 180],
      ['Bosnia and Herzegovina', 120],
      ['Bulgaria', 170],
      ['Croatia', 160],
      ['Cyprus', 90],
      ['Czech Republic', 190],
      ['Denmark', 210],
      ['Estonia', 100],
      ['Finland', 220],
      ['France', 300],
      ['Germany', 320],
      ['Greece', 250],
      ['Hungary', 200],
      ['Iceland', 80],
      ['Ireland', 170],
      ['Italy', 290],
      ['Kosovo', 80],
      ['Latvia', 110],
      ['Liechtenstein', 40],
      ['Lithuania', 130],
      ['Luxembourg', 70],
      ['Malta', 60],
      ['Moldova', 110],
      ['Monaco', 30],
      ['Montenegro', 80],
      ['Netherlands', 270],
      ['North Macedonia', 90],
      ['Norway', 230],
      ['Poland', 260],
      ['Portugal', 170],
      ['Romania', 240],
      ['Russia', 400],
      ['San Marino', 40],
      ['Serbia', 180],
      ['Slovakia', 150],
      ['Slovenia', 140],
      ['Spain', 310],
      ['Sweden', 250],
      ['Switzerland', 210],
      ['Turkey', 350],
      ['Ukraine', 300],
      ['United Kingdom', 330],
      ['Vatican City', 10],
    ],
    'Asia': [
      ['Country', 'Popularity'],
      ['Afghanistan', 200],
      ['Armenia', 120],
      ['Azerbaijan', 150],
      ['Bahrain', 80],
      ['Bangladesh', 250],
      ['Bhutan', 60],
      ['Brunei', 40],
      ['Cambodia', 150],
      ['China', 1200],
      ['Cyprus', 70],
      ['Georgia', 110],
      ['India', 1300],
      ['Indonesia', 270],
      ['Iran', 830],
      ['Iraq', 390],
      ['Israel', 100],
      ['Japan', 126],
      ['Jordan', 100],
      ['Kazakhstan', 190],
      ['Kuwait', 70],
      ['Kyrgyzstan', 70],
      ['Laos', 70],
      ['Lebanon', 80],
      ['Malaysia', 310],
      ['Maldives', 50],
      ['Mongolia', 90],
      ['Myanmar', 540],
      ['Nepal', 290],
      ['North Korea', 250],
      ['Oman', 50],
      ['Pakistan', 220],
      ['Palestine', 50],
      ['Philippines', 110],
      ['Qatar', 30],
      ['Saudi Arabia', 340],
      ['Singapore', 60],
      ['South Korea', 520],
      ['Sri Lanka', 210],
      ['Syria', 180],
      ['Taiwan', 240],
      ['Tajikistan', 90],
      ['Thailand', 690],
      ['Timor-Leste', 10],
      ['Turkmenistan', 60],
      ['United Arab Emirates', 110],
      ['Uzbekistan', 340],
      ['Vietnam', 100],
      ['Yemen', 100],
    ],
  };

  const handleContinentChange = (e, value) => {
    setContinent(value);
  };

  return (
    <Box textAlign="center">
      <Container maxWidth="xl" style={paperContainerStyle}>
        <Paper elevation={3} style={searchPaperStyle}>
          <h1 style={{ color: "1888ff", marginBottom: "20px" }}>SEARCH CONTINENT</h1>
          <form noValidate autoComplete="off">
            <Autocomplete
              id="continent-autocomplete"
              options={continents.map(continent => continent.name)}
              renderInput={(params) => (
                <TextField {...params} label="Continent name" variant="outlined" fullWidth style={{ marginBottom: '10px' }} />
              )}
              value={continent}
              onChange={handleContinentChange}
              freeSolo
              autoHighlight
            />
          </form>
        </Paper>

        {continent && (
          <Paper elevation={3} style={mapPaperStyle}>
            <h1 style={{ color: '1888ff', marginBottom: '20px' }}>{continent}</h1>
            <Chart
              width={'100%'}
              height={'400px'}
              chartType="GeoChart"
              data={countryData[continent]}
              options={{
                colorAxis: { colors: ['#810FCB'] },
                region: continentCodes[continent],
                resolution: 'countries', 
              }}
              mapsApiKey="AIzaSyCHK16A91qWhNwiaS6G4pmzOFGfO1ITIpI"
            />
          </Paper>
        )}
      </Container>
    </Box>
  );
}

