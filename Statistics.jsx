import {
  Box,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react'; // Added to fix the error
import { Link } from 'react-router-dom';
import Logger from '../utils/Logger';

function Statistics() {
  const [urls, setUrls] = useState([]);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const storedUrls = JSON.parse(localStorage.getItem('shortenedUrls') || '[]');
    console.log('Stored URLs:', storedUrls); // Debug log
    setUrls(storedUrls);
    Logger.info('Loaded URL statistics', { urlCount: storedUrls.length });
  }, []);

  const handleExpandClick = (index) => {
    setExpanded(expanded === index ? null : index);
    Logger.info('Toggled URL details', { index });
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        URL Statistics
      </Typography>
      <Typography>Component Loaded</Typography> {/* Debug addition */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Short URL</TableCell>
              <TableCell>Original URL</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Expires At</TableCell>
              <TableCell>Total Clicks</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {urls.map((url, index) => (
              <React.Fragment key={index}>
                <TableRow>
                  <TableCell>
                    <Link to={url.shortUrl} target="_blank">
                      {url.shortUrl}
                    </Link>
                  </TableCell>
                  <TableCell>{url.longUrl}</TableCell>
                  <TableCell>{new Date(url.createdAt).toLocaleString()}</TableCell>
                  <TableCell>{new Date(url.expiresAt).toLocaleString()}</TableCell>
                  <TableCell>{url.clicks.length}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleExpandClick(index)}>
                      {expanded === index ? 'Hide' : 'Show'}
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={6} style={{ paddingBottom: 0, paddingTop: 0 }}>
                    <Collapse in={expanded === index} timeout="auto" unmountOnExit>
                      <Box sx={{ margin: 1 }}>
                        <Typography variant="h6">Click Details</Typography>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>Timestamp</TableCell>
                              <TableCell>Source</TableCell>
                              <TableCell>Location</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {url.clicks.map((click, i) => (
                              <TableRow key={i}>
                                <TableCell>{new Date(click.timestamp).toLocaleString()}</TableCell>
                                <TableCell>{click.source}</TableCell>
                                <TableCell>{click.location}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Statistics;