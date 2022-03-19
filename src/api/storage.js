export const initLocalStorage = () => {
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([]));
  }
};

const findUser = (username, userList) => userList.findIndex(u => u.username === username);

export const createUser = (name, username, password) => {
  const users = JSON.parse(localStorage.getItem('users'));
  if (findUser(username, users) >= 0) {
    throw Error('user already exists!');
  }
  users.push({ name, username, password });
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
