import React from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Button,
  TextField,
} from "@mui/material";
// import {
//   Dashboard as DashboardIcon,
//   Assessment as AssessmentIcon,
//   Build as BuildIcon,
//   WbSunny as SunnyIcon,
//   AssistantPhoto as AssistantIcon,
//   Notifications as NotificationsIcon,
//   Settings as SettingsIcon,
//   ExitToApp as LogoutIcon,
// } from "@mui/icons-react";

const SystemCareComponent = () => {
  return (
    <Box sx={{ display: "flex" }}>
      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Calendar */}
        <Paper
          elevation={3}
          sx={{
            p: 2,
            mb: 2,
            borderRadius: 3,
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                flexShrink: 0,
              }}
            >
              January 2022
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                minWidth: 600,
                '@media (min-width: 600px)': {
                  minWidth: 400,
                },
                '@media (min-width: 1024px)': {
                  minWidth: 600,
                },
              }}
            >
              <TextField
                select
                label="Month"
                size="small"
                sx={{ mr: 1, width: "100%" }}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{
                  width: "100%",
                  '@media (min-width: 600px)': {
                    width: "auto",
                  },
                }}
              >
                Add event
              </Button>
            </Box>
          </Box>
          {/* Calendar grid would go here */}
          <Grid container spacing={1}>
            {/* This is a placeholder for the calendar grid */}
            {[...Array(7)].map((_, index) => (
              <Grid item xs key={index}>
                <Paper
                  elevation={1}
                  sx={{
                    p: 1,
                    height: 100,
                    borderRadius: 3,
                    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                  }}
                >
                  <Typography variant="body2">Jan {index + 1}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Today's Events */}
        <Paper
          elevation={3}
          sx={{
            p: 2,
            mb: 2,
            borderRadius: 3,
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          }}
        >
          <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
            Today
          </Typography>
          <List>
            {["X Due", "Maintenance", "X", "X", "X"].map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={item} secondary={`${8 + index}:00`} />
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* Categories */}
        <Paper
          elevation={3}
          sx={{
            p: 2,
            borderRadius: 3,
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          }}
        >
          <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
            Categories
          </Typography>
          <List>
            {["Category 1", "Category 2", "Category 3", "Category 4"].map(
              (item, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={item}
                    secondary={`${index + 1} items`}
                  />
                </ListItem>
              )
            )}
          </List>
        </Paper>
      </Box>
    </Box>
  );
};

export default SystemCareComponent;
