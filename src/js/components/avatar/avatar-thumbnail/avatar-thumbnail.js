import React from 'react';
import { makeStyles, Avatar, Paper } from '@material-ui/core';
import PropTypes from 'prop-types';
import URL from '../../../conf';


function AvatarThumbnail(props) {
    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexFlow: 'column nowrap',
            alignItems: 'center',
            margin: 10,
            padding: 10,
            borderRadius: '50%',
            flexShrink: 1,
            border: 'none',
            boxShadow: 'none',
            '&:hover': {
                cursor: 'pointer',
                boxShadow: `inset 0px 2px 4px -1px ${props.secondaryColor},0px 4px 5px 0px ${props.primaryColor},0px 1px 10px 0px ${props.secondaryColor}`,
            }
        },
        avatar: {
            width: 90,
            height: 90,
        },
        username: {
            borderRadius: 5,
            margin: 2.5,
            marginBottom: 0,
            background: theme.palette.white.main,
            padding: 4
        },
    }));
    const classes = useStyles();
    
    return (
            <Paper component={"div"} className={classes.root} onClick={props.onClick}>
                <p className={classes.username}>{props.username}</p>
                <Avatar className={classes.avatar} src={URL + props.avatar_thumbnail} />
            </Paper>
    )
}

AvatarThumbnail.propTypes = {
    username: PropTypes.string.isRequired,
    avatar_thumbnail: PropTypes.string.isRequired
}

export default AvatarThumbnail;