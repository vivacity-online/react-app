import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import LoginModal from './js/components/modals/login-modal';
import PageFrame from './js/pages/page_frame/page_frame';
import Home from './js/pages/home';
import Community from './js/pages/community';
import Forums from './js/pages/forums';
import Board from './js/components/boards/board';
import UserProfile from './js/pages/user-profile';
import Profile from './js/pages/profile';
import ShiniesPage from './js/pages/shinies';
import { useCookies } from 'react-cookie';
import { connect } from 'react-redux';
import { addUser } from './js/redux/actions/index';
import tinycolor from 'tinycolor2';

const mapStateToProps = state => {
  return {
    loading: state.loading,
    isAuthenticated: state.user.isAuthenticated,
    primary_color: state.primary_color,
    secondary_color: state.secondary_color,
  }
};

const mapDispatchToProps = dispatch => {
  return {
      addUser: user => dispatch(addUser(user))
  }
};


function AppComponent(props) {

  // eslint-disable-next-line
  const [userCookie, setUserCookie] = useCookies(['user']);
  const primary = tinycolor(props.primary_color);
  const [primary_color, setPrimaryColor] = useState("");
  const [secondary_color, setSecondaryColor] = useState("");
  const [loadedUserCookie, setLoadedUserCookie] = useState(false);

  useEffect(() => {
    if(userCookie.user && !loadedUserCookie){
      props.addUser(userCookie.user);
      setPrimaryColor(userCookie.user.primary_color);
      setLoadedUserCookie(true);
    }
  }, [userCookie, loadedUserCookie, props]);
  
  useEffect(() => {
    if(props.primary_color !== primary_color){
      setPrimaryColor(props.primary_color)
    }
  }, [props.primary_color, primary_color]);

  useEffect(() => {
    if(props.secondary_color !== secondary_color) {
      setSecondaryColor(props.secondary_color)
    }
  }, [props.secondary_color, secondary_color]);

  const theme = createMuiTheme({
    palette: {
      primary: {
          main: primary_color || '#8115C4'
       }, 
      secondary: {
          main: secondary_color || '#e67a63',
       }, 
      success: {
          main: '#16ba64', //Green
      },
      black: {
        main: '#232323',
      },
      white: {
        main: '#f7f7f7',
        rgb: '247, 247, 247',
      },
      red: {
        main: '#BC3216',
        rgb: '188, 50, 22'
      },
      background: {
        paper: '#f7f7f7',
      }
    },
  });

  const useStyles = makeStyles({
    root: {
      height: '100%',
      minHeight: '100vh',
      margin: '0 auto',
      color: primary.isDark() ? 'white' : 'black',
      textAlign: 'center',
      background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' %3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' x2='0' y1='0' y2='1' gradientTransform='rotate(206,0.5,0.5)'%3E%3Cstop offset='0' stop-color='%23${theme.palette.primary.main.substring(1)}'/%3E%3Cstop offset='1' stop-color='%23${theme.palette.secondary.main.substring(1)}'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpattern id='b' width='7' height='7' patternUnits='userSpaceOnUse'%3E%3Ccircle fill='%23ffffff' cx='3.5' cy='3.5' r='3.5'/%3E%3C/pattern%3E%3Crect width='100%25' height='100%25' fill='url(%23a)'/%3E%3Crect width='100%25' height='100%25' fill='url(%23b)' fill-opacity='0.11'/%3E%3C/svg%3E")`,
      // backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
    }
  });
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme} >
        <Router>
            <PageFrame>
              <LoginModal />

                  <Switch>
                    <Route 
                      exact path="/"
                      render={() => (
                        <Home />
                        )}
                      />
                  </Switch>
                  <Switch>
                    <Route 
                      exact path="/community"
                      render={() => (
                        <Community />
                        )}
                      />
                  </Switch>

                {props.isAuthenticated && userCookie &&
                <>
                  <Switch>
                    <Route 
                      exact path="/profile"
                      render={() => (
                        <UserProfile />
                        )}
                      />
                  </Switch>
                  <Switch>
                    <Route 
                      path="/profile/user/:username"
                      render={() => (
                        <Profile />
                        )}
                      />
                  </Switch>
                </>
                }

                  <Switch>
                    <Route
                      exact path="/forums"
                      render={() => (
                        <Forums />
                      )}
                      />
                  </Switch>

                  <Switch>
                    <Route
                      exact path="/forums/:slug"
                      render={() => (
                        <Board />
                      )}
                      />
                  </Switch>

                  <Switch>
                    <Route
                      exact path="/shinies"
                      render={() => (
                        <ShiniesPage />
                      )}
                      />
                  </Switch>

            </PageFrame>
        </Router>
      </ThemeProvider>
    </div>
  );
}

const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);
export default App;
