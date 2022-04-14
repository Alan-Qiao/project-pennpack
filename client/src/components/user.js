import { resetCurrentUser, updateName, updatePassword, updateUsername } from '../redux/currentUserSlice';
import { setClassList } from '../redux/classListSlice';
import { createUser, readUser } from '../api/storage';

const validUsername = /^[0-9a-z\-_]+$/i;
const validName = /^([0-9a-z.'-] ?)+$/i;

const validateString = (str, pattern) => Boolean(str.match(pattern));

export const signupUser = (name, username, password) => {
  if (!validateString(name, validName)) {
    return 'Invalid Name, please try again';
  }
  if (!validateString(username, validUsername)) {
    return 'Invalid Username, use letters, numbers, underscore, & hyphen';
  }
  try {
    createUser(name, username, password);
  } catch (e) {
    return e.message;
  }
  return '';
};

export const loginUser = (dispatch, username, password) => {
  // const dispatch = useDispatch();
  try {
    const user = readUser(username, password);
    dispatch(updateName(user.name));
    dispatch(updateUsername(user.username));
    dispatch(updatePassword(user.password));
    dispatch(setClassList(user.classes));
  } catch (e) {
    return e.message;
  }
  return '';
};

export const logoutUser = dispatch => {
  dispatch(resetCurrentUser());
};

export const updateUser = (dispatch, name, password) => {
  if (name && !validateString(name, validName)) {
    return 'Invalid Name, please try again';
  }
  if (name) {
    dispatch(updateName(name));
  }
  if (password) {
    dispatch(updatePassword(password));
  }
  return '';
};
