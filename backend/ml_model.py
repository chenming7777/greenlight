from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib
from io import StringIO 
import numpy as np
from fastapi.responses import StreamingResponse
import shap

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (for development)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)
# Load pre-trained model
try:
    model = joblib.load('./backend/lightgbm_model.pkl')
    scaler_x = joblib.load('./backend/scaler_x.pkl')
    scaler_y = joblib.load('./backend/scaler_y.pkl')
    explainer = shap.TreeExplainer(model)
    print("Model and SHAP explainer loaded successfully")
except Exception as e:
    print(f"Error loading model: {str(e)}")
    raise

class PredictionInput(BaseModel):
    GHI: float
    temp: float
    pressure: float
    humidity: float
    wind_speed: float
    rain_1h: float
    clouds_all: float
    Year: int
    Month_num: int
    DayOfYear: int
    Minute: int
    Hour: int
    Season: int
    Day: int
    Week_cos: float
    Energy_lag_1: float
    Energy_lag_2: float

# Add new endpoint for SHAP values
@app.post("/api/explain")
async def explain(input_data: PredictionInput):
    try:
        # Convert to DataFrame
        data = pd.DataFrame([input_data.dict()])
        
        # Scale input
        scaled_data = scaler_x.transform(data)
        
        # Calculate SHAP values
        shap_values = explainer.shap_values(scaled_data)
        
        # Create feature importance dictionary
        feature_importance = dict(zip(data.columns, np.abs(shap_values[0])))
        
        # Sort features by absolute SHAP value
        sorted_importance = dict(sorted(feature_importance.items(), 
                                     key=lambda x: abs(x[1]), 
                                     reverse=True))
        
        return {
            "shap_values": {k: float(v) for k, v in sorted_importance.items()},
            "base_value": float(explainer.expected_value)
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/predict")
async def predict(input_data: PredictionInput):
    try:
        # Convert to DataFrame
        data = pd.DataFrame([input_data.dict()])
        
        # Scale input
        scaled_data = scaler_x.transform(data)
        
        # Predict scaled value
        scaled_prediction = model.predict(scaled_data)
        
        # Inverse transform to original scale
        prediction = scaler_y.inverse_transform(
            scaled_prediction.reshape(-1, 1)
        ).flatten()[0]

        if prediction < 0:
            prediction = 0.0
        
        # Calculate SHAP values
        shap_values = explainer.shap_values(scaled_data)
        shap_values_instance = shap_values[0]  # For single instance
        
        # Create SHAP dictionary with original feature names
        shap_dict = {col: float(val) for col, val in zip(data.columns, shap_values_instance)}
        
        return {
            "prediction": prediction,
            "shap_values": shap_dict,
            "base_value": float(explainer.expected_value)
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/predict_csv")
async def predict_csv(file: UploadFile = File(...)):
    try:
        df = pd.read_csv(file.file)
        
        required_columns = [
            'GHI', 'temp', 'pressure', 'humidity', 'wind_speed', 'rain_1h',
            'clouds_all', 'Year', 'Month_num', 'DayOfYear', 'Minute', 'Hour',
            'Season', 'Day', 'Week_cos', 'Energy_lag_1', 'Energy_lag_2'
        ]

        missing_cols = [col for col in required_columns if col not in df.columns]
        if missing_cols:
            raise HTTPException(
                status_code=400,
                detail=f"Missing required columns: {', '.join(missing_cols)}"
            )
            
        extra_cols = [col for col in df.columns if col not in required_columns]
        if extra_cols:
            print(f"Warning: Extra columns found: {', '.join(extra_cols)}")
        
        
        # Scale features
        X_scaled = scaler_x.transform(df[required_columns])
        
        # Predict scaled values
        scaled_predictions = model.predict(X_scaled)
        
        # Inverse transform and clip negatives
        predictions = scaler_y.inverse_transform(
            scaled_predictions.reshape(-1, 1)
        ).flatten()

        # Convert to list and check each value
        final_predictions = []
        for p in predictions:
            final_predictions.append(p if p >= 0 else 0.0)
            
        df['predicted_energy'] = final_predictions 
        
        # Create CSV response
        stream = StringIO()
        df.to_csv(stream, index=False)
        response = StreamingResponse(
            iter([stream.getvalue()]),
            media_type="text/csv",
            headers={"Content-Disposition": "attachment; filename=predictions.csv"}
        )
        
        return response

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"CSV processing error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8001)