import React, { useEffect } from 'react';
import ForumWidget from '../components/home-components/forum-widget/forum-widget';
import {
    Container,
    makeStyles,
} from '@material-ui/core';
import { setNavigationTab } from '../redux/actions/index';
import { connect } from 'react-redux';

const useStyles = makeStyles({
    root: {
        marginTop: 25,
        maxHeight: '100vh',
        overflow: 'auto'
    }
});

const mapStateToProps = state => {
    return {
        navigationTab: state.navigationTab,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setNavigationTab: tab => dispatch(setNavigationTab(tab)),
    }
}

function ForumComponent(props) {
    const classes = useStyles();
    useEffect(() => {
        if(props.navigationTab !== 2) {
            props.setNavigationTab(2);
        }
    });

    return (
        <Container maxWidth={"lg"} className={classes.root}>
            <ForumWidget />
        </Container>
    )
}

const Forum = connect(mapStateToProps, mapDispatchToProps)(ForumComponent);
export default Forum;