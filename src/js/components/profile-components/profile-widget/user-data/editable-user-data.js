import React from 'react';
import BoardData from './board-user-data';
import { Grid, Paper, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        padding: 10,
    },
    tabPaper: {
        padding: 10,
        marginTop: 10,
    },
    dataBlock: {
        display: 'flex',
        flexFlow: 'column',
        // maxWidth: 400,
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
    birthdate: {
        maxWidth: 150, 
        margin: 'auto',
        '& input': {
            color: theme.palette.primary.main
        }
    }
}));

function EditableUserData(props) {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Paper className={classes.tabPaper} elevation={1}>
                        User Data
                        <hr/>
                            <div className={classes.dataBlock}>
                                <p>Username:</p>
                                <Button
                                    className={!props.username ? classes.emptyField : null}  
                                    color={"primary"} 
                                    variant={"text"} 
                                    onClick={(event) => props.editField("username")}>
                                        {props.username || "N/A"}
                                </Button>
                            </div>
                            <div className={classes.dataBlock}>
                                <p>Email:</p>
                                <Button 
                                    className={!props.email ? classes.emptyField : null} 
                                    color={"primary"} 
                                    variant={"text"} 
                                    onClick={(event) => props.editField("email")}>
                                        {props.email || "N/A"}
                                </Button>
                            </div>
                            <div className={classes.dataBlock}>
                                <p>Birth date:</p>
                                <TextField
                                    className={!props.date_of_birth ? classes.emptyField : classes.birthdate}  
                                    type={"date"}
                                    value={props.date_of_birth || "1980-01-01"} 
                                    onChange={(event) => {
                                        props.setDate_of_birth(event.target.value);
                                        props.setHasChanged(true);
                                    }}
                                >
                                </TextField>
                            </div>

                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper className={classes.tabPaper} elevation={1}>
                            <BoardData />
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>
    )
}

export default EditableUserData;