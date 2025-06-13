import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Container, Paper } from '@mui/material';

export default function Obiectiv() {
  const paperStyle = { padding: '50px 20px' };
  const [obiective, setObiective] = useState([]);
  const [obiective2, setObiective2] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [restaurant2, setRestaurant2] = useState(null);
  const [restaurant3, setRestaurant3] = useState(null);
  
  useEffect(() => {
    fetch("http://localhost:8080/obiectiv/getItinerariu?oras=Istanbul&oraStart=11&oraEnd=15&pretMaxim=1000")
      .then(res => res.json())
      .then((result) => {
        setObiective(result);
      });
  }, []);
  useEffect(() => {
    fetch("http://localhost:8080/obiectiv/getItinerariu?oras=Istanbul&oraStart=16&oraEnd=21&pretMaxim=1000")
      .then(res => res.json())
      .then((result) => {
        setObiective2(result);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/restaurant/getFindByOra?oras=Istanbul&categorie=Mic Dejun&ora=10")
      .then(res => res.json())
      .then((result) => {
        setRestaurant(result);
      });
  }, []);
  useEffect(() => {
    fetch("http://localhost:8080/restaurant/getFindByOra?oras=Istanbul&categorie=Pranz&ora=15")
      .then(res => res.json())
      .then((result) => {
        setRestaurant2(result);
      });
  }, []);
  useEffect(() => {
    fetch("http://localhost:8080/restaurant/getFindByOra?oras=Istanbul&categorie=Cina&ora=21")
      .then(res => res.json())
      .then((result) => {
        setRestaurant3(result);
      });
  }, []);

  return (
    <Box textAlign="center">
      <Container maxWidth="sm">
        <Paper elevation={3} style={{ ...paperStyle, margin: "20px auto" }}>
        {restaurant && (
            <Paper elevation={6} style={{ padding: "15px", margin: "10px auto", textAlign: "left", backgroundColor: "#ffffcc" }}>
              <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                 {restaurant.ora_propusa}:00
              </div>
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
          {obiective.map(obiectiv => (
            <Paper elevation={6} style={{ padding: "15px", margin: "10px auto", textAlign: "left" }} key={obiectiv.id}>
              <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                 {obiectiv.ora_propusa}:00
              </div>
              <div>
                 Denumire: {obiectiv.name} <br />
                 Oras: {obiectiv.oras} <br />
                 Categorie: {obiectiv.categorie} <br />
                 Address: {obiectiv.address} <br />
                 Program: {obiectiv.ora_deschidere}:00 - {obiectiv.ora_inchidere}:00<br />
                 Pret: {obiectiv.pret} RON<br />
                 Timp: {obiectiv.timp} h<br />
                 Rating: {obiectiv.rating} stele
              </div>
            </Paper>
          ))}
          {restaurant2 && (
            <Paper elevation={6} style={{ padding: "15px", margin: "10px auto", textAlign: "left", backgroundColor: "#ffffcc" }}>
              <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                 {restaurant2.ora_propusa}:00
              </div>
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
          {obiective2.map(obiectiv2 => (
            <Paper elevation={6} style={{ padding: "15px", margin: "10px auto", textAlign: "left" }} key={obiectiv2.id}>
              <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                 {obiectiv2.ora_propusa}:00
              </div>
              <div>
                 Denumire: {obiectiv2.name} <br />
                 Oras: {obiectiv2.oras} <br />
                 Categorie: {obiectiv2.categorie} <br />
                 Address: {obiectiv2.address} <br />
                 Program: {obiectiv2.ora_deschidere}:00 - {obiectiv2.ora_inchidere}:00<br />
                 Pret: {obiectiv2.pret} RON<br />
                 Timp: {obiectiv2.timp} h<br />
                 Rating: {obiectiv2.rating} stele
              </div>
            </Paper>
          ))}
          {restaurant3 && (
            <Paper elevation={6} style={{ padding: "15px", margin: "10px auto", textAlign: "left", backgroundColor: "#ffffcc" }}>
              <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                 {restaurant3.ora_propusa}:00
              </div>
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
      </Container>
    </Box>
  );
}
