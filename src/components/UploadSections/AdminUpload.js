import React from "react";

import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import * as Yup from "yup";
import { useFormik } from "formik";

import AdminHeader from "./AdminHeader";

import { addUrl } from "../../slices/videoSlice";
import { useDispatch } from "react-redux";

const initialValues = {
  title: "",
  url: "",
  subtitle: "",
  description: "",
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  url: Yup.string().required("Video's url is required"),
  subtitle: Yup.string(),
  description: Yup.string(),
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
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function AdminUpload() {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const blurMatch = useMediaQuery(theme.breakpoints.up(780));

  const { values, isValid, dirty, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(addUrl(values, resetForm));
    },
  });

  return (
    <>
      <AdminHeader />
      <Container maxWidth="sm" className={classes.contain}>
        <Grid container justify="center" alignContent="center">
          <Grid item xs={12} md={8}>
            <Paper elevation={blurMatch ? 3 : 0} className={classes.paperstyle}>
              <form noValidate onSubmit={handleSubmit}>
                <TextField
                  name="title"
                  onChange={handleChange}
                  value={values.title}
                  autoComplete="off"
                  variant="outlined"
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  margin="normal"
                />
                <TextField
                  name="url"
                  onChange={handleChange}
                  value={values.url}
                  autoComplete="off"
                  variant="outlined"
                  required
                  fullWidth
                  id="url"
                  label="Video's url"
                  margin="normal"
                />
                <TextField
                  name="subtitle"
                  onChange={handleChange}
                  value={values.subtitle}
                  autoComplete="off"
                  fullWidth
                  variant="outlined"
                  id="caption"
                  label="Caption's url"
                  margin="normal"
                />
                <TextField
                  name="description"
                  onChange={handleChange}
                  value={values.description}
                  autoComplete="off"
                  fullWidth
                  variant="outlined"
                  id="description"
                  label="Description"
                  margin="normal"
                  multiline
                  rows="3"
                  rowsMax={3}
                />
                <Button
                  disabled={!(isValid && dirty)}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Create
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
