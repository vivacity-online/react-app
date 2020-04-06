import React from 'react';
import { 
    makeStyles,
    Badge,
    Avatar,
 } from '@material-ui/core';
 import { Link } from 'react-router-dom';
 import URL from '../../../conf';

const UserBadge = (props) => {
    const useStyles = makeStyles((theme) => ({
        badgeRoot: {
            justifyContent: 'center',
            alignItems: 'center',
            margin: 10,
            overflowWrap: 'break-word',
            hyphens: 'auto',
            '@media(max-width: 989px)': {
                maxWidth: 75
            },
        },
        authorOnline: {
            '& .MuiBadge-dot': {
                background: theme.palette.success.main
            }
        },
        authorOffline: {
            '& .MuiBadge-dot': {
                background: theme.palette.red.main
            }
        },
        avatar: {
            height: 70,
            width: 70,
            margin: 0,
        },
    }));
    const classes = useStyles();

        return (
                    <div className={classes.badgeRoot}>
                        <Link to={`/profile/user/${props.username}`}>
                            <Badge
                                variant={"dot"}
                                className={props.online ? classes.authorOnline : classes.authorOffline}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                >
                                <Avatar 
                                    src={URL + props.thumbnail} 
                                    className={classes.avatar}
                                    />
                
                            </Badge>
                            <p className={classes.username}>@{props.username}</p>
                        </Link> 
                    </div>
            )

    };

    export default UserBadge;