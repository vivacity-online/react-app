import React, { useEffect } from 'react';
import BoardEditor from '../components/boards/editor/board-editor';
import {
    Container,
    makeStyles,
} from '@material-ui/core';
import { setNavigationTab } from '../redux/actions/index';
import { connect } from 'react-redux';

const useStyles = makeStyles({
    root: {
        marginTop: 25,
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
        if(props.navigationTab !== 1) {
            props.setNavigationTab(1);
        }
    });

    return (
        <Container maxWidth={"lg"} className={classes.root}>
            <BoardEditor />
        </Container>
    )
}

const Forum = connect(mapStateToProps, mapDispatchToProps)(ForumComponent);
export default Forum;