import React from 'react';
import UserThemeData from './user-theme-data/user-theme-data';
import { Grid, Paper, Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        '@media (max-width: 989px)': {
            // maxHeight: 500,
        }
    },
    gridItem: {
        margin: 10,
    },
    tabPaper: {
        padding: 10,
        marginTop: 10,
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'center',
    },
    dataBlock: {
        display: 'flex',
        flexFlow: 'column',
        maxWidth: 400,
    },
    saveGroup: {
        padding: 10,
    },
    emptyField : {
        border: '2px solid #9e63c3', 
        width: '50%', 
        margin: 'auto'
    },
    date_of_birth: {
        color: '#9e63c3',
    }
})

function EditableUserData(props) {
    const classes = useStyles();


    return (
        <Paper className={classes.root}>
            <Grid container>
                <Grid item xs={12} md={4} className={classes.gridItem}>
                    <Paper className={classes.tabPaper}>
                        <div className={classes.dataBlock}>
                            <p>Dispay Users Name:</p>
                            <Checkbox
                                checked={props.display_name}
                                onChange={(event) => {
                                    props.setDisplay_name(!props.display_name);
                                    props.setHasChanged(true);
                                }}
                            />
                        </div>
                        <div className={classes.dataBlock}>
                            <p>Dispay Birthdate:</p>
                            <Checkbox
                                checked={props.display_dob}
                                onChange={(event) => {
                                    props.setDisplay_dob(!props.display_dob);
                                    props.setHasChanged(true);
                                }}
                            />
                        </div>
                        <div className={classes.dataBlock}>
                            <p>Dispay Location:</p>
                            <Checkbox
                                checked={props.display_location}
                                onChange={(event) => {
                                    props.setDisplay_location(!props.display_location);
                                    props.setHasChanged(true);
                                }}
                            />
                        </div>
                        <div className={classes.dataBlock}>
                            <p>Dispay Occupation:</p>
                            <Checkbox
                                checked={props.display_occupation}
                                onChange={(event) => {
                                    props.setDisplay_occupation(!props.display_occupation);
                                    props.setHasChanged(true);
                                }}
                            />
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={7} className={classes.gridItem}>
                    <UserThemeData 
                        setHasChanged={props.setHasChanged}
                        />
                </Grid>
            </Grid>
        </Paper>
    )
}
export default EditableUserData;