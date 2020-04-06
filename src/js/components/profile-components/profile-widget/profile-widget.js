import React, { useState } from 'react';
import UserData from './user-data/user-data';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        marginTop: 10,
        '@media(max-width: 989px)': {
            flexFlow: 'column nowrap',

        }
    },
    smallContainer: {
        alignItems: 'center',
        '@media(max-width:989px)': {
            flexFlow: 'column nowrap',
            textAlign: 'center'
        }
    }
    
}));

function ProfileHeader(props) {
    const classes = useStyles();
    const [viewingFriend, setViewingFriend] = useState(false);

    return (
        <Container className={classes.root}>
                    <UserData viewingFriend={viewingFriend} setViewingFriend={setViewingFriend} tab={props.tab}/>
        </Container>
    )
}

export default ProfileHeader;