import { createClass, getClasses,joinClass } from '../api/services';

export const getAllClasses = () => {
  console.log('in getAllClasses in classes');
  try {
    const { classes } = getClasses();
    console.log(classes);
    return classes;
  } catch (e) {
    return e.message;
  }
}


export const createNewClass = (className, professor) => {
  try {
    createClass(className, professor);
  } catch (e) {
    return e.message;
  }
  return '';
}

export const joinNewClass = (userId, classId) => {
  try {
    joinClass(userId, classId);
  } catch (e) {
    return e.message;
  }
  return '';
}