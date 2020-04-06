import React from 'react';
import {useHistory} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import FaceIcon from '@material-ui/icons/Face';
import MessageIcon from '@material-ui/icons/Message';
import FeedbackIcon from '@material-ui/icons/Feedback';
import SiteMapIcon from '@material-ui/icons/AccountTree';
import SettingsIcon from '@material-ui/icons/Settings';
import DonateIcon from '@material-ui/icons/Loyalty';
import HomeIcon from '@material-ui/icons/Home';
import { connect } from 'react-redux';
import { setNavigationTab } from '../../../redux/actions/index';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-evenly',
    '@media(max-width:987px)': {
        flexDirection: 'column',
        alignItems: 'center',
    }
  },
  menu: {
    width: '100%',
    maxWidth: 360,
    // margin: 'auto',
    backgroundColor: theme.palette.primary.main,
  },
}));

const mapStateToProps = state => {
    return {
        isAuthenticated: state.user.isAuthenticated,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        setNavigationTab: tab => dispatch(setNavigationTab(tab)),
    }
};

function FooterMenuComponent(props) {
  const classes = useStyles();
  const history = useHistory();

  function goTo(location, tab) {
    props.setNavigationTab(tab);
    history.push(location);
    window.scrollTo(0,0);
  };

  return (
      <div className={classes.root}>
          {props.isAuthenticated && 
        <div className={classes.menu}>
            <List 
                component="nav" 
                aria-label="logout avatar messages settings" 
                subheader={
                    <ListSubheader component="div" id="footer-list account">
                        Account
                    </ListSubheader>
                    }
            >
                <ListItem button>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItem>

            <Divider />

                <ListItem button>
                <ListItemIcon>
                    <FaceIcon />
                </ListItemIcon>
                <ListItemText primary="Avatar" />
                </ListItem>

            <Divider />

                <ListItem button>
                <ListItemIcon>
                    <MessageIcon />
                </ListItemIcon>
                <ListItemText primary="Messages" />
                </ListItem>

            <Divider />

                <ListItem button>
                <ListItemIcon>
                    <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Settings" />
                </ListItem>
            </List>
        </div>
        }
        
        <div className={classes.menu}>
        <List component="nav" aria-label="main mailbox folders"
                subheader={
                    <ListSubheader component="div" id="footer-list vivacity">
                        Vivacity
                    </ListSubheader>
                    }>
            <ListItem button onClick={(event) => {goTo("/", 0)}}>
                <ListItemIcon>
                    <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
            </ListItem>
            <Divider />

            <ListItem button onClick={(event) => {goTo("/", 0)}}>
                <ListItemIcon>
                    <FeedbackIcon />
                </ListItemIcon>
                <ListItemText primary="Feedback" />
            </ListItem>
            <Divider />

            <ListItem button onClick={(event) => {goTo("/", 0)}}>
                <ListItemIcon>
                    <SiteMapIcon />
                </ListItemIcon>
                <ListItemText primary="Site-Map" />
            </ListItem>
            <Divider />

            <ListItem button onClick={(event) => {goTo("/", 0)}}>
                <ListItemIcon>
                    <DonateIcon />
                </ListItemIcon>
                <ListItemText primary="Donate" />
            </ListItem>

        </List>
        </div>

        <div className={classes.menu}>
        <List component="nav" aria-label="main mailbox folders"
                subheader={
                    <ListSubheader component="div" id="footer-list vivacity">
                        Agreements
                    </ListSubheader>
                    }>
            <ListItem button onClick={(event) => {goTo("/", 0)}}>
                <ListItemIcon>
                    <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
            </ListItem>

            <Divider />
        </List>
        </div>

    </div>
  );
}

const FooterMenu = connect(mapStateToProps, mapDispatchToProps)(FooterMenuComponent);
export default FooterMenu;