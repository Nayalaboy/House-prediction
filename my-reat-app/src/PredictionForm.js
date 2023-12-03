import React, {useState} from 'react';
import axios from 'axios';

function PredictionForm(){
    const [inputs, setInputs]= useState({});
    const [prediction, setPrediction] = useState("");

    const handleChange = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value})) 
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/predict', {
                features: Object.values(inputs)
            });
            setPrediction(response.data.prediction);
        } catch (error) {
            console.error("There was an error!", error);
        }
    } 
    return (
        <div>
            <form onSubmit={handleSubmit}>

<input
                    type="text"
                    name="MedInc"
                    placeholder="Median Income"
                    value={inputs.MedInc|| ""}
                    onChange={handleChange}
                />
<input
                    type="text"
                    name="HouseAge"
                    placeholder="House Age"
                    value={inputs.HouseAge|| ""}
                    onChange={handleChange}
                />
<input
                    type="text"
                    name="AveRooms"
                    placeholder="Average Rooms"
                    value={inputs.AveRooms|| ""}
                    onChange={handleChange}
                />


<input
                    type="text"
                    name="AveBedrms"
                    placeholder="Nomber of Bedrooms"
                    value={inputs.AveBedrms|| ""}
                    onChange={handleChange}
                />

<input
                    type="text"
                    name="Population"
                    placeholder="Population"
                    value={inputs.Population|| ""}
                    onChange={handleChange}
                />

<input
                    type="text"
                    name="AveOccup"
                    placeholder="Average occupation"
                    value={inputs.AveOccup|| ""}
                    onChange={handleChange}
                />

<input
                    type="text"
                    name="Latitude"
                    placeholder="Latitude"
                    value={inputs.Latitude|| ""}
                    onChange={handleChange}
                />

<input
                    type="text"
                    name="Longitude"
                    placeholder="Longitude"
                    value={inputs.Longitude|| ""}
                    onChange={handleChange}
                />


                {/* Repeat for as many features as your model expects */}
                <input type="submit" value="Predict" />
            </form>
            {prediction && <p>Prediction: {prediction}</p>}
        </div>
    );
}
export default PredictionForm;