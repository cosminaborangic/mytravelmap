import React, { useState } from 'react';
import styled from 'styled-components';
import Puzzle from './Puzzle';

const StyledButton = styled.button`
  background: linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%);
  color: white;
  font-size: 70px; /* 5 times larger font size */
  font-weight: bold;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  padding: 40px 80px; /* Increased padding */
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
  transition: background 0.3s ease-in-out;
  &:hover {
    background: linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%);
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url("/travel2.jpg");
  background-size: cover;
  background-position: center;
  position: relative; /* Adaugă pentru a putea folosi pseudo-elemente */

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.4); /* Stratul semi-transparent alb */
    z-index: 1; /* Asigură-te că este deasupra imaginii de fundal */
  }

  > * {
    position: relative; /* Asigură-te că conținutul se află deasupra stratului alb */
    z-index: 2;
  }
`;

export default function SimpleItineraryGenerate() {
  const [showPuzzle, setShowPuzzle] = useState(false);

  const handleButtonClick = () => {
    setShowPuzzle(true);
  };

  return (
    <Container>
      {!showPuzzle ? (
        <StyledButton onClick={handleButtonClick}>
          Start Puzzle
        </StyledButton>
      ) : (
        <Puzzle />
      )}
    </Container>
  );
}
