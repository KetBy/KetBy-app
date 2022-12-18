import * as React from "react";
import { Button, Avatar } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { AddBoxOutlined } from "@mui/icons-material";
import theme from "../../src/themes/default";
import Link from "next/link";
import { useRouter } from "next/router";

const pages = ["My projects", "Explore", "Learn"];
const settings = ["My account", "My projects", "Log out"];

function ResponsiveAppBar(props) {
  const router = useRouter();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        boxShadow: "none",
        height: `${theme.constants.menuHeight}px`,
        display: "flex",
        justifyContent: "center",
        background: theme.palette.primary.main,
        position: "relative",
        "&:after": {
          position: "absolute",
          transitionDuration: "0.2s",
          content: "''",
          left: 0,
          top: 0,
          width: "100%",
          background: theme.palette.darkGrey.dark,
          zIndex: 0,
          height: props.dark ? "100%" : 0,
          opacity: props.dark ? 1 : 0,
        },
      }}
    >
      <Box
        sx={{
          px: 1,
          position: "relative",
          zIndex: 10,
        }}
      >
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
            component={Link}
          >
            LOGO
          </Typography>
          {/** Mobile */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
            component={Link}
          >
            LOGO
          </Typography>
          {/** Mobile end */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {router.pathname != "/auth/login" && (
              <Button
                sx={{
                  my: 2,
                  color: "white",
                  display: { xs: "none", md: "inline-block" },
                }}
                component={Link}
                href="/auth/login"
              >
                Log in
              </Button>
            )}
            {router.pathname != "/auth/register" && (
              <Button
                variant="contained"
                sx={{
                  background: (theme) => theme.palette.primary[50],
                  color: (theme) => theme.palette.darkGrey.main,
                  "&:hover": {
                    background: (theme) => theme.palette.common.white,
                  },
                  display: { xs: "none", md: "inline-block" },
                  ml: 1,
                }}
                component={Link}
                href="/auth/register"
              >
                Register for free
              </Button>
            )}
            <Tooltip title="Open settings">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0, display: { xs: "inline-block", md: "none" } }}
              >
                <Avatar alt="Alex Hodo" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
}
export default ResponsiveAppBar;
