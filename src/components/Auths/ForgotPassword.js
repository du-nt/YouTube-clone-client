import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";

import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Done from "@material-ui/icons/Done";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { forgotPassword } from "../../slices/authSlice";

import * as Yup from "yup";
import { useFormik } from "formik";

const initialValues = {
  email: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Email not valid").required("Email is required"),
});

const useStyles = makeStyles((theme) => ({
  contain: {
    [theme.breakpoints.up(1000)]: {
      maxWidth: "1280px",
      position: "relative",
      top: "210px",
    },
  },
  paperstyle: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(0, 2),
    [theme.breakpoints.up(780)]: {
      padding: theme.spacing(8),
    },
    [theme.breakpoints.up(1300)]: {
      padding: theme.spacing(8, 14),
    },
  },
  caption: {
    marginTop: theme.spacing(2),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  avatarSuccess: {
    margin: theme.spacing(1),
    backgroundColor: "inherit",
    border: " 2px solid #63c933",
    color: "#63c933",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
export default function ForgotPassword() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [mailSent, setMailSent] = useState(false);
  useEffect(() => {
    return () => setMailSent(false);
  }, []);
  const classes = useStyles();
  const theme = useTheme();
  const blurMatch = useMediaQuery(theme.breakpoints.up(780));
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
      dispatch(forgotPassword(values, { setErrors, resetForm }, setMailSent));
    },
  });

  const handleDone = () => {
    setMailSent(false);
    history.push("/");
  };

  const form = (
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
                Forgot Password
              </Typography>
              <Typography
                className={classes.caption}
                component="h1"
                variant="body2"
                align="center"
              >
                Enter your email and we'll send you a link to get back into your
                account.
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
              <Button
                disabled={!(isValid && dirty)}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Send
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link component={NavLink} to="/login" variant="body2">
                    Back to login
                  </Link>
                </Grid>
                <Grid item>
                  <Link component={NavLink} to="/register" variant="body2">
                    Create new account
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );

  const success = (
    <Container maxWidth="sm" className={classes.contain}>
      <Grid container justify="center" alignContent="center">
        <NavLink to="/">home</NavLink>
      </Grid>
      <Grid container justify="center" alignContent="center">
        <Grid item xs={12} md={8}>
          <Paper elevation={0} className={classes.paperstyle}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Avatar className={classes.avatarSuccess}>
                <Done />
              </Avatar>
              <Typography component="h1" variant="h5">
                Password Reset Email Sent
              </Typography>
              <Typography
                className={classes.caption}
                component="h1"
                variant="body2"
                align="center"
              >
                An email has been sent to your email address. Follow the
                directions in the email to reset your password
              </Typography>

              <Button
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleDone}
              >
                Done
              </Button>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
  return mailSent ? success : form;
}
