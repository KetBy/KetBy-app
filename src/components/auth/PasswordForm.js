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
  Container,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "../../utils/axios";
import { useAppContext } from "../../utils/context";
import CustomCircularProgress from "../custom/CircularProgress";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import ReCAPTCHA from "react-google-recaptcha";
import theme from "../../themes/default";

{
  /* 
  This will be displayed on route /auth/password
  (where the user inserts their email address after which a reset link will be sent by email)
  */
}
export function PasswordForm1(props) {
  const [input, setInput] = React.useState({
    email: "",
  });

  const [error, setError] = React.useState({
    email: null,
  });

  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
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
      .post(`/auth/password`, {
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

  React.useEffect(() => {
    setTimeout(() => {
      setDisabled(false);
    }, 250);
  }, []);

  return (
    <>
      {success ? (
        <Box sx={{ width: "100%" }}>
          <Alert
            severity="success"
            sx={{ border: `1px solid ${theme.palette.grey.main}` }}
          >
            {message}
          </Alert>
        </Box>
      ) : (
        <Box sx={{ width: "100%" }}>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2} rowSpacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="email"
                  name="email"
                  label="Email address"
                  placeholder="Your account's email address"
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
              <Grid item xs={12}>
                <LoadingButton
                  variant="contained"
                  disableElevation
                  fullWidth
                  loading={loading}
                  component="button"
                  type="submit"
                  disabled={disabled}
                >
                  Continue
                </LoadingButton>
                <Box
                  sx={{
                    paddingTop: (theme) => theme.spacing(2),
                    paddingBottom: (theme) => theme.spacing(2),
                  }}
                >
                  <Typography variant="body2" sx={{ mt: 0 }}>
                    Do you know your password?{" "}
                    <MuiLink component={Link} href="/auth/login">
                      Log in
                    </MuiLink>
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            {!disabled && (
              <ReCAPTCHA
                ref={recaptchaRef}
                size="invisible"
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                onChange={handleRecaptchaChange}
              />
            )}
          </Box>
        </Box>
      )}
    </>
  );
}

{
  /* 
  This will be displayed on route /auth/password/token 
  (that is, the page where the user resets their password - the link sent by email)
  */
}
export function PasswordForm2({ token }) {
  const [input, setInput] = React.useState({
    password: "",
  });

  const [error, setError] = React.useState({
    password: null,
  });

  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState(null);
  const [success, setSuccess] = React.useState(null);
  const [valid, setValid] = React.useState(null); // either null (not yet checked) or true/false

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: null });
    setMessage(null);
    setSuccess(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setSuccess(null);
    axios
      .post(`/auth/password/${token}`, { ...{ step: 2, ...input } })
      .then((res) => {
        setSuccess(true);
        setMessage(res.data.message);
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

  React.useEffect(() => {
    if (!token) {
      return;
    }
    axios
      .post(`/auth/password/${token}`, { ...{ step: 1, ...input } })
      .then((res) => {
        setValid(true);
      })
      .catch((e) => {
        setValid(false);
      });
  }, [token]);

  return (
    <>
      {valid == null ? (
        <Box
          sx={{
            width: "100%",
            textAlign: "center",
            paddingTop: (theme) => theme.spacing(2),
            paddingBottom: (theme) => theme.spacing(2),
          }}
        >
          <CustomCircularProgress />
          <Typography variant="body1">Please wait...</Typography>
        </Box>
      ) : (
        <>
          {valid ? (
            <Container
              maxWidth="xs"
              sx={{
                paddingTop: (theme) => theme.spacing(2),
                paddingBottom: (theme) => theme.spacing(2),
              }}
            >
              {success ? (
                <Grid container spacing={2} rowSpacing={2}>
                  <Grid item xs={12}>
                    <Alert
                      severity="success"
                      sx={{
                        border: (theme) =>
                          `1px solid ${theme.palette.grey.main}`,
                      }}
                    >
                      {message}
                    </Alert>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<HomeRoundedIcon />}
                      component={Link}
                      href="/"
                    >
                      Back home
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button
                      variant="contained"
                      fullWidth
                      endIcon={<PersonRoundedIcon />}
                      component={Link}
                      href="/auth/login"
                      sx={{ display: { xs: "none", sm: "flex" } }}
                    >
                      Log in
                    </Button>
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<PersonRoundedIcon />}
                      component={Link}
                      href="/auth/login"
                      sx={{ display: { xs: "default", sm: "none" } }}
                    >
                      Log in
                    </Button>
                  </Grid>
                </Grid>
              ) : (
                <Box component="form" onSubmit={handleSubmit}>
                  <Grid container spacing={2} rowSpacing={2}>
                    <Grid item xs={12}>
                      <Alert
                        severity="info"
                        sx={{
                          border: (theme) =>
                            `1px solid ${theme.palette.grey.main}`,
                        }}
                      >
                        Please enter a new password for your account.
                      </Alert>
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
                        <Alert
                          severity={success ? "success" : "error"}
                          sx={{
                            border: (theme) =>
                              `1px solid ${theme.palette.grey.main}`,
                          }}
                        >
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
                        Save password
                      </LoadingButton>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Container>
          ) : (
            <Container
              maxWidth="xs"
              sx={{
                paddingTop: (theme) => theme.spacing(2),
                paddingBottom: (theme) => theme.spacing(2),
              }}
            >
              <Grid container spacing={2} rowSpacing={2}>
                <Grid item xs={12}>
                  <Alert
                    severity="warning"
                    sx={{
                      border: (theme) => `1px solid ${theme.palette.grey.main}`,
                    }}
                  >
                    This link is not valid or has expired. Please try resetting
                    your password again.
                  </Alert>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<HomeRoundedIcon />}
                    component={Link}
                    href="/"
                  >
                    Back home
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    fullWidth
                    endIcon={<PersonRoundedIcon />}
                    component={Link}
                    href="/auth/password"
                    sx={{ display: { xs: "none", sm: "flex" } }}
                  >
                    Try again
                  </Button>
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<PersonRoundedIcon />}
                    component={Link}
                    href="/auth/password"
                    sx={{ display: { xs: "default", sm: "none" } }}
                  >
                    Try again
                  </Button>
                </Grid>
              </Grid>
            </Container>
          )}
        </>
      )}
    </>
  );
}
