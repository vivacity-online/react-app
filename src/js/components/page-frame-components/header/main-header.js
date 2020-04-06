import React, { useState, useEffect } from 'react';
import PopulationLogo from './population-logo';
import AvatarBadge from '../../avatar/avatar-badge/avatar-badge';
import DefaultNPC from '../../NPC/dialogue-NPC';
import DailyChance from '../../items/daily-chance/daily-chance';
import signIn from '../../../../img/login3.png';
import ParticleContainer from '../../theme/particles/particles-container';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { setLoggingIn, setPopulation } from '../../../redux/actions/index';
import MenuBar from '../../menus/main-menu-bar/main-menu-bar';
import { connect } from 'react-redux';
import URL from '../../../conf';

const mapStateToProps = state => {
    return { 
        loggingIn: state.loggingIn,
        isAuthenticated: state.user.isAuthenticated,
        navigationTab: state.navigationTab,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setLoggingIn: action => dispatch(setLoggingIn(action)),
        setPopulation: population => dispatch(setPopulation(population)),
    }
}

const useStyles = makeStyles({
    root: {
        justifyContent: 'center',
    },
    grid: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '20px',
        zIndex: 1,
    },
    login: {
        zIndex: 2,
        position: 'absolute',
        height: 75,
        top: 20,
        left: 20,
        '&:hover': {
            cursor: 'pointer',
        }
    }
})

function MainHeaderComponent(props) {
    const classes = useStyles();
    const [NPC_url, setNPC_url] = useState("");
    const [dialogue, setDialogue] = useState("");

    function openModal(event) {
        props.setLoggingIn(!props.loggingIn)
    };

    useEffect(() => {
        if(!NPC_url){
            fetch(
                `${URL}/api/main/home`,
                {
                    method: "GET",
                }
            )
            .then(response => response.json())
            .then(data => {
                setNPC_url(URL + data.NPC.image);
                setDialogue(() => {
                    let rand = Math.floor(Math.random() * data.NPC.dialogue.length);
                    return data.NPC.dialogue[rand].content
                });
                props.setPopulation(data.online_users);
            })
            .catch(error => console.log(error));
        }
    }, [NPC_url, props])

    return (
        <div className={"header main particles_container"} id={"particles-js"}>
            {!props.isAuthenticated && <img src={signIn} alt={"sign in"} onClick={openModal} className={classes.login} /> }
              <Grid container className={classes.root}>
                    <Grid item sm={12} lg={6} className={classes.grid}>
                        <PopulationLogo />
                    </Grid>
                    <Grid item sm={12} lg={6} className={classes.grid}>
                        <div>
                        {
                            props.isAuthenticated ?
                                <AvatarBadge /> :
                                    NPC_url ?
                                        <DefaultNPC src={NPC_url} dialogue={dialogue} /> :
                                        <DefaultNPC />
                            }
                        </div>
                    </Grid>
                    <div>
                        <DailyChance />
                    </div>
                </Grid>
                <MenuBar />
                <ParticleContainer />
        </div>
    )
}

const MainHeader = connect(mapStateToProps, mapDispatchToProps)(MainHeaderComponent);
export default MainHeader;