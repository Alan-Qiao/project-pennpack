import {
  createUser,
  authenticateUser,
  disconnectUser,
  getUser,
  getUserByUsername,
} from '../api/services';

const validUsername = /^[0-9a-z\-_]+$/i;
const validName = /^([0-9a-z.'-] ?)+$/i;

const validateString = (str, pattern) => Boolean(str.match(pattern));

export const getUserInfo = async () => {
  try {
    const { user } = await getUser();
    return user;
  } catch (e) {
    return e.message;
  }
};

export const getUserInfoByUsername = async name => {
  try {
    const { user } = await getUserByUsername(name);
    return user;
  } catch (e) {
    return e.message;
  }
};

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

export const loginUser = async (username, password) => {
  try {
    await authenticateUser(username, password);
  } catch (e) {
    return e.message;
  }
  return '';
};

export const logoutUser = async () => {
  await disconnectUser();
};
