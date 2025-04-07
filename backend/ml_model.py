from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib
from datetime import datetime

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
    model = joblib.load('lightgbm_model.pkl')
    print("Model loaded successfully")
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

@app.post("/api/predict")
async def predict(input_data: PredictionInput):
    try:
        data = pd.DataFrame([input_data.dict()])
        prediction = model.predict(data)
        return {"prediction": float(prediction[0])}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

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
        
        df = df[required_columns]
        predictions = model.predict(df)
        
        results = []
        for idx, pred in enumerate(predictions):
            results.append({
                "timestamp": datetime.now().isoformat(),
                "predicted_energy": float(pred)
            })
        
        avg_pred = sum(predictions) / len(predictions)
        return {
            "predictions": results,
            "average_prediction": float(avg_pred)
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"CSV processing error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8001)