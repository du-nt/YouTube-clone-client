import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

import { useDispatch } from "react-redux";

import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Done from "@material-ui/icons/Done";
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

import { resetPassword } from "../../slices/authSlice";

import * as Yup from "yup";
import { useFormik } from "formik";

const initialValues = {
  newPassword: "",
  newPassword2: "",
};

const validationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(6, "Password must be at least 6")
    .max(30, "Password too long")
    .required("Password is required"),
  newPassword2: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("newPassword")], "Password not match"),
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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  showPassWordIcon: {
    position: "relative",
    left: "54px",
    [theme.breakpoints.up("md")]: {
      left: "80px",
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  avatarSuccess: {
    margin: theme.spacing(1),
    backgroundColor: "inherit",
    border: " 2px solid #63c933",
    color: "#63c933",
  },
  caption: {
    marginTop: theme.spacing(2),
  },
}));

export default function ResetPassword() {
  const dispatch = useDispatch();
  const [confirmed, setConfirmed] = useState(false);
  const params = useParams();
  useEffect(() => {
    return () => setConfirmed(false);
  }, []);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const blurMatch = useMediaQuery(theme.breakpoints.up(780));
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
      dispatch(
        resetPassword(values, params, { setErrors, resetForm }, setConfirmed)
      );
    },
  });

  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
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
                Reset Password
              </Typography>
            </Grid>
            <form noValidate autoComplete="on" onSubmit={handleSubmit}>
              <Grid container spacing={0}>
                <Grid item xs={10} sm={5}>
                  <TextField
                    error={touched.newPassword && !!errors.newPassword}
                    required
                    fullWidth
                    name="newPassword"
                    label="New password"
                    type={showNewPassword ? "text" : "password"}
                    id="newPassword"
                    autoComplete="current-password"
                    margin="normal"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.newPassword}
                    helperText={touched.newPassword ? errors.newPassword : null}
                  />
                </Grid>
                <Grid item xs={10} sm={5}>
                  <TextField
                    error={touched.newPassword2 && !!errors.newPassword2}
                    required
                    fullWidth
                    name="newPassword2"
                    label="Confirm new password"
                    id="newPassword2"
                    type={showNewPassword ? "text" : "password"}
                    autoComplete="current-password2"
                    margin="normal"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.newPassword2}
                    helperText={touched.newPassword2 ? errors.newPassword2 : null}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            className={classes.showPassWordIcon}
                            onClick={handleClickShowNewPassword}
                          >
                            {showNewPassword ? <Visibility /> : <VisibilityOff />}
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
                Create new password
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );

  const success = (
    <Container maxWidth="sm" className={classes.contain}>
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
                Password Updated
              </Typography>
              <Typography
                className={classes.caption}
                component="h1"
                variant="body2"
                align="center"
              >
                Sweet! Your new password has now been set.
                <span> </span>
                <Link component={NavLink} to="/login">
                  Go to login
                </Link>
              </Typography>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );

  return confirmed ? success : form;
}
