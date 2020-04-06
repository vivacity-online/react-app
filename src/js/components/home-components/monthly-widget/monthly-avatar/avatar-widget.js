import React from 'react';
import { 
    makeStyles,
    AppBar,
    Button,
    Toolbar,
     } from '@material-ui/core';
import Share from '@material-ui/icons/Share';
import Like from '../../../items/likes/like';
import { AddCircle } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    appbar: {
        // margin: 10,
        background: theme.palette.white.main
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    toolbarButton: {
        margin: 5
    }
}));

function AvatarWidget(props) {
    const classes = useStyles();
    
    return (
                    <div>
                        <div style={{height: 250}}>
                            COMING SOON!
                        </div>
                        <AppBar position={"static"} className={classes.appbar}>
                            <Toolbar className={classes.toolbar}>
                                <Like 
                                    liked={props.liked}
                                    setLiked={props.setLiked}
                                    likeCount={props.likeCount} 
                                    setLikeCount={props.setLikeCount} 
                                    />
                                <div>
                                    <Button className={classes.toolbarButton} variant={"contained"} color={"primary"}><Share /> Share</Button>
                                    <Button className={classes.toolbarButton} variant={"contained"} color={"primary"}><AddCircle />Friend</Button>
                                </div>
                            </Toolbar>
                        </AppBar>
                    </div>
    )
}

export default AvatarWidget;
