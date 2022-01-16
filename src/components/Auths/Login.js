import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";

import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import FacebookIcon from '@material-ui/icons/Facebook';
import SecurityIcon from '@material-ui/icons/Security';
import Divider from '@material-ui/core/Divider';

import { login } from "../../slices/authSlice";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Email not valid").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6")
    .max(30, "Password too long")
    .required("Password is required"),
});

const useStyles = makeStyles((theme) => ({
  contain: {
    [theme.breakpoints.up('md')]: {
      maxWidth: "1000px",
      marginTop: "200px",
    },
  },
  paperstyle: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(8, 2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(8, 6),
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(8, 10),
    },
  },
  inputAdornment: {
    marginLeft: -48,
  },
  showPassWordIcon: {
    position: "relative",
    left: theme.spacing(8)
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 1),
  },
  socialButton: {
    margin: theme.spacing(1, 0),
  },
  or: {
    color: 'rgba(0, 0, 0, 0.26)',
    margin: theme.spacing(0, 2),
  },
  divider: {
    width: '100%',
  },
  orWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing(2, 0),
  },
  sicialGroup: {
    marginTop: theme.spacing(2),
    padding: 0
  }
}));
export default function Login({ setIsRedirect }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  const [showPassword, setShowPassword] = React.useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const blurMatch = useMediaQuery(theme.breakpoints.up('md'));
  const serverUrl = 'https://api-youtubeclone.herokuapp.com/';
  // const serverUrl = 'http://localhost:8000/'

  const {
    values,
    errors,
    touched,
    handleBlur,
    dirty,
    isValid,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { setErrors, resetForm }) => {
      const goBack = () => {
        history.replace(from);
      };
      dispatch(login(values, goBack, setIsRedirect, { setErrors, resetForm }));
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth="sm" className={classes.contain}>
      <Grid container justify="center" alignContent="center">
        <Grid item xs={12} md={8}>
          <Paper elevation={blurMatch ? 3 : 0} className={classes.paperstyle}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Login
              </Typography>
            </Grid>
            <form noValidate autoComplete="on" onSubmit={handleSubmit}>
              <TextField
                error={touched.email && !!errors.email}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email address"
                name="email"
                autoComplete="email"
                // autoFocus
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                helperText={touched.email ? errors.email : null}
              />
              <Grid item xs={10}>
                <TextField
                  error={touched.password && !!errors.password}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  helperText={touched.password ? errors.password : null}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" className={classes.inputAdornment}>
                        <IconButton
                          className={classes.showPassWordIcon}
                          onClick={handleClickShowPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              {/* <FormControlLabel
								control={<Checkbox value="remember" color="primary" />}
								label="Remember me"
							/> */}
              <Button
                disabled={!(isValid && dirty)}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <div className={classes.orWrapper}>
                <div className={classes.divider}>
                  <Divider />
                </div>
                <Typography className={classes.or} component="i" align="center" >or</Typography>
                <div className={classes.divider}>
                  <Divider />
                </div>
              </div>
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                color="secondary"
                className={classes.socialButton}
                startIcon={<SecurityIcon />}
                href={from === '/' ? `${serverUrl}auth/google` : `${serverUrl}auth/google?returnTo=${from}`}
              >
                Sign in with Google
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                color="primary"
                className={classes.socialButton}
                startIcon={<FacebookIcon />}
                href={from === '/' ? `${serverUrl}auth/facebook` : `${serverUrl}auth/facebook?returnTo=${from}`}
              >
                Continiue with Facebook
              </Button>
              <Container className={classes.sicialGroup}>
                <Grid container>
                  <Grid item xs>
                    <Link
                      component={NavLink}
                      to="/forgotpassword"
                      variant="body2"
                    >
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      component={NavLink}
                      to={{
                        pathname: "/register",
                        state: { from },
                      }}
                      variant="body2"
                    >
                      Don't have an account? Sign Up
                    </Link>
                  </Grid>
                </Grid>

                <Grid container justify="flex-end">
                  <Link component={NavLink} to="/" variant="body2">
                    Back to home
                  </Link>
                </Grid>
              </Container>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
