import { serverPath } from '../consts';

/****** MESSAGES ******/
export const sendNewMessage = async (message) => {
  console.log('in sendNewMessage in services');

  const resp = await fetch(`${serverPath}/chat/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ message }),
  })
  const body = resp.json();
  return body;
}

export const getMessagesByChatId = async (chatId) => {
  console.log('in getMessagesByChatId in services');

  const resp = await fetch(`${serverPath}/chat/messages/${chatId}`, {
    method: 'GET',
    credentials: 'include',
  })
  const body = resp.json();
  return body;
}

export const getUserChats = async () => {
  console.log('in getUserChats in services');

  const resp = await fetch(`${serverPath}/chat/getchats`, {
    method: 'GET',
    credentials: 'include',
  })
  const body = resp.json();
  return body;
}


export const createNewChat = async (id) => {
  console.log('in createNewChat in services');

  const resp = await fetch(`${serverPath}/chat/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ userBId: id }),
  })
  const body = resp.json();
  return body;
}

/****** CLASSES ******/
export const getAllUserClasses = async () => {
  const resp = await fetch(`${serverPath}/class/getuserclasses`, {
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

export const getAllUserClassesByUsername = async (username) => {
  const resp = await fetch(`${serverPath}/class/getuserclasses/${username}`, {
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

export const readClassById = async (classId) => {
  const resp = await fetch(`/class/readbyid/${classId}`, {
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
export const getUserByUsername = async (name) => {
  const resp = await fetch(`/getuser/${name}`, {
    method: 'GET',
    credentials: 'include'
  });
  const body = await resp.json();

  if (resp.status === 404) {
    throw new Error('User not found');
  }
  if (!resp.ok) {
    throw new Error(body.error);
  }
  return body
}

export const getUser = async () => {
  const resp = await fetch(`/getuser`, {
    method: 'GET',
    credentials: 'include'
  });
  const body = await resp.json();

  if (resp.status === 404) {
    throw new Error('User not found');
  }
  if (!resp.ok) {
    throw new Error(body.error);
  }
  return body
}

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