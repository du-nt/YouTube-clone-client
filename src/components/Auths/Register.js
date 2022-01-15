import React from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { register } from "../../slices/authSlice";

import * as Yup from "yup";
import { useFormik } from "formik";

const initialValues = {
  displayName: "",
  email: "",
  password: "",
  password2: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Email not valid").required("Email is required"),
  displayName: Yup.string()
    .required("Display name is required")
    .min(8, "Display name must have min 8 characters")
    .max(15, "Display name must have max 15 characters"),
  password: Yup.string()
    .min(6, "Password must be at least 6")
    .max(30, "Password too long")
    .required("Password is required"),
  password2: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Password not match"),
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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  inputAdornment: {
    marginLeft: -48,
  },
  showPassWordIcon: {
    position: "relative",
    left: theme.spacing(8)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register() {
  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || {
    from: { pathname: "/" },
  };
  const classes = useStyles();
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.up('sm'));
  const blurMatch = useMediaQuery(theme.breakpoints.up('md'));
  const {
    values,
    errors,
    touched,
    isValid,
    dirty,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { setErrors, resetForm }) => {
      const toLogin = () => {
        history.push({ pathname: "/login", state: { from } });
      };
      dispatch(register(values, toLogin, { setErrors, resetForm }));
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
                Register
              </Typography>
            </Grid>
            <form noValidate autoComplete="on" onSubmit={handleSubmit}>
              <TextField
                error={touched.displayName && !!errors.displayName}
                autoComplete="displayName"
                name="displayName"
                required
                fullWidth
                id="displayName"
                label="Display name"
                // autoFocus
                onBlur={handleBlur}
                margin="normal"
                onChange={handleChange}
                value={values.displayName}
                helperText={touched.displayName ? errors.displayName : null}
              />
              <TextField
                error={touched.email && !!errors.email}
                required
                fullWidth
                id="email"
                label="Email address"
                name="email"
                autoComplete="email"
                margin="normal"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                helperText={touched.email ? errors.email : null}
              />
              <Grid container spacing={match ? 3 : 0} direction={match ? 'row' : 'column'} >
                <Grid item xs={10} sm={5}>
                  <TextField
                    error={touched.password && !!errors.password}
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="password"
                    margin="normal"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    helperText={touched.password ? errors.password : null}
                  />
                </Grid>
                <Grid item xs={10} sm={5}>
                  <TextField
                    error={touched.password2 && !!errors.password2}
                    required
                    fullWidth
                    name="password2"
                    label="Confirm password"
                    id="password2"
                    type={showPassword ? "text" : "password"}
                    autoComplete="password2"
                    margin="normal"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password2}
                    helperText={touched.password2 ? errors.password2 : null}
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
              </Grid>

              <Button
                disabled={!(isValid && dirty)}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container justify="space-between">
                <Grid item>
                  <Link component={NavLink} to="/" variant="body2">
                    Back to home
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    component={NavLink}
                    to={{
                      pathname: "/login",
                      state: { from },
                    }}
                    variant="body2"
                  >
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
