import { CircularProgress, Container } from '@mui/material';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Logger from '../utils/Logger';

function Redirect() {
  const { shortCode } = useParams();

  useEffect(() => {
    const storedUrls = JSON.parse(localStorage.getItem('shortenedUrls') || '[]');
    const url = storedUrls.find((u) => u.shortCode === shortCode);

    if (url && new Date(url.expiresAt) > new Date()) {
      const clickData = {
        timestamp: new Date().toISOString(),
        source: document.referrer || 'Direct',
        location: 'Unknown', // Simulated geolocation
      };
      url.clicks.push(clickData);
      localStorage.setItem('shortenedUrls', JSON.stringify(storedUrls));
      Logger.info('URL redirected', { shortCode, longUrl: url.longUrl });
      window.location.href = url.longUrl;
    } else {
      Logger.error('Invalid or expired short URL', { shortCode });
      window.location.href = '/';
    }
  }, [shortCode]);

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
      <CircularProgress />
    </Container>
  );
}

export default Redirect;