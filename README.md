

# California Housing Price Prediction

## Overview
This project aims to predict housing prices in California districts based on various features such as median income, housing age, average rooms, and more. The prediction model is based on the 1990 California census data. The project comprises a machine learning model, a Flask backend, and a React frontend.
Model
### Description
- Algorithm Used: Ridge Regression.
- Training Data: The model is trained on the California Housing dataset, which includes features like median income, house age, average rooms, average bedrooms, population, average occupancy, and geographic location.
- Preprocessing: Data normalization, feature selection, and other preprocessing steps.

### Backend
#### Flask API
**Endpoints:**
- /predict: Accepts input features and returns the predicted house price.
  
**Setup:**
- Flask server running the machine learning model.
- CORS enabled for communication with the React frontend.

### Frontend
#### React Application
**Features:**
- Interactive form to input features for prediction.
- Displays the predicted housing price.
  
**User Interface:**
- Material-UI components for styling.
- Responsive design for various screen sizes.

![page snipet](https://github.com/Nayalaboy/House-prediction/blob/main/page_snipet.png)
