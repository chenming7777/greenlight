import Typography from "@mui/material/Typography";
import { Button, Card, Box, Select, MenuItem } from "@mui/material";
import { useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import GppGoodIcon from "@mui/icons-material/GppGood";
import BoltIcon from "@mui/icons-material/Bolt";
// import ReportModal from "./ReportModal";

const energyData = [
  { name: "", produced: 0, consumed: 0 },
  { name: "October", produced: 180, consumed: 220 },
  { name: "November", produced: 200, consumed: 180 },
  { name: "December", produced: 250, consumed: 230 },
  { name: "January", produced: 280, consumed: 260 },
  { name: "February", produced: 100, consumed: 50 },
  // { name: "August", produced: 280, consumed: 200 },
  { name: "", produced: 100, consumed: 150 },
];

export default function FarmerChart({ callback }) {
  const [open, setOpen] = useState(false);

  const toggleModal = () => {
    setOpen(!open);
  };

  const downloadReport = () => {
    const link = document.createElement("a");
    link.href = "/dashboard/ilovepdf_merged_removed.pdf";
    link.download = "report_november_2019.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Card
        sx={{
          p: 3.5,
          borderRadius: 3,
          // boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          boxShadow: "none",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          // mb={2}
          sx={{
            minWidth: "850px",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "#000",
              fontWeight: "900",
            }}
          >
            Yield Produced
          </Typography>
          {/* <Box>
            <Button
              onClick={callback}
              variant="outlined"
              sx={{
                mr: 2,
                py: 1,
                px: 1,
                color: "#000",
                border: "1px solid #000",
                fontWeight: "bold",
              }}
            >
              <GppGoodIcon
                sx={{
                  mr: 1,
                }}
              />
              Blockchain Verified
            </Button>
            <Button
              variant="outlined"
              sx={{
                mr: 2,
                py: 1,
                color: "#000",
                border: "1px solid #000",
                fontWeight: "bold",
              }}
            >
              <BoltIcon
                sx={{
                  mr: 1,
                }}
              />
              300 kWh
            </Button>
            <Select
              size="small"
              defaultValue="monthly"
              sx={{
                // height: "100%",
                mr: 2,
                px: 1,
                border: "1px solid #000",
                fontWeight: "bold",
              }}
            >
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
            </Select>
            <Button
              variant="contained"
              onClick={toggleModal}
              sx={{
                backgroundColor: "#000",
                padding: "0.5rem 2rem",
                borderRadius: 25,
              }}
              // onClick={downloadReport}
            >
              Download Report
            </Button>
          </Box> */}
        </Box>
        <Box
          sx={{
            marginY: 5,
          }}
        ></Box>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={energyData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            {/* <Legend /> */}
            <Line
              type="linear"
              dataKey="produced"
              dot={{
                r: 6,
                stroke: "#2D825A",
              }}
              stroke="#2D825A"
              activeDot={{ r: 8 }}
            />
            <Line
              type="linear"
              dataKey="consumed"
              stroke="#E8D686"
              dot={{
                r: 6,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            mt: 2,
            gap: "3rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                backgroundColor: "#57CE8D",
                borderRadius: "50%",
                border: "1px solid #2D825A",
              }}
            ></div>
            <Typography
              sx={{
                fontSize: "12px",
                color: "#000",
                fontWeight: "bold",
              }}
            >
              Expected
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                backgroundColor: "#FFE760",
                borderRadius: "50%",
                border: "1px solid #E8D686",
              }}
            ></div>
            <Typography
              sx={{
                fontSize: "12px",
                color: "#000",
                fontWeight: "bold",
              }}
            >
              Actual
            </Typography>
          </Box>
        </Box>
      </Card>
      {/* <ReportModal
        open={open}
        onClose={toggleModal}
        onDownloadReport={downloadReport}
      /> */}
    </>
  );
}
