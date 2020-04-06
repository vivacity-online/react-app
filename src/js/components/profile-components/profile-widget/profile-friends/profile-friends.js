import React, { useState, useEffect } from 'react';
import Profile from '../../../../pages/profile';
import FriendSearch from '../../../search-component/search-component';
import AvatarThumbnail from '../../../avatar/avatar-thumbnail/avatar-thumbnail';
import { Paper, Button, makeStyles, Container } from '@material-ui/core';
import { connect } from 'react-redux';
import URL from '../../../../conf';

const mapStateToProps = state => {
    return {
        friends: state.userProfile.friends,
    }
};

function ProfileFriendsComponent(props) {
    const [displayUserProfile, setDisplayUserProfile] = useState(false);
    const [displayProfileUsername, setDisplayProfileUsername] = useState("");
    const [friends, setFriends] = useState([]);

    const useStyles = makeStyles({
        root: {
            paddingBottom: 20,
            '@media (max-width: 989px)': {
                boxShadow: 'inset 0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
            }
        },
        paper: {
            display: 'flex',
            flexFlow: 'row wrap',
            justifyContent: 'center',
            margin: 10,
            maxHeight: 550,
            overflow: 'auto',
            '@media (max-width: 989px)': {
                maxHeight: 'initial',
                margin: 0,
                overflow: 'initial',
            }
        },
        showMore: {
            marginBottom: 10
        },
        bottomButton: {
            margin: 10,
            '@media (min-width: 989px)': {
                display: 'none',
            }
        }
    });
    const classes = useStyles();

    useEffect(() => {
        if(props.friends && !friends.length){
            setFriends(props.friends)
        }
    }, [props.friends, friends]);

    useEffect(() => {
        setDisplayUserProfile(props.viewingFriend);
    }, [props.viewingFriend]);

    return (
        <>
        <Container>
            <FriendSearch 
                searchField={"friends"} 
                dataAction={setFriends} 
                url={`${URL}/api/user/search`} 
                />
        </Container>
        <Paper className={classes.root}>
            {!displayUserProfile ?

            <div className={classes.paper}>

                    {console.log(friends)}

                {friends.length > 0 ?
                    friends.map((friend) => (
                        <div key={friend.id} >
                            <AvatarThumbnail
                                username={friend.username}
                                avatar_thumbnail={friend.avatar_thumbnail}
                                primaryColor={friend.primary_color}
                                secondaryColor={friend.secondary_color}
                                onClick={(event) => {
                                    props.setViewingFriend(true);
                                    setDisplayProfileUsername(friend.username)
                                }}
                            />
                        </div>
                    )
                ) :
                <p>You don't have any friends yet! Meet other members in the forums!</p>    
                }
            </div> :
                <>
                    <Button style={{ margin: 10 }} variant={"outlined"} color={"secondary"} onClick={(event) => props.setViewingFriend(false)}>Back to friends</Button>
                    <div>
                        <Profile username={displayProfileUsername} />
                    </div>
                </>
            }
        </Paper>
        </>
    )
}

const ProfileFriends = connect(mapStateToProps)(ProfileFriendsComponent);
export default ProfileFriends;