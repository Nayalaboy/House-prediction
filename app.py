# Import necessary libraries
from flask import Flask, request, jsonify
from joblib import load

# Initialize Flask application
app = Flask(__name__)

# Load the Ridge Regression model
model = load('ridge_model.joblib')

# Define the home route
@app.route('/')
def home():
    return "Hello, World!"

# Define the prediction endpoint
@app.route('/predict', methods=['POST'])
def predict():
    # Get data from POST request
    data = request.get_json()

    # Ensure that the 'features' key is present in the JSON request
    if 'features' not in data:
        return jsonify({"error": "Missing features in request"}), 400

    try:
        # Make a prediction using the model
        prediction = model.predict([data['features']])
        # Send back the prediction as a JSON
        return jsonify(prediction=prediction[0])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
