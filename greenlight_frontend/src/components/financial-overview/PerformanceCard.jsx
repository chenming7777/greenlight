import React from "react";
import { Typography, Divider, Card } from "@mui/material";
import { ArrowUpward } from "@mui/icons-material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

export default function PerformanceCard({
  title,
  description,
  figure,
  subtitle,
}) {
  return (
    <>
      <Typography
        variant="subtitle1"
        sx={{
          color: "#878787",
          fontSize: "22px",
          marginBottom: "10px",
        }}
      >
        {title}
      </Typography>

      <Card
        sx={{
          p: 3.5,
          borderRadius: 3,
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: "22px",
              fontWeight: "900",
            }}
          >
            {figure}
          </Typography>
          <ArrowDropUpIcon
            fontSize="large"
            sx={{
              color: "#6FC635",
            }}
          />
        </div>
        <Divider
          sx={{
            marginTop: "10px",
            marginBottom: "10px",
          }}
        />
        <Typography
          variant="body2"
          sx={{
            fontSize: "14px",
          }}
        >
          {subtitle}
        </Typography>
        <Typography
          variant="body2"
          color="success.main"
          sx={{
            fontSize: "14px",
            color: "#AAAAAA",
          }}
        >
          {description}
        </Typography>
      </Card>
    </>
  );
}
