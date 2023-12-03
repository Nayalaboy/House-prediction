import React from 'react';
import './App.css';
import PredictionForm from './PredictionForm';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import {Typography, Card, CardContent } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    // Define other theme properties as needed
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <div className="left-align">
          <Typography variant='h2' component="h1" guttertop>
            House Price predictor using California 190 sensus dataset
          </Typography>
          <Card variant="outlined" style={{marginBottom: '20px', maxWidth: 800}}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                About the Dataset
              </Typography>
              <Typography variant="body1">
                The dataset used for predicting house prices includes several features:
                median income, housing age, average rooms, average bedrooms, population,
                average occupancy, and location (latitude and longitude). These features
                are used to train the Ridge Regression model which predicts the median
                house value for California districts, derived from the 1990 census data.
              </Typography>
            </CardContent>
          </Card>
        </div>
        <PredictionForm/>
      </div>
    </ThemeProvider>
  );
}

export default App;
