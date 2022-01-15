import React from 'react'
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    popper: {
        zIndex: 111112,
        borderRadius: 4,
    },
    paper: {
        backgroundColor: 'white',
        borderRadius: 4,
        maxWidth: 500
    },
}));

export default function Popup({ children, open, anchorEl, handleClose }) {
    const classes = useStyles();

    return (
        <Popper
            className={classes.popper}
            open={open}
            anchorEl={anchorEl}
            placement="bottom-start"
            transition
            popperOptions={{ positionFixed: true }}
        >
            {({ TransitionProps }) => (
                <Grow
                    {...TransitionProps}
                    timeout={300}
                    style={{ transformOrigin: "right top" }}
                >
                    <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                            <div className={classes.paper}>{children}</div>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
        </Popper>
    );
}