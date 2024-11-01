Electrical and environmental dataset
====================================

Dataset comprised of environmental and electrical data variables from a photovoltaic inverter data. 

The environmental data are collected from a set of sensors installed in an in-house environment station to get the data. The station controller is performed by a NodeMCU ESP32 and the sensors are: 
- Anemometer SV10: wind speed
- DV10: wind direction
- DS18B20: environment temperature 
- Hukseflux SR05-DA2: pyranometer for solar irradiation
- Sensirion SPS30: particulate mass and accumulate
- DHT22/AM2303: environment humidity
- PB10: pluviometer 

The inverter is a [Fronius Primo 8.2-1 8.2kW] (https://www.fronius.com/en-us/usa/photovoltaics/products/all-products/inverters/fronius-primo/fronius-primo-8-2-1-208-240) which is inverting DC electrical data from an array comprised of 38 p-Si Canadian solar panels (275Wp) in location latitude -20.510886 e longitude -54.619878.

Inverter information:
The system uses a Fronius Primo 8.2-1 8.2kW inverter.

Solar panel information:
The array is comprised of p-Si Canadian solar panels.
Each panel is rated at 275Wp (Watts peak).

Total system capacity:
The inverter is rated at 8.2kW, which should be close to the total capacity of the solar array.


To estimate the number of panels:
Calculate the number of panels needed to reach 8.2kW:
8200W / 275W per panel ≈ 29.82 panels
Round up to the nearest whole number: 30 panels

The environmental data collected from the sensors are avaiable in csv files in folder station. Each csv file is named according to the day of the collected data. The data in the csv file are presented in 1min intervals.
- timestamp: yyyy-mm-dd HH:MM:SS
- IRR: solar irradiation (W/m2)
- massaPM1: 1um particulate mass (ug/m3)
- massaPM2: 2.5um particulate mass (ug/m3)
- massaPM4: 4um particulate mass (ug/m3)
- massaPM10: 10um particulate mass (ug/m3)
- numPM1: 1um particulate concentration (#/m3)
- numPM2: 2.5um particulate concentration (#/m3)
- numPM4: 4um particulate concentration (#/m3)
- numPM10:	10um particulate concentration (#/m3)
- tamanho_medio: average particulate concentration
- temp: environment temperature (celsius)
- vento_dir: wind direction (angles)
- vento_vel: wind speed (meters/second)
- rainfall: rain precipitation

The electrical data collected from the inverter are avaiable in csv files in folder inverter. Each csv file is named according to the day of the collected data.

- P_AC: alternate power (W)
- I_AC: alternate current (A)
- I_DC: direct current (A)	
- V_AC: alternate voltage (V)	
- V_DC: direct voltage (V)

Contact us
=========================
Please send us any doubt or comments to lscad.facom.ufms@gmail.com
