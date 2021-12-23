import React, { useState, useRef } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Grow from "@material-ui/core/Grow";
import Link from "@material-ui/core/Link";

import { NavLink } from "react-router-dom";

import { useHover, useOnClickOutside } from "../../../hooks";

const useStyles = makeStyles((theme) => ({
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(3),
            width: "auto",
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    inputRoot: {
        // width: "100%",
        color: "inherit",
    },
    inputInput: {
        padding: theme.spacing(1, 5, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "420px",
            "&:focus": {
                width: "500px",
            },
        },
    },
    deleteIcon: {
        marginRight: 10,
        position: "absolute",
        right: 0,
        top: "50%",
        transform: "translate(0,-50%)",
        cursor: "pointer",
        color: theme.palette.primary.dark,
    },
    searchResult: {
        minWidth: 400,
        maxWidth: 500,
        height: "auto",
        zIndex: 110,
        position: "absolute",
        top: "100%",
        right: 0,
        marginTop: 6,
        padding: theme.spacing(2),
        borderRadius: "4px",
        boxShadow: theme.shadows[1],
        backgroundColor: '#eee',
        [theme.breakpoints.up(960)]: {
            minWidth: 500,
            maxWidth: 600,
        },
    },
}));

export default function Search() {
    const classes = useStyles();
    const [show, setShow] = useState(false);
    const [search, setSearch] = useState("");
    const searchRef = useRef(null);
    const inputRef = useRef(null);
    const isHover = useHover(searchRef);

    const trimmedSearch = search.trim();

    const handleClickOutside = () => setShow(false);

    const handleDelete = (e) => {
        e.preventDefault();
        inputRef.current.focus();
        setSearch("");
        setShow(false);
    };

    const handleFocus = () => {
        search ? setShow(true) : setShow(false);
    };

    const handleChange = ({ target }) => {
        const { value } = target;
        setSearch(value);
        value ? setShow(true) : setShow(false);
    };

    const handleKeepFocus = (e) => {
        e.preventDefault();
        inputRef.current.focus();
    };

    useOnClickOutside(searchRef, handleClickOutside);

    return (
        <div className={classes.search} ref={searchRef} onFocus={handleFocus}>
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
            <InputBase
                inputRef={inputRef}
                placeholder="Search…"
                autoComplete="off"
                name="search"
                value={search}
                onChange={handleChange}
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
            />
            {(show || (isHover && search)) && (
                <CloseIcon
                    fontSize="small"
                    className={classes.deleteIcon}
                    onMouseDown={handleDelete}
                />
            )}

            <Grow
                in={trimmedSearch && show ? true : false}
                style={{ transformOrigin: "right top" }}
                onMouseDown={handleKeepFocus}
            >
                <div className={classes.searchResult}>
                    <Link component={NavLink} to="/profile">
                        to Profile
                    </Link>
                    <Typography variant="h5" gutterBottom>
                        h5. Heading
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        h6. Heading
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Quos blanditiis tenetur
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                        subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Quos blanditiis tenetur
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore
                        consectetur, neque doloribus, cupiditate numquam dignissimos laborum
                        fugiat deleniti? Eum quasi quidem quibusdam.
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore
                        consectetur, neque doloribus, cupiditate numquam dignissimos laborum
                        fugiat deleniti? Eum quasi quidem quibusdam.
                    </Typography>
                    <Typography variant="button" display="block" gutterBottom>
                        button text
                    </Typography>
                </div>
            </Grow>
        </div>
    );
}