import React, { useState, useRef } from "react";

import { DropzoneArea } from "material-ui-dropzone";
import { makeStyles } from "@material-ui/core/styles";
import { Theaters } from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import BlankHeader from "./BlankHeader";

import * as Yup from "yup";
import { useFormik } from "formik";

import { upload } from "../../utils";

const FILE_SIZE = 3000000000;
const SUPPORTED_FORMATS = ["video/*,.mkv"];

const initialValues = {
  title: "",
};

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .max(50, "Title must have max 50 characters"),
});

const handlePreviewIcon = (fileObject, classes) => {
  const iconProps = {
    className: classes.image,
  };
  return <Theaters {...iconProps} />;
};

const useStyles = makeStyles((theme) => ({
  item: {
    flexBasis: "auto",
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
}));

export default function Upload() {
  const classes = useStyles();
  const theme = useTheme();
  const blurMatch = useMediaQuery(theme.breakpoints.up(780));

  const fileInput = useRef();
  const [file, setFile] = useState([]);

  const handleChangeFile = async (video) => {
    const data = await upload(video);
  };

  const {
    isSubmitting,
    values,
    touched,
    errors,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      //   const deleteFn = fileInput.current.deleteFile;
      //   const formData = new FormData();
      //   const onResetFile = async () => {
      //     for (let i = 0; i <= files.length; i++) {
      //       await deleteFn(files, 0);
      //     }
      //     setFiles([]);
      //   };
      //   files.forEach((file) => {
      //     formData.append("files", file);
      //   });
      //   formData.append("title", values.title);
      //   dispatch(addPost(formData, { resetForm, onResetFile }));
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
                <DropzoneArea
                  ref={fileInput}
                  acceptedFiles={SUPPORTED_FORMATS}
                  filesLimit={1}
                  dropzoneText="Drag and drop a video here or click"
                  previewGridClasses={{ item: classes.item }}
                  previewGridProps={{ container: { spacing: 3 } }}
                  onChange={handleChangeFile}
                  maxFileSize={FILE_SIZE}
                  getPreviewIcon={handlePreviewIcon}
                />
                <TextField
                  fullWidth
                  required
                  id="outlined-basic"
                  label="Title"
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Description"
                  variant="outlined"
                  margin="normal"
                  multiline
                  rows="3"
                  rowsMax={3}
                />
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Subtitle"
                  variant="outlined"
                  margin="normal"
                />
                <Button
                  fullWidth
                  className={classes.btn}
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={!isValid || !file.length || isSubmitting}
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
