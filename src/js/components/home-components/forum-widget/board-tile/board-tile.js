import React, { useEffect, useState } from 'react';
import { 
    Paper, 
    makeStyles, 
    Toolbar, 
    Button,
    Grid,
    IconButton,
    Slide,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { Link } from 'react-router-dom';
import UserBadge from '../../../avatar/forum-avatar-badge/forum-avatar-badge';
import Like from '../../../items/likes/like';
import Bookmark from '../../../items/bookmark/bookmark';
import Share from '@material-ui/icons/Share';
import Comment from '@material-ui/icons/Comment';
import Dots from '@material-ui/icons/MoreVert';
import Close from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import { APIHandler } from '../../../../utils/data-handler/data-handler';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        isAuthenticated: state.user.isAuthenticated,
        username: state.user.username,
    }
};

function BoardTileComponent(props) {
    const [board, setBoard] = useState({author: {}});
    const [boardLoaded, setBoardLoaded] = useState(false);
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState();
    const [componentLoading, setComponentLoading] = useState(true);
    const [bookmarked, setBookmarked] = useState(false);
    const [removed, setRemoved] = useState(false);

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexFlow: 'column',
            margin: 5,
        },
        gridRoot: {
            flexWrap: 'nowrap',
            flexFlow: (props.side === 'left') ? 'initial' : 'row-reverse',
        },
        username: {
            '@media(max-width: 989px)': {
                fontSize: '0.75rem'
            }
        },
        contentContainer: {
            display: 'flex',
            flexFlow: 'row nowrap',
            alignItems: 'flex-start',
            textAlign: props.side,
        },
        smallFont: {
            fontSize: '0.75rem',
        },
        toolbar: {
            display: 'flex',
            flexFlow: (props.side === 'left') ? 'initial' : 'row-reverse',
            justifyContent: 'space-between',

        },
        toolbarButton: {
            marginRight: 5,
        },
        controlButtons: {
            display: 'flex',
            flexFlow: (props.side === 'right') ? 'initial' : 'row-reverse',
            maxWidth: '200px',
        },
        controlButtonsContainer: {
            display: 'flex',
            flexFlow: (props.side === 'right') ? 'initial' : 'row-reverse',
            marginBottom: -50,
        },
        buttonGroup: {
            '@media(max-width: 475px)': {
                display: 'flex',
                flexFlow: 'column',
                '& button': {
                    marginBottom: 5
                }
            }
        },
        boardLink: {
            textDecoration: 'none',
            color: 'initial'
        }
    }));
    const classes = useStyles();

    const handleBookmark = (event) => {
        if(!bookmarked){
            props.setBookmarkedBoards([...props.bookmarkedBoards, board])
        }
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

    useEffect(() => { // Sets board from the props
        if (props.board){
            setBoard(props.board);
            setComponentLoading(false);
        }
    }, [props.board, ]);
    useEffect(() => { // Set liked if API says that board is liked by user
        if(board){
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
    }, [board, props.liked_by, props.username,]);

    useEffect(() => { // Sets like count from the API
        if(boardLoaded) {
            setLikeCount(props.board.likes)
            setBoardLoaded(true);
        }
    }, [props.board.likes, boardLoaded])
    
    useEffect(() => {
        if(props.bookmarked) {
            setBookmarked(true);
        }
    }, [props.bookmarked, ]);

    return (
        <Slide
            in={!removed}
            direction={props.side}
            >
            <Paper className={classes.root}>
                {!componentLoading ?
                <>
                <div className={classes.controlButtonsContainer}>
                    <div className={classes.controlButtons}>
                        <IconButton onClick={
                            () => {
                                setRemoved(true);
                                setTimeout(() => {
                                    props.removeBoard(board.id)
                                }, 50)
                        }}>
                            <Close />
                        </IconButton>
                        <IconButton>
                            <Dots />
                        </IconButton>
                    </div>
                </div>
                <Grid container spacing={2} className={classes.gridRoot}>
                    <Grid item xl={2}>
                        <UserBadge 
                            username={board.author.username}
                            online={board.author.online}
                            thumbnail={board.author.thumbnail}
                            />
                    </Grid>
                        <Grid item xl={8}>
                                <div className={classes.contentContainer}>
                                    <div>
                                        <p className={classes.smallFont}>{board.published_on_date}</p>
                                        <Link to={`/forums/${board.slug}`} className={classes.boardLink}>
                                            <p><b>{board.title}</b></p>
                                            <p className={classes.smallFont}>
                                                {board.desc && 
                                                    (board.desc.length > 175) ? 
                                                        board.desc.substr(0, 175) + '...' :
                                                        board.desc
                                                        }
                                            </p>
                                        </Link>
                                    </div>
                                </div>
                        </Grid>
                </Grid>
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
                                    <Button className={classes.toolbarButton} variant={"contained"} color={"primary"}><Comment />Comment</Button>
                                    <Button className={classes.toolbarButton} variant={"contained"} color={"primary"}><Share /> Share</Button>
                                </div>
                            </Toolbar> 
                            </> :
                            <Skeleton variant="rect" width={'100%'} height={200} />
            }
            </Paper>  
        </Slide>
    )
}

BoardTileComponent.propTypes ={
    board: PropTypes.object,
    isAuthenticated: PropTypes.bool.isRequired,
    side: PropTypes.string.isRequired,
    removeBoard: PropTypes.func
};

const BoardTile = connect(mapStateToProps)(BoardTileComponent);
export default BoardTile;