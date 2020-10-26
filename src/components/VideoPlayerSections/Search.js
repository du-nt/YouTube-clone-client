import React, { useEffect, useRef } from "react";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import SearchIcon from "@material-ui/icons/Search";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  appbar: {
    color: "#3f51b5",
    backgroundColor: "white",
    height: 51,
  },
  tollbar: {
    minHeight: 51,
    height: "100%",
  },
  right: {
    marginLeft: "auto",
    marginRight: theme.spacing(2),
    cursor: "pointer",
  },
  back: {
    marginLeft: theme.spacing(2),
    cursor: "pointer",
  },
  form: {
    flex: 1,
    margin: theme.spacing(0, 2),
  },
  input: {
    width: "100%",
  },
}));

export default function Search({ closeSearch }) {
  const classes = useStyles();
  const inputRef = useRef(null);

  useEffect(() => inputRef.current.focus(), []);

  const handleClose = () => {
    closeSearch();
  };

  return (
    <AppBar variant="outlined" color="default" className={classes.appbar}>
      <Toolbar disableGutters className={classes.tollbar}>
        <ArrowBackIcon className={classes.back} onClick={handleClose} />
        <form className={classes.form} noValidate autoComplete="off">
          <TextField
            inputRef={inputRef}
            className={classes.input}
            placeholder="Search YouTube"
          />
        </form>
        <SearchIcon className={classes.right} />
      </Toolbar>
    </AppBar>
  );
}
