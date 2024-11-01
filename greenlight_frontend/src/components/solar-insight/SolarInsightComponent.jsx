import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
} from "@mui/material";

const SolarInsightsComponent = () => {
  return (
    <Box sx={{ py: 3, minHeight: "100vh" }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontWeight: "bold",
        }}
      >
        Hot Topics
      </Typography>

      {/* Hot Topics */}
      <Paper
        sx={{
          mb: 3,
          position: "relative",
          overflow: "hidden",
          borderRadius: 3,
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}
      >
        <CardMedia
          component="img"
          height="300"
          image="src/assets/solar-insight/solar-panel-in-field.png"
          alt="Solar panels in a field"
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            bgcolor: "rgba(0, 0, 0, 0.54)",
            color: "white",
            padding: "20px",
          }}
        >
          <Typography variant="h5">
          Breakthrough in Agrivoltaics: Solar Panels Boost Crop Yields While Powering Communities...
          </Typography>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        {/* Categories */}
        <Grid item xs={12} md={8}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: "bold",
            }}
          >
            Category
          </Typography>
          <Grid container spacing={2}>
            {[
              "SOLAR TECHNOLOGY",
              "SYSTEM DESIGN AND INSTALLATION",
              "ENVIRONMENTAL IMPACT",
              "ECONOMIC AND FINANCIAL INSIGHTS",
            ].map((category) => (
              <Grid item xs={6} key={category}>
                <Card
                  sx={{
                    p: 1,
                    height: "120px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 3,
                    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                  }}
                >
                  <Typography
                    variant="h6"
                    align="center"
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    {category}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Today's News */}
        <Grid item xs={12} md={4}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: "bold",
            }}
          >
            Today
          </Typography>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            }}
          >
            <CardMedia
              component="img"
              height="140"
              image="src/assets/solar-insight/todays.png"
              alt="Solar panels"
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Magnachip Expands Solar Energy Power Product Lineup with the
                Release of 1200V IGBT in TO-247PLUS Package
              </Typography>
            </CardContent>
          </Card>
          {/* Add more news items here */}
        </Grid>

        {/* Trending News */}
        <Grid item xs={12} md={8}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: "bold",
            }}
          >
            Trending News
          </Typography>
          <Grid container spacing={2}>
            {[
              {
                title:
                  "Ladang Agrivoltaic UPM Terima Pengiktirafan Malaysia Book of Records",
                date: "10 May 2022",
                description:
                  "Naib Canselor UPM, Professor Datuk Dr Roslan Sulaiman (empat kiri) menunjukkan sijil The Malaysia Book of Records yang diserahkan oleh Timbalan Ketua Setiausaha Sektor Tenaga KeTSA, Mohamad Razif Abd Mubin (empat kanan) dalam menggunakan peluang dalam ruang solar panel di Agrivoltaic Farm UPM Puchong untuk menempatkan 25,000 unit herba berpotensi tinggi....",
              },
              {
                title: "Global Agrivoltaic Market Surges: Solar Integration in Agriculture Sees Rapid Growth, Projected to Exceed $10 Billion by 2030",
                date: "15 Aug 2023",
                description:
                  "Agrivoltaic market accelerates, combining solar energy with agriculture for enhanced efficiency and growth...",
              },
              {
                title:
                  "Wind and solar overtook fossil fuels in the EU over last 6 months",
                date: "22 Jul 2023",
                description:
                  "Almost half of EU member states - 13 countries - produced more electricity from wind and solar over the last six months than from fossil...",
              },
            ].map((news, index) => (
              <Grid item xs={12} key={index}>
                <Card
                  sx={{
                    display: "flex",
                    borderRadius: 3,
                    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image={`src/assets/solar-insight/trending-${index + 1}.png`}
                    alt="News thumbnail"
                  />
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Typography
                        component="div"
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                        }}
                      >
                        {news.title}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                      >
                        {news.date}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {news.description}
                      </Typography>
                    </CardContent>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Green Tech */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            }}
          >
            <CardMedia
              component="img"
              height="300"
              image="src/assets/solar-insight/green-tech-2.png"
              alt="Solar farm"
            />
            <CardContent>
              <Chip label="Green Tech" sx={{ mb: 1 }} />
              <Typography variant="h6" gutterBottom>
                Solar Power Stocks Fall On Concerns About Potential Hackers
              </Typography>
              <Typography variant="body2" color="text.secondary">
                3 June 2024
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SolarInsightsComponent;
