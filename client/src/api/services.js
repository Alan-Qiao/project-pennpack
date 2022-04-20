import { serverPath } from '../consts';

export const createUser = async (name, username, password) => {
  const resp = await fetch(`${serverPath}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, username, password }),
  });
  if (resp.status === 409) {
    throw new Error('User already exists!');
  }
  if (!resp.ok) {
    throw new Error(resp.json().error);
  }
}

export const authenticateUser = async (username, password) => {
  const resp = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  if (resp.status === 404) {
    throw new Error('User does not exist!');
  }
  if (resp.status === 409) {
    throw new Error('Incorrect Password');
  }
  if (!resp.ok) {
    throw new Error(resp.json().error);
  }
  return resp.json();
}

export const disconnectUser = async () => {
  await fetch('/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(),
  });
}

export const isAuthenticated = async () => {
  const resp = await fetch('/authenticate', {
    method: 'GET',
  })
  return resp.ok;
}