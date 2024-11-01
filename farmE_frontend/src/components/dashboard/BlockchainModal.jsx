import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from "@mui/material";
import { Close, CheckCircle } from "@mui/icons-material";
import GppGoodIcon from "@mui/icons-material/GppGood";
import axios from "axios";

const BlockchainEnergyDataModal = ({ open, onClose }) => {
  const [blockchainData, setBlockchainData] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [isUsingFallbackData, setIsUsingFallbackData] = useState(true);
  const [enableIntegrateBC, setEnableIntegrateBC] = useState(false);

  const originalDates = [
    "2024-08-01 09:00:00",
    "2024-08-01 12:00:00",
    "2024-08-01 15:00:00",
    "2024-08-02 09:00:00",
    "2024-08-02 12:00:00",
    "2024-08-02 15:00:00",
  ];

  const originalElectricalData = {
    timestamp: "2024-07-18 12:00:00",
    acPower: 6500,
    acCurrent: 28,
    dcCurrent: 30,
    acVoltage: 230,
    dcVoltage: 400,
    irr: 800,
  };

  const originalGroupedMeasurements = {
    acPower: [1000, 1100, 1200, 1300, 1400, 1500],
    acCurrent: [4.5, 4.8, 5.0, 5.2, 5.4, 5.6],
    dcCurrent: [4.0, 4.2, 4.4, 4.6, 4.8, 5.0],
    acVoltage: [220, 225, 230, 235, 240, 245],
    dcVoltage: [395, 400, 405, 410, 415, 420],
  };

  useEffect(() => {
    if (enableIntegrateBC) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            // "https://farm-e-blockchain.vercel.app/blocks"
            "http://127.0.0.1:8000/blocks"
          );
          console.log("response: ", response);
          response.data.shift();
          if (response.data.length > 0) {
            setBlockchainData(response.data);
            setSelectedBlock(response.data[1]);
            setIsUsingFallbackData(false);
          } else {
            throw new Error("Empty response");
          }
        } catch (error) {
          console.error("Error fetching blockchain data:", error);
          setBlockchainData([]);
          setIsUsingFallbackData(true);
          setSelectedBlock(originalDates[0]);
        }
      };

      fetchData();
    }
  }, []);

  const handleBlockSelection = (block) => {
    setSelectedBlock(block);
  };

  const electricalData = {
    timestamp: "2019-11-18 12:00:00",
    acPower: 6500,
    acCurrent: 28,
    dcCurrent: 30,
    acVoltage: 230,
    dcVoltage: 400,
    irr: 800,
  };

  const dates = isUsingFallbackData
    ? originalDates
    : blockchainData.map((block) =>
        new Date(block.timestamp * 1000).toLocaleString()
      );

  const filteredData = isUsingFallbackData
    ? originalElectricalData
    : selectedBlock
      ? JSON.parse(selectedBlock.data[1])
      : null;

  const groupedMeasurements = isUsingFallbackData
    ? originalGroupedMeasurements
    : filteredData
      ? {
          acPower: [
            filteredData.P_AC_Group1,
            filteredData.P_AC_Group2,
            filteredData.P_AC_Group3,
            filteredData.P_AC_Group4,
            filteredData.P_AC_Group5,
            filteredData.P_AC_Group6,
          ],
          acCurrent: [
            filteredData.I_AC_Group1,
            filteredData.I_AC_Group2,
            filteredData.I_AC_Group3,
            filteredData.I_AC_Group4,
            filteredData.I_AC_Group5,
            filteredData.I_AC_Group6,
          ],
          dcCurrent: [
            filteredData.I_DC_Group1,
            filteredData.I_DC_Group2,
            filteredData.I_DC_Group3,
            filteredData.I_DC_Group4,
            filteredData.I_DC_Group5,
            filteredData.I_DC_Group6,
          ],
          acVoltage: [
            filteredData.V_AC_Group1,
            filteredData.V_AC_Group2,
            filteredData.V_AC_Group3,
            filteredData.V_AC_Group4,
            filteredData.V_AC_Group5,
            filteredData.V_AC_Group6,
          ],
          dcVoltage: [
            filteredData.V_DC_Group1,
            filteredData.V_DC_Group2,
            filteredData.V_DC_Group3,
            filteredData.V_DC_Group4,
            filteredData.V_DC_Group5,
            filteredData.V_DC_Group6,
          ],
        }
      : originalGroupedMeasurements;

  // State to manage the selected date

  // Filter the records based on the selected date (assuming timestamp is related to date)
  // const filteredData = selectedDate
  //   ? electricalData
  //   : null; // Filter logic can be adjusted as needed
  const [selectedDate, setSelectedDate] = useState(dates[0]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center">
            <Typography variant="h5">
              Energy Production data on Blockchain
            </Typography>
            <GppGoodIcon color="success" sx={{ ml: 3, fontSize: 24 }} />
          </Box>

          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Paper variant="outlined" sx={{ height: "100%", overflow: "auto" }}>
              <Typography
                variant="subtitle1"
                sx={{ p: 1, backgroundColor: "#f5f5f5" }}
              >
                DATE
              </Typography>
              {isUsingFallbackData
                ? dates.map((date, index) => (
                    <Typography
                      key={index}
                      variant="body2"
                      sx={{
                        p: 1,
                        cursor: "pointer",
                        backgroundColor:
                          selectedDate === date ? "#e0e0e0" : "transparent",
                      }}
                      onClick={() => setSelectedDate(date)}
                    >
                      {date}
                    </Typography>
                  ))
                : blockchainData.map((block, index) => (
                    <Typography
                      key={index}
                      variant="body2"
                      sx={{
                        p: 1,
                        cursor: "pointer",
                        backgroundColor:
                          selectedDate ===
                          new Date(block.timestamp * 1000).toLocaleString()
                            ? "#e0e0e0"
                            : "transparent",
                      }}
                      onClick={() => handleBlockSelection(block)}
                    >
                      {new Date(block.timestamp * 1000).toLocaleString()}
                    </Typography>
                  ))}
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item mr={2}>
                <img
                  src="src/assets/dashboard/block_img.png"
                  style={{ width: "70px", height: "70px" }}
                />
              </Grid>
              <Box mb={2} mt={3}>
                {isUsingFallbackData ? (
                  <>
                    <Typography variant="h6">Block Index: 501</Typography>
                    <Typography
                      variant="body2"
                      display="flex"
                      alignItems="center"
                    >
                      Block hash: 3330b5709caf5688d4e229bfbd79efde4d430d63ed9e20079a538d09ca222a4ds
                      <IconButton size="small">
                        <CheckCircle fontSize="small" />
                      </IconButton>
                      <Typography
                        variant="body2"
                        display="flex"
                        alignItems="center"
                        sx={{ color: "#676767" }}
                      >
                        Matched
                      </Typography>
                    </Typography>
                    <Typography
                      variant="body2"
                      display="flex"
                      alignItems="center"
                    >
                      MerkleRoot: a9ds10f0c44b88b111fb317f34bee11b2a1a595fc0d7fec9dd8d68f8c73e5c85
                      <IconButton size="small">
                        <CheckCircle fontSize="small" />
                      </IconButton>
                      <Typography
                        variant="body2"
                        display="flex"
                        alignItems="center"
                        sx={{ color: "#676767" }}
                      >
                        Matched
                      </Typography>
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography variant="h6">
                      Block Index: {selectedBlock?.index}
                    </Typography>
                    <Typography
                      variant="body2"
                      display="flex"
                      alignItems="center"
                    >
                      Block hash: {selectedBlock?.hash}
                      <IconButton size="small">
                        <CheckCircle fontSize="small" />
                      </IconButton>
                      <Typography
                        variant="body2"
                        display="flex"
                        alignItems="center"
                        sx={{ color: "#676767" }}
                      >
                        Matched
                      </Typography>
                    </Typography>
                    <Typography
                      variant="body2"
                      display="flex"
                      alignItems="center"
                    >
                      MerkleRoot: {selectedBlock?.merkle_root}
                      <IconButton size="small">
                        <CheckCircle fontSize="small" />
                      </IconButton>
                      <Typography
                        variant="body2"
                        display="flex"
                        alignItems="center"
                        sx={{ color: "#676767" }}
                      >
                        Matched
                      </Typography>
                    </Typography>
                  </>
                )}
              </Box>
            </Grid>

            {filteredData && (
              <>
                <Typography variant="h6" gutterBottom>
                  Electrical Data
                </Typography>
                <TableContainer
                  component={Paper}
                  variant="outlined"
                  sx={{ mb: 2, maxHeight: "200px", overflow: "auto" }}
                >
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Timestamp</TableCell>
                        <TableCell>AC Power (W)</TableCell>
                        <TableCell>AC Current (A)</TableCell>
                        <TableCell>DC Current (A)</TableCell>
                        <TableCell>AC Voltage (V)</TableCell>
                        <TableCell>DC Voltage (V)</TableCell>
                        <TableCell>IRR (W/m²)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>{filteredData.timestamp}</TableCell>
                        <TableCell>{filteredData.acPower}</TableCell>
                        <TableCell>{filteredData.acCurrent}</TableCell>
                        <TableCell>{filteredData.dcCurrent}</TableCell>
                        <TableCell>{filteredData.acVoltage}</TableCell>
                        <TableCell>{filteredData.dcVoltage}</TableCell>
                        <TableCell>{filteredData.irr}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}

            <Typography variant="h6" gutterBottom>
              Grouped Measurements
            </Typography>
            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    {[1, 2, 3, 4, 5, 6].map((group) => (
                      <TableCell key={group}>Group {group}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(groupedMeasurements).map(([key, values]) => (
                    <TableRow key={key}>
                      <TableCell component="th" scope="row">
                        {key === "acPower"
                          ? "AC Power (W)"
                          : key === "acCurrent"
                            ? "AC Current (A)"
                            : key === "dcCurrent"
                              ? "DC Current (A)"
                              : key === "acVoltage"
                                ? "AC Voltage (V)"
                                : "DC Voltage (V)"}
                      </TableCell>
                      {values.map((value, index) => (
                        <TableCell key={index}>{value}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default BlockchainEnergyDataModal;
