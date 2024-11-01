import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Select,
  Typography,
  MenuItem,
  Button,
  Box,
} from "@mui/material";
import { Close, CheckCircle, Info } from "@mui/icons-material";

import GppGoodIcon from "@mui/icons-material/GppGood";

const ReportModal = ({ open, onClose, onDownloadReport }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: 5,
          padding: "1rem",
          boxShadow: "0px 8px 24px rgba(149, 157, 165, 0.2)",
        },
      }}
    >
      <DialogTitle
        sx={{
          mb: "2rem",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            // display: "flex",
            fontWeight: "bold",
          }}
        >
          Download Report
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Select
            size="small"
            defaultValue="10/23"
            sx={{
              // height: "100%",
              mr: 2,
              px: 1,
              border: "1px solid #000",
              fontWeight: "bold",
              mb: 4,
            }}
          >
            <MenuItem value="10/23">October 2019</MenuItem>
            <MenuItem value="11/23">November 2019</MenuItem>
            <MenuItem value="12/23">December 2019</MenuItem>
            <MenuItem value="1/24">January 2020</MenuItem>
            <MenuItem value="2/24">February 2020</MenuItem>
            <MenuItem value="3/24">March 2020</MenuItem>
          </Select>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#000",
              padding: "0.5rem 2rem",
              borderRadius: 25,
            }}
            onClick={onDownloadReport}
          >
            Download Report
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ReportModal;
