import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Avatar from '../components/avatar/avatar';
import URL from '../conf';
import { connect } from 'react-redux';
import { setNavigationTab } from '../redux/actions/index';
import { Paper, Container, Grid, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import tinycolor from 'tinycolor2';

const mapStateToProps = state => {
    return {
        auth_token: state.user.auth_token,
        navigationTab: state.navigationTab,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setNavigationTab: tab => dispatch(setNavigationTab(tab))
    }
}

function ProfileComponent(props) {
    const { username } = useParams();
    const [profileData, setProfileData] = useState({});
    const primary = tinycolor(profileData.primary_color);

    const useStyles = makeStyles((theme) => ({
        root: {
            background: `radial-gradient(${theme.palette.white.main}, ${profileData.primary_color})`, 
            color: primary.isDark() ? 'white' : 'black',
            marginTop: 25,
        },
        gridItem: {
            margin: 'auto',
        },
        mainPaper: {
            margin: 10,
            padding: 5,
        },
        userInfo: {
            height: '100%',
            '@media (min-width: 989px)': {
                maxHeight: 450,
                overflowY: 'auto',
            }
        }
    }));

    const classes = useStyles();

    useEffect(() => {
        console.log("fetching profile");
        fetch(
                `${URL}/api/user/profile/${username || props.username}`,
                {
                    method: "GET",
                    headers: {
                        'Authorization': `Token ${props.auth_token}`,
                    }
                })
                .then(response => response.json())
                .then(data => {
                    setProfileData(data);
                })
                .catch(error => console.log(error))
    }, [props.auth_token, username, props.username]);
    useEffect(() => {
        document.title = username
    }, [username, ]);
    useEffect(() => { // Set tab to "Profile"
        if(props.navigationTab !== 3) {
            props.setNavigationTab(3);
        }
    });

    let baseInfo = {
        'Username': profileData.username,
        'Member Since': profileData.joined_on,
        'First Name': profileData.first_name,
        'Last Name': profileData.last_name,
        'Birthdate': profileData.date_of_birth,
    };
    let profileInfo = {
        'Tag': profileData.tag,
        'Bio': profileData.bio,
        'Location': profileData.location,
        'Occupation': profileData.occupation
    };
    let profileColors = {
        'Primary Color': profileData.primary_color,
        'Secondary Color': profileData.secondary_color
    };

    const Field = (props) => {
        let field = props.fieldName;
        let data = props.fieldData;

        return (
            data ?
            <>
                    <p style={{marginBottom: 0}}>
                        <b>{field}</b>
                    </p>
                    <hr/>
                    <p style={{background: '#f7eadc', padding: 2}}>{data}</p>
            </>
                :
                null
            
        )
    };

    return (
        <Container maxWidth={"lg"}>
            <Paper className={classes.root}>
                <Grid container alignItems={'center'} justify={'center'} spacing={2}>
                        <Grid className={classes.gridItem} item xs={12} md={4}>
                    <div className={classes.userInfo}>
                            <Paper className={classes.mainPaper}>
                                {
                                Object.keys(baseInfo).map((field, index) => (
                                    <div key={index}>
                                        <Field fieldName={field} fieldData={baseInfo[field]} />
                                    </div>
                                ))
                                }
                            </Paper>
                            <Paper className={classes.mainPaper}>
                            {
                            Object.keys(profileInfo).map((field, index) => (
                                <Container key={index}>
                                    <Field fieldName={field} fieldData={profileInfo[field]} />
                                </Container>
                            ))
                            }
                            </Paper>
                            <Paper className={classes.mainPaper}>
                                <p><b>Profile Colors</b></p>
                            {
                            Object.keys(profileColors).map((color, index) => (
                                <Container key={index}>
                                    <Paper style={{background: profileColors[color], width: 100, height: 50, margin: 'auto'}}><p style={{padding: 2.5}}>{color}</p></Paper>
                                </Container>
                            ))
                            }
                            </Paper>
                    </div>
                        </Grid>
                    <Grid className={classes.gridItem} item xs={12} md={4}>
                        <Paper>
                            <h1>{profileData.username}</h1>
                            <Avatar avatar={profileData.avatar} />
                        </Paper>
                    </Grid>
                    <Grid className={classes.gridItem} item xs={12} md={4}>
                        {
                        Object.keys(baseInfo).map((field, index) => (
                            <Container key={index}>
                                <Field fieldName={field} fieldData={baseInfo[field]} />
                            </Container>
                        ))
                        }
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

ProfileComponent.propTypes = {
    auth_token: PropTypes.string.isRequired
};

const Profile = connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);
export default Profile;