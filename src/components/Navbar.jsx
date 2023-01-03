import {
  AppBar,
  Button,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import FlexBetween from "./FlexBetween";
import {
  Search,
  Menu as MenuIcon,
  DarkModeOutlined,
  LightModeOutlined,
  SettingsOutlined,
  ArrowDropUpOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "state";
import { Box } from "@mui/system";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.global.userData);

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const onClickAnchorHandler = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
        }}
      >
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius=".625rem"
            gap="3rem"
            p=".1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        <FlexBetween gap="1.5rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "1.625rem" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "1.625rem" }} />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{ fontSize: "1.625rem" }} />
          </IconButton>

          <FlexBetween>
            <Button
              onClick={onClickAnchorHandler}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >
              <Box
                component="img"
                alt="profile"
                src="https://oswinyim.com/static/media/me-about.729f9100db890b08ecfb.jpeg"
                height="2rem"
                width="2rem"
                borderRadius="50%"
                sx={{
                  objectFit: "cover",
                }}
              />
              <Box textAlign="left">
                <Typography
                  fontSize=".8rem"
                  fontWeight="bold"
                  sx={{
                    color: theme.palette.secondary[100],
                  }}
                >
                  {user?.name ?? ""}
                </Typography>
                <Typography
                  fontSize=".75rem"
                  fontWeight="bold"
                  sx={{
                    color: theme.palette.secondary[200],
                  }}
                >
                  {user?.occupation ?? ""}
                </Typography>
              </Box>
              <ArrowDropUpOutlined
                sx={{
                  color: theme.palette.secondary[300],
                  fontSize: "1.5625rem",
                }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
            >
              <MenuItem onClick={handleClose}>Log Out</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
