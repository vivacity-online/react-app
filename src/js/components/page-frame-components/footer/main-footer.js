import React from 'react';
import { Container } from '@material-ui/core';
import FooterMenu from '../../menus/footer-menu/footer-menu';

const year = new Date().getFullYear();

function MainFooter(props) {
    return (
        <Container className={"footer main"} maxWidth={"xl"}>
            <FooterMenu />
            <p>&copy; Vivacity.online {year}</p>
        </Container>
    )
}

export default MainFooter;