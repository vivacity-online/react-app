import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    form: {
      display: 'flex',
      flexFlow: 'row nowrap',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 0,
      '@media(max-width:989px)': {
          flexFlow: 'column nowrap',
      },
    }
  }));
  
function Form(props) {
    const classes = useStyles();
    return (
        <Container 
            component={"form"}
            maxWidth={'md'}
            className={classes.form}
            onSubmit={props.onSubmitAction}
        >
            {props.children}
        </Container>
    )
}

export default Form;