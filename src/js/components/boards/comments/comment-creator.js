import React, { useState } from 'react';
import Editor from '../editor/board-editor';
import { Paper, Container, Button, makeStyles } from '@material-ui/core';
import { APIHandler } from '../../../utils/data-handler/data-handler';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        auth_token: state.user.auth_token,
        username: state.user.username
    }
};


function CommentCreatorComponent(props) {
    const [comment, setComment] = useState("")
    const handleSubmitComment = (event) => {
        console.log(props.board, comment, props.username);
        event.preventDefault();
        let options = {
            method: "POST", 
            headers: {
                'Authorization': `Token ${props.auth_token}`,
            },
            body: {
                board: props.board,
                content: comment,
                author: props.username
            }
        };

        APIHandler('/api/board/comment/create', options)
        .then(comment => {
            props.setComments([ comment, ...props.comments ]);
            props.setCommenting(false);
        });
    };

    const useStyles = makeStyles((theme) => ({
        root: {
            padding: 20,
            maxWidth: 989,
            margin: 'auto',
            '@media(min-width: 989px)': {
                minWidth: 700
            }
        },
        containerRoot: {
            padding: 10
        }
    }));
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Container maxWidth={"md"} className={classes.containerRoot}>
                <Editor value={comment} onEditorChange={setComment} />
                <Container style={{marginTop: 10}}>
                    <Button variant={"contained"} color={"secondary"} onClick={handleSubmitComment}>Comment</Button>
                </Container>
            </Container>
        </Paper>
    )
}

const CommentCreator = connect(mapStateToProps)(CommentCreatorComponent);
export default CommentCreator;