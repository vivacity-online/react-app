import React from 'react';
import { IconButton, Badge } from '@material-ui/core';
import { Favorite, FavoriteBorder } from '@material-ui/icons';

export default function LikeComponent(props) {

    return (
        <IconButton 
          edge="start" 
          color="inherit" 
          aria-label="like avatar"
          onClick={(event) => {
            props.setLiked(!props.liked);
            if(props.setLikeCount){ 
              props.setLikeCount(!props.liked ? (props.likeCount > 1) ? props.likeCount + 1 : 1 : (props.likeCount > 1) ? props.likeCount - 1 : 0)
            }
        }}>
            <Badge badgeContent={props.likeCount} color="primary">
            {!props.liked ?
              <FavoriteBorder color={"secondary"} /> :
              <Favorite color={"secondary"} />
            }
            </Badge>
        </IconButton>
    )
}