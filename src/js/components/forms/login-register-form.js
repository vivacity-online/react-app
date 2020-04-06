import React from 'react';
import Login from '../forms/login/login-form';
import Register from '../forms/register/register-form';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';
import joinNow from '../../../img/joinnow3.png';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
        justifyContent: 'center',
        '@media(max-width:989px)': {
            flexFlow: 'column nowrap',
            textAlign: 'center',
        },
    },
    registerGrid: {
        '&:hover': {
            cursor: 'pointer',
        },
        textAlign: 'center',
        '& #join-now': {
            width: '150px',
            height: 'auto',
        },
        '& h5, p': {
            margin: 0,
            padding: 0,
        }
    },
}));

function JoinButton() {
    return (
        <Container>
                <img src={joinNow} alt={"join now"} id="join-now" />
                <h5>Not a member yet?</h5>
                <p>Click here to sign up!</p>
        </Container>
    )
}

function LoginRegisterForm(props) {
    const classes = useStyles();
    
    function handleClick(event) {
        props.setRegistering(!props.registering);
    }

    return (
            <Grid 
                container
                spacing={1}
                className={classes.root} 
                >
                    {!props.registering &&
                        <Grid item xs={12} lg={6}>
                            <Login cancelAction={props.cancelAction}/>
                        </Grid>
                        }
                    {props.registering &&
                        <Grid item xs={12} lg={10}>
                            <Register cancelAction={props.cancelAction} backToLogin={handleClick}/> 
                        </Grid>
                        }
                   
                   {!props.registering &&
                        <Grid item xs={12} lg={6}>
                            <div className={classes.registerGrid} onClick={handleClick}>
                                <JoinButton />
                            </div>
                        </Grid>
                    }
            </Grid>
    )
}

export default LoginRegisterForm;