import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import { Button, Avatar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { sidebarList, sidebarDown } from "../../types";

const drawerWidth = 300;

export default function CustomDrawer() {
  return (
    <Drawer
      sx={{
        flexShrink: 0,
        width: drawerWidth,
        height: "100%",

        //       border: 'none',
        //       backgroundColor: '#F8F9FA'
        "& .MuiDrawer-paper": {
          // overflowY: "hidden",
          width: drawerWidth,
          height: "100%",
          padding: "1rem 1rem",
          border: "none",
          display: "flex",
          flexDirection: "column",
          gap: "3.5rem",
          justifyContent: "space-between",
          backgroundColor: "#F8F9FA",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      {/* <Toolbar /> */}
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "start",
            marginBottom: "1rem",
            gap: "1rem",
          }}
        >
          <img
            src="src/assets/sidebar/icon.png"
            style={{
              width: "60px",
              height: "60px",
            }}
          />
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "25px",
              color: "#000",
              textAlign: "center",
            }}
          >
            greenlight
          </Typography>
        </div>
        <Divider />
        <div
          style={{
            marginBottom: "1rem",
          }}
        ></div>
        <List>
          {[
            "Dashboard",
            "Dashboard Farmer",
            "Virtual Twin",
            "Financial Overview",
            "System Care",
            "Solar Insights",
            "Smart Assistant",
          ].map((text) => (
            <NavLink
              key={text}
              to={sidebarList[text].url}
              className={({ isActive, isPending }) =>
                isActive
                  ? "active router-nav-link"
                  : isPending
                    ? "pending router-nav-link"
                    : ""
              }
            >
              {({ isActive }) =>
                isActive ? (
                  <div
                    style={{
                      borderRadius: "20px",
                      padding: "0.8rem 2rem",
                      backgroundColor: "#fff",
                      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "0.3rem",
                    }}
                  >
                    <Avatar
                      src={sidebarList[text].active}
                      style={{
                        width: "25px",
                        height: "25px",
                        backgroundColor: "#6FC635",
                        padding: "0.5rem",
                      }}
                    />
                    <Typography
                      style={{ marginLeft: "1rem", fontWeight: "bold" }}
                    >
                      {text}
                    </Typography>
                  </div>
                ) : (
                  <div
                    style={{
                      borderRadius: "20px",
                      padding: "0.8rem 2rem",
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "0.3rem",
                    }}
                  >
                    <Avatar
                      src={sidebarList[text].inactive}
                      style={{
                        width: "25px",
                        height: "25px",
                        backgroundColor: "#FFF",
                        padding: "0.5rem",
                      }}
                    />
                    <Typography
                      style={{ marginLeft: "1rem", fontWeight: "bold" }}
                    >
                      {text}
                    </Typography>
                  </div>
                )
              }
              {/* <div
              style={{
                borderRadius: "20px",
                padding: "0.8rem 2rem",
                backgroundColor: "#fff",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
                display: "flex",
                alignItems: "center",
                marginBottom: "0.3rem",
              }}
            >
              <Avatar
                src={sidebarList[text].active}
                style={{
                  width: "25px",
                  height: "25px",
                  backgroundColor: "#6FC635",
                  padding: "0.5rem",
                }}
              />
              <Typography
                style={{ marginLeft: "1rem", fontWeight: "bold" }}
              >
                {text}
              </Typography>
            </div> */}
            </NavLink>
          ))}
        </List>
        <Card
          sx={{
            backgroundColor: "#6FC635",
            padding: "1rem 2rem",
            borderRadius: "15px",
          }}
        >
          <div
            style={{
              marginBottom: "0.5rem",
              padding: "0.5rem",
              backgroundColor: "#fff",
              borderRadius: "1.2rem",
              width: "40px",
              height: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              style={{
                backgroundColor: "#6FC635",
              }}
            >
              ?
            </Avatar>
          </div>

          <Typography
            sx={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: "18px",
              marginBottom: "0.5rem",
            }}
          >
            <b>Need Help?</b>
          </Typography>

          <Typography
            sx={{
              color: "#fff",
              fontSize: "16px",
              marginBottom: "0.8rem",
            }}
          >
            Please check our docs
          </Typography>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#fff",
              color: "#000",
              fontWeight: "bold",
              borderRadius: "15px",
              width: "100%",
              padding: "0.5rem",
            }}
          >
            Documentation
          </Button>
        </Card>
      </div>

      <div
        style={{
          flexGrow: 1,
          // padding: "1rem 2rem",
        }}
      >
        <div>
          <List>
            {["Solar Companies", "Subscription", "Notification"].map(
              (text, index) => (
                <NavLink
                  key={text}
                  to={sidebarDown[text].url}
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "active router-nav-link"
                      : isPending
                        ? "pending router-nav-link"
                        : ""
                  }
                >
                  {({ isActive }) =>
                    isActive ? (
                      <div
                        style={{
                          borderRadius: "20px",
                          padding: "0.8rem 2rem",
                          backgroundColor: "#fff",
                          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "0.3rem",
                        }}
                      >
                        <Avatar
                          src={sidebarDown[text].active}
                          style={{
                            width: "25px",
                            height: "25px",
                            backgroundColor: "#6FC635",
                            padding: "0.5rem",
                          }}
                        />
                        <Typography
                          style={{ marginLeft: "1rem", fontWeight: "bold" }}
                        >
                          {text}
                        </Typography>
                      </div>
                    ) : (
                      <div
                        style={{
                          borderRadius: "20px",
                          padding: "0.8rem 2rem",
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "0.3rem",
                        }}
                      >
                        <Avatar
                          src={sidebarDown[text].inactive}
                          style={{
                            width: "25px",
                            height: "25px",
                            backgroundColor: "#FFF",
                            padding: "0.5rem",
                          }}
                        />
                        <Typography
                          style={{ marginLeft: "1rem", fontWeight: "bold" }}
                        >
                          {text}
                        </Typography>
                      </div>
                    )
                  }
                </NavLink>
              )
            )}
          </List>
        </div>
        {/* <div>
          <Avatar
            // src={sidebarDown[text]}
            style={{
              width: "25px",
              height: "25px",
              // backgroundColor: "#FFF",
              padding: "0.5rem",
            }}
          />
        </div> */}
      </div>
    </Drawer>
  );
}
