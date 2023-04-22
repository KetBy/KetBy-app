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
  TextField,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import ErrorPage from "../../../src/components/ErrorPage";
import theme from "../../../src/themes/default";
import { LoadingButton } from "@mui/lab";
import { randStr, randArrElem } from "../../../src/utils/auxiliary";
import CachedRoundedIcon from "@mui/icons-material/CachedRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

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
                return <ProjectCard key={index} project={item} hideAuthor />;
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
      <Grid container>
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

const SettingsTab = ({ user, setUser }) => {
  const { appState, setAppState } = useAppContext();
  const router = useRouter();

  const IdentitySettings = (props) => {
    const [input, setInput] = React.useState({
      first_name: appState.user.first_name,
      last_name: appState.user.last_name,
      username: appState.user.username,
    });

    const [error, setError] = React.useState({
      first_name: null,
      last_name: null,
      username: null,
    });

    const [loading, setLoading] = React.useState(false);
    const [message, setMessage] = React.useState(null);
    const [success, setSuccess] = React.useState(null);

    const handleInput = (e) => {
      setInput({ ...input, [e.target.name]: e.target.value });
      setError({ ...error, [e.target.name]: null });
      setMessage(null);
      setSuccess(null);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      setLoading(true);
      setMessage(null);
      setSuccess(null);
      axios
        .post(`/user/${appState.user.username}`, {
          first_name: input.first_name,
          last_name: input.last_name,
          new_username: input.username,
        })
        .then((res) => {
          if (res.data.success) {
            setAppState({
              ...appState,
              user: res.data.user,
            });
            setUser(user);
            setTimeout(() => {
              router.replace(
                `/u/${res.data.user.username}?tab=settings`,
                null,
                {
                  shallow: true,
                }
              );
            }, 250);
          } else {
            setLoading(false);
            setMessage(res.data.message);
            setSuccess(false);
          }
        })
        .catch((e) => {
          setSuccess(false);
          let res = e.response;
          try {
            if (res.data.message) {
              setMessage(res.data.message);
            }
            if (res.data.field_errors) {
              setError({
                ...res.data.field_errors,
                username: res.data.field_errors.new_username,
              });
            }
          } catch (err) {
            setMessage(`Something went wrong. Please try again later.`);
          }
          setLoading(false);
        });
    };

    return (
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2} rowSpacing={2}>
          <Grid item xs={6} md={4}>
            <TextField
              id="first_name"
              name="first_name"
              label="First name"
              placeholder="John"
              variant="outlined"
              size="small"
              type="text"
              value={input.first_name}
              onChange={handleInput}
              fullWidth
              required
              error={Boolean(error.first_name)}
              helperText={error.first_name}
            />
          </Grid>
          <Grid item xs={6} md={4}>
            <TextField
              id="last_name"
              name="last_name"
              label="Last name"
              placeholder="Smith"
              variant="outlined"
              size="small"
              type="text"
              value={input.last_name}
              onChange={handleInput}
              fullWidth
              required
              error={Boolean(error.last_name)}
              helperText={error.last_name}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              id="username"
              name="username"
              label="Username"
              placeholder="username..."
              variant="outlined"
              size="small"
              type="text"
              value={input.username}
              onChange={handleInput}
              fullWidth
              required
              error={Boolean(error.username)}
              helperText={error.username}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ opacity: 0.75 }}>
                    ketby.com/u/
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <LoadingButton
              variant="contained"
              disableElevation
              loading={loading}
              component="button"
              type="submit"
            >
              Save
            </LoadingButton>
          </Grid>
          <Grid item xs={12}>
            {Boolean(message) && (
              <Grid item xs={12}>
                <Alert
                  severity={success ? "success" : "error"}
                  sx={{ border: `1px solid ${theme.palette.grey.main}` }}
                >
                  {message}
                </Alert>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Box>
    );
  };

  const LogInSettings = (props) => {
    return (
      <Box>
        <Grid container spacing={2} rowSpacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              Password
            </Typography>
            <Typography variant="body2">
              If you'd like to change your password, please use the{" "}
              <Typography
                variant="body2"
                sx={{ textDecoration: "none", color: "primary" }}
                component={Link}
                href="/auth/password"
              >
                password reset tool
              </Typography>
              .
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              Email address
            </Typography>
            <Typography variant="body2">
              If you'd like to change the email address associated to your
              account, please{" "}
              <Typography
                variant="body2"
                sx={{ textDecoration: "none", color: "primary" }}
                component={Link}
                href="/contact"
              >
                contact us
              </Typography>
              .
            </Typography>
          </Grid>
        </Grid>
      </Box>
    );
  };

  const AppearenceSettings = (props) => {
    const [avatarToken, setAvatarToken] = React.useState(null);
    const [colors, setColors] = React.useState([null, null]);
    const [saving, setSaving] = React.useState(false);
    const [error, setError] = React.useState(null);

    const getRandomAvatar = () => {
      setError(null);
      setAvatarToken(randStr(16));
      setColors(
        randArrElem(
          [
            theme.palette.success[100].replace("#", ""),
            theme.palette.error[100].replace("#", ""),
            theme.palette.success[100].replace("#", ""),
            theme.palette.warning[100].replace("#", ""),
          ],
          2
        )
      );
    };

    const saveRandomAvatar = () => {
      setSaving(true);
      axios
        .post(`/user/${user.username}/avatar`, {
          token: avatarToken,
          color_1: colors[0],
          color_2: colors[1],
        })
        .then((res) => {
          setSaving(false);
          setError(null);
          setUser({ ...user, avatar_url: res.data.user.avatar_url });
          setAppState({
            ...appState,
            user: { ...appState.user, avatar_url: res.data.user.avatar_url },
          });
        })
        .catch((err) => {
          if (err.response && err.response.data && err.response.data.message) {
            setError(err.response.data.message);
          } else {
            setError("Something went wrong. Please try again later.");
          }
        });
    };

    return (
      <Box>
        <Grid container spacing={2} rowSpacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              Profile picture{" "}
              <Button
                size="small"
                variant="contained"
                onClick={() => {
                  getRandomAvatar();
                }}
                startIcon={<CachedRoundedIcon />}
              >
                Regenerate
              </Button>
              {avatarToken && (
                <LoadingButton
                  size="small"
                  variant="contained"
                  onClick={() => {
                    saveRandomAvatar();
                  }}
                  sx={{ ml: 1 }}
                  startIcon={<SaveRoundedIcon />}
                  loading={saving}
                >
                  Save
                </LoadingButton>
              )}
            </Typography>
            {Boolean(error) && (
              <Alert
                severity="error"
                sx={{
                  mt: 1,
                  border: (theme) => `1px solid ${theme.palette.grey[200]}`,
                }}
              >
                {error}
              </Alert>
            )}
            <Box sx={{ width: "100px !important", height: "100px !important" }}>
              <Box
                component="img"
                src={
                  avatarToken
                    ? `https://api.dicebear.com/6.x/avataaars/svg?seed=${avatarToken}&backgroundColor=${colors[0]},${colors[1]}&backgroundType=gradientLinear`
                    : user.avatar_url
                }
                alt={`${user.username} profile pricture`}
                sx={{
                  width: "100px",
                  height: "100px",
                  margin: "0 auto",
                  borderRadius: "50px",
                  mt: 2,
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" sx={{ fontWeight: 500, mt: 2 }}>
              Cover picture{" "}
            </Typography>
            <Box
              component="img"
              src={user.cover_url}
              alt={`${user.username} cover picture`}
              sx={{
                width: "100%",
                maxWidth: "400px",
                height: "auto",
                margin: "0 auto",
                mt: 2,
              }}
            />
          </Grid>
        </Grid>
      </Box>
    );
  };

  return (
    <Grid container rowSpacing={3} spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" sx={{ lineHeight: 1 }}>
          Settings
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Box
          sx={{
            boxShadow: (theme) => theme.shadowsCustom[2],
            background: "white",
            borderRadius: (theme) => `${theme.shape.borderRadius}px`,
            p: 2,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Identity
          </Typography>
          <IdentitySettings />
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            boxShadow: (theme) => theme.shadowsCustom[2],
            background: "white",
            borderRadius: (theme) => `${theme.shape.borderRadius}px`,
            p: 2,
          }}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            Appearence
          </Typography>
          <AppearenceSettings />
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            boxShadow: (theme) => theme.shadowsCustom[2],
            background: "white",
            borderRadius: (theme) => `${theme.shape.borderRadius}px`,
            p: 2,
          }}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            Log in details
          </Typography>
          <LogInSettings />
        </Box>
      </Grid>
    </Grid>
  );
};

export default function UserPage(props) {
  const router = useRouter();
  const { appState } = useAppContext();
  const { username } = router.query;
  const [user, setUser] = React.useState(null);

  const [tab, setTab] = React.useState("index");
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (typeof username == "undefined") return;
    axios
      .get(`/user/${username}`)
      .then((res) => {
        if (res.data.success) {
          setLoading(false);
          setUser(res.data.user);
        } else {
          setLoading(false);
          throw new Exception("Something went wrong.");
        }
      })
      .catch((err) => {
        if (err.response) {
          setError({
            code: err.response.status, // 404 - not found, 403 - unauthorized
          });
        } else {
          setError({
            code: 500, // server error
          });
        }
        setLoading(false);
      });
  }, [username, router.query]);

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
      {loading ? (
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
      ) : (
        <>
          {error ? (
            <ErrorPage code={error.code} />
          ) : (
            <>
              <Head>
                <title>@{user.username} | KetBy</title>
              </Head>
              <Box sx={{ py: 2, pt: 3 }}>
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
                        tab == "settings" && (
                          <>
                            <SettingsTab user={user} setUser={setUser} />
                          </>
                        )}
                    </Grid>
                  </Grid>
                </Container>
              </Box>
            </>
          )}
        </>
      )}
    </>
  );
}
