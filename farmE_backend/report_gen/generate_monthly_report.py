import pandas as pd
from datetime import datetime
from fpdf import FPDF
import matplotlib.pyplot as plt
import os
from dotenv import load_dotenv
import google.generativeai as genai
import getpass
import json

# Load environment variables
load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
if "GOOGLE_API_KEY" not in os.environ:
    os.environ["GOOGLE_API_KEY"] = getpass.getpass(os.getenv("GOOGLE_API_KEY"))


# Load data
data = pd.read_csv('./preprocessing_data/final_complete_data.csv')

# Ensure timestamp is in datetime format
data['timestamp'] = pd.to_datetime(data['timestamp'])

# Filter for March data
march_data = data[(data['timestamp'].dt.month == 3) & (data['timestamp'].dt.year == 2020)].copy()

# Group by hour and calculate necessary values
hourly_data = march_data.groupby(march_data['timestamp'].dt.floor('h')).agg({
    'P_AC': 'sum',
    'IRR': 'sum',
    'I_DC': 'sum',
    'V_DC': 'mean',
    'rainfall': 'sum',  # Sum rainfall for each hour
    'temp': 'mean',
    'vento_vel': 'mean'
})

# Convert minute-based sums to hourly values
hourly_data['P_AC'] = hourly_data['P_AC'] / 60  # Convert Wh/minute to Wh
hourly_data['IRR'] = hourly_data['IRR'] / 60    # Convert W/m²/minute to W/m²
hourly_data['I_DC'] = hourly_data['I_DC'] / 60  # Convert Ah/minute to Ah
hourly_data['rainfall'] = hourly_data['rainfall'] / 60  # Convert mm/minute to mm

# Calculate hourly DC energy
hourly_data['E_DC'] = hourly_data['I_DC'] * hourly_data['V_DC']

# Group by day
daily_data = hourly_data.groupby(hourly_data.index.date).agg({
    'P_AC': 'sum',
    'E_DC': 'sum',
    'IRR': 'sum',
    'rainfall': 'sum',  # Sum daily rainfall
    'temp': 'mean',
    'vento_vel': 'mean'
})

# Convert Wh to kWh for daily data
daily_data['P_AC'] = daily_data['P_AC'] / 1000
daily_data['E_DC'] = daily_data['E_DC'] / 1000

# Calculate sunlight hours (hours with IRR > 0) for each day
daily_sunlight_hours = (hourly_data['IRR'] > 100).groupby(hourly_data.index.date).sum()
daily_data['sunlight_hours'] = daily_sunlight_hours

# Calculate monthly totals
monthly_total_energy_ac = daily_data['P_AC'].sum()
monthly_total_energy_dc = daily_data['E_DC'].sum()
monthly_total_sunlight_hours = daily_data['sunlight_hours'].sum()
average_daily_sunlight_hours = monthly_total_sunlight_hours / len(daily_data)
total_rainfall = daily_data['rainfall'].sum()  # Calculate total monthly rainfall
average_temp = daily_data['temp'].mean()
average_wind_speed = daily_data['vento_vel'].mean()

# Prepare monthly report
today_date = 'March'
total_sunlight_hours = monthly_total_sunlight_hours

air_quality_data = {
    'Average PM1': march_data['massaPM1'].mean(),
    'Average PM2.5': march_data['massaPM2'].mean(),
    'Average PM4': march_data['massaPM4'].mean(),
    'Average PM10': march_data['massaPM10'].mean(),
    'Average Particulate Concentration': march_data['numPM1'].mean()
}

energy_data = {
    'Total Energy Generated AC': monthly_total_energy_ac,
    'Total Energy Generated DC': monthly_total_energy_dc,
    'Conversion Efficiency Rate': (monthly_total_energy_ac / monthly_total_energy_dc) * 100 if monthly_total_energy_dc > 0 else 0
}

class PDF(FPDF):
    def header(self):
        self.set_font('Arial', 'B', 20)
        self.cell(0, 10, f'Monthly Energy Generation Report for March', 0, 1, 'C')
        self.ln()

    def chapter_title(self, title):
        self.set_font('Arial', 'B', 16)
        self.cell(0, 2, title, 0, 1, 'L')
        self.ln()

    def chapter_body(self, body):
        self.set_font('Arial', '', 12)
        self.multi_cell(0, 10, body)
        self.ln()

    def add_chapter(self, title, body):
        self.add_page()
        self.chapter_title(title)
        self.chapter_body(body)

# Create the PDF object
pdf = PDF()
pdf.set_left_margin(10)
pdf.set_right_margin(10)

# Add content to the PDF
# Update the weather_conditions string in the PDF content
weather_conditions = f"""
Total Sunlight Hours: {total_sunlight_hours:.2f} hours
Average Daily Sunlight Hours: {average_daily_sunlight_hours:.2f} hours
Average Temperature: {average_temp:.2f}°C
Average Wind Speed: {average_wind_speed:.2f} m/s
Total Rainfall: {total_rainfall:.2f} mm
Air Quality Data:
    Average PM1: {air_quality_data['Average PM1']:.2f} µg/m³
    Average PM2.5: {air_quality_data['Average PM2.5']:.2f} µg/m³
    Average PM4: {air_quality_data['Average PM4']:.2f} µg/m³
    Average PM10: {air_quality_data['Average PM10']:.2f} µg/m³
    Average Particulate Concentration: {air_quality_data['Average Particulate Concentration']:.2f} particles/m³
"""

energy_generation_data = f"""
Total Energy Generated AC: {energy_data['Total Energy Generated AC']:.2f} kWh
Total Energy Generated DC: {energy_data['Total Energy Generated DC']:.2f} kWh
Conversion Efficiency Rate: {energy_data['Conversion Efficiency Rate']:.2f}%
"""

today_date = 'March'
total_sunlight_hours = monthly_total_sunlight_hours
average_daily_sunlight_hours = monthly_total_sunlight_hours / len(daily_data)


generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "application/json",
}

model = genai.GenerativeModel(
  model_name="gemini-1.5-flash",
  generation_config=generation_config,
  system_instruction="""
  You are the report generation model. Your task is to generate a Environmental Impact, Performance Alerts,  Weather Warnings, summary and recommendation for daily energy generation report based on the provided data. 
  Your duties include summarizing the data and providing a recommendation paragraph. If any data is missing or not provided, just say no information.
  Sample Information you will be provided is:
  Weather Conditions:
  Date: 
  Sunlight Hours:
  Average Temperature: °C
  Average Wind Speed:  ms
  Most Frequent Wind Direction: °
  Total Rainfall:  mm
  Air Quality Data:
  Average PM1:  µg/m³
  Average PM2.5: µg/m³
  Average PM4:  µg/m³
  Average PM10:  µg/m³
  Average Particulate Concentration:  particle/m³
  Energy Generation Data:
  Total Energy Generated AC:  kWh
  Total Energy Generated DC:  kWh
  Conversion Efficiency Rate: %
  Peak hour: 
  Hourly Energy Generation:
  
  Content Guidelines:
  Environmental Impact: Any additional environmental benefits achieved. (generate some base on the provided information) tell how the energy generation is helping the environment
  Performance Alerts
    Rainfall Impact:
        Detail how the total rainfall of {total_rainfall} mm might have impacted the system's performance, including potential risks or system stress.
    Sunlight Availability:
        Discuss the total sunlight hours {total_sunlight_hours} and average daily sunlight {average_daily_sunlight_hours}, and how these conditions influenced energy production.
    Temperature and Wind:
        Analyze the average temperature {average_temp}°C and wind speed {average_wind_speed} m/s, noting any concerns based on these conditions.
  Weather Warnings: Any weather-related warnings that might affect energy generation example mention on the Rainfall, Wind Speed etc (generate some base on the provided information)
    Heavy Rainfall:
        Warn about potential risks associated with heavy rainfall and recommend actions to mitigate these risks.
    Wind and Temperature:
        Provide advice on how to manage the system under the given wind and temperature conditions.
  Summary: Summarize the key findings regarding energy production, environmental impact, and any performance concerns.
  Recommendations: Suggestions for improving energy generation efficiency or addressing any issues identified or any other suggestion at least give one if nothing from the provided information
    System Monitoring:
        Advise on monitoring strategies based on weather conditions, particularly heavy rainfall and particulate levels.
    Flood Mitigation:
        Suggest flood prevention measures if heavy rainfall is a concern.
    Energy Optimization:
        Recommend strategies to optimize energy generation, especially under challenging weather conditions.
  Example output format:
    {
      "Environmental Impact": "Description here",
      "Performance Alerts": {
        "Rainfall Impact": "Detail here",
        "Sunlight Availability": "Detail here",
        "Temperature and Wind": "Detail here",
        "Other Alerts": {
          "Custom Alert 1": "Detail here",
          "Custom Alert 2": "Detail here"
        }
      },
      "Weather Warnings": {
        "Heavy Rainfall": "Detail here",
        "Wind and Temperature": "Detail here",
        "Other Warnings": {
          "Custom Warning 1": "Detail here",
          "Custom Warning 2": "Detail here"
        }
      },
      "Summary": "Summary here",
      "Recommendations": {
        "System Monitoring": "Detail here",
        "Flood Mitigation": "Detail here",
        "Energy Optimization": "Detail here",
        "Other Recommendations": {
          "Custom Recommendation 1": "Detail here",
          "Custom Recommendation 2": "Detail here"
        }
      }
    }
    """
)

def generate_gemini_report(summary):
    try:
        chat_session = model.start_chat(history=[])
        response = chat_session.send_message(summary)
        json_data = response.text
        
        # Parse the JSON response
        data = json.loads(json_data)
        
        # Extracting known fields with default fallbacks
        environmental_impact = data.get("Environmental Impact", "No environmental impact available")
        performance_alerts = data.get("Performance Alerts", {})
        weather_warnings = data.get("Weather Warnings", {})
        summary_section = data.get("Summary", "No summary available")
        recommendations = data.get("Recommendations", {})

        return {
            "environmental_impact": environmental_impact,
            "performance_alerts": performance_alerts,
            "weather_warnings": weather_warnings,
            "summary": summary_section,
            "recommendations": recommendations
        }
    
    except json.JSONDecodeError:
        return {
            "error": "Failed to parse the JSON response from the model."
        }
    except Exception as e:
        return {
            "error": str(e)
        }

# Create the summary string
summary = (
    f"Weather Conditions:\n"
    f"Date: {today_date}\n"
    f"Sunlight Hours: {total_sunlight_hours:.2f}\n"
    f"Average Temperature: {average_temp:.2f}°C\n"
    f"Average Wind Speed: {average_wind_speed:.2f} m/s\n"
    f"Most Frequent Wind Direction: N/A\n"  # You may need to calculate this
    f"Total Rainfall: {total_rainfall:.2f} mm\n"
    f"Air Quality Data:\n"
    f"Average PM1: {air_quality_data['Average PM1']:.2f} µg/m³\n"
    f"Average PM2.5: {air_quality_data['Average PM2.5']:.2f} µg/m³\n"
    f"Average PM4: {air_quality_data['Average PM4']:.2f} µg/m³\n"
    f"Average PM10: {air_quality_data['Average PM10']:.2f} µg/m³\n"
    f"Average Particulate Concentration: {air_quality_data['Average Particulate Concentration']:.2f} particle/m³\n\n"
    f"Energy Generation Data:\n"
    f"Total Energy Generated AC: {energy_data['Total Energy Generated AC']:.2f} kWh\n"
    f"Total Energy Generated DC: {energy_data['Total Energy Generated DC']:.2f} kWh\n"
    f"Conversion Efficiency Rate: {energy_data['Conversion Efficiency Rate']:.2f}%\n"
    f"Peak hour: N/A\n"  # You may need to calculate this
)

gemini_report = generate_gemini_report(summary)


environmental_impact = f"""
CO2 Savings: {energy_data['Total Energy Generated AC'] * 0.78:.2f} kg
Other Environmental Impact: {gemini_report['environmental_impact']}
"""

performance_alerts = "\n".join([
    f"- {key}: {value}" for key, value in gemini_report['performance_alerts'].items()
])

weather_warnings = "\n".join([
    f"- {key}: {value}" for key, value in gemini_report['weather_warnings'].items()
])

recommendations = "\n".join([
    f"- {key}: {value}" for key, value in gemini_report['recommendations'].items()
])

summary_recommendations = f"""
Summary: {gemini_report['summary']}

Recommendations: {recommendations}
"""

alerts_notifications = f"""
Performance Alerts: {performance_alerts}

Weather Warnings: {weather_warnings}
"""


# Add chapters to the PDF
pdf.add_chapter('Weather Conditions', weather_conditions)
pdf.add_chapter('Energy Generation Data', energy_generation_data)
pdf.add_chapter('Environmental Impact', environmental_impact)
pdf.add_chapter('Alerts and Notifications', alerts_notifications)
pdf.add_chapter('Summary and Recommendations', summary_recommendations)

# Constants for image placement
img_width = 190
img_height = 110
margin = 10
x_pos = margin
y_pos = margin
max_y = 297

# Add a new page for graphs
pdf.add_page()

# Variables to plot
variables = {
    'Energy Generation AC (kWh)': daily_data['P_AC'],
    'Energy Generation DC (kWh)': daily_data['E_DC'],
    'Temperature (°C)': daily_data['temp'],
    'Wind Speed (ms)': daily_data['vento_vel'],
    'Rainfall (mm)': daily_data['rainfall'],
    'Particulate Size (µm)': march_data.groupby(march_data['timestamp'].dt.date)['tamanho_medio'].mean(),
    'Daily Sunlight Hours': daily_data['sunlight_hours']
}

# Plot each variable
for variable_name, variable_data in variables.items():
    plt.figure(figsize=(10, 6))
    plt.plot(daily_data.index, variable_data, marker='o')
    plt.title(f'Daily {variable_name} for March')
    plt.xlabel('Date')
    plt.ylabel(f'{variable_name}')
    plt.grid(True)
    plt.xticks(rotation=45)
    plt.tight_layout()

    # Save the plot as an image
    plot_filename = f'daily_{variable_name.replace(" ", "_").replace("(", "").replace(")", "")}.png'
    plt.savefig(plot_filename)
    plt.close()

    # Check if adding the image would exceed the page height
    if y_pos + img_height + margin > max_y:
        pdf.add_page()
        y_pos = margin

    # Append the plot to the PDF
    pdf.image(plot_filename, x=x_pos, y=y_pos, w=img_width)
    
    # Update y position for the next image
    y_pos += img_height + margin

    # Clean up the plot image file
    os.remove(plot_filename)

# Save the PDF
pdf_filename = f"./farmE_backend/report_database/monthly_energy_generation_report_march_2020.pdf"
pdf.output(pdf_filename)

print(f"PDF report saved to: {pdf_filename}")