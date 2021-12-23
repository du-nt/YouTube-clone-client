import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import * as Yup from "yup";
import { useFormik } from "formik";

import { useDispatch, useSelector } from "react-redux";

import { editUser } from "../../slices/authSlice";

const useStyles = makeStyles((theme) => ({
  input: {
    margin: theme.spacing(0, 0, 3, 0),
  },
}));

const helperTextStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: "100%",
    marginTop: 0,
  },
}));

const validationSchema = Yup.object().shape({
  displayName: Yup.string()
    .required()
    .min(8, "Name must have min 8 characters")
    .max(25, "Name must have max 25 characters"),
});

export default function FormDialog({ open, handleCloseForm }) {
  const classes = useStyles();
  const helperTextClasses = helperTextStyles();
  const { displayName } = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleClose = () => {
    handleCloseForm();
  };

  const initialValues = {
    displayName,
  };

  const {
    isSubmitting,
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
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(editUser(values, resetForm, handleCloseForm));
    },
  });

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            autoComplete="off"
            margin="dense"
            label="Your name"
            type="text"
            fullWidth
            className={classes.input}
            id="displayName"
            name="displayName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.displayName}
            error={touched.displayName && !!errors.displayName}
            helperText={touched.displayName ? errors.displayName : null}
            FormHelperTextProps={{ classes: helperTextClasses }}
          />
          <DialogContentText variant="body2">
            3 name changes allowed every 90 days. <span> </span>
            <Typography variant="body2" color="primary" component="span">
              Learn more
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!isValid || !dirty || isSubmitting}
            color="primary"
          >
            Ok
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
