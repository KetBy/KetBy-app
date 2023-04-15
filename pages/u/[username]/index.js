import * as React from "react";
import {
  Box,
  Grid,
  Container,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Tabs,
  Tab,
  Button,
  Alert,
  Divider,
} from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import { useAppContext } from "../../../src/utils/context";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import axios from "../../../src/utils/axios";
import CustomCircularProgress from "../../../src/components/custom/CircularProgress";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ProjectCard from "../../../src/components/ProjectCard";
import NewProjectDrawer from "../../../src/components/NewProjectDrawer";
import { styled } from "@mui/system";

const CustomTabs = styled(Tabs)(({ theme }) => ({
  "&.ketby-Tabs-vertical": {
    mb: `calc(-${theme.spacing(1)} + 2px)`,
    "& .ketby-Tab-root": {
      transitionDuration: "0.2s",
      "&:hover": {
        background: theme.palette.grey[50],
      },
      "&.ketby--selected": {
        background: theme.palette.primary[50],
      },
    },
  },
}));

const ProfileSectionsTabs = (props) => {
  const router = useRouter();
  const { appState } = useAppContext();

  const { user, tab, setTab } = props;

  const handleChange = (e, newVal) => {
    setTab(newVal);
    router.push(
      {
        pathname: `/u/${user.username}`,
        query: { tab: newVal },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <>
      <CustomTabs
        orientation="vertical"
        value={tab}
        aria-label="User profile sections"
        sx={{ display: { xs: "none", md: "block" } }}
        onChange={handleChange}
      >
        <Divider />
        <Tab label="Overview" value="index" />
        <Tab label="Projects" value="projects" />
        {appState.isLoggedIn && appState.user.username == user.username && (
          <Tab label="Settings" value="settings" />
        )}
      </CustomTabs>
      <CustomTabs
        orientation="horizontal"
        value={tab}
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
      </CustomTabs>
    </>
  );
};

const ProfileCard = ({ user, tab, setTab }) => {
  return (
    <Card sx={{ boxShadow: (theme) => theme.shadowsCustom[2] }}>
      <CardMedia sx={{ height: { xs: 100, md: 125 } }} image={user.cover_url} />
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
        <ProfileSectionsTabs user={user} tab={tab} setTab={setTab} />
      </CardActions>
    </Card>
  );
};

const IndexTab = ({ user }) => {
  const StatsCard = (props) => {
    const { link } = props;
    return (
      <Box
        sx={{
          "& a": {
            textDecoration: "none",
          },
        }}
      >
        <Box component={link ? Link : "div"} href={link ? link : null}>
          <Card
            sx={{
              boxShadow: (theme) => theme.shadowsCustom[2],
              textAlign: "center",
              p: (theme) => theme.spacing(3, 2),
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 400,
                fontSize: (theme) => theme.spacing(2.5),
              }}
            >
              {props.title}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mt: 1,
                fontWeight: 600,
                p: (theme) => theme.spacing(0.5, 1.5),
                borderRadius: "1rem",
                bgcolor: (theme) => theme.palette.primary[50],
                display: "inline-block",
                border: (theme) => `1px solid ${theme.palette.primary[100]}`,
                color: (theme) => theme.palette.primary[600],
              }}
            >
              {props.value}
            </Typography>
          </Card>
        </Box>
      </Box>
    );
  };

  return (
    <>
      <Grid container spacing={2} rowSpacing={2}>
        <Grid item xs={12} sx={{ display: { xs: "none", md: "block" } }}>
          <Typography variant="h4" sx={{ lineHeight: 1.2 }}>
            {user.first_name} {user.last_name}
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.2 }}>
            @{user.username}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <StatsCard title="Joined" value={user.join_date} />
        </Grid>
        <Grid item xs={12} md={6}>
          <StatsCard
            title="Public projects"
            value={user.public_projects_count}
            link={`/u/${user.username}?tab=projects`}
          />
        </Grid>
      </Grid>
    </>
  );
};

const ProjectsList = ({ user }) => {
  const [projects, setProjects] = React.useState(null);
  const [error, setError] = React.useState(false);
  const [message, setMessage] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(`/user/${user.username}/projects`)
      .then((res) => {
        if (res.data.success) {
          setProjects(res.data.projects);
          setError(false);
        } else {
          setProjects([]);
          setError(true);
          setMessage(res.data.message);
        }
      })
      .catch((err) => {
        setProjects([]);
        setError(true);
        setMessage("Something went wrong. Please try again later.");
      });
  }, []);

  return (
    <>
      {projects == null && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CustomCircularProgress />
        </Box>
      )}
      {projects != null && error && (
        <Alert
          severity="error"
          sx={{
            mt: 2,
            border: (theme) => `1px solid ${theme.palette.grey[200]}`,
          }}
        >
          {message}
        </Alert>
      )}
      {projects != null && !error && (
        <>
          {" "}
          {projects.length > 0 ? (
            <Masonry
              columns={{ xs: 1, md: 2, lg: 3 }}
              spacing={2}
              sx={{ mt: 1, width: "auto" }}
            >
              {projects.map((item, index) => {
                return <ProjectCard key={index} project={item} />;
              })}
            </Masonry>
          ) : (
            <Alert
              severity="info"
              sx={{
                mt: 2,
                border: (theme) => `1px solid ${theme.palette.grey[200]}`,
              }}
            >
              There are no projects to display.
            </Alert>
          )}
        </>
      )}
    </>
  );
};

const ProjectsTab = ({ user }) => {
  const { appState } = useAppContext();

  const [newProjectDrawerOpen, setNewProjectDrawerOpen] = React.useState(false);

  const toggleDrawer = (event) => {
    setNewProjectDrawerOpen(!newProjectDrawerOpen);
  };

  return (
    <>
      <NewProjectDrawer {...{ toggleDrawer, open: newProjectDrawerOpen }} />
      <Grid container alignItems="center">
        <Grid item xs={6}>
          <Typography variant="h4" sx={{ lineHeight: 1 }}>
            {appState.isLoggedIn && appState.user.username == user.username
              ? "Your"
              : `${user.first_name} ${user.last_name}'s`}{" "}
            projects
          </Typography>
        </Grid>
        {appState.isLoggedIn && appState.user.username == user.username && (
          <Grid item xs={6} sx={{ display: "flex", justifyContent: "end" }}>
            <Box>
              <Button
                variant="contained"
                startIcon={<AddRoundedIcon />}
                onClick={toggleDrawer}
              >
                New project
              </Button>
            </Box>
          </Grid>
        )}
        <Grid item xs={12}>
          <ProjectsList user={user} />
        </Grid>
      </Grid>
    </>
  );
};

const SettingsTab = ({ user }) => {
  return <>Settings coming soon</>;
};

export default function UserPage(props) {
  const router = useRouter();
  const { appState } = useAppContext();
  const { username } = router.query;
  const [user, setUser] = React.useState(null);

  const [tab, setTab] = React.useState("index");

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

  React.useEffect(() => {
    if (typeof router.query.tab == "undefined") return;
    if (
      router.query.tab == "projects" ||
      router.query.tab == "settings" ||
      router.query.tab == "index"
    ) {
      setTab(router.query.tab);
    }
  }, [router.query]);

  return (
    <>
      {user != null ? (
        <>
          <Head>
            <title>@{user.username} | KetBy</title>
          </Head>
          <Box sx={{ py: 2 }}>
            <Container maxWidth="lg">
              <Grid container spacing={4} rowSpacing={2}>
                <Grid item xs={12} md={4} lg={3}>
                  <ProfileCard {...{ user, tab, setTab }} />
                </Grid>
                <Grid item xs={12} md={8} lg={9}>
                  {tab == "index" && <IndexTab user={user} />}
                  {tab == "projects" && <ProjectsTab user={user} />}
                  {appState.isLoggedIn &&
                    appState.user.username == user.username &&
                    tab == "settings" && <SettingsTab user={user} />}
                </Grid>
              </Grid>
            </Container>
          </Box>
        </>
      ) : (
        <Box
          sx={{
            minHeight: {
              xs: "-webkit-fill-available",
              md: (theme) => `calc(100vh - ${theme.constants.menuHeight}px)`,
            },
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
