import * as React from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  FormControl,
  Button,
  Divider,
  IconButton,
  Alert,
  Link as MuiLink,
} from "@mui/material";
import Link from "next/link";
import LoadingButton from "@mui/lab/LoadingButton";
// import ReCAPTCHA from "react-google-recaptcha";
import axios from "../../utils/axios";
import SocialButtons from "./SocialButtons";

export default function RegisterForm(props) {
  const [input, setInput] = React.useState({
    email: "",
    password: "",
  });

  const [error, setError] = React.useState({
    email: null,
    password: null,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    //setLoading(true);
    setMessage(null);
    setSuccess(null);
    alert("Under development");
    return;
    axios
      .post("/auth/login", input)
      .then((res) => {
        setSuccess(res.data.success);
        setMessage(res.data.message);
        setLoading(false);
      })
      .catch((e) => {
        setSuccess(false);
        let res = e.response;
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
    <>
      <Box sx={{ width: "100%" }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2} rowSpacing={2}>
            <Grid item xs={12}>
              <TextField
                id="email"
                name="email"
                label="Email address"
                placeholder="example@domain.com"
                variant="outlined"
                size="small"
                type="email"
                value={input.email}
                onChange={handleInput}
                fullWidth
                required
                error={Boolean(error.email)}
                helperText={error.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="password"
                name="password"
                label="Password"
                variant="outlined"
                size="small"
                type="password"
                value={input.password}
                onChange={handleInput}
                fullWidth
                required
                error={Boolean(error.password)}
                helperText={error.password}
              />
              <Typography
                variant="body2"
                sx={{ mt: 1, display: "block", textAlign: "right" }}
              >
                <MuiLink component={Link} href="/auth/password">
                  Forgotten password?
                </MuiLink>
              </Typography>
            </Grid>
            {Boolean(message) && (
              <Grid item xs={12}>
                <Alert severity={success ? "success" : "error"}>
                  {message}
                </Alert>
              </Grid>
            )}
            <Grid item xs={12}>
              <LoadingButton
                variant="contained"
                disableElevation
                fullWidth
                loading={loading}
                component="button"
                type="submit"
              >
                Log in
              </LoadingButton>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Are you new here?{" "}
                <MuiLink component={Link} href="/auth/register">
                  Sign up instead
                </MuiLink>
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Divider sx={{ mt: 3, mb: 2 }}>
          <Typography variant="body2">or continue with</Typography>
        </Divider>
        <SocialButtons />
      </Box>
    </>
  );
}