import pandas as pd
from datetime import datetime

# Read the CSV file
df = pd.read_csv('./preprocessing_data/final_complete_data.csv', parse_dates=['timestamp'])

# Ask the user for the desired date
date_str = input("Enter the date you want to export (YYYY-MM-DD): ")

# Convert the input string to a datetime object
selected_date = datetime.strptime(date_str, "%Y-%m-%d").date()

# Filter the dataframe for the selected date
filtered_df = df[df['timestamp'].dt.date == selected_date]

# Check if any data exists for the selected date
if filtered_df.empty:
    print(f"No data available for {date_str}")
else:
    # Create the output filename
    output_filename = f"./gemini_model/daily_energy_csv_database/energy_data_{date_str}.csv"
    
    # Export the filtered data to a new CSV file
    filtered_df.to_csv(output_filename, index=False)
    print(f"Data for {date_str} has been exported to {output_filename}")