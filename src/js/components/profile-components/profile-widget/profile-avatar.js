import React from 'react';
import Avatar from '../../avatar/avatar';
import { Container, Button, Paper } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';

function ProfileAvatarComponent(props) {
    return (
        <Container>
            <Paper>
                <Avatar />
                <Button>Edit Avatar</Button>
            </Paper>
        </Container>
    )
}

export default ProfileAvatarComponent;