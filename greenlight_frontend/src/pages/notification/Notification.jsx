import {
  Button,
  Card,
  Avatar,
  Paper,
  Box,
  Select,
  Divider,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  IconButton,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

const mockData = [
  {
    title: "Solar Panel 6 is not working regularly",
    date: "August 5, 2024",
  },
  {
    title: "Heavy rain expected in the next 24 hours",
    date: "August 5, 2024",
  },
  // {
  //   title: "Notification 3",
  //   date: "March 10, 2024",
  // },
  // {
  //   title: "Notification 4",
  //   date: "March 10, 2024",
  // },
];

export default function Notification() {
  return (
    <>
      <Box
        sx={{
          // display: "flex",
          marginTop: "100px",
          maxWidth: "880px",
          marginX: "auto",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <List
          sx={{
            maxWidth: "880px",
          }}
        >
          {mockData.map((data, index) => (
            <>
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <CloseIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={data.title}
                  secondary={data.date}
                  primaryTypographyProps={{ variant: "h6", fontWeight: "bold" }}
                />
              </ListItem>
              <Divider
                sx={{
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              />
            </>
          ))}
        </List>
      </Box>
    </>
  );
}
