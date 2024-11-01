import {
  Button,
  Card,
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  CardContent,
} from "@mui/material";

export default function Subscription() {
  const plans = [
    {
      name: "Basic Marketing",
      price: 29,
      features: ["Basic Profile Listing", "Access to basic analytics", "Customer support"],
    },
    {
      name: "Premium Marketing",
      price: 59,
      features: ["Premium Profile Listing", "Private Channel to contact with farmer", "Access to detailed analytics", "Priority support"],
    },
  ];

  return (
    <Box sx={{ paddingTop: 2, paddingLeft: 8, paddingRight: 8 }}>
      <Typography variant="h4" sx={{ mt: 4, mb: 2, fontWeight: "bold" }}>
        Your Solar Farm with Sustainable Agrivoltaics
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: "#565555" }}>
        Maximize land use efficiency by partnering with farmers to grow crops on your solar farm.
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-around", marginTop: "6rem" }}>
        {plans.map((plan, index) => (
          <Card
            key={plan.name}
            sx={{
              width: "45%",
              textAlign: "center",
              backgroundColor: "#F8F8F8",
              borderRadius: 2,
              border: "1px solid #E8E8E8",
              maxWidth: 440,
              minHeight: 500,
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ color: "#4B6837", fontWeight: "bold", marginBottom: 3 }}>
                {plan.name}
              </Typography>
              <Typography
                variant="h3"
                component="div"
                sx={{ fontWeight: "bold", marginBottom: 2, fontSize: "120px" }}
              >
                <span style={{ fontSize: "40px", fontWeight: "bold" }}>RM</span> {plan.price}
              </Typography>
              <Typography color="text.secondary" sx={{ textAlign: "end", marginRight: 10 }}>
                per month
              </Typography>
              <List>
                {plan.features.map((feature, idx) => (
                  <ListItem key={idx}>
                    <ListItemText primary={feature} />
                  </ListItem>
                ))}
              </List>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  borderRadius: 20,
                  color: "#fff",
                  backgroundColor: "#000",
                  padding: "10px 50px",
                  marginTop: 4,
                }}
              >
                Subscribe
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
