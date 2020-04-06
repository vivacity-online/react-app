import React, { useState, useEffect } from 'react';
import UserData from './editable-user-data';
import EditingModal from '../../../modals/profile-edit-modal';
import ProfileAvatar from '../profile-avatar';
import ProfileSettings from './profile-settings';
import ProfileFriends from '../../profile-widget/profile-friends/profile-friends';
import ProfileAbout from '../profile-about/profile-about';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import { Box, Button, AppBar } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { addUserProfile, addUser } from '../../../../redux/actions/index';
import { connect } from 'react-redux';
import { save } from '../../../../utils/save_profile';
import URL from '../../../../conf';
import { useCookies } from 'react-cookie';

const mapStateToProps = state => {
  return {
    username: state.userProfile.username,
    email: state.userProfile.email,
    date_of_birth: state.userProfile.date_of_birth,

    firstName: state.userProfile.first_name,
    lastName: state.userProfile.last_name,
    location: state.userProfile.location,
    occupation: state.userProfile.occupation,
    tag: state.userProfile.tag,
    bio: state.userProfile.bio,
    interests: state.userProfile.interests,
    primary_color: state.primary_color,
    secondary_color: state.secondary_color,

    display_name: state.userProfile.display_full_name,
    display_dob: state.userProfile.display_date_of_birth,
    display_location: state.userProfile.display_location,
    display_occupation: state.userProfile.display_occupation,

    auth_token: state.user.auth_token
  }
};

const mapDispatchToProps = dispatch => {
  return {
    addUserProfile: user => dispatch(addUserProfile(user)),
    addUser: user => dispatch(addUser(user)),
  }
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    background: `radial-gradient(${theme.palette.background.paper}, ${theme.palette.primary.main})`,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.primary.main}`,
  },
  tabPanel: {
    minHeight: 400,
    margin: 10,
    '& .MuiBox-root': {
      // display: 'flex',
      padding: 12,
    },
    '@media (max-width: 989px)': {
      maxHeight: 500,
      overflowY: 'auto',
      boxShadow: 'inset 0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
    }
  },
  tabGridItem: {
    width: '100%',
  },
  themeColor: {
    color: theme.palette.primary.main
  },
  saveButtonHidden: {
    marginTop: 10,
    marginBottom: -25,
    opacity: 0
  },
  saveButtonShow: {
    marginTop: 10,
    marginBottom: -25,
    opacity: 1
  }
}));

function UserDataTabsComponent(props) {
  const classes = useStyles();
  // eslint-disable-next-line
  const [userCookie, setUserCookie] = useCookies(['user']);
  const [value, setValue] = useState(0);
  const [helperActive, setHelperActive] = useState(true);
  const [editing, setEditing] = useState(false);
  const [fieldData, setFieldData] = useState({});
  const [hasChanged, setHasChanged] = useState(false);
  const [saved, setSaved] = useState(false);

  // Editable user information
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [date_of_birth, setDate_of_birth] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");
  const [occupation, setOccupation] = useState("");
  const [bio, setBio] = useState("");
  const [tag, setTag] = useState("");
  const [interests, setInterests] = useState("");

  const [display_name, setDisplay_name] = useState(false)
  const [display_dob, setDisplay_dob] = useState(false);
  const [display_occupation, setDisplay_occupation] = useState(false);
  const [display_location, setDisplay_location] = useState(false);

  useEffect(() => {
    if (!username && props.username) {
      setUsername(props.username);
    }
    if (!email && props.email) {
      setEmail(props.email);
    }
    if (!date_of_birth && props.date_of_birth) {
      setDate_of_birth(props.date_of_birth);
    }
    if (!firstName && props.firstName) {
      setFirstName(props.firstName);
    }
    if (!lastName && props.lastName) {
      setLastName(props.lastName);
    }
    if (!occupation && props.occupation) {
      setOccupation(props.occupation);
    }
    if (!location && props.location) {
      setLocation(props.location);
    }
    if (!tag && props.tag) {
      setTag(props.tag);
    }
    if (!bio && props.bio) {
      setBio(props.bio);
    }
    if (!interests && props.interests) {
      setInterests(props.interests);
    }
    if (props.display_name) {
      setDisplay_name(true);
    }
    if (props.display_dob) {
      setDisplay_dob(true);
    }
    if (props.display_occupation) {
      setDisplay_occupation(true);
    }
    if (props.display_location) {
      setDisplay_location(true);
    }
  }, [
    props,
    username,
    email,
    date_of_birth,
    firstName,
    lastName,
    occupation,
    location,
    tag,
    bio,
    interests,
  ]);
  useEffect(() => {
    if(props.tab >= 1) {
      setValue(parseInt(props.tab));
    }
  }, [props.tab, ]);

  function editField(editingField) {
    let target = editingField;
    let field, setField;
    switch (target) {
      case "location":
        field = location;
        setField = setLocation;
        break;
      case "occupation":
        field = occupation;
        setField = setOccupation;
        break;
      case "firstName":
        field = firstName;
        setField = setFirstName;
        break;
      case "lastName":
        field = lastName;
        setField = setLastName;
        break;
      case "bio":
        field = bio;
        setField = setBio;
        break;
      case "tag":
        field = tag;
        setField = setTag;
        break;
      case "username":
        field = username;
        setField = setUsername;
        break;
      case "email":
        field = email;
        setField = setEmail;
        break;
      case "date_of_birth":
        field = date_of_birth;
        setField = setDate_of_birth;
        break;
      default:
        break;
    };
    setFieldData({
      field: field,
      setField: setField
    });
    setEditing(true);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function handleSave(event) {
    let user = {
      username: username,
      email: email,
      date_of_birth: date_of_birth,
      first_name: firstName,
      last_name: lastName,
      location: location,
      occupation: occupation,
      interests: JSON.stringify(interests),
      tag: tag,
      bio: bio,
      display_date_of_birth: display_dob,
      display_full_name: display_name,
      display_location: display_location,
      display_occupation: display_occupation,
      primary_color: props.primary_color,
      secondary_color: props.secondary_color
    };
    let API_URL = URL + `/api/user/profile/edit/${props.username}`;

    save(user, API_URL, props.auth_token)
      .then(userData => {
        props.addUser(userData);
        setUserCookie('user', userData, '/');
        setHasChanged(false);
        setSaved(true);
      });
  }

  let helper = {
    message: (
      <div style={{ display: 'inline-flex', alignItems: 'center' }}>
        <Edit fontSize={"small"} color={"primary"} />
        <p>Click on any <span className={classes.themeColor}>COLORED</span> item to edit the data</p>
      </div>
    ),
    action: (
      <Button color="secondary" size="small" variant={"contained"}>
        DON'T SHOW TIPS
      </Button>
    )
  };

  return (
    <div className={classes.root}>

      {/* Helper snackbar displays helper messages */}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={helperActive}
        autoHideDuration={6000}
        onClose={(event) => setHelperActive(false)}
        message={helper.message}
        action={helper.action}
      />

      {/* Save snackbar */}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={hasChanged}
        // autoHideDuration={6000}
        onClose={(event) => setSaved(false)}
        message={
          <p>Changes will not become permanent until saved</p>
        }
        action={
          <Button color={"secondary"} variant={"contained"} onClick={handleSave}>SAVE</Button>
        }
      />

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={saved}
        autoHideDuration={6000}
        onClose={(event) => setSaved(false)}
        message={
          <p>Your profile changes have been saved!</p>
        }
      />

      {/* Modal Used for editing user data field */}
      <EditingModal
        editing={editing}
        setEditing={setEditing}
        setHasChanged={setHasChanged}
        editingField={fieldData}
      />

      <AppBar position={"static"}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Profile and settings tabs"
          className={classes.tabs}
          variant={"scrollable"}
        >

          <Tab label="Avatar" {...a11yProps(0)} />
          <Tab
            label="Friends"
            {...a11yProps(1)}
            onClick={() => {
              if (props.viewingFriend) {
                props.setViewingFriend(!props.viewingFriend);
              }
            }}
          />
          <Tab label="User Settings" {...a11yProps(2)} />
          <Tab label="User Data" {...a11yProps(3)} />
          <Tab label="Profile Data" {...a11yProps(4)} />

        </Tabs>
      </AppBar>

      <div style={{ width: "100%" }}>

        {(value === 2 ||
          value === 3 ||
          value === 4) &&
          <div className={hasChanged ? classes.saveButtonShow : classes.saveButtonHidden}>
            <Button variant={"contained"} onClick={handleSave}>Save Changes</Button>
          </div>
        }

        <TabPanel value={value} index={0} className={classes.tabPanel}>
          <ProfileAvatar />
        </TabPanel>

        <TabPanel value={value} index={1} className={classes.tabPanel}>
          <ProfileFriends viewingFriend={props.viewingFriend} setViewingFriend={props.setViewingFriend} />
        </TabPanel>

        <TabPanel value={value} index={2} className={classes.tabPanel}>
          <ProfileSettings
            display_name={display_name}
            setDisplay_name={setDisplay_name}
            display_dob={display_dob}
            setDisplay_dob={setDisplay_dob}
            display_location={display_location}
            setDisplay_location={setDisplay_location}
            display_occupation={display_occupation}
            setDisplay_occupation={setDisplay_occupation}
            editing={editing}
            setEditing={setEditing}
            hasChanged={hasChanged}
            setHasChanged={setHasChanged}
            editField={editField} />
        </TabPanel>

        <TabPanel value={value} index={3} className={classes.tabPanel}>

          <UserData
            editing={editing}
            setEditing={setEditing}
            username={username}
            setUsername={setUsername}
            email={email}
            setEmail={setEmail}
            date_of_birth={date_of_birth}
            setDate_of_birth={setDate_of_birth}
            hasChanged={hasChanged}
            setHasChanged={setHasChanged}
            editField={editField}
          />

        </TabPanel>

        <TabPanel value={value} index={4} className={classes.tabPanel}>
          <ProfileAbout
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            location={location}
            setLocation={setLocation}
            tag={tag}
            setTag={setTag}
            occupation={occupation}
            setOccupation={setOccupation}
            bio={bio}
            setBio={setBio}
            interests={interests}
            setInterests={setInterests}
            editing={editing}
            setEditing={setEditing}
            hasChanged={hasChanged}
            setHasChanged={setHasChanged}
            editField={editField}
          />
        </TabPanel>
      </div>
    </div>
  );
}

const UserDataTabs = connect(mapStateToProps, mapDispatchToProps)(UserDataTabsComponent);
export default UserDataTabs;