/*
import './App.css';
import Appbar from './components/Appbar';
import Obiectiv from './components/Obiectiv';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Maps from './components/pages/Maps'
import FoodMap from './components/pages/FoodMap'
import CountriesExplore from './components/pages/CountriesExplore';
import TouristAttractionsMap from './components/pages/TouristAttractionsMap';
import SimpleItineraryGenerate from './components/pages/SimpleItineraryGenerate';
import CompleteItineraryGenerate from './components/pages/CompleteItineraryGenerate';
import AttractionsFromACity from './components/pages/AttractionsFromACity';
import RestaurantsFromACity from './components/pages/RestaurantsFromACity';
import Home from './components/pages/Home'
import Explore from './components/pages/Explore'
import Itinerary from './components/pages/Itinerary'
import ContactUs from './components/pages/ContactUs';
import SignUp from './components/pages/SignUp';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/maps' exact component={Maps} />
        <Route path='/' exact component={Home} />
        <Route path='/explore' exact component={Explore} />
        <Route path='/itinerary' exact component={Itinerary} />
        <Route path='/food-map' exact component={FoodMap} />
        <Route path='/contact-us' exact component={ContactUs} />
        <Route path='/sign-up' exact component={SignUp} />
        <Route path='/countries-explore' exact component={CountriesExplore} />
        <Route path='/tourist-attractions-map' exact component={TouristAttractionsMap} />
        <Route path='/simple-itinerary-generate' exact component={SimpleItineraryGenerate} />
        <Route path='/complete-itinerary-generate' exact component={CompleteItineraryGenerate} />
        <Route path='/attractions-from-a-city' exact component={AttractionsFromACity} />
        <Route path='/restaurants-from-a-city' exact component={RestaurantsFromACity} />
      </Switch>
    </Router>
  );
}

export default App;*/
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { db } from './firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import Navbar from './components/Navbar';
import Maps from './components/pages/Maps';
import FoodMap from './components/pages/FoodMap';
import CountriesExplore from './components/pages/CountriesExplore';
import TouristAttractionsMap from './components/pages/TouristAttractionsMap';
import SimpleItineraryGenerate from './components/pages/SimpleItineraryGenerate';
import CompleteItineraryGenerate from './components/pages/CompleteItineraryGenerate';
import AttractionsFromACity from './components/pages/AttractionsFromACity';
import RestaurantsFromACity from './components/pages/RestaurantsFromACity';
import Home from './components/pages/Home';
import Explore from './components/pages/Explore';
import Itinerary from './components/pages/Itinerary';
import ContactUs from './components/pages/ContactUs';
import Obiectiv from './components/Obiectiv';
import UserHistory from './components/UserHistory';
import MyAccount from './components/pages/MyAccount'; // Import MyAccount component
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import './App.css';

const AnimatedTypography = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  textTransform: 'uppercase',
  marginBottom: theme.spacing(4),
  fontSize: '2.5rem',
  fontWeight: 'bold',
  color: 'rebeccapurple',
  animation: 'colorChange 3s infinite alternate',
  '@keyframes colorChange': {
    '0%': { color: 'rebeccapurple' },
    '50%': { color: 'blue' },
    '100%': { color: 'green' },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  color: 'white',
  padding: theme.spacing(1, 5),
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  '&:hover': {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
}));

function Auth({ setAuthenticated, setUserName }) {
  const [dataName, setDataName] = useState('');
  const [dataEmail, setDataEmail] = useState('');
  const [dataPassword, setDataPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  const [isLogin, setIsLogin] = useState(true);
  const history = useHistory();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'users2'), {
        name: dataName,
        email: dataEmail,
        password: dataPassword,
        createdAt: new Date(),
      });
      console.log('Document written with ID: ', docRef.id);
      setDataName('');
      setDataEmail('');
      setDataPassword('');
      setMessageType('success');
      setMessage('Registration successful! Please login.');
      setIsLogin(true);
    } catch (e) {
      console.error('Error adding document: ', e);
      setMessageType('error');
      setMessage('Registration failed!');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const q = query(collection(db, 'users2'), where('email', '==', loginEmail), where('password', '==', loginPassword));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0].data();
        setMessageType('success');
        setMessage('Login successful!');
        setAuthenticated(true);
        setUserName(userDoc.name);
        history.push('/');
      } else {
        setMessageType('error');
        setMessage('Login failed! Incorrect email or password.');
      }
      setLoginEmail('');
      setLoginPassword('');
    } catch (e) {
      console.error('Error during login: ', e);
      setMessageType('error');
      setMessage('Login failed due to an error!');
    }
  };

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundImage: 'url(/travel5.jpeg)', 
      backgroundSize: 'cover', 
      backgroundPosition: 'center'
    }}>
      <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
          <AnimatedTypography variant="h4" component="h1" gutterBottom>
            {isLogin ? 'Login' : 'Register'}
          </AnimatedTypography>
          {isLogin ? (
            <form onSubmit={handleLogin}>
              <TextField
                fullWidth
                label="Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
              <StyledButton
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
              >
                Login
              </StyledButton>
              <Typography variant="body2" sx={{ marginTop: 2, textAlign: 'center' }}>
                Don't have an account?{' '}
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => setIsLogin(false)}
                >
                  Sign Up
                </Link>
              </Typography>
            </form>
          ) : (
            <form onSubmit={handleRegister}>
              <TextField
                fullWidth
                label="Name"
                value={dataName}
                onChange={(e) => setDataName(e.target.value)}
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                label="Email"
                value={dataEmail}
                onChange={(e) => setDataEmail(e.target.value)}
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={dataPassword}
                onChange={(e) => setDataPassword(e.target.value)}
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
              <StyledButton
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
              >
                Register
              </StyledButton>
              <Typography variant="body2" sx={{ marginTop: 2, textAlign: 'center' }}>
                Already have an account?{' '}
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </Link>
              </Typography>
            </form>
          )}

          {message && (
            <Alert severity={messageType} sx={{ marginTop: 2 }}>
              {message}
            </Alert>
          )}
        </Paper>
      </Container>
    </div>
  );
}

function Logout({ setAuthenticated }) {
  const history = useHistory();

  React.useEffect(() => {
    setAuthenticated(false);
    history.push('/auth');
  }, [setAuthenticated, history]);

  return null;
}

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');

  return (
    <Router>
      <Switch>
        <Route path="/auth">
          <Auth setAuthenticated={setAuthenticated} setUserName={setUserName} />
        </Route>
        <Route path="/">
          {authenticated ? (
            <>
              <Navbar userName={userName} />
              <Switch>
                <Route path="/maps" exact component={Maps} />
                <Route path="/" exact component={Home} />
                <Route path="/explore" exact component={Explore} />
                <Route path="/itinerary" exact component={Itinerary} />
                <Route path="/food-map" exact component={FoodMap} />
                <Route path="/contact-us" exact component={ContactUs} />
                <Route path="/sign-out">
                  <Logout setAuthenticated={setAuthenticated} />
                </Route>
                <Route path="/countries-explore" exact component={CountriesExplore} />
                <Route path="/tourist-attractions-map" exact component={TouristAttractionsMap} />
                <Route path="/game" exact component={SimpleItineraryGenerate} />
                <Route path="/complete-itinerary-generate" exact component={CompleteItineraryGenerate} />
                <Route path="/attractions-from-a-city" exact component={AttractionsFromACity} />
                <Route path="/restaurants-from-a-city" exact component={RestaurantsFromACity} />
                <Route path="/obiectiv" exact component={Obiectiv} />
                <Route path="/history" exact component={UserHistory} />
                <Route path="/my-account" exact>
                  <MyAccount userName={userName} />
                </Route>
              </Switch>
            </>
          ) : (
            <Redirect to="/auth" />
          )}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
