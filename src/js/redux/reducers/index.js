import { 
  ADD_USER, 
  ADD_USER_PROFILE, 
  REMOVE_USER, 
  SET_LOGIN, 
  SET_NAVIGATION_TAB ,
  SET_PRIMARY_COLOR,
  SET_SECONDARY_COLOR,
  SET_DAILY_CHANCE,
  SET_LOADING,
  SET_POPULATION,
  SET_BODY_SCROLL
} from "../constants/action-types";
import URL from '../../conf';

const API_URL = URL;

const ANNON_USER = {
  username: "",
  isAuthenticated: false,
  avatar: {
    url: `${API_URL}/media/avatars/DEFAULT/dressedAvatar-300x516.png`,
  },
  friends: [],
};

const initialState = {
    loading: false,
    user: ANNON_USER,
    userProfile: ANNON_USER,
    helper: true, // Display helper snackbar whenever an action is available
    loggingIn: false, // Made available to trigger Login modal from any component
    registering: false,
    dailyChance: true,
    navigationTab: 0,
    population: "",
    bodyScroll: "initial",
    primary_color: "#8115C4",
    secondary_color: "#e67a63",
  };

function userReducer(validUser) {
    let avatar = {
      url: validUser.avatar,
      thumbnail: validUser.avatar_thumbnail
    };
    let currency = {
      shinies: validUser.shinies,
      muns: validUser.muns
    }
    let user = {
      username: validUser.username,
      isAuthenticated: validUser.isAuthenticated,
      avatar: avatar,
      currency: currency,
      auth_token: validUser.auth_token,
    };
    return user
};

function rootReducer(state = initialState, action) {

  if (action.type === SET_LOADING) {
    return Object.assign({}, state, {
      loading: action.payload
    });
  }

  if (action.type === ADD_USER) {
    return Object.assign({}, state, {
      user: userReducer(action.payload),
      primary_color: action.payload.primary_color,
      secondary_color: action.payload.secondary_color,
      dailyChance: action.payload.dailyChance
    });
  }
  
  if (action.type === ADD_USER_PROFILE){
    return Object.assign({}, state, {
      userProfile: action.payload,
      primary_color: action.payload.primary_color,
      secondary_color: action.payload.secondary_color,
      dailyChance: action.payload.dailyChance
    });
  }
  
  if (action.type === REMOVE_USER) {
    return Object.assign({}, state, {
      user: ANNON_USER,
      userProfile: ANNON_USER
    });
  }
  
  if (action.type === SET_LOGIN) {
    return Object.assign({}, state, {
      loggingIn: action.payload
    });
  }

  if (action.type === SET_NAVIGATION_TAB ) {
    return Object.assign({}, state, {
      navigationTab: action.payload
    });
  }

  if (action.type === SET_PRIMARY_COLOR ) {
    return Object.assign({}, state, {
      primary_color: action.payload
    });
  }

  if (action.type === SET_SECONDARY_COLOR ) {
    return Object.assign({}, state, {
      secondary_color: action.payload
    });
  }

  if (action.type === SET_DAILY_CHANCE ) {
    return Object.assign({}, state, {
      dailyChance: action.payload
    });
  }

  if (action.type === SET_POPULATION) {
    return Object.assign({}, state, {
      population: action.payload
    });
  }

  if (action.type === SET_BODY_SCROLL) {
    return Object.assign({}, state, {
      bodyScroll: action.payload
    })
  }
  return state;
};
  
export default rootReducer;