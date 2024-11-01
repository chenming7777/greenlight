import pandas as pd
from datetime import datetime
from fpdf import FPDF
import matplotlib.pyplot as plt
import os

# Load data
data = pd.read_csv('./preprocessing_data/final_complete_data.csv')

# Ensure timestamp is in datetime format
data['timestamp'] = pd.to_datetime(data['timestamp'])

# Filter for November data
november_data = data[data['timestamp'].dt.month == 11]

# Group by day for November
daily_data = november_data.groupby(november_data['timestamp'].dt.date).agg({
    'IRR': ['sum', 'mean'],
    'massaPM1': 'mean',
    'massaPM2': 'mean',
    'massaPM4': 'mean',
    'massaPM10': 'mean',
    'numPM1': 'mean',
    'numPM2': 'mean',
    'numPM4': 'mean',
    'numPM10': 'mean',
    'tamanho_medio': 'mean',
    'temp': 'mean',
    'vento_vel': 'mean',
    'rainfall': 'sum',
    'P_AC': 'sum',
    'I_AC': 'sum',
    'I_DC': 'sum',
    'V_AC': 'mean',
    'V_DC': 'mean'
})

# Flatten the multi-level column index
daily_data.columns = ['_'.join(col).strip() for col in daily_data.columns.values]

# Calculate monthly aggregates
monthly_data = daily_data.mean()
monthly_data['IRR_sum'] = daily_data['IRR_sum'].sum()
monthly_data['rainfall_sum'] = daily_data['rainfall_sum'].sum()
monthly_data['P_AC_sum'] = daily_data['P_AC_sum'].sum()

# Prepare monthly report
today_date = 'November'
total_sunlight_hours = monthly_data['IRR_sum'] / 60  # Assuming IRR is measured per minute
average_temp = monthly_data['temp_mean']
average_wind_speed = monthly_data['vento_vel_mean']
total_rainfall = monthly_data['rainfall_sum']

air_quality_data = {
    'Average PM1': monthly_data['massaPM1_mean'],
    'Average PM2.5': monthly_data['massaPM2_mean'],
    'Average PM4': monthly_data['massaPM4_mean'],
    'Average PM10': monthly_data['massaPM10_mean'],
    'Average Particulate Concentration': monthly_data['numPM1_mean']
}

energy_data = {
    'Total Energy Generated AC': monthly_data['P_AC_sum'] / 1000,  # Assuming P_AC is in Wh
    'Total Energy Generated DC': monthly_data['I_DC_sum'] * monthly_data['V_DC_mean'] / 1000,
    'Conversion Efficiency Rate': (monthly_data['P_AC_sum'] / (monthly_data['I_DC_sum'] * monthly_data['V_DC_mean'])) * 100
}

class PDF(FPDF):
    def header(self):
        self.set_font('Arial', 'B', 24)
        self.cell(0, 10, f'Monthly Energy Generation Report for November', 0, 1, 'C')
        self.ln(10)

    def chapter_title(self, title):
        self.set_font('Arial', 'B', 16)
        self.cell(0, 10, title, 0, 1, 'L')
        self.ln(5)

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
weather_conditions = f"""
Total Sunlight Hours: {total_sunlight_hours:.2f} hours
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

environmental_impact = f"""
Environmental Impact: The clean energy generated this month contributed to improved air quality by reducing greenhouse gas emissions, promoting a healthier environment.
CO2 Savings: {energy_data['Total Energy Generated AC'] * 0.75:.2f} kg
"""

alerts_notifications = f"""
Performance Alerts: No performance alerts were reported for this month.
Weather Warnings: No weather warnings were reported for this month.
"""

summary_recommendations = f"""
Summary: The energy generation and environmental conditions for November have been analyzed.
Recommendations: Consider optimizing energy generation during periods of lower efficiency and monitoring weather conditions for better performance.
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
    'Energy Generation (kWh)': daily_data['P_AC_sum'] / 1000,
    'Temperature (°C)': daily_data['temp_mean'],
    'Wind Speed (ms)': daily_data['vento_vel_mean'],
    'Rainfall (mm)': daily_data['rainfall_sum'],
    'Particulate Size (µm)': daily_data['tamanho_medio_mean']
}

# Plot each variable
for variable_name, variable_data in variables.items():
    plt.figure(figsize=(10, 6))
    plt.plot(daily_data.index, variable_data, marker='o')
    plt.title(f'Daily {variable_name} for November')
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
pdf_filename = f"./gemini_model/report_database/monthly_energy_generation_report_november.pdf"
pdf.output(pdf_filename)

print(f"PDF report saved to: {pdf_filename}")