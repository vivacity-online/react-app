import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { APIHandler } from '../utils/data-handler/data-handler'; 
import ProfileWidget from '../components/profile-components/profile-widget/profile-widget';
import { connect } from 'react-redux'; 
import { setPrimaryColor, setSecondaryColor, addUserProfile, setNavigationTab } from '../redux/actions/index';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const useStyles = makeStyles({
      root: {
          marginTop: 25
      },
})

const mapDispatchToProps = dispatch => {
    return {
        addUserProfile: user => dispatch(addUserProfile(user)),
        setPrimaryColor: color => dispatch(setPrimaryColor(color)),
        setSecondaryColor: color => dispatch(setSecondaryColor(color)),
        setNavigationTab: tab => dispatch(setNavigationTab(tab)),
    }
};

const mapStateToProps = state => {
    return {
      navigationTab: state.navigationTab,
      isAuthenticated: state.user.isAuthenticated,
      username: state.user.username,
      auth_token: state.user.auth_token,
      profile: state.userProfile,
      primary_color: state.primary_color,
      secondary_color: state.secondary_color,
    }
};

function ProfilePageComponent(props) {
    const { tab } = useParams();
    const classes = useStyles();
    const [ fetchedProfile, setFetchedProfile ] = useState(null);
    // eslint-disable-next-line
    const [userCookie, setUserCookie] = useCookies(['user', ])

    useEffect(() => {
        setFetchedProfile(props.profile)
    }, [props.profile]);

    useEffect(() => {
        document.title = `User - ${props.username}`;
        if(props.navigationTab !== 3) {
            props.setNavigationTab(3);
        }
    }, [props]);

    useEffect(() => {
        if(!fetchedProfile){
            console.log("Fetching profile");
            let URL = `/api/user/profile/edit/${props.username}`;
            let OPTIONS = {
                method: "PATCH",
                headers: {
                    "Authorization": `Token ${props.auth_token}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                }
            };
            APIHandler(URL, OPTIONS)
            .then(user => {
                setFetchedProfile(user);
                props.addUserProfile(user);
                // setUserCookie('user', user, '/');
            });
        }
    }, [fetchedProfile, props, setUserCookie, ]);

    return ( 
        <Container className={classes.root}>
        {props.isAuthenticated ?
                        <>
                        <ProfileWidget tab={tab} />
                        </>
        :
            <Redirect to={'/'} />
        }
        </Container>
    )
}

const ProfilePage = connect(mapStateToProps, mapDispatchToProps)(ProfilePageComponent);
export default ProfilePage;