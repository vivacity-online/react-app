import React, { useState } from 'react';
import Avatar from '../avatar';
import Muns from '../../items/currency/muns';
import Shinies from '../../items/currency/shinies';
import { Container, Button, ButtonGroup, Paper, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { removeUser, setNavigationTab } from '../../../redux/actions/index';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import logout from '../../../utils/logout';
import URL from '../../../conf';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    // background: `radial-gradient(${theme.palette.secondary.main}, rgba(256, 256, 256, 0))`,
    background: 'none',
    boxShadow: 'none',
  },
  sidebar: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center'
  },
  buttonGroup: {
    justifyContent: 'center',
    boxShadow: 'none',
  },
  investButton: {
    marginTop: 5,
  }
}));

const mapDispatchToProps = dispatch => {
  return {
    removeUser: action => dispatch(removeUser()),
    setNavigationTab: tab => dispatch(setNavigationTab(tab)),
  }
};

const mapStateToProps = state => {
  return {
    username: state.user.username,
    auth_token: state.user.auth_token,
  }
};
  
function UserNavButtons(props) {
  const classes = useStyles();
  // eslint-disable-next-line
  const [userCookie, setUserCookie] = useCookies(['user']);
  const [loggingOut, setLoggingOut] = useState(false);
  const history = useHistory();

  function handleLogoff(event){
    setLoggingOut(!loggingOut);
    logout(URL, props.auth_token)
    .then(code => {
      if(code === 200){
        setUserCookie('user', {}, '/');
        props.removeUser({});
        history.push('/');
        // window.location.reload();
        props.setNavigationTab(0);
      }
    })
    .catch(error => {
      setLoggingOut(false);
      console.log(error);
    });
  };

  return (
    <ButtonGroup
    orientation="vertical"
    color="primary"
    aria-label="vertical contained primary button group"
    variant="contained"
    className={classes.buttonGroup}
  >
    <Button>Avatar</Button>
    <Button>Boards</Button>
    <Button onClick={(event) => history.push('/profile')}>Profile</Button>
  <Button color={"secondary"} onClick={handleLogoff}>{!loggingOut ? "Logoff" : <CircularProgress />}</Button>
  </ButtonGroup>
  )
}

function AvatarBadgeComponent(props) {
  const date = new Date().toLocaleDateString();
  const classes = useStyles();

    return (
        <Paper className={classes.root}>
          <Container className={classes.sidebar} maxWidth={"xs"}>
            <p style={{color: '#232323'}}>@{props.username}</p>
            <UserNavButtons 
              removeUser={props.removeUser} 
              setNavigationTab={props.setNavigationTab} 
              auth_token={props.auth_token} 
              setPopulation={props.setPopulation}
              />
              <p style={{color: '#232323'}}>{date}</p>
          </Container>
          <Container>
            <Avatar />
            <Container>
              <div style={{display: 'inline-flex'}}>
                <Shinies />
                <Muns />
              </div>
              <Button variant={"text"} color={"primary"} className={classes.investButton}>Invest</Button>
            </Container>
          </Container>
        </Paper>
    )
}

const AvatarBadge = connect(mapStateToProps, mapDispatchToProps)(AvatarBadgeComponent);
export default AvatarBadge;