import * as React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Alert,
  Drawer,
  TextField,
} from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import LoadingButton from "@mui/lab/LoadingButton";
import { useAppContext } from "../../src/utils/context";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useRouter } from "next/router";
import ProjectCard from "../../src/components/ProjectCard";
import axios from "../../src/utils/axios";
import RouteGuard from "../../src/components/RouteGuard";
import CustomCircularProgress from "../../src/components/custom/CircularProgress";
import ProfileLayout from "../../src/layouts/ProfileLayout";

const NewProjectDrawer = ({ open, toggleDrawer }) => {
  const { addProject } = useAppContext();
  const router = useRouter();

  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState(null);
  const [success, setSuccess] = React.useState(null);

  const defaultInput = {
    title: "",
    description: "",
  };

  const defaultError = {
    title: null,
    description: null,
  };

  const [input, setInput] = React.useState(defaultInput);
  const [error, setError] = React.useState(defaultError);

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: null });
    setMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setSuccess(null);
    axios
      .post("/project", input)
      .then((res) => {
        setMessage(res.data.message);
        setSuccess(true);
        addProject(res.data.project);
        router.push(res.data.redirect_path);
      })
      .catch((err) => {
        setSuccess(false);
        let res = err.response;
        try {
          if (res.data.message) {
            setMessage(res.data.message);
          }
          if (res.data.field_errors) {
            setError(res.data.field_errors);
          }
        } catch (err) {
          setMessage(`Something went wrong. Please try again later.`);
        }
        setLoading(false);
      });
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={toggleDrawer}
      PaperProps={{
        sx: {
          width: "300px !important",
          maxWidth: (theme) => `calc(100vw - ${theme.spacing(8)})`,
        },
      }}
    >
      <Grid
        container
        sx={{ p: 2 }}
        rowSpacing={2}
        spacing={2}
        component="form"
        onSubmit={handleSubmit}
      >
        <Grid item xs={12}>
          <Typography variant="h6">Create a new project</Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.2 }}>
            Create a new project and start building quantum circuits.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="new-project-title"
            name="title"
            label="Title"
            variant="outlined"
            size="small"
            type="text"
            placeholder="Your project's title"
            fullWidth
            required
            value={input.title}
            onChange={handleInput}
            error={Boolean(error.title)}
            helperText={error.title}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="new-project-description"
            name="description"
            label="Description (optional)"
            variant="outlined"
            size="small"
            type="text"
            placeholder="Your project's description"
            fullWidth
            value={input.description}
            onChange={handleInput}
            error={Boolean(error.description)}
            helperText={error.description}
            multiline
            rows={3}
          />
        </Grid>
        {Boolean(message) && (
          <Grid item xs={12}>
            <Alert
              severity={success ? "success" : "error"}
              sx={{
                border: (theme) => `1px solid ${theme.palette.grey.main}`,
              }}
            >
              {message}
            </Alert>
          </Grid>
        )}
        <Grid item xs={6}>
          <Button variant="outlined" fullWidth onClick={toggleDrawer}>
            Cancel
          </Button>
        </Grid>
        <Grid item xs={6}>
          <LoadingButton
            variant="contained"
            type="submit"
            fullWidth
            loading={loading}
          >
            Create
          </LoadingButton>
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default function AccountProjectsPage(props) {
  const { appState, loadProjects, _projects } = useAppContext();

  const [loaded, setLoaded] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [message, setMessage] = React.useState(null);
  const [projects, setProjects] = React.useState([]);

  React.useEffect(() => {
    if (!appState.statusChecked) return;
    loadProjects();
    if (_projects != null) {
      setProjects(_projects);
      setLoaded(true);
    }
  }, [appState.statusChecked, _projects]);

  const [newProjectDrawerOpen, setNewProjectDrawerOpen] = React.useState(false);

  const toggleDrawer = (event) => {
    setNewProjectDrawerOpen(!newProjectDrawerOpen);
  };

  return (
    <RouteGuard>
      <ProfileLayout userId={0}>
        <NewProjectDrawer {...{ toggleDrawer, open: newProjectDrawerOpen }} />
        <Box>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="h4" sx={{ lineHeight: 1.2 }}>
                Your projects
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ display: "flex", justifyContent: "end" }}>
              <Button
                variant="contained"
                startIcon={<AddRoundedIcon />}
                onClick={toggleDrawer}
              >
                New project
              </Button>
            </Grid>
          </Grid>
          {!loaded && (
            <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
              <CustomCircularProgress />
            </Box>
          )}
          {loaded && error && (
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
          {loaded && !error && (
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
                  You have currently no projects. They will appear here once you
                  create them.
                </Alert>
              )}
            </>
          )}
        </Box>
      </ProfileLayout>
    </RouteGuard>
  );
}
