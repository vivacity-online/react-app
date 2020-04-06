import React, { useEffect, useState } from 'react';
import MonthlyWidget from '../components/home-components/monthly-widget/monthly-widget';
import ForumWidget from '../components/home-components/forum-widget/forum-widget.js';
import { Container, Grid, AppBar, Fab, CircularProgress, Zoom } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { setNavigationTab } from '../redux/actions/index';
import { OpenWith, Close } from '@material-ui/icons';
import { setBodyScroll } from '../redux/actions/index';

const mapStateToProps = state => {
    return {
        navigationTab: state.navigationTab
    }
};
const mapDispatchToProps = dispatch => {
    return {
        setNavigationTab: tab => dispatch(setNavigationTab(tab)),
        setBodyScroll: scroll => dispatch(setBodyScroll(scroll)),
    }
};

function Home(props) {
    const [componentLoading, setComponentLoading] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);

    const useStyles = makeStyles((theme) => ({
        root: {
            marginTop: 25,
        },
        gridItem: {
            height: 550,
            overflow: 'auto',
            '@media(max-width: 959px)': {
                overflow: fullscreen ? 'auto': 'hidden',
            },
            '&.MuiGrid-item': {
                paddingTop: 0,
                marginTop: 10
            },
        },
        fabButton: {
          position: 'absolute',
          zIndex: 2,
          top: -25,
          left: 0,
          right: 0,
          margin: '0 auto',
        },
        appBar: {
          top: 'auto',
          bottom: 0,
          height: 50,
          background: theme.palette.secondary.main,
          '@media(min-width: 959px)': {
              display: 'none'
          }
        },
        fullScreen: {
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100vh',
            width: '100vw',
            overflowY: 'auto',
            zIndex: 1200,
        }
    }));
    const classes = useStyles();

    useEffect(() => {
        document.title = "Vivacity";
        if(props.navigationTab !== 0) {
            props.setNavigationTab(0);
        }
    });

    const handleShowMore = (event) => {
        setComponentLoading(true);
        document.body.style.overflowY = !fullscreen ? 'hidden' : 'initial';
        console.log(`Setting overflow: ${document.body.overflow}`);
        setFullscreen(!fullscreen);
        setTimeout(() => {
            setComponentLoading(false)
        }, 200)
    };

    return (
        <Container maxWidth={"lg"}>
            <Grid container spacing={3} className={classes.root}>
                    <Grid item xs={12} md={8} lg={8} style={{padding: 0}} className={!fullscreen ? classes.gridItem : classes.fullScreen}>
                            <Zoom in={fullscreen}>
                                <ForumWidget />
                            </Zoom>
                            <AppBar position="sticky" color="secondary" className={classes.appBar}>
                                <Fab color="secondary" aria-label="more" className={classes.fabButton} onClick={handleShowMore}>
                                    {!componentLoading ?
                                        !fullscreen ? 
                                            <OpenWith /> :
                                            <Close /> 
                                            :
                                        <CircularProgress />
                                    }
                                </Fab>
                            </AppBar>
                    </Grid> 
                    <Grid item xs={12} md={4} lg={4} className={classes.gridItem}>
                        <MonthlyWidget />
                    </Grid> 
            </Grid>
        </Container>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);