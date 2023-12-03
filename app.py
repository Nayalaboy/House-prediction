# Import necessary libraries
from flask import Flask, request, jsonify
from joblib import load
from flask_cors import CORS
import pandas as pd

# Initialize Flask application
app = Flask(__name__)

CORS(app)

# Load the Ridge Regression model
model = load('ridge_model.joblib')

# Define the home route
@app.route('/')
def home():
    return "Hello, World!"

# Define the prediction endpoint
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        features = data['features']
        
        # Create a DataFrame with the correct feature names
        df = pd.DataFrame([features], columns=model.feature_names_in_)
        
        # Make a prediction
        prediction = model.predict(df)
        return jsonify(prediction=prediction.tolist())
    except Exception as e:
        print(e)
        return jsonify(error=str(e)), 500
# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
