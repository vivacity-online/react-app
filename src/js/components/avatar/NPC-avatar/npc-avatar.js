import React from 'react';
import NPC from '../../NPC/NPC';
import { Container } from '@material-ui/core';

function NPCAvatar(props) {
    return (
        <Container>
            <NPC src={props.src} />
        </Container>
    )
}

export default NPCAvatar;