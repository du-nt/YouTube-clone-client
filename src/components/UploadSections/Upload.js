import React, { useState, useRef, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import axios from "axios";

import BlankHeader from "./BlankHeader";

import * as Yup from "yup";
import { useFormik } from "formik";

import { uploadToServer } from "../../slices/videoSlice";
import { upload } from "../../utils";

const initialValues = {
  title: "",
  description: "",
};

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .max(50, "Title must have max 50 characters"),
  description: Yup.string(),
});

const useStyles = makeStyles((theme) => ({
  item: {
    flexBasis: "auto",
    padding: theme.spacing(1),
  },
  contain: {
    [theme.breakpoints.up(1000)]: {
      maxWidth: "1280px",
      position: "relative",
      top: "210px",
    },
  },
  paperstyle: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(0, 1),
    [theme.breakpoints.up(780)]: {
      padding: theme.spacing(8),
    },
    [theme.breakpoints.up(1300)]: {
      padding: theme.spacing(8, 14),
    },
  },
  btn: {
    margin: theme.spacing(3, 0, 2),
  },
  label: {
    fontWeight: 400,
  },
  file: {
    marginBottom: theme.spacing(1),
  },
  close: {
    display: "flex",
    alignSelf: "center",
  },
}));

const helperTextStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: "100%",
    marginTop: 0,
  },
}));

export default function Upload() {
  const classes = useStyles();
  const helperTextClasses = helperTextStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const blurMatch = useMediaQuery(theme.breakpoints.up(780));
  const videoRef = useRef(null);
  const subRef = useRef(null);
  let unmounted = useRef(null);
  const SUPPORTED_FORMATS = ["video/mp4", "video/avi", "video/mkv"];

  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [files, setFiles] = useState([]);
  const [subtitles, setSubtitles] = useState([]);

  useEffect(() => {
    unmounted.current = false;
    return () => (unmounted.current = true);
  });

  const handleChangeFile = ({ target }) => {
    if (!SUPPORTED_FORMATS.includes(target.files[0].type)) {
      toast.error("Unsupported file format", { autoClose: 1500 });
      setFiles([]);
      return;
    }
    if (target.files[0].size > 100000000) {
      toast.error("File too large!", { autoClose: 1500 });
      setFiles([]);
      return;
    }
    setFiles(target.files);
  };

  const handleChangeSubtitle = ({ target }) => {
    setSubtitles(target.files);
  };

  const resetFiles = () => {
    videoRef.current.value = "";
    subRef.current.value = "";
  };

  const handleCancel = () => {
    source.cancel("Upload cancelled !");
  };

  const handleHide = (toastId) => {
    toast.update(toastId, {
      className: "hide",
    });
  };

  const CloseButton = () => (
    <div className={classes.close}>
      <Button onClick={() => handleHide("progress")} size="small">
        Hide
      </Button>
      <Button
        onClick={handleCancel}
        color="secondary"
        variant="contained"
        size="small"
      >
        Cancel
      </Button>
    </div>
  );

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      if (files.length) {
        setIsSubmitting(true);
        const resetSubmitted = (resetForm, resetFiles) => {
          if (!unmounted.current) {
            setIsSubmitting(false);
            resetForm && resetForm();
            resetFiles && resetFiles();
          }
        };
        const data = await upload(
          files[0],
          subtitles,
          source,
          CloseButton,
          resetSubmitted
        );
        if (data && data[0]) {
          const newVideo = {
            ...values,
            url: data[0],
            subtitle: data[1],
          };
          dispatch(
            uploadToServer(newVideo, resetForm, resetFiles, resetSubmitted)
          );
        }
      }
    },
  });

  return (
    <>
      <BlankHeader />
      <Container maxWidth="sm" className={classes.contain}>
        <Grid container justify="center" alignContent="center">
          <Grid item xs={12} md={8}>
            <Paper elevation={blurMatch ? 3 : 0} className={classes.paperstyle}>
              <form onSubmit={handleSubmit}>
                <label htmlFor="video">
                  <Typography
                    variant="h6"
                    component="span"
                    className={classes.label}
                  >
                    Select a video
                  </Typography>
                </label>
                <TextField
                  id="video"
                  className={classes.file}
                  fullWidth
                  required
                  variant="outlined"
                  type="file"
                  inputRef={videoRef}
                  inputProps={{ accept: "video/*" }}
                  onChange={handleChangeFile}
                />
                <label htmlFor="subtitle">
                  <Typography
                    variant="h6"
                    component="span"
                    className={classes.label}
                  >
                    Select a .vtt subtitle
                  </Typography>
                </label>
                <TextField
                  className={classes.file}
                  id="subtitle"
                  fullWidth
                  variant="outlined"
                  type="file"
                  inputRef={subRef}
                  inputProps={{ accept: ".vtt" }}
                  onChange={handleChangeSubtitle}
                />
                <TextField
                  autoComplete="off"
                  fullWidth
                  required
                  id="title"
                  label="Title"
                  variant="outlined"
                  margin="normal"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.title && !!errors.title}
                  helperText={touched.title ? errors.title : null}
                  FormHelperTextProps={{ classes: helperTextClasses }}
                />
                <TextField
                  autoComplete="off"
                  fullWidth
                  id="description"
                  label="Description"
                  variant="outlined"
                  margin="normal"
                  multiline
                  rows="3"
                  rowsMax={3}
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.description && !!errors.description}
                  helperText={touched.description ? errors.description : null}
                  FormHelperTextProps={{ classes: helperTextClasses }}
                />
                <Button
                  fullWidth
                  className={classes.btn}
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  Upload
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
