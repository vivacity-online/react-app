import React, { useState } from 'react';
import LoginRegister from '../forms/login-register-form';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { connect } from "react-redux";
import { setLoggingIn } from '../../redux/actions/index';

const mapStateToProps = state => {
  return { 
      loggingIn: state.loggingIn, 
    };
};

const mapDispatchToProps = dispatch => {
  return {
    setLoggingIn: action => dispatch(setLoggingIn(action))
  }
};

function LoginModalComponent(props) {
    const [registering, setRegistering] = useState(false);
    const useStyles = makeStyles(theme => ({
      modal: {
        display: 'flex',
        alignItems: !registering && 'center',
        justifyContent: 'center',
        margin: '10px',
        overflowY: 'auto',
      },
      paper: {
        background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1000 1000'%3E%3Cdefs%3E%3CradialGradient id='a' cx='500' cy='500' r='69.9%25' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23e67a63'/%3E%3Cstop offset='1' stop-color='%239e63c3'/%3E%3C/radialGradient%3E%3CradialGradient id='b' cx='500' cy='500' r='6.3%25' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%239e63c3' stop-opacity='1'/%3E%3Cstop offset='1' stop-color='%239e63c3' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='1000' height='1000'/%3E%3Cg fill='none' stroke='%23e67a63' stroke-width='7.1' stroke-miterlimit='10' stroke-opacity='0.4'%3E%3Ccircle cx='500' cy='500' r='725'/%3E%3Ccircle cx='500' cy='500' r='700'/%3E%3Ccircle cx='500' cy='500' r='675'/%3E%3Ccircle cx='500' cy='500' r='650'/%3E%3Ccircle cx='500' cy='500' r='625'/%3E%3Ccircle cx='500' cy='500' r='600'/%3E%3Ccircle cx='500' cy='500' r='575'/%3E%3Ccircle cx='500' cy='500' r='550'/%3E%3Ccircle cx='500' cy='500' r='525'/%3E%3Ccircle cx='500' cy='500' r='500'/%3E%3Ccircle cx='500' cy='500' r='475'/%3E%3Ccircle cx='500' cy='500' r='450'/%3E%3Ccircle cx='500' cy='500' r='425'/%3E%3Ccircle cx='500' cy='500' r='400'/%3E%3Ccircle cx='500' cy='500' r='375'/%3E%3Ccircle cx='500' cy='500' r='350'/%3E%3Ccircle cx='500' cy='500' r='325'/%3E%3Ccircle cx='500' cy='500' r='300'/%3E%3Ccircle cx='500' cy='500' r='275'/%3E%3Ccircle cx='500' cy='500' r='250'/%3E%3Ccircle cx='500' cy='500' r='225'/%3E%3Ccircle cx='500' cy='500' r='200'/%3E%3Ccircle cx='500' cy='500' r='175'/%3E%3Ccircle cx='500' cy='500' r='150'/%3E%3Ccircle cx='500' cy='500' r='125'/%3E%3Ccircle cx='500' cy='500' r='100'/%3E%3Ccircle cx='500' cy='500' r='75'/%3E%3Ccircle cx='500' cy='500' r='50'/%3E%3Ccircle cx='500' cy='500' r='25'/%3E%3C/g%3E%3Crect fill-opacity='0.4' fill='url(%23b)' width='1000' height='1000'/%3E %3C/svg%3E")`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',  
        boxShadow: theme.shadows[3],
        padding: theme.spacing(2, 4, 3),
        overflowY: 'auto',
        '@media(max-width: 550px)': {
          height: '100%',
        }
      },
    }));
    const classes = useStyles();

    function closeModal(event) {
      props.setLoggingIn(!props.loggingIn);
      setTimeout(() => {
        setRegistering(false)
      }, 1000);
    };

    return (
        <Modal
            className={classes.modal}
            open={props.loggingIn}
            onClose={closeModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={props.loggingIn}>
              <div className={classes.paper}>
                <LoginRegister 
                    registering={registering}
                    setRegistering={setRegistering}
                    cancelAction={closeModal} 
                    />
              </div>
            </Fade>
          </Modal>
    )
}

const LoginModal = connect(mapStateToProps, mapDispatchToProps)(LoginModalComponent);
export default LoginModal;