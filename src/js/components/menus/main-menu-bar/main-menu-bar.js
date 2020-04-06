import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux';
import { setNavigationTab } from '../../../redux/actions/index'

// const menuItems = require('./menu-items.json');
const menuItems = require('./menu-items-FIRST.json'); // TEMP MENU

const mapStateToProps = state => {
  return {
    navigationTab: state.navigationTab,
    isAuthenticated: state.user.isAuthenticated
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setNavigationTab: tab => dispatch(setNavigationTab(tab))
  }
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  link: {
    color: 'initial',
    textDecoration: 'none'
  },
  tab: {
    '&:selected': {
      border: theme.palette.primary.main,
    }
  }
}));

function ScrollableTabsButtonComponent(props) {
  const classes = useStyles();
  // const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    props.setNavigationTab(newValue);
  };

  let sml = window.innerWidth < 989;
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={props.navigationTab}
          onChange={handleChange}
          centered={!sml ? true : false}
          variant={!sml ? "fullWidth" : "scrollable"}
          scrollButtons="on"
          indicatorColor="primary"
          textColor="secondary"
          aria-label="scrollable force tabs example"
        >
          {
          menuItems.map((item, index) => 
            <Tab 
              className={classes.tab}
              key={index} 
              value={index}
              label={item.label} 
              component={Link} 
              to={item.url} 
              disabled={item.auth && !props.isAuthenticated}
              />
          )
          }
        </Tabs>
      </AppBar>
    </div>
  );
}

const ScrollableTabsMenu = connect(mapStateToProps, mapDispatchToProps)(ScrollableTabsButtonComponent);
export default ScrollableTabsMenu;