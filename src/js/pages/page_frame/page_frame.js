import React from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../../components/page-frame-components/header/main-header';
import Footer from '../../components/page-frame-components/footer/main-footer';

const useStyles = makeStyles({
    root: {
        minHeight: '100%',
        '@media(max-width: 989px)': {
            padding: 0,
        }
    }
})

function PageFrame(props) {
    const classes = useStyles();

    return (
        <>
            <Header />
            <Container maxWidth={"xl"} className={classes.root}>
                <div className={"content"}>
                    {props.children}
                </div>
            </Container>
            <Footer />
        </>
    )
}

export default PageFrame;