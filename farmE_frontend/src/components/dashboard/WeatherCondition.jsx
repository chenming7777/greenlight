import Typography from "@mui/material/Typography";
import { Card } from "@mui/material";

export default function WeatherCondition() {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            color: "#000",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          Weather Conditions
        </Typography>
        {/* <Button
                variant="contained"
                sx={{
                  backgroundColor: "#000",
                  padding: "0.5rem 2rem",
                  borderRadius: 25,
                }}
              >
                Download Report
              </Button> */}
      </div>
      <div
        style={{
          margin: "1rem 0",
        }}
      ></div>

      <span
        style={{
          color: "#979696",
          fontSize: "12px",
        }}
      >
        Temperature
      </span>

      <div
        style={{
          margin: "1rem 0",
        }}
      ></div>
      {/* Weather Card Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            border: "1px solid #000",
            alignItems: "space-between",
            borderRadius: 15,
            maxWidth: "140px",
            flexGrow: 1,
            textAlign: "center",
            // flexGrow: 1,
            minHeight: "171px",
          }}
        >
          <Typography
            sx={{
              color: "#A0AEC0",
              fontSize: "12px",
            }}
          >
            Today
          </Typography>
          <img
            src={`src/assets/dashboard/sunny-weather.png`}
            style={{
              width: "60px",
              height: "60px",
              margin: "0 auto",
            }}
          />

          <Typography
            sx={{
              color: "#000",
              fontSize: "25px",
              fontWeight: "bold",
            }}
          >
            29.73°C
          </Typography>
          <Typography
            sx={{
              color: "#000",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            Sunny Day
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: "#F5F5F5",
            alignItems: "space-between",
            textAlign: "center",
            borderRadius: 15,
            maxWidth: "140px",
            flexGrow: 1,
            minWidth: "130px",
            minHeight: "180px",
          }}
        >
          <Typography
            sx={{
              color: "#A0AEC0",
              fontSize: "12px",
            }}
          >
            28 Jul 2024
          </Typography>
          <img
            src={`src/assets/dashboard/cloudy.png`}
            style={{
              width: "60px",
              height: "60px",
              margin: "0 auto",
            }}
          />

          <Typography
            sx={{
              color: "#000",
              fontSize: "25px",
              fontWeight: "bold",
            }}
          >
            20°C
          </Typography>
          <Typography
            sx={{
              color: "#000",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            Cloudy
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            // border: "1px solid #000",
            alignItems: "space-between",
            borderRadius: 15,
            backgroundColor: "#F5F5F5",
            maxWidth: "140px",
            flexGrow: 1,
            minHeight: "171px",
          }}
        >
          <Typography
            sx={{
              color: "#A0AEC0",
              fontSize: "12px",
            }}
          >
            29 Jul 2024
          </Typography>
          <img
            src={`src/assets/dashboard/cloudy.png`}
            style={{
              width: "60px",
              height: "60px",
              margin: "0 auto",
            }}
          />

          <Typography
            sx={{
              color: "#000",
              fontSize: "25px",
              fontWeight: "bold",
            }}
          >
            26°C
          </Typography>
          <Typography
            sx={{
              color: "#000",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            Cloudy
          </Typography>
        </div>
      </div>

      <div
        style={{
          margin: "1rem 0",
        }}
      ></div>
      {/* Misc Info Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <Card
          sx={{
            backgroundColor: "#6FC635",
            padding: "1rem 1.5rem",
            borderRadius: 5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "215px",
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
            <Typography>Irradiance</Typography>
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
            <Typography>10%</Typography>
          </div>
        </Card>
        <Card
          sx={{
            backgroundColor: "#6FC635",
            padding: "1rem 1.5rem",
            borderRadius: 5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "215px",
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
            <Typography>Wind Speed</Typography>
            <Typography
              sx={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              12 km/h
            </Typography>
          </div>
          <div>
            <Typography>40%</Typography>
          </div>
        </Card>
      </div>
    </>
  );
}
