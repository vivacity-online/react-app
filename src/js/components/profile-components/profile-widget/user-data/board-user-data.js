import React from 'react';
import { Container, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        board_count: state.userProfile.board_count,
        comment_count: state.userProfile.comment_count,
        joined_on: state.userProfile.joined_on,
        online: state.userProfile.online
    }
};

const useStyles = makeStyles({
    tabPaper: {
        padding: 10,
        marginTop: 10,
    },
    dataBlock: {
        display: 'flex',
        flexFlow: 'column',
        maxWidth: 400,
        margin: 'auto'
    }
});

function BoardUserDataComponent(props) {
    const classes = useStyles();

    return (
      <>
          <Container className={classes.tabPaper}>
            Board Data
              <hr />
                <div className={classes.dataBlock}>
                  <p>Total Boards:</p>
                  <Button disabled>{props.board_count || "0"}</Button>
                </div>
                <div className={classes.dataBlock}>
                  <p>Total Comments:</p>
                  <Button disabled>{props.comment_count || "0"}</Button>
                </div>
          </Container>
          <Container className={classes.tabPaper}>
            Activity
              <hr />
            <div className={classes.dataBlock}>
              <p>Member since:</p>
              <Button disabled>{props.joined_on || "Today"}</Button>
            </div>
          </Container>
        </>
    )
}

const BoardData = connect(mapStateToProps)(BoardUserDataComponent);
export default BoardData;