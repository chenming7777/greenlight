import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  IconButton,
  Button,
  Avatar,
  Divider,
  Card,
} from "@mui/material";

import { ArrowUpward, ArrowDownward, ArrowForward } from "@mui/icons-material";
import EastIcon from "@mui/icons-material/East";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import PerformanceCard from "../../components/financial-overview/PerformanceCard";

const weeklyData = [
  { name: "17 Sun", thisWeek: 200, lastWeek: 50 },
  { name: "18 Mon", thisWeek: 30, lastWeek: 80 },
  { name: "19 Tue", thisWeek: 10, lastWeek: 60 },
  { name: "20 Wed", thisWeek: 80, lastWeek: 20 },
  { name: "21 Thu", thisWeek: 70, lastWeek: 0 },
  { name: "22 Fri", thisWeek: 0, lastWeek: 100 },
  { name: "23 Sat", thisWeek: 60, lastWeek: 30 },
];

export default function FinancialOverview() {
  return (
    <Box sx={{ p: 3, minHeight: "100vh" }}>
      <Grid container spacing={3}>
        {/* Portfolio Performance */}
        <Grid item xs={12} md={6}>
          <PerformanceCard
            title="Portfolio Performance"
            description="87.54% more than last month"
            figure="81.595%"
          />
        </Grid>

        {/* Total Profit */}
        <Grid item xs={12} md={6}>
          <PerformanceCard
            title="Total Profit"
            description="87.54% more than last month"
            figure="RM 279,753"
          />
        </Grid>

        {/* Solar Energy Generation Revenue */}
        <Grid item xs={12} md={6}>
          <PerformanceCard
            title="Solar Energy Generation Revenue"
            figure="RM 250,000"
            description="38.54% more than last month"
            subtitle="838,156.80 kWh"
          />
        </Grid>

        {/* Carbon Credits Revenue */}
        <Grid item xs={12} md={6}>
          <PerformanceCard
            title="Carbon Credits Revenue"
            figure="RM 11,753"
            description="8% more than last month"
            subtitle="0.758kg CO2e/kWh"
          />
        </Grid>

        <Divider
          sx={{
            marginTop: "50px",
            marginBottom: "20px",
            width: "95%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />

        {/* Expenses Breakdown */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            height: "100%",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              color: "#878787",
              fontSize: "22px",
              marginBottom: "10px",
            }}
          >
            Expenses Breakdown
          </Typography>

          <Card
            sx={{
              p: 3.5,
              borderRadius: 3,
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            }}
          >
            <Grid container spacing={2.5} rowSpacing={5}>
              {[
                { title: "Hardware Cost", amount: 250.0, change: 15 },
                {
                  title: "Data Storage & Management",
                  amount: 350.0,
                  change: -8,
                },
                { title: "Maintenance", amount: 50.0, change: 12 },
                { title: "Software Cost", amount: 80.0, change: 15 },
                { title: "Training", amount: 420.0, change: -25 },
                { title: "Electricity", amount: 650.0, change: 23 },
              ].map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    gap={3}
                  >
                    <div>
                      <img
                        src="src/assets/financial-overview/Icon.png"
                        alt="Icon"
                        style={{ width: "40px", height: "60px" }}
                      />
                    </div>
                    <div
                      style={{
                        flexGrow: 1,
                      }}
                    >
                      <Box textAlign="left">
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#299D91",
                          }}
                        >
                          {item.title}
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: "16px",
                            fontWeight: "900",
                          }}
                        >
                          ${item.amount.toFixed(2)}
                        </Typography>
                        <Typography
                          variant="body2"
                          color={
                            item.change > 0 ? "success.main" : "error.main"
                          }
                        >
                          {Math.abs(item.change)}%
                          {item.change > 0 ? (
                            <ArrowUpward fontSize="small" />
                          ) : (
                            <ArrowDownward fontSize="small" />
                          )}
                        </Typography>
                      </Box>
                    </div>
                    <div>
                      <EastIcon
                        sx={{
                          color: "#299D91",
                        }}
                      />
                    </div>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>

        {/* Weekly Comparison Chart */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="subtitle1"
            sx={{
              color: "#878787",
              fontSize: "22px",
              marginBottom: "10px",
            }}
          >
            Weekly Comparison
          </Typography>

          <Card
            sx={{
              p: 3.5,
              borderRadius: 3,
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            }}
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData} barCategoryGap={15}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="thisWeek"
                  name="This week"
                  fill="#E8E8E8"
                  radius={[8, 8, 0, 0]}
                />
                <Bar
                  dataKey="lastWeek"
                  name="Last week"
                  fill="#299D91"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
      </Grid>

      {/* Download Report Button */}
      <Box mt={8} display="flex" justifyContent="center">
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#000",
            padding: "0.8rem 8rem",
            borderRadius: 25,
          }}
        >
          Download Report
        </Button>
      </Box>
    </Box>
  );
}
