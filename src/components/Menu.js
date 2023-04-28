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
import AnimatedLogo from "../../public/assets/animated_logo.svg";
import AnimatedInvertedLogo from "../../public/assets/animated_inverted_logo.svg";

const UserAvatar = (props) => {
  const { ...otherProps } = props;
  const { appState } = useAppContext();

  return (
    <Avatar
      src={
        appState.user
          ? appState.user.avatar_url
          : `${process.env.NEXT_PUBLIC_CDN_URL}/users/default_avatar.svg`
      }
      {...otherProps}
    ></Avatar>
  );
};

function ResponsiveAppBar(props) {
  const { appState, logOut, getNext } = useAppContext();
  const router = useRouter();

  const fullWidth = router.pathname.startsWith("/composer");

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
        { title: "Discover", url: "/discover" },
        {
          title: "My projects",
          url: `/u/${appState.user.username}?tab=projects`,
        },
      ]
    : [{ title: "Discover", url: "/discover" }];

  const userMenuItems = appState.isLoggedIn
    ? [
        {
          title: "My account",
          url: `/u/${appState.user.username}?tab=index`,
        },
        { title: "Settings", url: `/u/${appState.user.username}?tab=settings` },
        {
          title: "Log out",
          url: null,
          onClick: () => {
            logOut();
          },
        },
      ]
    : [
        { title: "Log in", url: `/auth/login?next=${getNext()}` },
        { title: "Sign up", url: "/auth/register" },
      ];

  const Logo = ({ mobile }) => {
    return (
      <Box
        sx={{
          display: {
            xs: mobile ? "flex" : "none",
            md: mobile ? "none" : "flex",
          },
          mr: 1,
          flex: {
            xs: "100%",
            md: 0,
          },
        }}
        component={Link}
        href="/"
      >
        <Box
          sx={{
            height: 48,
            width: 48,
            cursor: "pointer",
          }}
          component="img"
          src={props.dark ? AnimatedLogo.src : AnimatedInvertedLogo.src}
          alt="KetBy"
        />
      </Box>
    );
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: "none",
        height: `${theme.constants.menuHeight}px`,
        display: "flex",
        justifyContent: "center",
        background: "rgba(0, 127, 255, 0.95)",
        backdropFilter: "saturate(25) blur(4px)",
        boxShadow: theme.shadowsCustom[0],
        "&:after": {
          position: "absolute",
          transitionDuration: "0.2s",
          content: "''",
          left: 0,
          top: 0,
          width: "100%",
          background: theme.palette.darkGrey.dark,
          zIndex: 0,
          // height: props.dark ? "100%" : 0,
          height: "100%",
          opacity: props.dark ? 1 : 0,
        },
      }}
    >
      <Container
        maxWidth={fullWidth ? false : "lg"}
        sx={{
          position: "relative",
          zIndex: 10,
          px: 1,
          transitionDuration: "0.2s",
          ...{ ...(fullWidth ? { maxWidth: "100%" } : {}) },
        }}
        disableGutters={fullWidth}
      >
        <Toolbar disableGutters>
          {/** Logo start */}
          <Logo />
          {/** Logo end */}
          {/** Mobile start */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              aria-label="Open mobile menu"
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
                  disabled={router.asPath.startsWith(item.url)}
                  sx={{
                    ...{
                      ...(router.asPath.startsWith(item.url)
                        ? { background: "rgba(0,0,0,0.1) !important" }
                        : {}),
                    },
                  }}
                >
                  <Typography textAlign="center">{item.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Logo mobile />
          {/** Mobile end */}
          {/** Left menu items start */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {appState.statusChecked ? (
              <>
                {menuItems.map((item, index) => (
                  <Button
                    key={index}
                    onClick={handleCloseNavMenu}
                    disabled={router.asPath.startsWith(item.url)}
                    sx={{
                      my: 2,
                      mx: 1,
                      color: "white !important",
                      display: "block",
                      ...{
                        ...(router.asPath.startsWith(item.url)
                          ? { background: "rgba(255,255,255,0.15) !important" }
                          : {}),
                      },
                    }}
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
                      <UserAvatar
                        sx={{ ml: 1, background: "rgba(255,255,255,1)" }}
                      />
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
                          href={`/auth/login?next=${getNext()}`}
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
              sx={{
                p: 0,
                display: { xs: "inline-block", md: "none" },
                ml: 1,
                mr: 1,
              }}
              aria-label="Open account menu"
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
