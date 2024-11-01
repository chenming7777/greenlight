import Typography from "@mui/material/Typography";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import ReportIcon from "@mui/icons-material/Report";
import { PieChart, Pie, Cell } from "recharts";

import {
  Button,
  Card,
  Avatar,
  Paper,
  Box,
  Select,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  LinearProgress,
} from "@mui/material";

import { useState } from "react";
import { styled } from "@mui/material/styles";

import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import BlockchainEnergyDataModal from "../../components/dashboard/BlockchainModal";

import DashboardChart from "../../components/dashboard/DashboardChart";
import FarmerChart from "../../components/dashboard-farmer/FarmerChart";
import WeatherCondition from "../../components/dashboard/WeatherCondition";
import PerformanceSection from "../../components/dashboard/PeeformanceSection";
import WeatherMiscCard from "../../components/dashboard-farmer/WeatherMiscCard";

// Make an array of 12 objects, with each object representing a panel and the url points to the image

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.7)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    // border: "1px solid #dadde9",
    padding: "2rem",
    borderRadius: 12,
  },
}));

const yieldData = [
  { name: "Tomato", value: 43 },
  { name: "Potato", value: 37 },
  { name: "Lettuce", value: 15 },
  { name: "Other", value: 5 },
];

const panelMonitoring = ["40", "14", "50", "34", "8.23"];

const nutrientLevels = [
  { label: "Magnesium", value: "0.18%", range: "0.20-0.30" },
  { label: "Acidity", value: "3.7pH", range: "5.5-7.5" },
  { label: "Phosphorus", value: "0.8%", range: "0.10-0.30" },
  { label: "Potassium", value: "180kg", range: "110-280" },
  { label: "Organic carbon", value: "0.7%", range: "0.5-7.5" },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const productionData = [
  {
    crop: "Potato",
    production: "1.53 ton",
    location: "Field 11-DA",
    harvestDate: "06/10/2024",
  },
  {
    crop: "Tomato",
    production: "1.01 ton",
    location: "Field 1-VQ",
    harvestDate: "12/10/2024",
  },
  {
    crop: "Lettuce",
    production: "0.47 ton",
    location: "Field 10-UV",
    harvestDate: "30/09/2024",
  },
  {
    crop: "Other",
    production: "0.50 ton",
    location: "Field 18-FA",
    harvestDate: "6/11/2024",
  },
];

const panelData = [
  {
    id: 1,
    url: "src/assets/dashboard/active-panel.png",
  },
  {
    id: 2,
    url: "src/assets/dashboard/active-panel.png",
  },
  {
    id: 3,
    url: "src/assets/dashboard/active-panel.png",
  },
  {
    id: 4,
    url: "src/assets/dashboard/active-panel.png",
  },
  {
    id: 5,
    url: "src/assets/dashboard/active-panel.png",
  },
  {
    id: 6,
    url: "src/assets/dashboard/active-panel.png",
  },
  {
    id: 7,
    url: "src/assets/dashboard/active-panel.png",
  },
  {
    id: 8,
    url: "src/assets/dashboard/active-panel.png",
  },
  {
    id: 9,
    url: "src/assets/dashboard/active-panel.png",
  },
  {
    id: 10,
    url: "src/assets/dashboard/active-panel.png",
  },
  {
    id: 11,
    url: "src/assets/dashboard/active-panel.png",
  },
  {
    id: 12,
    url: "src/assets/dashboard/active-panel.png",
  },
];

const DashboardFarmer = () => {
  const [open, setOpen] = useState(false);

  const toggleModal = () => {
    setOpen(!open);
  };

  return (
    <>
      <div
        style={{
          margin: "2rem 0",
        }}
      ></div>

      <div
        style={{
          margin: "2rem 0",
        }}
      ></div>

      {/* Main Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        {/* Left Section */}
        <div
          style={
            {
              // flexGrow: 2,
            }
          }
        >
          {/* Panel Section */}
          <div
            style={{
              display: "flex",
              padding: "1rem 3em",
              borderRadius: 15,
              flexDirection: "column",
              justifyContent: "space-between",
              backgroundColor: "#6FC635",
              color: "#fff",
            }}
          >
            <div
              style={{
                marginBottom: "1rem",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                }}
              >
                Farm Condition
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "start",
                gap: "3rem",
                // width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  border: "1px solid #000",
                  alignItems: "space-between",
                  borderRadius: 15,
                  //   maxWidth: "140px",
                  minWidth: "140px",
                  textAlign: "center",
                  // flexGrow: 1,
                  minHeight: "171px",
                  backgroundColor: "#fff",
                }}
              >
                <Typography
                  sx={{
                    color: "#A0AEC0",
                    fontSize: "12px",
                  }}
                >
                  Today
                </Typography>
                <img
                  src={`src/assets/dashboard/sunny-weather.png`}
                  style={{
                    width: "60px",
                    height: "60px",
                    margin: "0 auto",
                  }}
                />
                <Typography
                  sx={{
                    color: "#000",
                    fontSize: "25px",
                    fontWeight: "bold",
                  }}
                >
                  29.73°C
                </Typography>
                <Typography
                  sx={{
                    color: "#000",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  Sunny Day
                </Typography>
              </div>
              <div
                // Give me a 3 x 3 grid style
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "1rem 1rem",
                }}
              >
                <WeatherMiscCard />
                <WeatherMiscCard />
                <WeatherMiscCard />
                <WeatherMiscCard />
                <WeatherMiscCard />
                <WeatherMiscCard />
              </div>
            </div>
          </div>

          <div
            style={{
              margin: "2rem 0",
            }}
          ></div>

          {/* Table 1 */}
          <div>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Production</TableCell>
                    <TableCell align="right">Location</TableCell>
                    <TableCell align="right">Harvest Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productionData.map((row) => (
                    <TableRow key={row.crop}>
                      <TableCell component="th" scope="row">
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Box
                            sx={{
                              width: 10,
                              height: 10,
                              borderRadius: "50%",
                              bgcolor:
                                row.crop === "Potato"
                                  ? "#4caf50"
                                  : row.crop === "Tomato"
                                    ? "#f44336"
                                    : row.crop === "Lettuce"
                                      ? "#2196f3"
                                      : "#ff9800",
                              mr: 1,
                            }}
                          />
                          {row.crop}
                        </Box>
                      </TableCell>
                      <TableCell align="right">{row.production}</TableCell>
                      <TableCell align="right">{row.location}</TableCell>
                      <TableCell align="right">{row.harvestDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div
            style={{
              margin: "2rem 0",
            }}
          ></div>
          <div>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Nutrients levels (per hectare)
              </Typography>
              <List>
                {nutrientLevels.map((nutrient) => (
                  <ListItem key={nutrient.label}>
                    <ListItemText
                      primary={nutrient.label}
                      secondary={`${nutrient.value} (Range: ${nutrient.range})`}
                    />
                    <LinearProgress
                      variant="determinate"
                      value={
                        (parseFloat(nutrient.value) /
                          parseFloat(nutrient.range.split("-")[1])) *
                        100
                      }
                      sx={{ width: "50%", ml: 2 }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </div>
          {/* Yield Production */}
        </div>

        {/* Right Section */}
        <div
          style={{
            maxWidth: "700px",
          }}
        >
          {/* Weather Conditions */}
          <div>
            {/* <WeatherCondition /> */}

            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 4,
                  bgcolor: "#212121",
                  color: "white",
                  height: "100%",
                  borderRadius: 5,
                }}
              >
                <Typography variant="h6" sx={{ mb: 2 }}>
                  System Alerts
                </Typography>
                <List>
                  {[
                    "Equipment malfunctioning",
                    "High Level NH3 in nursery",
                    "Storm incoming",
                    "Soil humidity Sensor is disconnected",
                  ].map((alert, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <ReportIcon sx={{ color: "orange" }} />
                      </ListItemIcon>
                      <ListItemText primary={alert} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          </div>
          {/* End of Weather Condition */}

          <div
            style={{
              margin: "2rem 0",
            }}
          ></div>
        </div>
      </div>

      <div
        style={{
          marginTop: "3rem",
        }}
      ></div>
      {/* Bottom Section Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <div>
          {/* <DashboardChart callback={toggleModal} />
           */}
          <FarmerChart callback={toggleModal} />
        </div>

        <div
          style={{
            flexGrow: 2,
            height: "100%",
          }}
        >
          <Paper
            sx={{
              p: 2,
              height: "100%",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Yield Production
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <PieChart width={200} height={200}>
                <Pie
                  data={yieldData}
                  cx={100}
                  cy={100}
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {yieldData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
              <Box sx={{ ml: 2 }}>
                {yieldData.map((entry, index) => (
                  <Typography key={entry.name} variant="body2">
                    <Box
                      component="span"
                      sx={{ color: COLORS[index % COLORS.length], mr: 1 }}
                    >
                      ■
                    </Box>
                    {entry.name}: {entry.value}%
                  </Typography>
                ))}
              </Box>
            </Box>
          </Paper>
        </div>
      </div>

      <BlockchainEnergyDataModal open={open} onClose={toggleModal} />
    </>
  );
};

export default DashboardFarmer;
