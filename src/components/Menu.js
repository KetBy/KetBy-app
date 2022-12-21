import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Button,
  Avatar,
  Skeleton,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Tooltip,
  MenuItem,
} from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import MenuIcon from "@mui/icons-material/Menu";
import theme from "../../src/themes/default";
import { useAppContext } from "../utils/context";

const UserAvatar = (props) => {
  const { ...otherProps } = props;
  const { appState } = useAppContext();

  return <Avatar {...otherProps} alt="Alex Hodo"></Avatar>;
};

function ResponsiveAppBar(props) {
  const { appState, logOut } = useAppContext();
  const router = useRouter();

  const fullWidth = router.pathname == "/composer";

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

  const menuItems = appState.isLoggedIn
    ? [
        { title: "Quantum composer", url: "/composer" },
        { title: "Discover", url: "/discover" },
        { title: "My projects", url: "/account/projects" },
      ]
    : [
        { title: "Quantum composer", url: "/composer" },
        { title: "Discover", url: "/discover" },
      ];

  const userMenuItems = appState.isLoggedIn
    ? [
        { title: "My account", url: "/account" },
        { title: "Settings", url: "/account/settings" },
        {
          title: "Log out",
          url: null,
          onClick: () => {
            logOut();
          },
        },
      ]
    : [
        { title: "Log in", url: "/auth/login" },
        { title: "Sign up", url: "/auth/register" },
      ];

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
      <Container
        maxWidth={fullWidth ? false : "lg"}
        sx={{ position: "relative", zIndex: 10 }}
      >
        <Toolbar disableGutters>
          {/** Logo start */}
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
          {/** Logo end */}
          {/** Mobile start */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
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
              disableAutoFocusItem
            >
              {menuItems.map((item, index) => (
                <MenuItem
                  key={index}
                  onClick={handleCloseNavMenu}
                  component={Link}
                  href={item.url}
                >
                  <Typography textAlign="center">{item.title}</Typography>
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
          {/** Left menu items start */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {appState.statusChecked ? (
              <>
                {menuItems.map((item, index) => (
                  <Button
                    key={index}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                    component={Link}
                    href={item.url}
                  >
                    {item.title}
                  </Button>
                ))}
              </>
            ) : (
              <>
                {[...Array(2)].map((_, index) => {
                  return (
                    <Skeleton
                      key={index}
                      width={100}
                      sx={{ bgcolor: "primary.100", mx: 1 }}
                    />
                  );
                })}
              </>
            )}
          </Box>
          {/** Left menu items end */}
          {/** Right menu items start */}

          <Box sx={{ flexGrow: 0 }}>
            {/** Desktop start */}
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {appState.statusChecked ? (
                <>
                  {appState.isLoggedIn ? (
                    <Button
                      onClick={handleOpenUserMenu}
                      sx={{
                        my: 2,
                        color: "white",
                        pr: 1,
                        pl: 1.5,
                      }}
                    >
                      @{appState.user.username}
                      <UserAvatar sx={{ ml: 1 }} />
                    </Button>
                  ) : (
                    <>
                      {router.pathname != "/auth/login" && (
                        <Button
                          sx={{
                            my: 2,
                            color: "white",
                            pr: 1,
                            pl: 1.5,
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
                            ml: 1,
                            my: 2,
                          }}
                          component={Link}
                          href="/auth/register"
                        >
                          Register for free
                        </Button>
                      )}
                    </>
                  )}
                </>
              ) : (
                <>
                  <Box
                    component={Skeleton}
                    width={100}
                    sx={{
                      backgroundColor: "primary.100",
                    }}
                  />
                </>
              )}
            </Box>
            {/** Desktop end */}
            {/** Mobile start */}
            <IconButton
              onClick={handleOpenUserMenu}
              sx={{ p: 0, display: { xs: "inline-block", md: "none" } }}
            >
              <UserAvatar />
            </IconButton>
            {/** Mobile end */}
            {/** User menu start */}
            <Menu
              sx={{ mt: "45px" }}
              id="menu-user"
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
              disableAutoFocusItem
            >
              {userMenuItems.map((item, index) => (
                <MenuItem
                  key={index}
                  onClick={
                    item.onClick
                      ? () => {
                          item.onClick();
                          handleCloseUserMenu();
                        }
                      : handleCloseUserMenu
                  }
                  component={item.url ? Link : MenuItem}
                  href={item.url ? item.url : null}
                >
                  <Typography textAlign="center">{item.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
            {/** User menu end */}
          </Box>

          {/** Right menu items end */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
