import { createUser, authenticateUser, disconnectUser } from '../api/services';
import { setClassList } from '../redux/classListSlice';

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

export const loginUser = async (dispatch, username, password) => {
  try {
    const { user } = await authenticateUser(username, password);
    console.log(user.classesEnrolled);
    dispatch(setClassList(['CIS 350']));
  } catch (e) {
    return e.message;
  }
  return '';
};

export const logoutUser = async () => {
  await disconnectUser();
};
