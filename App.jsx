import { Container, Typography } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Redirect from './components/Redirect';
import Statistics from './components/Statistics';
import UrlShortener from './components/UrlShortener';

function App() {
  console.log('App rendered');
  return (
    <BrowserRouter>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          URL Shortener
        </Typography>
        <Routes>
          <Route path="/" element={<UrlShortener />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/:shortCode" element={<Redirect />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;