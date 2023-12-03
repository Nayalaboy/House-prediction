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
        <div className='center'>
          <Typography variant='h4' component="h1" guttertop>
            House Price predictor using California 1990 sensus dataset
          </Typography>
        </div>
              <div className="left-align">
                <Card variant="outlined" style={{marginBottom: '20px', maxWidth: 800}}>
                  <CardContent>
                    
                    <Typography variant="body1">
                      <strong>Dataset description</strong> <br/> <br/> 

                      The dataset used for predicting house prices includes several features:
                      median income, housing age, average rooms, average bedrooms, population,
                      average occupancy, and location (latitude and longitude). These features
                      are used to train the Ridge Regression model which predicts the median
                      house value for California districts, derived from the 1990 census data. <br /> <br/>

                      <strong>Try and find top five richest neighboorhood house prices using these inputs : </strong>

                      <ul>
                        <li> Atherton(Latitude : 37.454	, Longitude:-122.2031 )</li>
                        <li>Hillsborough (Latitude: 37.5572 , Longitude:	-122.3586)</li>
                        <li>Los Altos Hills(Latitude : 37.3669, Longitude : -122.1387) </li>
                        <li>Kentfield(Latitude: 37.9481	, Longitude : -122.5497)</li>
                        <li>Los Altos (Latitude: 37.3669, Longitude: -122.1387)</li>
                      </ul>

                    </Typography>
                    <Typography variant="body1" className="warning-paragraph">
                    Warning: This model as been created  based on 1990 dataset. The prediction might not be accurate in 2023.
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
