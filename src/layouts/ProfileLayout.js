import * as React from "react";
import {
  Box,
  Grid,
  Container,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { useAppContext } from "../../src/utils/context";
import { useRouter } from "next/router";
import axios from "../utils/axios";
import CustomCircularProgress from "../components/custom/CircularProgress";

const ProfileSectionsTabs = (props) => {
  const router = useRouter();
  const { appState } = useAppContext();

  const { user } = props;

  const [current, setCurrent] = React.useState(
    props.current ? props.current : "index"
  );

  const handleChange = (e, newVal) => {
    setCurrent(newVal);
    router.push(`/u/${user.username}/${newVal == "index" ? "" : newVal}`);
  };

  return (
    <>
      <Tabs
        orientation="vertical"
        value={current}
        aria-label="User profile sections"
        sx={{ mb: 0, display: { xs: "none", md: "block" } }}
        onChange={handleChange}
      >
        <Tab label="Overview" value="index" />
        <Tab label="Projects" value="projects" />
        {appState.isLoggedIn && appState.user.username == user.username && (
          <Tab label="Settings" value="settings" />
        )}
      </Tabs>
      <Tabs
        orientation="horizontal"
        value={current}
        aria-label="Mobile user profile sections"
        sx={{
          mb: (theme) => `calc(-${theme.spacing(1)} + 2px)`,
          display: { xs: "block", md: "none" },
        }}
        onChange={handleChange}
      >
        <Tab label="Overview" value="index" />
        <Tab label="Projects" value="projects" />
        {appState.isLoggedIn && appState.user.username == user.username && (
          <Tab label="Settings" value="settings" />
        )}
      </Tabs>
    </>
  );
};

const ProfileCard = (props) => {
  const { user } = props;

  return (
    <Card sx={{ boxShadow: (theme) => theme.shadowsCustom[2] }}>
      <CardMedia
        sx={{ height: { xs: 80, md: 120 } }}
        image={user.cover_url}
        title="green iguana"
      />
      <CardContent
        sx={{
          textAlign: { xs: "left", md: "center" },
          position: "relative",
          pt: (theme) => theme.spacing(6),
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: (theme) => theme.spacing(10),
            height: (theme) => theme.spacing(10),
            top: 0,
            left: {
              xs: 0,
              md: "50%",
            },
            transform: {
              xs: `translate(1rem, -50%)`,
              md: "translate(-50%, -50%)",
            },
            background: "white",
            borderRadius: "50%",
            boxShadow: (theme) => theme.shadowsCustom[1],
            border: "2px solid white",
          }}
          component="img"
          src={user.avatar_url}
        />
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            fontSize: "1rem",
            mb: 0,
          }}
        >
          @{user.username}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`${user.first_name} ${user.last_name}`}
        </Typography>
      </CardContent>
      <CardActions sx={{ p: 0, display: "block" }}>
        <ProfileSectionsTabs user={user} />
      </CardActions>
    </Card>
  );
};

export default function ProfileLayout({ children, ...props }) {
  // const { user, currentTab } = props;
  const router = useRouter();
  const { username } = router.query;

  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    if (typeof username == "undefined") return;
    axios.get(`/user/${username}`).then((res) => {
      if (res.data.success) {
        setUser(res.data.user);
      } else {
        alert("User not found");
      }
    });
  }, [username]);

  return (
    <>
      {user != null ? (
        <Box sx={{ py: 2 }}>
          <Container maxWidth="lg">
            <Grid container spacing={4} rowSpacing={2}>
              <Grid item xs={12} md={4} lg={3}>
                <ProfileCard user={user} />
              </Grid>
              <Grid item xs={12} md={8} lg={9}>
                {children}
              </Grid>
            </Grid>
          </Container>
        </Box>
      ) : (
        <Box
          sx={{
            minHeight: (theme) =>
              `calc(100vh - ${theme.constants.menuHeight}px)`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CustomCircularProgress />
        </Box>
      )}
    </>
  );
}
