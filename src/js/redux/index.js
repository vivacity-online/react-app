import store from "./store/index";
import { setLoading, addUser, addUserProfile, removeUser, setLoggingIn, setPrimaryColor, setSecondaryColor } from "./actions/index";

window.store = store;
window.setLoading = setLoading;
window.addUser = addUser;
window.addUserProfile = addUserProfile;
window.removeUser = removeUser;
window.setLoggingIn = setLoggingIn;
window.setPrimaryColor = setPrimaryColor;
window.setSecondaryColor = setSecondaryColor;
