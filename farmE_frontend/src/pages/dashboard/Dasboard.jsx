import Typography from "@mui/material/Typography";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import {
  Button,
  Card,
  Avatar,
  Paper,
  Box,
  Select,
  Divider,
  Grid,
  MenuItem,
} from "@mui/material";

import { useState } from "react";
import { styled } from "@mui/material/styles";

import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import BlockchainEnergyDataModal from "../../components/dashboard/BlockchainModal";

import DashboardChart from "../../components/dashboard/DashboardChart";
import WeatherCondition from "../../components/dashboard/WeatherCondition";
import PerformanceSection from "../../components/dashboard/PeeformanceSection";

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

const panelMonitoring = ["40", "14", "50", "34", "8.23"];

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

const Dashboard = () => {
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

      {/* Info Panel */}
      <div
        style={{
          display: "flex",
          padding: "1rem 3em",
          borderRadius: 15,
          justifyContent: "space-between",
          backgroundColor: "#6FC635",
          color: "#fff",
        }}
      >
        <div></div>
        <div
          style={{
            flexShrink: 0,
            backgroundColor: "#FF0000",
            padding: "0.5rem 1.5rem",
            borderRadius: 25,
            display: "flex",
            alignItems: "center",
          }}
        >
          <PriorityHighIcon
            sx={{
              fontSize: "18px",
              marginRight: "0.5rem",
            }}
          />
          <Typography
            sx={
              {
                // padding: 0,
                // margin: 0,
              }
            }
          >
            Maintenance Due
          </Typography>
        </div>
      </div>

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
          gap: "2rem",
        }}
      >
        {/* Left Section */}
        <div
          style={{
            flexGrow: 4,
          }}
        >
          {/* Panel Section */}
          <div>
            <Card
              sx={{
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                p: 4,
                backgroundColor: "#ECECEC",
                borderRadius: 3,
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: "#000000",
                  }}
                >
                  Panel Monitoring
                </Typography>
                <Box>
                  <Select
                    size="small"
                    defaultValue="active"
                    sx={{ mr: 2, backgroundColor: "#fff", borderRadius: 2 }}
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                  </Select>
                  <Select
                    size="small"
                    defaultValue="all"
                    sx={{
                      backgroundColor: "#fff",
                      borderRadius: 2,
                    }}
                  >
                    <MenuItem value="all">All Panels</MenuItem>
                  </Select>
                </Box>
              </Box>
              {/* Placeholder for panel grid image */}
              <Box sx={{ mb: 2 }}>
                <Grid container spacing={0}>
                  {[...Array(6)].map((_, index) => {
                    let active = true;
                    if (index == 5) {
                      active = false;
                    }
                    return (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <HtmlTooltip
                          title={
                            <>
                              <Typography
                                color="inherit"
                                sx={{
                                  fontWeight: 600,
                                }}
                              >
                                Panel {index + 1}
                              </Typography>
                              <Typography color="inherit" sx={{}}>
                                {active ? "Active" : "Inactive"}
                              </Typography>
                            </>
                          }
                        >
                          <div
                            className="panel"
                            style={{
                              backgroundImage: `${active ? "url(src/assets/dashboard/active-panel.png)" : "url(src/assets/dashboard/inactive-panel.png)"}`,
                            }}
                          ></div>
                        </HtmlTooltip>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
              <Divider
                sx={{
                  my: 5,
                  color: "#000000",
                  backgroundColor: "#000000",
                }}
              />
              <Grid container spacing={2}>
                {[
                  "Total Capacity",
                  "Total Yield",
                  "Consumption",
                  "Total Charging",
                  "Real Time Usage",
                ].map((item, index) => (
                  <Grid item xs={12} sm={2.4} key={index}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 300,
                        color: "#565555",
                      }}
                    >
                      {item}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 800,
                      }}
                    >
                      {panelMonitoring[index]} kWh
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Card>
          </div>

          <div
            style={{
              margin: "2rem 0",
            }}
          ></div>

          {/* Chart Section */}
          <div>
            <DashboardChart callback={toggleModal} />
          </div>
        </div>

        {/* Right Section */}
        <div
          style={{
            flexGrow: 5,
            minWidth: "480px",
          }}
        >
          {/* Weather Conditions */}
          <div>
            <WeatherCondition />
          </div>
          {/* End of Weather Condition */}

          <div
            style={{
              margin: "2rem 0",
            }}
          ></div>

          {/* Performance Section */}
          <PerformanceSection />
          {/* End of Performance Section */}
        </div>
      </div>

      <BlockchainEnergyDataModal open={open} onClose={toggleModal} />
    </>
  );
};

export default Dashboard;
