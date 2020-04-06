import React from 'react';
import {
    Paper, 
    Grid,
    makeStyles,
} from '@material-ui/core';
import ForumBadge from '../../avatar/forum-avatar-badge/forum-avatar-badge';
import SanitizeHTML from '../sanitizer/sanitizer';

function BoardComment(props) {

    const useStyles = makeStyles((theme) => ({
        switchSides: {
            flexFlow: props.side === "left" ? "initial" : "row-reverse",
        },
        title: {
            textAlign: props.side
        }
    }))
    const classes = useStyles();


    return (
        <Paper style={{maxWidth: 989, margin: 'auto', marginTop: 10}}>
            <Grid container spacing={2} className={classes.switchSides}>
                <Grid item lg={2}>
                    <p>{props.comment.published_on_date}</p>
                    <ForumBadge
                        username={props.comment.author.username}
                        online={props.comment.author.online}
                        thumbnail={props.comment.author.thumbnail}
                    />
                </Grid>
                <Grid item lg={10}>
                    <h1 className={classes.title}>{props.comment.title}</h1>
                    <hr />
                    <SanitizeHTML html={props.comment.content} />
                </Grid>
            </Grid>
        </Paper>
        )
}

export default BoardComment;