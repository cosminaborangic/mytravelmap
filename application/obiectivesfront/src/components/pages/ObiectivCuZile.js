import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
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
  paperStyle: { padding: '20px', width: '120%', marginTop: '20px' }, 
  errorStyle: { color: 'red', marginTop: '5px' },
  dayTitleStyle: { color: '#1888ff', marginBottom: '10px', marginTop: '20px' }, 
};

const ObiectivCuZile = () => {
  const [obiective, setObiective] = useState([]);
  const [oras, setOras] = useState('');
  const [oraStart, setOraStart] = useState('');
  const [oraEnd, setOraEnd] = useState('');
  const [pretMaxim, setPretMaxim] = useState('');
  const [zile, setZile] = useState('');
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('obiectivCuZileItineraryHistory')) || [];
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

  const handleOraEndChange = (event) => {
    const value = event.target.value;
    if (!isNaN(value) && value >= 0 && value <= 24) {
      setOraEnd(parseInt(value));
    } else {
      setError('Ora de sfârșit trebuie să fie un număr între 0 și 24.');
    }
  };

  const handlePretMaximChange = (event) => {
    const value = event.target.value;
    setPretMaxim(parseInt(value)); 
    console.log('Valoare pentru pretMaxim:', value);
  };

  const handleZileChange = (event) => {
    const value = event.target.value;
    setZile(parseInt(value));
    console.log('Valoare pentru zile:', value);
  };

  const handleGenerateItinerary = async () => {
    if (oras && oraStart !== '' && oraEnd !== '' && pretMaxim !== '') {
      try {
        const response = await fetch(`http://localhost:8080/obiectiv/getItinerariuCuZile2?oras=${oras}&oraStart=${oraStart}&oraEnd=${oraEnd}&pretMaxim=${pretMaxim}&zile=${zile}`);
        const data = await response.json();
        setObiective(data);
        setError('');

        // Save to localStorage
        const newItinerary = { oras, oraStart, oraEnd, pretMaxim, zile, date: new Date(), obiective: data || [] };
        const storedHistory = JSON.parse(localStorage.getItem('obiectivCuZileItineraryHistory')) || [];
        storedHistory.push(newItinerary);
        localStorage.setItem('obiectivCuZileItineraryHistory', JSON.stringify(storedHistory));
        setHistory(storedHistory);

      } catch (error) {
        setError('A apărut o eroare în procesarea cererii.');
      }
    } else {
      setError('Te rog să completezi toate câmpurile.');
    }
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
    let startY = 20;

    obiective.forEach((zi, index) => {
      const tableRows = [];
      zi.forEach(obiectiv => {
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

      doc.text(`Day ${index + 1}`, 14, startY);
      startY += 6;
      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: startY,
      });
      startY = doc.lastAutoTable.finalY + 10; 
    });

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
              <TextField
                id="zile"
                label="Days"
                type="number"
                variant="outlined"
                fullWidth
                value={zile}
                onChange={handleZileChange}
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
            {obiective.length > 0 && (
              <Paper elevation={3} style={styles.paperStyle}>
                {obiective.map((zi, index) => (
                  <div key={index}>
                    <h2 style={{ ...styles.dayTitleStyle, marginTop: index === 0 ? '10px' : '30px' }}>Day {index + 1}</h2>
                    {zi.map((obiectiv, idx) => (
                      <Paper
                        elevation={6}
                        style={{ padding: "15px", marginBottom: "10px", textAlign: "left" }}
                        key={obiectiv.id}
                      >
                        <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                          {obiectiv.ora_propusa}:00
                        </div>
                        <div>
                          <p>Name: {obiectiv.name}</p>
                          <p>City: {obiectiv.oras}</p>
                          <p>Category: {obiectiv.categorie}</p>
                          <p>Address: {obiectiv.address}</p>
                          <p>Program: {obiectiv.ora_deschidere}:00 - {obiectiv.ora_inchidere}:00</p>
                          <p>Price: {obiectiv.pret} RON</p>
                          <p>Time: {obiectiv.timp} h</p>
                          <p>Rating: {obiectiv.rating} stars</p>
                        </div>
                      </Paper>
                    ))}
                  </div>
                ))}
                <Box display="flex" justifyContent="center" marginTop="20px">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleGeneratePDF}
                  >
                    Generate PDF
                  </Button>
                </Box>
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
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
                  <p>End Hour: {item.oraEnd}</p>
                  <p>Maximum Price: {item.pretMaxim}</p>
                  <p>Days: {item.zile}</p>
                  <p>Date: {new Date(item.date).toLocaleString()}</p>
                  <p>Objectives:</p>
                  {Array.isArray(item.obiective) ? (
                    item.obiective.map((zi, ziIndex) => (
                      <div key={ziIndex}>
                        <p>Day {ziIndex + 1}:</p>
                        {zi.map((obiectiv, i) => (
                          <div key={i} style={{ marginLeft: '20px' }}>
                            <p>{obiectiv.name} ({obiectiv.categorie}) - {obiectiv.ora_propusa}:00</p>
                          </div>
                        ))}
                      </div>
                    ))
                  ) : (
                    <p>No objectives available.</p>
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

export default ObiectivCuZile;
