import * as React from "react";
import { useRouter } from "next/router";
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
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "../utils/axios";

export default function NewProjectDrawer({ open, toggleDrawer }) {
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
}
