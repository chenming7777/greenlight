import Typography from "@mui/material/Typography";
import { Card, Avatar } from "@mui/material";

export default function PerformanceSection() {
  return (
    <>
      <Card
        sx={{
          backgroundColor: "#F8F7F7",
          padding: "1rem 1.5rem",
          borderRadius: 5,
        }}
      >
        <Typography
          style={{
            color: "#000",
            fontSize: "18px",
          }}
        >
          Potential Performance
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Typography
              sx={{
                color: "#000",
                fontWeight: "bold",
                fontSize: "40px",
              }}
            >
              410
              <span
                style={{
                  marginLeft: "1rem",
                  fontSize: "30px",
                }}
              >
                mw
              </span>
            </Typography>
          </div>
          <div
            style={{
              backgroundColor: "#6FC635",
              padding: "0.1rem 1.8rem",
              display: "flex",
              alignItems: "center",
              borderRadius: 25,
            }}
          >
            <Typography
              sx={{
                color: "#fff",
                fontSize: "25px",
                fontWeight: "bold",
              }}
            >
              88%
            </Typography>
          </div>
        </div>

        <div
          style={{
            margin: "2rem 0",
          }}
        ></div>

        <span
          style={{
            color: "#979696",
            fontSize: "15px",
          }}
        >
          Monthly Highlights
        </span>
        <div
          style={{
            margin: "1rem 0",
          }}
        ></div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          <Card
            sx={{
              backgroundColor: "#fff",
              padding: "1rem 1.5rem",
              borderRadius: 5,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Avatar
              src={`src/assets/dashboard/solar-panel 1.png`}
              style={{
                width: "35px",
                height: "35px",
                flexShrink: 0,
                border: "1px solid #000",
                padding: "1rem",
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
                  color: "#40726C",
                  fontWeight: "bold",
                  fontSize: "35px",
                }}
              >
                301 kWh
              </Typography>
            </div>
            <div>
              <Typography>Maximal Used</Typography>
            </div>
          </Card>
          <Card
            sx={{
              backgroundColor: "#fff",
              padding: "1rem 1.5rem",
              borderRadius: 5,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Avatar
              src={`src/assets/dashboard/solar-panel 1.png`}
              style={{
                width: "35px",
                height: "35px",
                flexShrink: 0,
                border: "1px solid #000",
                padding: "1rem",
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
                  color: "#40726C",
                  fontWeight: "bold",
                  fontSize: "35px",
                }}
              >
                189 kWh
              </Typography>
            </div>
            <div>
              <Typography>Minimal Used</Typography>
            </div>
          </Card>
          <Card
            sx={{
              backgroundColor: "#fff",
              padding: "1rem 1.5rem",
              borderRadius: 5,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Avatar
              src={`src/assets/dashboard/solar-panel 1.png`}
              style={{
                width: "35px",
                height: "35px",
                flexShrink: 0,
                border: "1px solid #000",
                padding: "1rem",
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
                  color: "#40726C",
                  fontWeight: "bold",
                  fontSize: "35px",
                }}
              >
                598 kWh
              </Typography>
            </div>
            <div>
              <Typography>Total Used</Typography>
            </div>
          </Card>
        </div>
      </Card>
    </>
  );
}
