import React from "react";

import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import BlankHeader from "./BlankHeader";

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
  const blurMatch = useMediaQuery(theme.breakpoints.up(780));

  return (
    <>
      <BlankHeader />
      <Container maxWidth="sm" className={classes.contain}>
        <Grid container justify="center" alignContent="center">
          <Grid item xs={12} md={8}>
            <Paper elevation={blurMatch ? 3 : 0} className={classes.paperstyle}>
              <form noValidate>
                <TextField
                  variant="outlined"
                  name="title"
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  margin="normal"
                />
                <TextField
                  variant="outlined"
                  name="url"
                  required
                  fullWidth
                  id="url"
                  label="Video's url"
                  margin="normal"
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  id="caption"
                  label="Caption's url"
                  name="caption"
                  margin="normal"
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  id="description"
                  label="Description"
                  name="description"
                  margin="normal"
                  multiline
                  rows="3"
                  rowsMax={3}
                />
                <Button
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
