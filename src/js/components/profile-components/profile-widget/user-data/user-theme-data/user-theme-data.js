import React, { useState, useEffect } from 'react';
import { ChromePicker } from 'react-color';
import { Container, Grid, Paper, Button } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { setPrimaryColor, setSecondaryColor } from '../../../../../redux/actions/index';

const mapStateToProps = state => {
    return {
        primary_color: state.primary_color,
        secondary_color: state.secondary_color
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setPrimaryColor: color => dispatch(setPrimaryColor(color)),
        setSecondaryColor: color => dispatch(setSecondaryColor(color))
    }
}

// const useStyles = makeStyles((theme) => ({
//     gridItem: {
//         margin: 10,
//     },
// }));

function UserThemeDataComponent(props) {
    // const classes = useStyles();
    const [primary, setPrimary] = useState("");
    const [secondary, setSecondary] = useState("");

    function handlePrimaryChangeComplete(color) {
        setPrimary(color.hex);
        props.setPrimaryColor(color.hex);
        props.setHasChanged(true);
    }
    function handleSecondaryChangeComplete(color) {
        setSecondary(color.hex);
        props.setSecondaryColor(color.hex);
        props.setHasChanged(true);
    }
    function handleDefaultClick(event) {
        props.setPrimaryColor("#8115C4");
        props.setSecondaryColor("#e67a63");
        props.setHasChanged(true);
    }
    useEffect(() => {
        if(!primary && props.primary_color){
            setPrimary(props.primary_color)
        }
    }, [props.primary_color, primary]);
    useEffect(() => {
        if(!secondary && props.secondary_color){
            setSecondary(props.secondary_color)
        }
    }, [props.secondary_color, secondary]);

    return (
        <Container>
            <Paper>
                <p>You're free to choose whichever colors you like, but be careful!
                    Some color combinations will make certain things harder to see.
                </p>
                <Grid container>
                    <Grid item xs={12} md={6}>
                    <Paper style={{background: primary}}>
                        <p style={{background: 'white'}}>Primary Color:</p>
                        <ChromePicker 
                            color={ primary }
                            onChangeComplete={ handlePrimaryChangeComplete }
                            />
                    </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                    <Paper style={{background: secondary}}>
                        <p style={{background: 'white'}}>Secondary Color:</p>
                        <ChromePicker 
                            color={ secondary }
                            onChangeComplete={ handleSecondaryChangeComplete }
                            />
                    </Paper>
                    </Grid>
                </Grid>
            </Paper>
            <Paper style={{paddingBottom: 5}}>
                <p>If you find that your colors aren't working out, you can always revert</p>
                <Button 
                    variant={"contained"} 
                    style={{background: "#8115C4", marginTop: 10}}
                    onClick={handleDefaultClick}
                    >
                        Vivacity Defaults
                </Button>
            </Paper>
        </Container>
        )
}

const UserThemeData = connect(mapStateToProps, mapDispatchToProps)(UserThemeDataComponent);
export default UserThemeData;