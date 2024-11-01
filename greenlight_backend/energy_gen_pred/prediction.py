import numpy as np
import pandas as pd
from tensorflow.keras.models import load_model
from sklearn.preprocessing import MinMaxScaler
import matplotlib.pyplot as plt

# Load the saved model
model = load_model('./gemini_model/energy_gen_pred/energy_gen_lstm_model.h5')

# Function to preprocess new data
def preprocess_data(df):
    # Add time-based features
    df['hour'] = pd.to_datetime(df['timestamp']).dt.hour
    df['dayofweek'] = pd.to_datetime(df['timestamp']).dt.dayofweek
    
    # Initialize the scaler
    scaler = MinMaxScaler()
    
    # Fit and transform the data
    columns_to_scale = ['IRR', 'massaPM1', 'massaPM2', 'massaPM4', 'massaPM10',
                        'numPM1', 'numPM2', 'numPM4', 'numPM10', 'tamanho_medio', 'temp',
                        'vento_dir', 'vento_vel', 'rainfall', 'P_AC', 'hour', 'dayofweek']
    scaled_data = scaler.fit_transform(df[columns_to_scale])
    
    # Convert to a DataFrame
    scaled_df = pd.DataFrame(scaled_data, columns=columns_to_scale)
    
    return scaled_df, scaler

# Function to create sequences
def create_sequences(df, seq_length):
    sequences = []
    for i in range(len(df) - seq_length + 1):
        seq = df.iloc[i:i+seq_length].values
        sequences.append(seq)
    return np.array(sequences)

# Load and preprocess new data
# Replace 'new_data.csv' with the path to your new data file
new_data = pd.read_csv('C:\\greenlight\\preprocessing_data\\2019-11-20_sun.csv')
preprocessed_data, scaler = preprocess_data(new_data)

# Create sequences
SEQ_LENGTH = 24  # This should be the same as what you used during training
sequences = create_sequences(preprocessed_data, SEQ_LENGTH)

# Make predictions
predictions = model.predict(sequences)

# Denormalize the predictions
# We need to create a dummy array with the same shape as the input to the scaler
dummy = np.zeros((len(predictions), len(preprocessed_data.columns)))
dummy[:, preprocessed_data.columns.get_loc('P_AC')] = predictions.flatten()
denormalized_predictions = scaler.inverse_transform(dummy)[:, preprocessed_data.columns.get_loc('P_AC')]

# Add predictions to the original dataframe
new_data['predicted_P_AC'] = np.nan  # Initialize with NaN
new_data.loc[SEQ_LENGTH-1:, 'predicted_P_AC'] = denormalized_predictions

# Create the graph
plt.figure(figsize=(12, 6))
plt.plot(new_data['timestamp'], new_data['P_AC'], label='Actual P_AC', color='blue')
plt.plot(new_data['timestamp'], new_data['predicted_P_AC'], label='Predicted P_AC', color='red')

plt.title('Actual vs Predicted P_AC Over Time')
plt.xlabel('Timestamp')
plt.ylabel('P_AC')
plt.legend()

# Rotate and align the tick labels so they look better
plt.gcf().autofmt_xdate()

# Use a tight layout
plt.tight_layout()

# Save the graph
plt.savefig('P_AC_prediction_graph.png')

# Display the graph
plt.show()

print("Graph saved as 'P_AC_prediction_graph.png'")

# Print or save the results
print(new_data[['timestamp', 'P_AC', 'predicted_P_AC']])
# Optionally, save to a CSV file
new_data.to_csv('predictions_output.csv', index=False)