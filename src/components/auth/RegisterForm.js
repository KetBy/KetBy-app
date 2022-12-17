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
import ReCAPTCHA from "react-google-recaptcha";
import axios from "../../utils/axios";
import SocialButtons from "./SocialButtons";

export default function RegisterForm(props) {
  const [input, setInput] = React.useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [error, setError] = React.useState({
    first_name: null,
    last_name: null,
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

  const recaptchaRef = React.createRef();

  const handleRecaptchaChange = (captchaCode) => {
    if (!captchaCode) {
      return;
    }
    recaptchaRef.current.reset();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setSuccess(null);
    const gRecaptchaResponse = await recaptchaRef.current.executeAsync();
    axios
      .post("/auth/register", {
        ...input,
        "g-recaptcha-response": gRecaptchaResponse,
      })
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
      {success ? (
        <Box sx={{ width: "100%" }}>
          <Alert severity="success">{message}</Alert>
        </Box>
      ) : (
        <Box sx={{ width: "100%" }}>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2} rowSpacing={2}>
              <Grid item xs={6}>
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
              <Grid item xs={6}>
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
                  Register
                </LoadingButton>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  Already have an account?{" "}
                  <MuiLink component={Link} href="/auth/login">
                    Log in instead
                  </MuiLink>
                </Typography>
              </Grid>
            </Grid>
            <ReCAPTCHA
              ref={recaptchaRef}
              size="invisible"
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              onChange={handleRecaptchaChange}
            />
          </Box>
          <Divider sx={{ mt: 3, mb: 2 }}>
            <Typography variant="body2">or continue with</Typography>
          </Divider>
          <SocialButtons />
        </Box>
      )}
    </>
  );
}
