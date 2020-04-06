import React, { useEffect, useState } from 'react'; 
import { makeStyles, Container, Paper, Grid, Typography, Button, Fade } from '@material-ui/core';
import { setNavigationTab } from '../redux/actions/index';
import { connect } from 'react-redux';
import shiniesBreakdown from '../../img/currency/shinies-breakdown.png';
import shiniesDrawing from '../../img/currency/shinies-drawing.png';


const mapStateToProps = state => {
    return {
        navigationTab: state.navigationTab,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        setNavigationTab: tab => dispatch(setNavigationTab(tab)),
    }
} 


function ShiniesPageComponent(props) {
    const [componentLoading, setComponentLoading] = useState(true);
    const useStyles = makeStyles((theme) => ({
        root: {
            marginTop: 25,
        },
        rootPaper: {
            background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 800'%3E%3Cdefs%3E%3CradialGradient id='a' cx='400' cy='400' r='3%25' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23ffffff'/%3E%3Cstop offset='1' stop-color='%23${theme.palette.primary.main.substring(1)}'/%3E%3C/radialGradient%3E%3CradialGradient id='b' cx='400' cy='400' r='12.9%25' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23ffffff'/%3E%3Cstop offset='1' stop-color='%23${theme.palette.secondary.main.substring(1)}'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='800' height='800'/%3E%3Cg fill-opacity='0.36'%3E%3Cpath fill='url(%23b)' d='M998.7 439.2c1.7-26.5 1.7-52.7 0.1-78.5L401 399.9c0 0 0-0.1 0-0.1l587.6-116.9c-5.1-25.9-11.9-51.2-20.3-75.8L400.9 399.7c0 0 0-0.1 0-0.1l537.3-265c-11.6-23.5-24.8-46.2-39.3-67.9L400.8 399.5c0 0 0-0.1-0.1-0.1l450.4-395c-17.3-19.7-35.8-38.2-55.5-55.5l-395 450.4c0 0-0.1 0-0.1-0.1L733.4-99c-21.7-14.5-44.4-27.6-68-39.3l-265 537.4c0 0-0.1 0-0.1 0l192.6-567.4c-24.6-8.3-49.9-15.1-75.8-20.2L400.2 399c0 0-0.1 0-0.1 0l39.2-597.7c-26.5-1.7-52.7-1.7-78.5-0.1L399.9 399c0 0-0.1 0-0.1 0L282.9-188.6c-25.9 5.1-51.2 11.9-75.8 20.3l192.6 567.4c0 0-0.1 0-0.1 0l-265-537.3c-23.5 11.6-46.2 24.8-67.9 39.3l332.8 498.1c0 0-0.1 0-0.1 0.1L4.4-51.1C-15.3-33.9-33.8-15.3-51.1 4.4l450.4 395c0 0 0 0.1-0.1 0.1L-99 66.6c-14.5 21.7-27.6 44.4-39.3 68l537.4 265c0 0 0 0.1 0 0.1l-567.4-192.6c-8.3 24.6-15.1 49.9-20.2 75.8L399 399.8c0 0 0 0.1 0 0.1l-597.7-39.2c-1.7 26.5-1.7 52.7-0.1 78.5L399 400.1c0 0 0 0.1 0 0.1l-587.6 116.9c5.1 25.9 11.9 51.2 20.3 75.8l567.4-192.6c0 0 0 0.1 0 0.1l-537.3 265c11.6 23.5 24.8 46.2 39.3 67.9l498.1-332.8c0 0 0 0.1 0.1 0.1l-450.4 395c17.3 19.7 35.8 38.2 55.5 55.5l395-450.4c0 0 0.1 0 0.1 0.1L66.6 899c21.7 14.5 44.4 27.6 68 39.3l265-537.4c0 0 0.1 0 0.1 0L207.1 968.3c24.6 8.3 49.9 15.1 75.8 20.2L399.8 401c0 0 0.1 0 0.1 0l-39.2 597.7c26.5 1.7 52.7 1.7 78.5 0.1L400.1 401c0 0 0.1 0 0.1 0l116.9 587.6c25.9-5.1 51.2-11.9 75.8-20.3L400.3 400.9c0 0 0.1 0 0.1 0l265 537.3c23.5-11.6 46.2-24.8 67.9-39.3L400.5 400.8c0 0 0.1 0 0.1-0.1l395 450.4c19.7-17.3 38.2-35.8 55.5-55.5l-450.4-395c0 0 0-0.1 0.1-0.1L899 733.4c14.5-21.7 27.6-44.4 39.3-68l-537.4-265c0 0 0-0.1 0-0.1l567.4 192.6c8.3-24.6 15.1-49.9 20.2-75.8L401 400.2c0 0 0-0.1 0-0.1L998.7 439.2z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',  
        },
        breakdownImage: {
            maxWidth: '100%',
            '&:hover': {
                cursor: 'pointer',
            }
        },
        explanation: {
            padding: 10,
        },
        drawingImage: {
            maxWidth: '75%',
            maxHeight: 450,
            '@media(max-width: 767px)': {
                maxHeight: 250,
            }
        },
        investButton: {
            marginTop: -20,
            marginBottom: 20,
        }
    }));
    const classes = useStyles();

    useEffect(() => {
        if(props.navigationTab !== 4) {
            props.setNavigationTab(4);
        }
    }, [props]);

    useEffect(() => {
        if(componentLoading) {
            setComponentLoading(!componentLoading);
        }
    }, [componentLoading, ]);

    return (
        <Container maxWidth={"lg"} className={classes.root}>
            <Paper className={classes.rootPaper}>
                <Grid container>
                    <Grid item xs={12} sm={12} lg={3} style={{alignSelf: 'center', padding: 10}}>
                        <Paper>
                            <Fade
                                in={!componentLoading}
                                >
                                    <>
                                <Typography
                                    component={"h1"}
                                    variant={"overlay"}
                                    id={"shinies-text"}
                                    >
                                        Shinies
                                </Typography>
                                <Typography
                                    component="div"
                                    variant={"subtitle1"}
                                    paragraph={true}
                                    className={classes.explanation}
                                    >
                                        Shinies are your premium currency throughout Vivacity. By purchasing Shinies you are gaining access to premium content as well as supporting 
                                        all the hard work we do to keep Vivacity active and fresh!
                                </Typography>
                                    </>
                            </Fade>
                        </Paper>
                    </Grid>
                    <Grid item sm={12} lg={6}>
                        <img src={shiniesBreakdown} alt={"Shinies Breakdown"} className={classes.breakdownImage} />
                        <Button variant={"contained"} color={"secondary"} className={classes.investButton}>Invest!</Button>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={3} style={{alignSelf: 'center'}}>
                        <img src={shiniesDrawing} alt={"Shinies Drawing"} className={classes.drawingImage} />
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

const ShiniesPage = connect(mapStateToProps, mapDispatchToProps)(ShiniesPageComponent);
export default ShiniesPage;