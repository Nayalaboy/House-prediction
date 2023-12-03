import React, {useState} from 'react';
import axios from 'axios';
import { TextField, Button} from '@mui/material';

function PredictionForm(){
    const [inputs, setInputs]= useState({});
    const [errors, setErrors]= useState({});
    const [prediction, setPrediction] = useState("");

    const handleChange = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        
        if (name==="Longitude") {
            if (value > -114 || value < -124.8){
                setErrors(prevErrors=>({
                    ...prevErrors,
                    Longitude: "Longitude must be between -114 and -124. These values represent California geographic boundaries "
                }));
            } else{
                setErrors(prevErrors => ({
                    ...prevErrors,
                    Longitude: null
                }));
            }
        }

        if (name==="Latitude") {
            if (value > 42 || value < 32){
                setErrors(prevErrors=>({
                    ...prevErrors,
                    Latitude: "Latitude must be between 32 and 42. These values represent California geographic boundaries "
                }));
            } else{
                setErrors(prevErrors => ({
                    ...prevErrors,
                    Latitude: null
                }));
            }
        }

        

        setInputs(values => ({...values, [name]: value}));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(Object.values(errors).some(error =>error)){
            return;
        }
        try {
            // Transform 'MedInc' before sending
            const transformedInputs  = {
                ...inputs,
                MedInc: inputs.MedInc ? parseFloat(inputs.MedInc) / 10000 : 0
            };
            const response = await axios.post('http://localhost:5000/predict', {
                features: Object.values(transformedInputs)
            });

            const scaledPrediction = response.data.prediction * 100000;
            setPrediction(Math.round(scaledPrediction));
        } catch (error) {
            console.error("There was an error!", error);
        }
    } 

    return (
        <div>
            <form onSubmit={handleSubmit}>

                <TextField
                    className="form-element"
                    type= "number"
                    label="Median income for households"
                    variant="outlined"                    
                    name="MedInc"
                    value={inputs.MedInc|| ""}
                    onChange={handleChange}
                    margin= "normal"
                    helperText="Enter amount in full format (e.g., 45000 )"
                />

                <TextField
                    className="form-element"
                    label="Median house age "
                    variant="outlined"                    
                    name="HouseAge"
                    value={inputs.HouseAge|| ""}
                    onChange={handleChange}
                    margin= "normal"
                />
                <TextField
                    className="form-element"
                    label="Average number of rooms "
                    variant="outlined"                    
                    name="AveRooms"
                    value={inputs.AveRooms|| ""}
                    onChange={handleChange}
                    margin= "normal"
                />

                <TextField
                    className="form-element"
                    label="Average number of bedrooms "
                    variant="outlined"                    
                    name="AveBedrms"
                    value={inputs.AveBedrms|| ""}
                    onChange={handleChange}
                    margin= "normal"
                />
                
                <TextField
                    className="form-element"
                    label="block group population"
                    variant="outlined"                    
                    name="Population"
                    value={inputs.Population|| ""}
                    onChange={handleChange}
                    margin= "normal"
                    helperText = "give an estimation of the population in the block. Usually, it range from 100 to 33000 habitants"
                />

                <TextField
                    className="form-element"
                    label="household headcount"
                    variant="outlined"                    
                    name="AveOccup"
                    value={inputs.AveOccup|| ""}
                    onChange={handleChange}
                    margin= "normal"
                />

                <TextField
                    className="form-element"
                    type="number"
                    inputProps={{
                        min:"32",
                        max:"42"
                    }}
                    label="block group Latitude"
                    variant="outlined"                    
                    name="Latitude"
                    value={inputs.Latitude|| ""}
                    onChange={handleChange}
                    margin= "normal"
                    error={!!errors.Latitude}
                    helperText={errors.Latitude}
                />
                <TextField
                    className="form-element"
                    type="number"
                    inputProps={{
                        min:"-124",
                        max:"-114"
                    }}
                    label="block group longitude"
                    variant="outlined"                    
                    name="Longitude"
                    value={inputs.Longitude|| ""}
                    onChange={handleChange}
                    margin= "normal"
                    error={!!errors.Longitude}
                    helperText={errors.Longitude}
                />

                <Button
                    className="form-element"
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}>
                    Predict
                </Button>
                
            </form>
            {prediction && (
            <p className="form-element">The average price of a house given these features is {prediction}$</p>
            )}        
        </div>
    );
}
export default PredictionForm;