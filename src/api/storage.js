const fakeData = require('./temporary.json');

export const initLocalStorage = () => {
  localStorage.clear();
  localStorage.setItem('users', JSON.stringify(fakeData.users));
  localStorage.setItem('classes', JSON.stringify(fakeData.classes));
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([]));
    localStorage.setItem('classes', JSON.stringify([]));
  }
};

/* User Section */

const findUser = (username, userList) => userList.findIndex(u => u.username === username);

export const createUser = (name, username, password) => {
  const users = JSON.parse(localStorage.getItem('users'));
  if (findUser(username, users) >= 0) {
    throw Error('user already exists!');
  }
  users.push({ name, username, password, classes: [] });
  localStorage.setItem('users', JSON.stringify(users));
};

export const readUser = (username, password) => {
  const users = JSON.parse(localStorage.getItem('users'));
  const ind = findUser(username, users);
  if (ind < 0) {
    throw Error('user does not exist!');
  }
  if (users[ind].password !== password) {
    throw Error('incorrect password');
  }
  return users[ind];
};

export const updateUser = (username, payload) => {
  const users = JSON.parse(localStorage.getItem('users'));
  const ind = findUser(username, users);
  if (ind < 0) {
    throw Error('cannot update nonexistent user!');
  }
  users[ind] = { ...users[ind], ...payload };
  localStorage.setItem('users', JSON.stringify(users));
};

export const deleteUser = username => {
  const users = JSON.parse(localStorage.getItem('users'));
  const ind = findUser(username, users);
  if (ind < 0) {
    throw Error('cannot delete nonexistent user!');
  }
  users.splice(ind, 1);
  localStorage.setItem(users, JSON.stringify(users));
};

/* Class Section */
const findById = (id, objList) => objList.findIndex(obj => obj.id === id.toLowerCase());

export const createClass = (id, { professor, days }) => {
  const classes = JSON.parse(localStorage.getItem('classes'));
  if (findById(id, classes) >= 0) {
    throw Error('Class already exists!');
  }
  classes.push({ id: id.toLowerCase(), professor, days: days || [] });
  localStorage.setItem('classes', JSON.stringify(classes));
};

export const removeClass = id => {
  const classes = JSON.parse(localStorage.getItem('classes'));
  const ind = findById(id, classes);
  if (ind < 0) {
    throw Error('Cannot delete nonexistent class!');
  }
  classes.splice(ind, 1);
  localStorage.setItem('classes', JSON.stringify(classes));
};

export const readClass = id => {
  const classes = JSON.parse(localStorage.getItem('classes'));
  const ind = findById(id, classes);
  if (ind < 0) {
    throw Error('Class not found!');
  }
  return classes[ind];
};

/* Class Day Section */
export const addClassDay = (classId, dayId, { type, date, topic, notes }) => {
  const classes = JSON.parse(localStorage.getItem('classes'));
  const classInd = findById(classId, classes);
  if (classInd < 0) {
    throw Error('Cannot add day to nonexistent class!');
  }
  const { days, ...classAttr } = classes[classInd];
  days.push({ id: dayId.toLowerCase(), type, date, topic, notes: notes || [] });
  classes[classInd] = { ...classAttr, days };
  localStorage.setItem('classes', JSON.stringify(classes));
};

export const removeClassDay = (classId, dayId) => {
  const classes = JSON.parse(localStorage.getItem('classes'));
  const classInd = findById(classId, classes);
  if (classInd < 0) {
    throw Error('Cannot remove day from nonexistent class!');
  }
  const { days, ...classAttr } = classes[classInd];
  const dayInd = findById(dayId, days);
  if (dayInd < 0) {
    throw Error('Cannot remove nonexistant day!');
  }
  days.splice(dayInd, 1);
  classes[classInd] = { ...classAttr, days };
  localStorage.setItem('classes', JSON.stringify(classes));
};

/* Class Day Notes Section */
export const addNote = (
  classId,
  dayId,
  noteId,
  { username, date, body, attachment, likes, comments },
) => {
  const classes = JSON.parse(localStorage.getItem('classes'));
  const classInd = findById(classId, classes);
  if (classInd < 0) {
    throw Error('Cannot add note to nonexistent class!');
  }
  const { days, ...classAttr } = classes[classInd];
  const dayInd = findById(dayId, days);
  if (dayInd < 0) {
    throw Error('Cannot add note to nonexistant day!');
  }
  const { notes, ...dayAttr } = days[dayInd];
  if (findById(noteId, notes) >= 0) {
    throw Error('Note already exists!');
  }
  notes.push({
    noteId: noteId.toLowerCase(),
    username,
    date,
    body,
    attachment,
    likes,
    comments: comments || [] });
  days[dayInd] = { ...dayAttr, notes };
  classes[classInd] = { ...classAttr, days };
  localStorage.setItem('classes', JSON.stringify(classes));
};

export const removeNote = (classId, dayId, noteId) => {
  const classes = JSON.parse(localStorage.getItem('classes'));
  const classInd = findById(classId, classes);
  if (classInd < 0) {
    throw Error('Cannot remove note from nonexistent class!');
  }
  const { days, ...classAttr } = classes[classInd];
  const dayInd = findById(dayId, days);
  if (dayInd < 0) {
    throw Error('Cannot remove note from nonexistant day!');
  }
  const { notes, ...dayAttr } = days[dayInd];
  const noteInd = findById(noteId, notes);
  if (noteInd >= 0) {
    throw Error('Cannot nonexistent note!');
  }
  notes.splice(noteInd, 1);
  days[dayInd] = { ...dayAttr, notes };
  classes[classInd] = { ...classAttr, days };
  localStorage.setItem('classes', JSON.stringify(classes));
};
