import { createClass, getClasses,joinClass } from '../api/services';

export const getAllClasses = async () => {
  console.log('in getAllClasses in classes');
  try {
    const { classes } = await getClasses();
    console.log(classes);
    return classes;
  } catch (e) {
    return e.message;
  }
}


export const createNewClass = async (className, professor) => {
  try {
    const res = await createClass(className, professor);
    return res;
  } catch (e) {
    return e.message
  }
}

export const joinNewClass = async (userId, classId) => {
  try {
    await joinClass(userId, classId);
  } catch (e) {
    return e.message;
  }
  return '';
}