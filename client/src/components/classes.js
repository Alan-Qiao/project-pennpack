import { createClass, getClasses } from '../api/services';

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
