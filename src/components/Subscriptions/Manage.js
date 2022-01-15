import React from 'react'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ViewModuleOutlinedIcon from '@material-ui/icons/ViewModuleOutlined';
import ViewListOutlinedIcon from '@material-ui/icons/ViewListOutlined';
import ViewListIcon from '@material-ui/icons/ViewList';
import Tooltip from '@material-ui/core/Tooltip';
import { NavLink } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: theme.spacing(1),
    },
}));

export default function Manage({ isGrid, setIsGrid }) {
    const classes = useStyles();

    return (
        <div className={classes.buttons}>
            <Button component={NavLink} to='/feed/channels' color="primary">Manage</Button>
            <Tooltip title="Grid">
                <IconButton onClick={(() => setIsGrid(true))}>
                    {isGrid ? <ViewModuleIcon /> : <ViewModuleOutlinedIcon />}
                </IconButton>
            </Tooltip>
            <Tooltip title="List">
                <IconButton onClick={() => setIsGrid(false)}>
                    {isGrid ? <ViewListOutlinedIcon /> : <ViewListIcon />}
                </IconButton>
            </Tooltip>
        </div>
    )
}
