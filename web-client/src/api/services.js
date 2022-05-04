import { serverPath } from '../consts';

/****** CLASSES ******/
export const createClass = async (className, professor) => {
  const resp = await fetch(`${serverPath}/class/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ className, professor }),
  })
  const body = resp.json();

  if (resp.status === 409) {
    throw new Error('Class already exists!');
  }
  if (!resp.ok) {
    throw new Error(body.error);
  }
  return body;
}

export const getClasses = async () => {
  console.log('in getClasses in services');
  const resp = await fetch(`${serverPath}/class/getclasses`, {
    method: 'GET',
    credentials: 'include',
  })
  const body = await resp.json();

  if (resp.status === 400) {
    throw new Error('No classes');
  }
  if (!resp.ok) {
    throw new Error(body.error);
  }

  return body;
}

export const readClass = async (name) => {
  console.log(name);
  const resp = await fetch(`/class/read/${name}`, {
    method: 'GET',
    credentials: 'include'
  });
  const body = await resp.json();

  if (resp.status === 404) {
    throw new Error('Class not found');
  }
  if (!resp.ok) {
    throw new Error(body.error);
  }
  return body.class
}

export const joinClass = async (classId) => {
  console.log( classId );
  const resp = await fetch(`${serverPath}/class/join`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ classId })
  })
  const body = await resp.json();

  if (resp.status === 404) {
    throw new Error('class not found');
  }
  if (resp.status === 409) {
    throw new Error('user in class');
  }
  if (!resp.ok) {
    throw new Error(body.error);
  }
}


/****** ACCOUNTS ******/
export const createUser = async (name, username, password) => {
  const resp = await fetch(`${serverPath}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ name, username, password }),
  });
  const body = await resp.json();

  if (resp.status === 409) {
    throw new Error('User already exists!');
  }
  if (!resp.ok) {
    throw new Error(body.error);
  }
}

export const authenticateUser = async (username, password) => {
  const resp = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ username, password }),
  });
  const body = await resp.json();
  if (resp.status === 404) {
    throw new Error('User does not exist!');
  }
  if (resp.status === 401) {
    throw new Error('Incorrect Password');
  }
  if (!resp.ok) {
    throw new Error(body.error);
  }
  return body;
}

export const disconnectUser = async () => {
  await fetch('/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(),
  });
}

export const isAuthenticated = async () => {
  const resp = await fetch('/authenticate', {
    method: 'GET',
    credentials: 'include',
  })
  return resp.ok;
}