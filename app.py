from flask import Flask, request, jsonify
from joblib import load
from flask_cors import CORS
import pandas as pd
import numpy as np

# Initialize Flask application
app = Flask(__name__)
CORS(app)

# Load the Lasso model (assuming Lasso in your case)
model = load('ridge_model.joblib')

# Define the home route
@app.route('/')
def home():
    return "Welcome to the Housing Price Prediction API!"

# Define the prediction endpoint
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        city = data['city']
        distance_km = request.json['desired_distance']  # Desired distance in kilometers
        other_features = data['features']

        # City coordinates for prediction
        city_coords = {
            'Los Angeles': {'lat': 34.0522, 'lon': -118.2437},
            'San Francisco': {'lat': 37.7749, 'lon': -122.4194},
            'San Diego': {'lat': 32.7157, 'lon': -117.1611},
            'San Jose': {'lat': 37.3382, 'lon': -121.8863},
            'Palo Alto': {'lat': 37.4419, 'lon': -122.1430},
            'Santa Barbara': {'lat': 34.4208, 'lon': -119.6982},
            'Malibu': {'lat': 34.0259, 'lon': -118.7798},
            'Cupertino': {'lat': 37.3220, 'lon': -122.0322},
            'Santa Monica': {'lat': 34.0195, 'lon': -118.4912},
            'Berkeley': {'lat': 37.8715, 'lon': -122.2730},
            'Newport Beach': {'lat': 33.6189, 'lon': -117.9298},
            'Mill Valley': {'lat': 37.9060, 'lon': -122.5449},
            'Carmel-by-the-Sea': {'lat': 36.5552, 'lon': -121.9233} 
        }

        if city not in city_coords:
            return jsonify(error="City not recognized"), 400
        
        distance_km = float(request.json['desired_distance'])
        displacement_lat = distance_km / 111.0  # Approx. change in latitude per km
        new_lat = city_coords[city]['lat'] + displacement_lat
        new_lon = city_coords[city]['lon']  # Assuming no longitudinal change for simplicity

        # Prepare the features for the model
        features_dict = {
            'MedInc': other_features[0],
            'HouseAge': other_features[1],
            'Population': other_features[2],
            'AveOccup': other_features[3],
            'Latitude': new_lat,
            'Longitude': new_lon,
            'RoomsPerBedroom': other_features[4]
        }

        df = pd.DataFrame([features_dict])
        prediction = model.predict(df)
        return jsonify(prediction=prediction.tolist())

    except Exception as e:
        print(e)
        return jsonify(error=str(e)), 500

if __name__ == '__main__':
    app.run(debug=True)
