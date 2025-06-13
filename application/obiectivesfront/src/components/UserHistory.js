import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

const UserHistory = () => {
  const [simpleHistory, setSimpleHistory] = useState([]);
  const [obiectivHistory, setObiectivHistory] = useState([]);
  const [obiectiv2History, setObiectiv2History] = useState([]);
  const [obiectivCuZileHistory, setObiectivCuZileHistory] = useState([]);
  const [obiectivCuZile2History, setObiectivCuZile2History] = useState([]);
  const [obiectivCuZile3History, setObiectivCuZile3History] = useState([]);

  useEffect(() => {
    const storedSimpleHistory = JSON.parse(localStorage.getItem('simpleItineraryHistory')) || [];
    const storedObiectivHistory = JSON.parse(localStorage.getItem('obiectivItineraryHistory')) || [];
    const storedObiectiv2History = JSON.parse(localStorage.getItem('obiectiv2ItineraryHistory')) || [];
    const storedObiectivCuZileHistory = JSON.parse(localStorage.getItem('obiectivCuZileItineraryHistory')) || [];
    const storedObiectivCuZile2History = JSON.parse(localStorage.getItem('obiectivCuZile2ItineraryHistory')) || [];
    const storedObiectivCuZile3History = JSON.parse(localStorage.getItem('obiectivCuZile3ItineraryHistory')) || [];
    setSimpleHistory(storedSimpleHistory);
    setObiectivHistory(storedObiectivHistory);
    setObiectiv2History(storedObiectiv2History);
    setObiectivCuZileHistory(storedObiectivCuZileHistory);
    setObiectivCuZile2History(storedObiectivCuZile2History);
    setObiectivCuZile3History(storedObiectivCuZile3History);
  }, []);

  return (
    <Box textAlign="center">
      <Container maxWidth="xl">
        <Paper elevation={3} style={{ padding: '20px', marginTop: '30px' }}>
          <h1 style={{ color: '#1888ff', marginBottom: '20px' }}>User History</h1>
          {simpleHistory.length > 0 || obiectivHistory.length > 0 || obiectiv2History.length > 0 || obiectivCuZileHistory.length > 0 || obiectivCuZile2History.length > 0 || obiectivCuZile3History.length > 0 ? (
            <>
              <h2>Simple Itineraries</h2>
              {simpleHistory.length > 0 ? (
                simpleHistory.map((item, index) => (
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
                              <p>{obiectiv.litera}. {obiectiv.name} ({obiectiv.categorie}) - {obiectiv.ora_propusa}:00</p>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  </Paper>
                ))
              ) : (
                <p>No simple itineraries available.</p>
              )}

              <h2>Obiectiv Itineraries</h2>
              {obiectivHistory.length > 0 ? (
                obiectivHistory.map((item, index) => (
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
                <p>No obiectiv itineraries available.</p>
              )}

              <h2>Obiectiv2 Itineraries</h2>
              {obiectiv2History.length > 0 ? (
                obiectiv2History.map((item, index) => (
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
                      <p>Lunch Hour: {item.oraMasa}</p>
                      <p>End Hour: {item.oraEnd}</p>
                      <p>Maximum Price: {item.pretMaxim}</p>
                      <p>Date: {new Date(item.date).toLocaleString()}</p>
                      <p>Objectives:</p>
                      {item.obiective.map((obiectiv, i) => (
                        <div key={i} style={{ marginLeft: '20px' }}>
                          <p>{String.fromCharCode(65 + i)}. {obiectiv.name} ({obiectiv.categorie}) - {obiectiv.ora_propusa}:00</p>
                        </div>
                      ))}
                    </div>
                  </Paper>
                ))
              ) : (
                <p>No obiectiv2 itineraries available.</p>
              )}

              <h2>ObiectivCuZile Itineraries</h2>
              {obiectivCuZileHistory.length > 0 ? (
                obiectivCuZileHistory.map((item, index) => (
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
                      <p>Days: {item.zile}</p>
                      <p>Date: {new Date(item.date).toLocaleString()}</p>
                      <p>Objectives:</p>
                      {item.obiective.map((zi, ziIndex) => (
                        <div key={ziIndex}>
                          <p>Day {ziIndex + 1}:</p>
                          {zi.map((obiectiv, i) => (
                            <div key={i} style={{ marginLeft: '20px' }}>
                              <p>{obiectiv.name} ({obiectiv.categorie}) - {obiectiv.ora_propusa}:00</p>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </Paper>
                ))
              ) : (
                <p>No ObiectivCuZile itineraries available.</p>
              )}

              <h2>ObiectivCuZile2 Itineraries</h2>
              {obiectivCuZile2History.length > 0 ? (
                obiectivCuZile2History.map((item, index) => (
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
                      <p>Pause Hour: {item.pauza}</p>
                      <p>End Hour: {item.oraEnd}</p>
                      <p>Maximum Price: {item.pretMaxim}</p>
                      <p>Days: {item.zile}</p>
                      <p>Date: {new Date(item.date).toLocaleString()}</p>
                      <p>Objectives:</p>
                      {item.obiective.map((zi, ziIndex) => (
                        <div key={ziIndex}>
                          <p>Day {ziIndex + 1}:</p>
                          {zi.map((obiectiv, i) => (
                            <div key={i} style={{ marginLeft: '20px' }}>
                              <p>{obiectiv.name} ({obiectiv.categorie}) - {obiectiv.ora_propusa}:00</p>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </Paper>
                ))
              ) : (
                <p>No ObiectivCuZile2 itineraries available.</p>
              )}

              <h2>ObiectivCuZile3 Itineraries</h2>
              {obiectivCuZile3History.length > 0 ? (
                obiectivCuZile3History.map((item, index) => (
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
                      <p>Pause Hour: {item.pauza}</p>
                      <p>End Hour: {item.oraEnd}</p>
                      <p>Maximum Price: {item.pretMaxim}</p>
                      <p>Days: {item.zile}</p>
                      <p>Date: {new Date(item.date).toLocaleString()}</p>
                      <p>Objectives:</p>
                      {item.obiective.map((zi, ziIndex) => (
                        <div key={ziIndex}>
                          <p>Day {ziIndex + 1}:</p>
                          {zi.map((obiectiv, i) => (
                            <div key={i} style={{ marginLeft: '20px' }}>
                              <p>{obiectiv.name} ({obiectiv.categorie}) - {obiectiv.ora_propusa}:00</p>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </Paper>
                ))
              ) : (
                <p>No ObiectivCuZile3 itineraries available.</p>
              )}
            </>
          ) : (
            <p>No history available.</p>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default UserHistory;
