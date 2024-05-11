import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Slider, Typography, Grid } from '@mui/material';


function PredictionForm() {
    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState({});
    const [prediction, setPrediction] = useState("");

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        validateInput(name, value);  
        setInputs(values => ({...values, [name]: value}));
    };

    const handleSliderChange = (event, newValue) => {
        setInputs(values => ({...values, Distance: newValue}));
    };

    const validateInput = (name, value) => {
        let errMsg = '';
        switch (name) {
            case 'MedInc':
                errMsg = value < 0 ? 'Median income cannot be negative.' : '';
                break;
            case 'HouseAge':
                errMsg = value < 0  ? 'House age cannot be negative.' : '';
                break;
            case 'Population':
                errMsg = value < 0 ? 'Population cannot be negative.' : '';
                break;
            case 'AveOccup':
                errMsg = (value < 0 || value > 10) ? 'Average occupancy must be between 0 and 10.' : '';
                break;
            case 'RoomsPerBedroom':
                errMsg = value < 0 ? 'Rooms per bedroom cannot be negative.' : '';
                break;
            default:
                errMsg = '';
                break;
        }
        setErrors(prev => ({ ...prev, [name]: errMsg }));
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!Object.values(errors).every(err => err === '')) {
            console.error('Validation errors:', errors);
            return;  // Prevent submission if any errors exist
        }
        // Prepare data to send to the backend
        const payload = {
            city: inputs.City,
            desired_distance: parseFloat(inputs.Distance),
            features: [
                parseFloat(inputs.MedInc) || 0,  // Make sure we transform median income appropriately
                parseFloat(inputs.HouseAge) || 0,
                parseFloat(inputs.Population) || 0,
                parseFloat(inputs.AveOccup) || 0,
                parseFloat(inputs.RoomsPerBedroom) || 0  // Ensure this feature is added to the features array
            ]
        };

        try {
            const response = await axios.post('http://localhost:5000/predict', payload);
            const scaledPrediction = response.data.prediction * 100000;
            setPrediction(Math.round(scaledPrediction));
        } catch (error) {
            console.error("There was an error!", error);
        }
    };

    
    return (
        <div sx={{ paddingX: 5 }}> {/* Increased padding on the left and right */}
            <form onSubmit={handleSubmit} sx={{ marginX: 'auto', maxWidth: '300px' }}> {/* Center form with maximum width */}
                <Grid container spacing={2} alignItems="center">                   
               <Grid item xs={6} sm={6}>
                        <Typography>City</Typography>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <Select
                            fullWidth
                            labelId="city-label"
                            id="city-select"
                            name="City"
                            value={inputs.City || ""}
                            onChange={handleInputChange}
                            sx={{ maxWidth: '500px' }}
                        >
                        <MenuItem value="Los Angeles">Los Angeles</MenuItem>
                        <MenuItem value="San Francisco">San Francisco</MenuItem>
                        <MenuItem value="San Diego">San Diego</MenuItem>
                        <MenuItem value="San Jose">San Jose</MenuItem>
                        <MenuItem value="Palo Alto">Palo Alto</MenuItem>
                        <MenuItem value="Santa Barbara">Santa Barbara</MenuItem>
                        <MenuItem value="Malibu">Malibu</MenuItem>
                        <MenuItem value="Cupertino">Cupertino</MenuItem>
                        <MenuItem value="Santa Monica">Santa Monica</MenuItem>
                        <MenuItem value="Berkeley">Berkeley</MenuItem>
                        <MenuItem value="Newport Beach">Newport Beach</MenuItem>
                        <MenuItem value="Mill Valley">Mill Valley</MenuItem>
                        <MenuItem value="Carmel-by-the-Sea">Carmel-by-the-Sea</MenuItem>
                        
                    </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                        <Typography>Distance from city (km)</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Slider
                        value={typeof inputs.Distance === 'number' ? inputs.Distance : 0}
                        onChange={handleSliderChange}
                        valueLabelDisplay="auto"
                         min={0}
                         max={50}
                         sx={{ maxWidth: '500px' }}
                        />
                                                      
                </Grid>

                <Grid item xs={12} sm={6}>
                        <Typography>median income in block group</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            type="number"
                            name="MedInc"
                            value={inputs.MedInc || ""}
                            onChange={handleInputChange}
                            error={!!errors.MedInc}  
                            helperText="Enter median income in 10 of thousands (e.g. put a 150000$, just type 15)"
                            sx={{ maxWidth: '500px' }}
                        />
                </Grid>

                <Grid item xs={12} sm={6}>
                        <Typography>median house age in block group</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            type="number"
                            name="HouseAge"
                            value={inputs.HouseAge || ""}
                            onChange={handleInputChange}
                            error={!!errors.HouseAge}
                            helperText="Median house age"
                            sx={{ maxWidth: '500px' }}
                        />
                </Grid>

                <Grid item xs={12} sm={6}>
                        <Typography>block group population</Typography>
                    </Grid> 
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            type="number"
                            name="Population"
                            value={inputs.Population || ""}
                            onChange={handleInputChange}
                            error={!!errors.Population}
                            helperText="Average number of people in the block"
                            sx={{ maxWidth: '500px' }}
                        />
                </Grid>

                <Grid item xs={12} sm={6}>
                        <Typography>average number of household members</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            type="number"
                            name="AveOccup"
                            value={inputs.AveOccup || ""}
                            onChange={handleInputChange}
                            error={!!errors.AveOccup}
                            helperText="Average household size"
                            sx={{ maxWidth: '500px' }}
                        />
                </Grid>

                <Grid item xs={12} sm={6}>
                        <Typography>Number of room per house</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            type="number"
                            name="RoomsPerBedroom"
                            value={inputs.RoomsPerBedroom || ""}
                            onChange={handleInputChange}
                            error={!!errors.RoomsPerBedroom}
                            helperText="Rooms per bedroom"
                            sx={{ maxWidth: '500px' }}
                        />
                </Grid>
            </Grid>
            <Button type="submit" variant="contained" color="primary">
                    Predict
            </Button>
            </form>
            {prediction && (
                <p>The average price of a house given these features is ${prediction}.</p>
            )}
        </div>
    );
}

export default PredictionForm;