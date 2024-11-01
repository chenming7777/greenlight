import {
  Button,
  Card,
  Avatar,
  Paper,
  Box,
  Select,
  Divider,
  MenuItem,
  Grid,
  CardMedia,
  Typography,
  CardContent,
  FormControl,
  InputLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
} from "@mui/material";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";

const categories = [
  "Finding Farmers",
  "Finding Farmer Land",
  "Solar Hardware installer",
];

const solarCompanies = [
  {
    name: "Solar Eneergy Sdn Bhd",
    location: "Shah Alam, Selangor",
    image: "src/assets/solar-companies/solar-1.png",
    profile: " ",
  },
  {
    name: "Sun Solar Sdn Bhd",
    location: "Taiping, Perak",
  },
  {
    name: "Solar Tirbune Sdn Bhd",
    location: "Muar, Johor",
  },
  {
    name: "SolarSage",
    location: "Banting, Selangor",
  },
  {
    name: "LumenFields Solar",
    location: "Kuala Terengganu, Terengganu",
  },
  {
    name: "HelioHarvest Farms",
    location: "Alor Setar, Kedah",
  },
  {
    name: "Photon Fields",
    location: "Sandakan, Sabah",
  },
  {
    name: "SunGrow Farms",
    location: "Kuching, Sarawak",
  },
  {
    name: "SolarBloom Energy",
    location: "Kuantan, Pahang",
  },
];

export default function SolarCompanies() {
  return (
    <>
      {/* Filter Sidebar */}
      <Box sx={{ display: "flex", p: 4, pt: 10 }}>
        <Box
          sx={{
            // width: 400,
            minWidth: 180,
            mr: 3,
            backgroundColor: "#F8F9FA",
            p: 4,
            borderRadius: 5,
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: "bold",
            }}
          >
            Sort By
          </Typography>
          <Divider
            sx={{
              mt: 3,
              mb: 4,
              color: "#000",
              backgroundColor: "#000",
            }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Preference</InputLabel>
            <Select label="Filter01">
              <MenuItem value="option1">Seeking Land</MenuItem>
              <MenuItem value="option2">Seeking Farmer</MenuItem>
            </Select>
          </FormControl>
          
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              mt: 2,
              fontWeight: "bold",
            }}
          >
            Filter By
          </Typography>
          <Divider
            sx={{
              mt: 3,
              mb: 4,
              color: "#000",
              backgroundColor: "#000",
            }}
          />
          <FormGroup>
            {categories.map((category) => (
              <FormControlLabel
                key={category}
                control={<Checkbox />}
                label={category}
              />
            ))}
          </FormGroup>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ mt: 2, fontWeight: "bold" }}
          >
            Location
          </Typography>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Location</InputLabel>
            <Select label="Location">
              <MenuItem value="location1">West Malaysia</MenuItem>
              <MenuItem value="location2">East Malaysia</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Solar Companies Grid */}
        <Box sx={{ flexGrow: 1, display: "relative" }}>
          <Grid
            container
            spacing={3}
            sx={{
              rowGap: 6,
            }}
          >
            {solarCompanies.map((company, index) => (
              <>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={index}
                  sx={{
                    position: "relative",
                    rowGap: 3,
                  }}
                >
                  <div
                    className="round-container"
                    style={{
                      border: "2px solid #C4C4C4",
                      position: "absolute",
                      top: "-6%",
                      left: "40%",
                      width: "120px",
                      height: "120px",
                      borderRadius: "50%",
                      overflow:
                        "hidden" /* Ensures the image doesn't overflow the container */,
                    }}
                  >
                    <img
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      src={`src/assets/solar-companies/solar-prof-${index + 1}.png`}
                      alt="Round"
                      className="round-image"
                    />
                  </div>
                  <Card
                    sx={{
                      boxShadow: "none",
                      border: "2px solid #C4C4C4",
                      borderRadius: 4,
                      pb: 2,
                      minWidth: 380,
                      // ps: 5,
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="130"
                      image={`src/assets/solar-companies/solar-${index + 1}.png`}
                      alt={company.name}
                    />
                    <CardContent
                      sx={{
                        pl: 10,
                        pr: 10,
                        textAlign: "center",
                      }}
                    >
                      <Typography variant="h6" component="div">
                        {company.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mb: 1,
                          textAlign: "center",
                          justifyContent: "center",
                          mt: 1,
                        }}
                      >
                        <LocationOnIcon fontSize="small" sx={{ mr: 0.5 }} />
                        {company.location}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mb: 1,
                          textAlign: "center",
                          justifyContent: "center",
                          mt: 1,
                        }}
                      >
                        {/* <LocationOnIcon fontSize="small" sx={{ mr: 0.5 }} /> */}
                        <StarIcon fontSize="small" sx={{ mr: 0.5 }} />
                        20k ratings
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 1,
                          mt: 2,
                        }}
                      >
                        <Button
                          size="small"
                          // variant="outlined"
                          color="secondary"
                          sx={{
                            backgroundColor: "#F6EBF8",
                            color: "#913CA1",
                            fontWeight: "bold",
                            borderRadius: 5,
                            padding: "8px 40px",
                            // text
                            marginRight: 2,
                          }}
                        >
                          Farmer
                        </Button>
                        <Button
                          size="small"
                          color="primary"
                          sx={{
                            backgroundColor: "#F6EBF8",
                            color: "#913CA1",
                            fontWeight: "bold",
                            borderRadius: 5,
                            padding: "8px 40px",
                          }}
                        >
                          Land
                        </Button>
                      </Box>
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          marginTop: 3,
                          padding: 1,
                          backgroundColor: "#000",
                          borderRadius: 5,
                        }}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              </>
            ))}
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                marginTop: 3,
                padding: "1rem 6rem",
                backgroundColor: "#000",
                borderRadius: 20,
              }}
            >
              View More
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
