import React from 'react';
import Interests from './interests';
import { Grid, Paper, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 10,
    },
    aboutGridItem: {
        margin: 1
    },
    dataBlock: {
        display: 'flex',
        flexFlow: 'column',
        margin: '5px auto',
        padding: 5,
    },
    saveGroup: {
        padding: 10,
    },
    emptyField : {
        border: '2px solid #9e63c3', 
        width: '50%', 
        margin: 'auto'
    },
    bio: {
        '& textarea': {
            color: theme.palette.primary.main,
        }
    }
}));

function ProfileAbout(props) {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={3}>
                        
                    <Paper className={classes.dataBlock} elevation={1}>
                        <p>First name:</p>
                        <Button 
                            className={!props.firstName ? classes.emptyField: null} 
                            color={"primary"} 
                            variant={"text"} 
                            onClick={(event) => props.editField("firstName")}
                            >
                                {props.firstName || "N/A"}
                        </Button>
                        <p>Last name:</p>
                        <Button 
                            className={!props.lastName ? classes.emptyField : null} 
                            color={"primary"} 
                            variant={"text"} 
                            onClick={(event) => props.editField("lastName")}
                            >
                                {props.lastName || "N/A"}
                        </Button>
                        <p>Location:</p>
                        <Button 
                            className={!props.location ? classes.emptyField : null} 
                            color={"primary"} 
                            variant={"text"} 
                            onClick={(event) => props.editField("location")}
                            >
                                {props.location || "N/A"}
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>       
                    <Paper className={classes.dataBlock} elevation={1}>
                        <p>Tag:</p>
                        <Button 
                            className={!props.tag ? classes.emptyField : null} 
                            color={"primary"} 
                            variant={"text"} 
                            onClick={(event) => props.editField("tag")}
                            >
                                {props.tag || "N/A"}
                        </Button>
                    </Paper>
                    <Paper className={classes.dataBlock} elevation={1}>
                        <p>Occupation:</p>
                        <Button 
                            className={!props.occupation ? classes.emptyField : null} 
                            color={"primary"} 
                            variant={"text"} 
                            onClick={(event) => props.editField("occupation")}
                            >
                                {props.occupation || "N/A"}
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>       
                    <Paper className={classes.dataBlock} elevation={1}>
                        <p>Bio:</p>
                        <TextField 
                            multiline
                            rows={8}
                            className={classes.bio}
                            defaultValue={props.bio}
                            onChange={(event) => {
                                console.log(event.target.value);
                                props.setBio(event.target.value);
                                props.setHasChanged(true);
                            }}
                            />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={3} >
                    <Paper className={classes.dataBlock} elevation={1}>
                        <Interests 
                            hasChanged={props.hasChanged}
                            setHasChanged={props.setHasChanged}
                            interests={props.interests}
                            setInterests={props.setInterests}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default ProfileAbout;