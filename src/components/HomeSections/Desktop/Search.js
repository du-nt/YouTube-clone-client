import React, { useState, useRef } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

import { useLocation, useHistory } from "react-router-dom";

import { useHover, useOnClickOutside } from "../../../hooks";

const useStyles = makeStyles((theme) => ({
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.black, 0.15),
        "&:hover": {
            backgroundColor: fade(theme.palette.common.black, 0.25),
        },
        marginLeft: 0,
        width: "auto",
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
        width: "100%",
        color: "inherit",
    },
    inputInput: {
        padding: theme.spacing(1, 5, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "250px",
            "&:focus": {
                width: "320px",
            },
        },
        [theme.breakpoints.up("lg")]: {
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
        color: theme.palette.primary.light,
    },
    searchResult: {
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
        color: 'black'
    },
}));

export default function Search() {
    const classes = useStyles();
    const [show, setShow] = useState(false);
    const searchRef = useRef(null);
    const inputRef = useRef(null);
    const isHover = useHover(searchRef);

    const useQuery = () => new URLSearchParams(useLocation().search);
    const query = useQuery().get("search");
    const [search, setSearch] = useState(query || '');
    const history = useHistory();

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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (search.trim()) {
            inputRef.current.blur()
            setShow(false);
            history.push(`/results?search=${search}`);
        }
    };

    useOnClickOutside(searchRef, handleClickOutside);

    return (
        <div className={classes.search} ref={searchRef} onFocus={handleFocus}>
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
            <form
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
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
            </form>
            {(show || (isHover && search)) && (
                <CloseIcon
                    fontSize="small"
                    className={classes.deleteIcon}
                    onMouseDown={handleDelete}
                />
            )}

        </div>
    );
}