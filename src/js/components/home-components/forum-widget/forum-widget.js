import React, { useState, useEffect } from 'react';
import { 
    Paper, 
    AppBar, 
    Tabs, 
    Tab,
    Typography,
    Box,
    makeStyles,
     } from '@material-ui/core';
import ForumSearch from '../../search-component/search-component';
import BoardTile from './board-tile/board-tile';
import PropTypes from 'prop-types';
import { Search } from '@material-ui/icons';
import URL from '../../../conf';
import chitchat from '../../../../img/npc/chitchatsmall.png';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    appBar: {
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
    },
    titlePaper: {
      display: 'flex',
      justifyItems: 'center',
      marginBottom: 5,
      marginRight: 5,
      borderBottomLeftRadius: 0,
      borderTopRightRadius: 0,
      borderTopLeftRadius: 0,
      padding: 5,
      // background: `radial-gradient(circle at  100%, ${theme.palette.white.main}, ${theme.palette.secondary.main} 100%, ${theme.palette.white.main} 100%, ${theme.palette.white.main} 90%)`,
    },
    title: {
      alignSelf: 'center',
    },
    tabPanel: {
      padding: 0,
      marginTop: -10,
      minHeight: 450,
    },
    tabGridItem: {
      width: '100%',
    },
    tabs: {
      alignItems: 'center',
    }
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

function ForumWidget(props) {
    const [value, setValue] = useState(0);
    const classes = useStyles();
    const [boards, setBoards] = useState();
    const [bookmarkedBoards, setBookmarkedBoards] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    const removeBoard = (boardID) => {
      setBoards(boards => boards.filter(board => board.id !== boardID))
    };

    useEffect(() => {
      if(!boards){
        let url = `${URL}/api/board/forum/widget`;
        fetch(
          url,
          {
            method: "GET",
            headers: {
              'Authorization': `Token ${props.auth_token}`,
              "Accept": "application/json",
              "Content-Type": "application/json",
            }
          }
        )
        .then(response => response.json())
        .then(boards => setBoards(boards))
        .catch(error => console.log(error))
      }
    });

    return (
        <Paper className={classes.root}>
            <AppBar position={"sticky"} color={"secondary"} className={classes.appBar}>
              <div style={{display: 'flex', width: '100%'}}>
                <Paper className={classes.titlePaper} elevation={4}>
                  <Typography
                      component={"div"}
                      role="title"
                      className={classes.title}
                      >
                        <b>Forums</b>
                  </Typography>
                  <img src={chitchat} alt={"Forum img"} style={{maxWidth: 50}}/>
                </Paper>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="Forum widget tabs"
                    className={classes.tabs}
                    variant={"scrollable"}
                    indicatorColor={"primary"}
                >

                    <Tab label={'Recent Threads'} {...a11yProps(0)} />
                    <Tab label={'Trending'} {...a11yProps(1)} />
                    <Tab label={'Bookmarked'} {...a11yProps(2)} />
                    <Tab label={<Search />} {...a11yProps(3)} />

                </Tabs>
              </div>
            </AppBar>
            <div>
              <TabPanel value={value} index={0} className={classes.tabPanel}>
                      {boards &&
                        boards.map((board, index) => (
                          <div
                            key={board.pk}
                          >
                          <BoardTile
                            board={board}
                            side={index % 2 === 0 ? 'left' : 'right'}
                            removeBoard={removeBoard}
                            bookmarkedBoards={bookmarkedBoards}
                            setBookmarkedBoards={setBookmarkedBoards}
                          />
                        </div>
                        ))}
              </TabPanel>
              <TabPanel value={value} index={1} className={classes.tabPanel}>
                  <div style={{height: 250}}></div>
              </TabPanel>
              <TabPanel value={value} index={2} className={classes.tabPanel}>
                      {bookmarkedBoards.length > 0 ?
                        bookmarkedBoards.map((board, index) => (
                          <div
                            key={board.pk}
                          >
                          <BoardTile
                            board={board}
                            side={index % 2 === 0 ? 'left' : 'right'}
                            removeBoard={removeBoard}
                            bookmarkedBoards={bookmarkedBoards}
                            setBookmarkedBoards={setBookmarkedBoards}
                            bookmarked={true}
                          />
                        </div>
                        )) :
                        <div style={{height: 300}}><p>No bookmarks yet</p></div>
                      }
              </TabPanel>
              <TabPanel value={value} index={3} className={classes.tabPanel}>
                  <div style={{height: 250}}>
                      <ForumSearch search={"Forums"} />
                  </div>
              </TabPanel>
            </div>
        </Paper>
    )
}

export default ForumWidget;