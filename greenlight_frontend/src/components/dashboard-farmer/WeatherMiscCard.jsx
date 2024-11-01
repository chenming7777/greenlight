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

export default function WeatherMiscCard() {
  return (
    <Card
      sx={{
        backgroundColor: "#000",
        padding: "1rem 1.5rem",
        borderRadius: 5,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        minWidth: "190px",
        maxWidth: "200px",
        flexGrow: 1,
      }}
    >
      <img
        src={`src/assets/dashboard/sun.png`}
        style={{
          width: "35px",
          height: "35px",
          flexShrink: 0,
        }}
      />
      <div
        style={{
          flexGrow: 1,
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            color: "#fff",
            // fontWeight: "bold",
            // fontSize: "20px",
          }}
        >
          Irradiance
        </Typography>
        <Typography
          sx={{
            color: "#fff",
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          1041 W/m<sup>2</sup>
        </Typography>
      </div>
      <div>
        <Typography
          sx={{
            color: "#fff",
            // fontWeight: "bold",
          }}
        >
          10%
        </Typography>
      </div>
    </Card>
  );
}
