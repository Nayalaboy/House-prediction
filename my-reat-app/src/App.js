import React from 'react';
import './App.css';
import PredictionForm from './PredictionForm';
import { createTheme, ThemeProvider, Grid, Typography, Card, CardContent } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: '#e57373',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8} lg={6}>
            <Typography variant='h4' component="h1" gutterBottom>
              House Price Predictor
            </Typography>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  Using California 1990 Census Dataset
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Predict house prices based on features like median income, housing age, population,
                  and more. These features are derived from the 1990 census data.
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Predefined Cities Include:</strong>
                  <ul>
                  <li><strong>Los Angeles:</strong> A sprawling Southern California city famed for its film and television industry.</li>
                    <li><strong>San Francisco:</strong> Known for its year-round fog, iconic Golden Gate Bridge, and cable cars.</li>
                    <li><strong>San Diego:</strong> Noted for its beaches, parks, and warm climate.</li>
                    <li><strong>San Jose:</strong> The heart of Silicon Valley, known for its tech industry and affluence.</li>
                    <li><strong>Palo Alto:</strong> Home to Stanford University and numerous tech companies.</li>
                    <li><strong>Santa Barbara:</strong> Often referred to as the American Riviera, known for its Mediterranean-style buildings.</li>
                    <li><strong>Malibu:</strong> Beach town known for its celebrity homes and surfing beaches.</li>
                    <li><strong>Cupertino:</strong> Headquarters of Apple Inc.</li>
                    <li><strong>Santa Monica:</strong> Famous for its pier and the end of Route 66.</li>
                    <li><strong>Berkeley:</strong> Home to the University of California, Berkeley, and a hotbed of liberal activism.</li>
                    <li><strong>Newport Beach:</strong> Known for surfing and upscale shopping.</li>
                    <li><strong>Mill Valley:</strong> Nestled below Mount Tamalpais, known for its natural beauty.</li>
                    <li><strong>Carmel-by-the-Sea:</strong> Known for its museums, historic library, and the fairytale cottages and galleries of its village-like center.</li>
                  </ul>
                </Typography>
                <Typography variant="body1" color="error">
                  Note: The prediction model is based on the 1990 dataset and may not reflect current market conditions.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <PredictionForm/>
      </div>
    </ThemeProvider>
  );
}

export default App;
