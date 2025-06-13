import React from 'react';
import { Container, Paper, Typography } from '@mui/material';

function MyAccount({ userName }) {
  const backgroundStyle = {
    backgroundImage: 'url("/travel5.jpeg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    padding: '20px',
    paddingTop: '100px',
    overflow: 'auto',
    position: 'relative',
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    zIndex: 1,
  };

  const contentStyle = {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'white',
    textAlign: 'center',
    maxWidth: '800px',
    margin: '0 auto',
  };

  const headerStyle = {
    fontSize: '30px',
    fontWeight: 'bold',
    marginBottom: '30px',
    color: 'white',
    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
    backgroundColor: 'rgba(173, 216, 230, 0.7)', 
    padding: '10px 20px',
    borderRadius: '8px',
  };

  return (
    <div style={backgroundStyle}>
      <div style={overlayStyle}></div>
      <div style={contentStyle}>
        <Typography variant="h4" component="h1" gutterBottom style={headerStyle}>
          Hello, {userName}! Welcome to our app!
        </Typography>
      </div>
    </div>
  );
}

export default MyAccount;
