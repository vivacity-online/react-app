import React, { useState } from 'react';
import Form from '../form';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import logo from '../../../../img/logo-512x264.png';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, CircularProgress } from '@material-ui/core';
import login from '../../../utils/login';
import { connect } from "react-redux";
import { addUser, setLoggingIn, setPopulation } from '../../../redux/actions/index';
import { useCookies } from 'react-cookie';

const useStyles = makeStyles(theme => ({
    formContainer : {
        display: 'flex',
        alignItems: 'center',
        flexFlow: 'row nowrap',
        backgroundColor: `rgba(${theme.palette.white.rgb}, 0.7)`,
        '@media(max-width: 550px)': {
            flexFlow: 'column nowrap',
            textAlign: 'center',
        },
    },
    loginHeader: {
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'center',
        margin: '10px',
    },
    logo: {
        width: '75%',
    },
    formField: {
        '& .MuiTextField-root': {
            padding: '5px',
        },
    },
    button: {
        margin: '2.5px',
    },
    errors: {
        color: 'red',
    }
}));

const mapStateToProps = state => {
    return {
        loggingIn: state.loggingIn,
        population: state.population,
    }
}

const mapDispatchToProps = dispatch => {
    return {
      addUser: user => dispatch(addUser(user)),
      setLoggingIn: action => dispatch(setLoggingIn(action)),
      setPopulation: population => dispatch(setPopulation(population))
    }
}

function LoginFormComponent(props) {
    const [componentLoading, setComponentLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(!props.loggingIn);
    const [formErrors, setFormErrors] = useState({
        active: false,
        message: ""
    });
    // eslint-disable-next-line
    const [userCookie, setUserCookie] = useCookies(['userCookie']);

    const classes = useStyles();
      
    function handleSubmit(event) {
        /**
         * Submits login.
         * 
         * Calls the login function imported from the ./functions directory,
         * the returned data is an async object 'user' which is passed to the 
         * Redux store via the 'addUser' action.
         */
        event.preventDefault();
        setComponentLoading(!componentLoading);
        if(username !== "" && password !== ""){
            let response = login(username, password);
            response.then(function(data) {
                if(typeof(data) == 'object'){
                    props.addUser(data);
                    setUserCookie('user', data, 
                        {
                            path: '/',
                            maxAge: rememberMe ? 7 * 24 * 60 * 60 : 6 * 60 * 60
                        }
                    );
                    props.setPopulation(props.population + 1);
                    props.setLoggingIn(false);
                }else if(data === "Unauthorized"){
                    setComponentLoading(false);
                    setFormErrors({
                        active: true,
                        message: "Wrong username or password"
                    });
                }else{
                    setComponentLoading(false);
                    setFormErrors({
                        active: true,
                        message: data
                    });
                }
            });
        }else{
            setComponentLoading(false);
            setFormErrors({
                active: true,
                message: "Missing username or password"
            });
        }
    }

    function handleUsernameChange(event) {
        /**
         * Sets the state of the username
         */
        setFormErrors({active: false, message: ""});
        setUsername(event.target.value);
    }

    function handlePasswordChange(event) {
        /**
         * Sets the state of the username
         */
        setFormErrors({active: false, message: ""});
        setPassword(event.target.value);
    }

    function closeModal(event) {
        /**
         * Sends action to the Redux store that loggingIn is
         * now false and closes the modal.
         */
        props.setLoggingIn(!props.loggingIn);
    }

    return (
        <Form onSubmitAction={handleSubmit}>
            <Container 
                component={"div"}
                maxWidth={"md"}
                className={classes.formContainer}
                >
                <div className={classes.loginHeader}>
                    <img src={logo} alt={"Vivacity"} className={classes.logo}/>
                    <h4>You must be a member of Vivacity to take advantage of all the great stuff inside!</h4>
                </div>
                <div className={classes.formField}>
                    <TextField 
                    error={formErrors.active}
                    id="username" 
                    label="Username" 
                    variant="filled" 
                    value={username}
                    onChange={handleUsernameChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    />
                    <TextField 
                    error={formErrors.active}
                    id="password" 
                    label="Password" 
                    variant="filled" 
                    type={"password"}
                    value={password}
                    onChange={handlePasswordChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    />

                    {formErrors.active && 
                    <h4 className={classes.errors}>{formErrors.message}</h4>
                    }

                    <div>
                        <Button variant={"contained"} color={"primary"} className={classes.button} type={"submit"}>
                            {!componentLoading ? "Login" : <CircularProgress color={"secondary"} /> }
                        </Button>
                        <Button variant={"contained"} className={classes.button} onClick={closeModal}>Cancel</Button>
                    </div>
                    
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={rememberMe}
                                onChange={(event) => setRememberMe(!rememberMe)}
                                value={rememberMe}
                                color="secondary"
                            />
                        }
                        label={!rememberMe ? "Remember me" : "Remembered"}
                        
                    />
                    <p style={{fontSize: '0.82rem'}}>Vivacity uses cookies to enhance your experience.
                    You may opt out in <span style={{color: 'primary'}}>USER SETTINGS</span> as a member.
                    View or policies <a href={"/"}>here</a></p>
                </div>
            </Container>
        </Form>
    )
}

const LoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginFormComponent);
export default LoginForm;