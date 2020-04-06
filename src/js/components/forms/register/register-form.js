import React, { useState } from 'react';
import Form from '../form';
import TextField from '@material-ui/core/TextField';
import ReCAPTCHA from "react-google-recaptcha";
import logo from '../../../../img/logo-512x264.png';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, CircularProgress } from '@material-ui/core';
import { register, verifyUsername, verifyPassword, verifyEmail } from './functions/register_user';
import { useHistory } from 'react-router-dom';
import URL from '../../../conf';
import { addUser, setLoggingIn } from '../../../redux/actions/index';
import { connect } from 'react-redux';
import { useCookies } from 'react-cookie';

const mapDispatchToProps = dispatch => {
    return {
        addUser: user => dispatch(addUser(user)),
        setLogginIn: action => dispatch(setLoggingIn(action))
    }
}

const useStyles = makeStyles(theme => ({
    formContainer : {
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'center',
        backgroundColor: `rgba(${theme.palette.white.rgb}, 0.7)`,
        textAlign: 'center',
    },
    formField: {
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'center',
        '& .MuiTextField-root': {
            padding: '5px',
        },
    },
    button: {
        margin: '2.5px',
    },
    backToLogin: {
        '& span': {
            color: theme.palette.primary.main,
        } ,
        '&:hover': {
            cursor: 'pointer',
        }
    },
    registerHeader: {
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'center',
        margin: '10px',
    },
    logo: {
        width: '75%',
    }
}));

function RegisterFormComponent(props) {
    const [loading, setLoading] = useState(false);
    const [captcha, setCaptcha] = useState(false);
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerPasswordCheck, setRegisterPasswordCheck] = useState("");
    const [acceptedEmail, setAcceptedEmail] = useState("");
    const [acceptedUsername, setAcceptedUsername] = useState("");
    const [acceptedPassword, setAcceptedPassword] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const [dateOfBirth, setDateOfBirth] = useState("");
    const history = useHistory();
    const [registerErrors, setRegisterErrors] = useState({
        active: false,
        field: "",
        message: "",
    });
    // eslint-disable-next-line
    const [cookies, setCookies] = useCookies(['user']);

    function clearErrors() {
        setRegisterErrors({
            active: false,
            field: "",
            message: ""
        })
    };
    const handleRegisterEmailChange = (event) => {
        clearErrors();
        setRegisterEmail(event.target.value);
    };
    const handleEmailExit = (event) => {
        // When the email field is left the username field will 
        // prefill with the first slice of the email - jman@email.com -> jman
        let val = event.target.value;
        verifyEmail(val, `${URL}/api/user/validate`)
        .then((data) => {
            if(data.code === 200){
                setAcceptedEmail(val); // Email is valid and not in use already
                if(!registerUsername){
                    let tempUsername = registerEmail.split('@')[0]; //Splits email to create username
                    setRegisterUsername(tempUsername);
                    verifyUsername(tempUsername, `${URL}/api/user/validate`) // Checks username usag
                    .then(nameData => {
                        if(nameData.code !== 200){
                            setRegisterErrors({
                                active: true,
                                message: nameData.message
                            })
                        }else{
                            setAcceptedUsername(nameData.message)
                        }
                    })
                }
            }else if(data.code === 226){
                setRegisterErrors({
                    active: true,
                    field: "email",
                    message: "Email in use"
                })
            }else{
                setRegisterErrors({
                    active: true,
                    field: "email",
                    message: "Invalid email"
                })
            }
        });
        
    };

    const handleRegisterUsernameChange = (event) => {
        let val = event.target.value;
        clearErrors();
        setRegisterUsername(val);
        if(val.length >= 4){
            // Verify that username is available
            verifyUsername(event.target.value, `${URL}/api/user/validate`)
            .then(data => {
                if(data.code !== 200){
                    setRegisterErrors({
                        active: true,
                        field: "username",
                        message: data.message
                    })
                }else{
                    setAcceptedUsername(val);
                }
            });
        }else{
            setRegisterErrors({
                active: true,
                field: "username",
                message: "Must be at least 5 characters"
            });
        }
    };
    const handleUsernameExit = (event) => {
        let val = event.target.value;
        if(val.length >= 4){
            // Verify that username is available
            verifyUsername(event.target.value, `${URL}/api/user/validate`)
            .then(data => {
                if(data.code !== 200){
                    setRegisterErrors({
                        active: true,
                        field: "username",
                        message: data.message
                    })
                }else{
                    setAcceptedUsername(val);
                }
            });
        }else{
            setRegisterErrors({
                active: true,
                field: "username",
                message: "Must be at least 5 characters"
            });
        }

    }
    const handleRegisterPasswordChange = (event) => {
        let val = event.target.value;
        clearErrors();
        setRegisterPassword(val)
    };

    const handlePasswordExit = (event) => {
        let val = event.target.value;
        let verifiedPassword = verifyPassword(val);
        if(verifiedPassword.code === 200){
            setAcceptedPassword(val)
        }else{
            setRegisterErrors({
                active: true,
                field: "password",
                message: verifiedPassword.message
            });
            setAcceptedPassword("")
        }
    };

    const handleRegisterpasswordCheckChange = (event) => {
        let val = event.target.value;
        clearErrors();
        setRegisterPasswordCheck(event.target.value)
        if(val !== acceptedPassword){
            setRegisterErrors({
                active: true,
                field: "passwordCheck",
                message: "Passwords don't match"
            })
        }else{
            setPasswordsMatch(true);
        }
    };
    const handleRegisterDOBChange = (event) => {
        clearErrors();
        setDateOfBirth(event.target.value)
    };
    const handleCaptchaChange = (event) => {
        setCaptcha(!captcha);
    };
    function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        if(acceptedUsername && acceptedPassword && dateOfBirth && captcha) {
            let user = {
                username: acceptedUsername,
                password: acceptedPassword,
                email: acceptedEmail,
                date_of_birth: dateOfBirth
            };
            let url = `${URL}/api/user/create`;
            register(user, url)
            .then((data) => {
                props.setLogginIn(false);
                props.addUser(data);
                setCookies('user', data, 
                    {
                        path: '/',
                        maxAge: 6 * 60 * 60
                    }
                );
                history.push('/profile');
            })
        }
    };

    const ErrorMessage = (props) => {
        return (
            <div>
                <p style={{color: 'red'}}>{props.message}</p>
            </div>
        )
    }

    const classes = useStyles();
    return (
        <Form onSubmitAction={handleSubmit}>
            <Container
                component={"div"}
                maxWidth={"md"}
                className={classes.formContainer}
                >
                <div className={classes.registerHeader}>
                    <img src={logo} alt={"Vivacity"} className={classes.logo} />
                    <h4>Sign Up Now!</h4>
                    <p>It only takes a minute to register and will grant you access to things like our Avatar Builder and Forums</p>
                </div>
                <div className={classes.formField}>
                    <TextField 
                        id="register-email" 
                        label="Email *" 
                        variant="filled" 
                        value={registerEmail} 
                        onChange={handleRegisterEmailChange}
                        onBlur={handleEmailExit}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        />
                        {registerErrors.field === "email" &&
                            <ErrorMessage message={registerErrors.message} />
                            }
                    <TextField 
                        id="register-username" 
                        label="Username *" 
                        variant="filled"
                        value={registerUsername} 
                        onChange={handleRegisterUsernameChange} 
                        onBlur={handleUsernameExit}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        />
                        {registerErrors.field === "username" &&
                            <ErrorMessage message={registerErrors.message} />
                            }
                    <TextField 
                        id="register-password" 
                        label="Password" 
                        variant="filled"
                        value={registerPassword} 
                        onChange={handleRegisterPasswordChange} 
                        onBlur={handlePasswordExit}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        disabled={!registerUsername}
                        type={"password"}
                        helperText={"(1)number and (1)spec. char."}
                        />
                        {registerErrors.field === "password" &&
                            <ErrorMessage message={registerErrors.message} />
                            }
                    <TextField 
                        id="password_check" 
                        label="Password again" 
                        variant="filled"
                        value={registerPasswordCheck} 
                        onChange={handleRegisterpasswordCheckChange} 
                        InputLabelProps={{
                            shrink: true,
                        }}
                        type={"password"}
                        disabled={!registerUsername}
                        helperText={passwordsMatch ? "Match!" : null}
                        />
                        {registerErrors.field === "passwordCheck" &&
                            <ErrorMessage message={registerErrors.message} />
                            }

                    <TextField 
                            id="register-date_of_birth" 
                            label="Birthday *" 
                            variant="filled"
                            type={"date"}
                            value={dateOfBirth} 
                            onChange={handleRegisterDOBChange} 
                            InputLabelProps={{
                                shrink: true,
                            }}
                    />  
                    {registerErrors.field === "dob" &&
                        <ErrorMessage message={registerErrors.message} />
                        }
                    <ReCAPTCHA
                        sitekey="6Ld6e94UAAAAAKefU9ghUJ1Ytazv-5khuuk9DCRS"
                        onChange={handleCaptchaChange}
                    />
                    {registerErrors.field === "captcha" &&
                        <ErrorMessage message={registerErrors.message} />
                        }

                    <div>
                        <Button 
                            disabled={!captcha} 
                            variant={"contained"} 
                            color={"secondary"} 
                            className={classes.button} 
                            type={"submit"}>
                                {!loading ? "Register" : <CircularProgress /> }
                        </Button>
                        {!loading &&
                            <Button variant={"contained"} className={classes.button} onClick={props.cancelAction}>Cancel</Button>
                        }
                    </div>
                    <div>
                        <p onClick={props.backToLogin} className={classes.backToLogin}>Already a member?<br/><span>Login</span></p>
                    </div>
                </div>
            </Container>
        </Form>
    )
}

const RegisterForm = connect(null, mapDispatchToProps)(RegisterFormComponent);
export default RegisterForm;