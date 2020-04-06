import React from 'react';
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
      loggedUserAvatar: state.user.avatar.url,
  }
};


const useStyles = makeStyles({
    avatarImage: {
        maxHeight: '300px',
        '@media(max-width:989px)': {
            maxHeight: '200px',
        }
    }
})
function AvatarComponent(props) {
    const classes = useStyles();
    return (
        <Container>
            <img src={ props.avatar || props.loggedUserAvatar } alt={"User Avatar"} className={classes.avatarImage} />
        </Container>
    )
}

const Avatar = connect(mapStateToProps)(AvatarComponent);
export default Avatar;