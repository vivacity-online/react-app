import React, { useState } from 'react';
import AvatarWidget from './monthly-avatar/avatar-widget';
import ItemsWidget from './monthly-items/items-widget';
import { 
    Paper, 
    AppBar, 
    Tabs, 
    Tab,
    Typography,
    Box,
    makeStyles,
     } from '@material-ui/core';
import PropTypes from 'prop-types';
import month from '../../../utils/make-month';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      background: `radial-gradient(${theme.palette.background.paper}, ${theme.palette.primary.main})`,
    },
    tabs: {
      borderRight: `1px solid ${theme.palette.primary.main}`,
    },
    tabPanel: {
      padding: 0,
      marginTop: -10,
    },
    tabGridItem: {
      width: '100%',
    },
  }));

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={2}>{children}</Box>}
      </Typography>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }

function MonthlyWidget(props) {
    const [value, setValue] = useState(0);
    const [likeCount, setLikeCount] = useState(0);
    const [avatarLiked, setAvatarLiked] = useState(false);
    const classes = useStyles();

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

    return (
        <Paper>
            <AppBar position={"static"}>
                <Tabs
                value={value}
                onChange={handleChange}
                aria-label="Profile and settings tabs"
                className={classes.tabs}
                variant={"fullWidth"}
                >

                    <Tab label={`Avatar of the month`} {...a11yProps(0)} />
                    <Tab label={`${month} items`} {...a11yProps(1)} />

                </Tabs>
            </AppBar>
            <div>
              <TabPanel value={value} index={0} className={classes.tabPanel}>
                  <AvatarWidget 
                    liked={avatarLiked}
                    setLiked={setAvatarLiked}
                    likeCount={likeCount} 
                    setLikeCount={setLikeCount} 
                    />
              </TabPanel>
              <TabPanel value={value} index={1} className={classes.tabPanel}>
                  <ItemsWidget />
              </TabPanel>
            </div>
        </Paper>
    )
}

export default MonthlyWidget;