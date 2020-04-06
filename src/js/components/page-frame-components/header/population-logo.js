import React from 'react';
import PeopleAlt from '@material-ui/icons/PeopleAlt';
import logo from '../../../../img/logo-512x264.png'
import { Container, Paper, makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        population: state.population,
    }
};

const useStyle = makeStyles((theme) => ({
    root: {
    },
    population: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        paddingTop: 5,
        margin: '0 auto',
        maxWidth: 200,
        background: `radial-gradient(circle at 100%, ${theme.palette.white.main}, ${theme.palette.primary.main} 50%, ${theme.palette.secondary.main} 100%, ${theme.palette.primary.main} 60%)`,
        '@media(max-width: 767px)': {
            display: 'none'
        }
    },
    headerLogo: {
        marginBottom: -50,
        '@media(max-width: 989px)': {
            maxWidth: '50%',
            marginBottom: 'initial'
        }
    },
    people: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: -5,
    }
}));

function PopulationLogo(props) {
    const classes = useStyle();

    return (
        <Container className={classes.root}>
            <img className={classes.headerLogo} src={logo} alt={"Vivacity"} />
            <Paper className={classes.population}>
                <div>
                    <p style={{color: '#232323', margin: 0}}>Population: </p>
                    <div className={classes.people}>
                        <PeopleAlt /> 
                        <p><b>{props.population}</b></p>
                    </div>
                </div>
            </Paper>
        </Container>
    )
}

const PopLogo = connect(mapStateToProps)(PopulationLogo);
export default PopLogo;
