import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useMediaQuery } from '@material-ui/core';

import DestopHeader from '../HomeSections/Desktop'
import BottomTabs from '../HomeSections/BottomTabs'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'block',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    toolbar: {
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 0,
        padding: 0,
        [theme.breakpoints.up('md')]: {
            flexGrow: 1,
            padding: theme.spacing(3),
            backgroundColor: '#fff'
        },
    },
    noPadding: {
        flexGrow: 0,
        padding: 0,
        [theme.breakpoints.up('md')]: {
            flexGrow: 1,
            backgroundColor: '#fff'
        },
    }
}));

export default function Layout({ children, noHeader, isNoPadding }) {
    const classes = useStyles();
    const matches = useMediaQuery('(min-width:960px)');

    return (
        <div className={classes.root}>
            <CssBaseline />

            {matches ?
                <DestopHeader />
                :
                !noHeader && <BottomTabs />
            }

            <main className={isNoPadding ? classes.noPadding : classes.content}>
                {matches && <div className={classes.toolbar} />}
                {children}
            </main>
        </div>
    );
}
