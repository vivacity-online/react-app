import React from 'react';
import { IconButton } from '@material-ui/core';
import BookmarkBorder from '@material-ui/icons/BookmarkBorder';
import Bookmark from '@material-ui/icons/Bookmark';

function BookmarkCompnent(props) {
    function handleClick(event) {
        props.setBookmarked(!props.bookmarked);
        props.setBookmarkedBoards()
    }

    return (
        <IconButton
            edge="start" 
            color="primary" 
            aria-label="bookmark board"
            onClick={handleClick}
        >
            {!props.bookmarked ?
                <BookmarkBorder /> :
                <>
                    <Bookmark />
                </>
                }
        </IconButton>
    )
}

export default BookmarkCompnent;