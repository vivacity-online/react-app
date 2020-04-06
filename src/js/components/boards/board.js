import React, { useEffect, useState } from 'react'; 
import { useParams } from 'react-router-dom';
import {
    Paper, Container, Grid, makeStyles, Toolbar, Button, Modal, Fade
} from '@material-ui/core';
import { Share, Comment } from '@material-ui/icons';
import Like from '../items/likes/like';
import Bookmark from '../items/bookmark/bookmark';
import ForumBadge from '../avatar/forum-avatar-badge/forum-avatar-badge';
import BoardComment from './comments/comment';
import Backdrop from '@material-ui/core/Backdrop';
import CommentCreator from './comments/comment-creator';
import { setNavigationTab } from '../../redux/actions';
import { connect } from 'react-redux';
import SanitizeHTML from '../boards/sanitizer/sanitizer';
import {APIHandler} from '../../utils/data-handler/data-handler';

const mapStateToProps = state => {
    return {
        username: state.user.username,
        navigationTab: state.navigationTab,
        isAuthenticated: state.user.isAuthenticated,
        auth_token: state.user.auth_token,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        setNavigationTab: tab => dispatch(setNavigationTab(tab))
    }
};

function BoardComponent(props) {
    const { slug } = useParams();
    const [board, setBoard] = useState({author: ""});
    const [boardLoaded, setBoardLoaded] = useState(false);
    const [comments, setComments] = useState([]);
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState();
    const [bookmarked, setBookmarked] = useState(false);
    const [commenting, setCommenting] = useState(false);
    const useStyles = makeStyles((theme) => ({
        mainBoard: {
            marginTop: 20,
            marginBottom: 20
        },
        mainBoardContent: {
            paddingRight: '5rem', 
            '@media(max-width: 961px)': {
                paddingRight: 16
            }
        },
        toolbar: {
            display: 'flex',
            justifyContent: 'space-between',

        },
        toolbarButton: {
            marginRight: 5,
        },
        modal: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '10px',
          overflowY: 'auto',
        },
    }));
    const classes = useStyles();

    const handleBookmark = (event) => {
        props.setBookmarkedBoards([...props.bookmarkedBoards, board])
    };
    const handleCommentClick = (event) => {
        setCommenting(!commenting);
    };
    const handleLikeClick = (event) => {
        let url = !liked ? 
                    `/api/board/like/create/${board.pk}/${props.username}` :
                        `/api/board/like/delete/${board.pk}/${props.username}`;
        let options = {
            method: "PUT",
            headers: {
                'Authorization': `Token ${props.auth_token}`
            }
        };
        setTimeout(() => {
            APIHandler(url, options);
        }, 750);
    };

    useEffect(() => {
        if(props.navigationTab !== 2){
            props.setNavigationTab(2);
        }
    });

    useEffect(() => {
        if(!board.author){
            APIHandler(`/api/board/view/${slug}`)
            .then(board => {
                setBoard(board.board);
                setComments(board.comments);
            })
            .catch(error => console.error(error));
        }
    }, [board.author, slug]); 

    useEffect(() => { // Sets like count from the API
        if(!boardLoaded) {
            setLikeCount(board.likes);
            setBoardLoaded(true);
        }
    }, [boardLoaded, board.likes])

    useEffect(() => { // Set liked if API says that board is liked by user
        if(board.liked_by){
            let likedBy = board.liked_by
            if(Array.isArray(likedBy)) {
                likedBy.map(function(username) {
                    if(username === props.username) {
                        setLiked(true);
                    }
                    return null
                })
            }
        }
    }, [board.liked_by, props.username,]);

    return (
        <Container maxWidth={"lg"}>
            <Paper className={classes.mainBoard}>
                <Grid container spacing={2}>
                    <Grid item md={2} lg={2}>
                        <p>{board.published_on_date}</p>
                        <ForumBadge
                            username={board.author.username}
                            online={board.author.online}
                            thumbnail={board.author.thumbnail}
                        />
                    </Grid>
                    <Grid item md={10} lg={10}>
                        <h1>{board.title}</h1>
                            <Toolbar className={classes.toolbar}>
                                <div>
                                    <div onClick={handleLikeClick}>
                                        <Like 
                                            liked={liked}
                                            setLiked={setLiked}
                                            likeCount={likeCount} 
                                            setLikeCount={setLikeCount}
                                        />
                                    </div>
                                    <Bookmark
                                        bookmarked={bookmarked}
                                        setBookmarked={setBookmarked}
                                        setBookmarkedBoards={handleBookmark}
                                        />
                                </div>
                                <div className={classes.buttonGroup}>
                                    {props.isAuthenticated &&
                                    <Button className={classes.toolbarButton} onClick={handleCommentClick} variant={"contained"} color={"primary"}><Comment />Comment</Button>
                                    }
                                    <Button className={classes.toolbarButton} variant={"contained"} color={"primary"}><Share /> Share</Button>
                                </div>
                            </Toolbar> 
                        <hr />
                        <Container className={classes.mainBoardContent}>
                            <SanitizeHTML html={board.content} />
                        </Container>
                    </Grid>
                </Grid>
            </Paper>
            <Modal
                open={commenting}
                onClose={() => setCommenting(!commenting)}
                className={classes.modal}
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
                keepMounted={true}
            >
                <Fade in={props.loggingIn}>
                        <CommentCreator 
                            board={board.pk}
                            comments={comments}
                            setComments={setComments}
                            setCommenting={setCommenting}
                        />
                </Fade>
            </Modal>

            <Container>
            {comments.length > 0 &&
                comments.map((comment, index) => (
                    <div key={comment.id}>
                        <BoardComment
                            comment={comment}
                            side={index % 2 === 0 ? "right" : "left"}
                        />
                    </div>
                    ))
            }
            </Container>
        </Container>
    )
}

const Board = connect(mapStateToProps, mapDispatchToProps)(BoardComponent);
export default Board;