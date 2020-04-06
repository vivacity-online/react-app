import { 
  ADD_USER, 
  ADD_USER_PROFILE, 
  SET_LOGIN, 
  REMOVE_USER,
  SET_NAVIGATION_TAB,
  SET_PRIMARY_COLOR,
  SET_SECONDARY_COLOR,
  SET_DAILY_CHANCE,
  SET_LOADING,
  SET_POPULATION,
  SET_BODY_SCROLL
 } from "../constants/action-types";
  
export function setLoading(payload) {
  return { type: SET_LOADING, payload }
};

export function addUser(payload) {
  return { type: ADD_USER, payload }
};

export function addUserProfile(payload) {
  return { type: ADD_USER_PROFILE, payload}
};

export function removeUser(payload) {
    return { type: REMOVE_USER, payload }
};

export function setLoggingIn(payload) {
    return { type: SET_LOGIN, payload }
};

export function setNavigationTab(payload) {
  return { type: SET_NAVIGATION_TAB, payload }
};

export function setPrimaryColor(payload) {
  return { type: SET_PRIMARY_COLOR, payload }
};

export function setSecondaryColor(payload) {
  return { type: SET_SECONDARY_COLOR, payload }
};

export function setDailyChance(payload) {
  return { type: SET_DAILY_CHANCE, payload }
};

export function setPopulation(payload) {
  return { type: SET_POPULATION, payload }
};

export function setBodyScroll(payload) {
  return { type: SET_BODY_SCROLL, payload }
};