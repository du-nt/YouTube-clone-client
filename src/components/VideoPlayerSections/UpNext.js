import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { makeStyles } from "@material-ui/core";

import MediaItem from "./MediaItem";

const useStyles = makeStyles((theme) => ({
  paper: {
    borderTopWidth: "2px",
    borderBottom: "none",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: theme.spacing(0.5, 1.5),
  },
  recommend: {
    marginTop: "-8px",
  },
}));

function UpNext() {
  const classes = useStyles();

  return (
    <Paper variant="outlined" square className={classes.paper}>
      <div className={classes.header}>
        <Typography variant="body2">Up next</Typography>
        <FormControlLabel
          value="start"
          control={<Switch color="primary" />}
          label={<Typography variant="body2">Autoplay</Typography>}
          labelPlacement="start"
        />
      </div>
      <div className={classes.recommend}>
        <MediaItem />
        <MediaItem />
        <MediaItem />
        <MediaItem />
      </div>
    </Paper>
  );
}

export default UpNext;
