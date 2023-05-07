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
import { useRouter } from "next/router";

export default function ForkProjectModal(props) {
  const {
    forkProjectModal,
    setForkProjectModal,
    forkProjectModalOpen,
    setForkProjectModalOpen,
    appState,
    setShouldUpdateProject,
    shouldUpdateProject,
  } = useAppContext();

  const router = useRouter();

  const [project, setProject] = React.useState(null);

  React.useEffect(() => {
    setProject(forkProjectModal);
  }, [forkProjectModal]);

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleFork = () => {
    setLoading(true);
    axios
      .get(`/project/${project.token}/fork`)
      .then((res) => {
        if (res.data.success) {
          router.push(`/composer/${res.data.fork.token}`);
          setShouldUpdateProject(shouldUpdateProject + 1);
          setLoading(false);
          setForkProjectModalOpen(false);
        } else {
          setError(
            res.data.message
              ? res.data.message
              : "Something went wrong. Please try again later."
          );
          setLoading(false);
        }
      })
      .catch((err) => {
        setError(
          err.response.data.message
            ? err.response.data.message
            : "Something went wrong. Please try again later."
        );
        setLoading(false);
      });
  };

  return (
    <Dialog
      open={Boolean(forkProjectModalOpen) && Boolean(project)}
      aria-labelledby="fork-project-title"
      maxWidth="sm"
      onClose={() => {
        setForkProjectModalOpen(false);
      }}
      disabled
    >
      {project && (
        <DialogTitle id="fork-project-title">
          Fork <i>{project.title}</i>{" "}
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
      <DialogContent>
        <Typography variant="body2">
          Make an identical copy of this project and all its circuits.
        </Typography>
        {Boolean(error) && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </DialogContent>
      <DialogActions
        sx={{
          px: 3,
          pb: 2,
        }}
      >
        <Button
          onClick={() => {
            setForkProjectModalOpen(false);
          }}
        >
          Cancel
        </Button>
        <LoadingButton
          onClick={() => {
            handleFork();
          }}
          color="primary"
          loading={loading}
          variant="contained"
        >
          Fork
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
