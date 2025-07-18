import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography, // Added missing import
} from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logger from '../utils/Logger';
import { generateShortCode, isValidShortcode, isValidUrl } from '../utils/helpers';

function UrlShortener() {
  const navigate = useNavigate();
  const [urls, setUrls] = useState([{ longUrl: '', validity: '', shortCode: '' }]);
  const [errors, setErrors] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAddUrl = () => {
    if (urls.length < 5) {
      setUrls([...urls, { longUrl: '', validity: '', shortCode: '' }]);
      Logger.info('Added new URL input field', { urlCount: urls.length + 1 });
    } else {
      Logger.warn('Maximum URL limit reached', { limit: 5 });
      setErrors(['Maximum of 5 URLs allowed']);
    }
  };

  const handleInputChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const validateInputs = () => {
    const newErrors = [];
    urls.forEach((url, index) => {
      if (!url.longUrl) {
        newErrors.push(`URL ${index + 1}: URL is required`);
      } else if (!isValidUrl(url.longUrl)) {
        newErrors.push(`URL ${index + 1}: Invalid URL format`);
      }
      if (url.validity && isNaN(url.validity)) {
        newErrors.push(`URL ${index + 1}: Validity must be a number`);
      }
      if (url.shortCode && !isValidShortcode(url.shortCode)) {
        newErrors.push(`URL ${index + 1}: Shortcode must be 4-10 alphanumeric characters`);
      }
    });
    return newErrors;
  };

  const handleSubmit = async () => {
    setErrors([]);
    const validationErrors = validateInputs();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      Logger.error('Input validation failed', { errors: validationErrors });
      return;
    }

    setLoading(true);
    const storedUrls = JSON.parse(localStorage.getItem('shortenedUrls') || '[]');
    const newResults = [];

    for (const url of urls) {
      let shortCode = url.shortCode || generateShortCode();
      while (storedUrls.some((u) => u.shortCode === shortCode)) {
        shortCode = generateShortCode();
      }

      const expiryDate = new Date();
      expiryDate.setMinutes(expiryDate.getMinutes() + (parseInt(url.validity) || 30));

      const shortenedUrl = {
        longUrl: url.longUrl,
        shortCode,
        shortUrl: `http://localhost:3000/${shortCode}`,
        createdAt: new Date().toISOString(),
        expiresAt: expiryDate.toISOString(),
        clicks: [],
      };

      newResults.push(shortenedUrl);
      storedUrls.push(shortenedUrl);
    }

    localStorage.setItem('shortenedUrls', JSON.stringify(storedUrls));
    setResults(newResults);
    setLoading(false);
    Logger.info('URLs shortened successfully', { count: newResults.length });
    setUrls([{ longUrl: '', validity: '', shortCode: '' }]);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom> {/* Line 106 */}
        Shorten URLs
      </Typography>
      {urls.map((url, index) => (
        <Paper key={index} sx={{ p: 2, mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={`URL ${index + 1}`}
                value={url.longUrl}
                onChange={(e) => handleInputChange(index, 'longUrl', e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Validity (minutes)"
                value={url.validity}
                onChange={(e) => handleInputChange(index, 'validity', e.target.value)}
                placeholder="30"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Custom Shortcode"
                value={url.shortCode}
                onChange={(e) => handleInputChange(index, 'shortCode', e.target.value)}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Paper>
      ))}
      {errors.map((error, index) => (
        <Alert key={index} severity="error" sx={{ mb: 1 }}>
          {error}
        </Alert>
      ))}
      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
        <Button onClick={handleAddUrl} variant="outlined" disabled={urls.length >= 5}>
          Add Another URL
        </Button>
        <Button onClick={handleSubmit} variant="contained" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Shorten URLs'}
        </Button>
      </Box>
      {results.length > 0 && (
        <Paper sx={{ p: 2, mt: 4 }}>
          <Typography variant="h6">
            Shortened URLs
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Original URL</TableCell>
                  <TableCell>Short URL</TableCell>
                  <TableCell>Expires At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.map((result, index) => (
                  <TableRow key={index}>
                    <TableCell>{result.longUrl}</TableCell>
                    <TableCell>
                      <Link to={result.shortUrl} target="_blank">
                        {result.shortUrl}
                      </Link>
                    </TableCell>
                    <TableCell>{new Date(result.expiresAt).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
      <Button component={Link} to="/statistics" variant="text" sx={{ mt: 2 }}>
        View Statistics
      </Button>
    </Box>
  );
}

export default UrlShortener;