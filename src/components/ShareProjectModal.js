import * as React from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  TextField,
  DialogContent,
  DialogActions,
  Typography,
  Chip,
  Button,
  Switch,
  Stack,
  LinearProgress,
  Alert,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useAppContext } from "../utils/context";
import axios from "../utils/axios";

export default function ShareProjectModal(props) {
  const {
    shareProjectModal,
    setShareProjectModal,
    shareProjectModalOpen,
    setShareProjectModalOpen,
    appState,
    setShouldUpdateProject,
    shouldUpdateProject,
  } = useAppContext();

  const [project, setProject] = React.useState(null);

  React.useEffect(() => {
    setProject(shareProjectModal);
  }, [shareProjectModal]);

  const [copyBtnText, setCopyBtnText] = React.useState("copy");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_APP_URL}/composer/${
        project ? project.token : null
      }`
    );
    setCopyBtnText("copied!");
    setTimeout(() => {
      setCopyBtnText("copy");
    }, 500);
  };

  const handleSwitch = (e) => {
    setLoading(true);
    setError(null);
    axios
      .post(`/project/${project.token}/settings`, {
        public: e.target.checked ? 1 : 0,
      })
      .then((res) => {
        if (res.data.success) {
          setProject(res.data.project);
          setShouldUpdateProject(shouldUpdateProject + 1);
        } else {
          setError(res.data.message);
        }
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError("Something went wrong. Please try again later.");
        }
        setLoading(false);
      });
  };

  return (
    <Dialog
      open={Boolean(shareProjectModalOpen)}
      aria-labelledby="share-project-title"
      maxWidth="xs"
      onClose={() => {
        setShareProjectModalOpen(false);
      }}
      disabled
    >
      {project && (
        <DialogTitle id="share-project-title">
          Share <i>{project.title}</i>{" "}
          <Chip
            size="small"
            label={project.public ? "public" : "private"}
            color={project.public ? "success" : "default"}
            variant="outlined"
            component="span"
          />
        </DialogTitle>
      )}
      <LinearProgress
        sx={{ opacity: loading ? 1 : 0, transitionDuration: "0.2s" }}
      />
      {project && (
        <DialogContent>
          <TextField
            variant="outlined"
            value={`${process.env.NEXT_PUBLIC_APP_URL}/composer/${
              project ? project.token : null
            }`}
            label="Share URL"
            fullwidth
            sx={{
              width: {
                xs: "60vw",
                sm: "50vw",
                md: 396,
              },
              position: "relative",
              "&:after": {
                background:
                  "linear-gradient(to right, transparent 0, white 50px, white 100%)",
                width: "125px",
                height: "calc(100% - 2px)",
                content: "''",
                right: "1px",
                top: "1px",
                zIndex: 0,
                position: "absolute",
                borderRadius: (theme) =>
                  `0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0`,
              },
            }}
            size="small"
            InputProps={{
              endAdornment: (
                <Button
                  size="small"
                  variant="outlined"
                  sx={{
                    marginRight: -1,
                    position: "relative",
                    zIndex: 2,
                  }}
                  onClick={handleCopy}
                >
                  {copyBtnText}
                </Button>
              ),
            }}
          />
          {project &&
            appState.user &&
            appState.user.id == project.author.id && (
              <Box>
                {project.public == 1 && (
                  <Typography variant="body2" sx={{ lineHeight: 1.1, mt: 1 }}>
                    Anyone can access this project and fork it.
                  </Typography>
                )}
                {project.public == 0 && (
                  <Typography variant="body2" sx={{ lineHeight: 1.1, mt: 1 }}>
                    Only you are able to access this project.
                  </Typography>
                )}
                <Typography align="center" sx={{ mt: 3 }} variant="body2">
                  Keep this project
                </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  justifyContent="center"
                  sx={{ width: "100%", display: "flex", mt: 0, mb: -1 }}
                >
                  <Typography variant="body2">Private</Typography>
                  <Switch
                    defaultChecked={project.public}
                    onChange={handleSwitch}
                    disabled={loading}
                  />
                  <Typography variant="body2">Public</Typography>
                </Stack>
              </Box>
            )}
          {Boolean(error) && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </DialogContent>
      )}
      <DialogActions
        sx={{
          px: 3,
        }}
      >
        <LoadingButton
          onClick={() => {
            setShareProjectModalOpen(false);
          }}
          color="primary"
        >
          Done
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
