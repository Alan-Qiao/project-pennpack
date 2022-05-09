import { serverPath } from '../consts';

/** **** MESSAGES ***** */
export const sendNewFileMessage = async message => {
  // Upload the file to Google Cloud Storage
  const data = new FormData();
  data.append('file', message.content);

  const resp = await fetch(`${serverPath}/chat/uploadfile`, {
    method: 'POST',
    body: data,
  });
  let body = await resp.json();

  // Create a new message
  message.content = body.result;
  body = await sendNewMessage(message);
  return body;
};

export const sendNewMessage = async message => {
  const resp = await fetch(`${serverPath}/chat/sendmessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ message }),
  });
  const body = resp.json();
  return body;
};

export const getMessagesByChatId = async chatId => {
  const resp = await fetch(`${serverPath}/chat/messages/${chatId}`, {
    method: 'GET',
    credentials: 'include',
  });
  const body = resp.json();
  return body;
};

export const getUserChats = async () => {
  const resp = await fetch(`${serverPath}/chat/getchats`, {
    method: 'GET',
    credentials: 'include',
  });
  const body = resp.json();
  return body;
};

export const createNewChat = async id => {
  const resp = await fetch(`${serverPath}/chat/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ userBId: id }),
  });
  const body = resp.json();
  return body;
};

/** **** CLASSES ***** */
export const getAllUserClasses = async () => {
  const resp = await fetch(`${serverPath}/class/getuserclasses`, {
    method: 'GET',
    credentials: 'include',
  });
  const body = await resp.json();

  if (resp.status === 400) {
    throw new Error('No classes');
  }
  if (!resp.ok) {
    throw new Error(body.error);
  }

  return body;
};

export const getAllUserClassesByUsername = async username => {
  const resp = await fetch(`${serverPath}/class/getuserclasses/${username}`, {
    method: 'GET',
    credentials: 'include',
  });
  const body = await resp.json();

  if (resp.status === 400) {
    throw new Error('No classes');
  }
  if (!resp.ok) {
    throw new Error(body.error);
  }

  return body;
};

export const createClass = async (className, professor) => {
  const resp = await fetch(`${serverPath}/class/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ className, professor }),
  });
  const body = resp.json();

  if (resp.status === 409) {
    throw new Error('Class already exists!');
  }
  if (!resp.ok) {
    throw new Error(body.error);
  }
  return body;
};

export const getClasses = async () => {
  const resp = await fetch(`${serverPath}/class/getclasses`, {
    method: 'GET',
    credentials: 'include',
  });
  const body = await resp.json();

  if (resp.status === 400) {
    throw new Error('No classes');
  }
  if (!resp.ok) {
    throw new Error(body.error);
  }

  return body;
};

export const readClassById = async classId => {
  const resp = await fetch(`${serverPath}/class/readbyid/${classId}`, {
    method: 'GET',
    credentials: 'include',
  });
  const body = await resp.json();

  if (resp.status === 404) {
    throw new Error('Class not found');
  }
  if (!resp.ok) {
    throw new Error(body.error);
  }
  return body.class;
};

export const readClass = async name => {
  console.log(name);
  const resp = await fetch(`${serverPath}/class/read/${name}`, {
    method: 'GET',
    credentials: 'include',
  });
  const body = await resp.json();

  if (resp.status === 404) {
    throw new Error('Class not found');
  }
  if (!resp.ok) {
    throw new Error(body.error);
  }
  return body.class;
};

export const joinClass = async classId => {
  console.log(classId);
  const resp = await fetch(`${serverPath}/class/join`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ classId }),
  });
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
  return body;
};

/** **** ACCOUNTS ***** */
export const getUserByUsername = async name => {
  console.log('in getUserByUsername');
  const resp = await fetch(`${serverPath}/getuser/${name}`, {
    method: 'GET',
    credentials: 'include',
  });
  const body = await resp.json();
  console.log(body);

  if (resp.status === 404) {
    throw new Error('User not found');
  }
  if (!resp.ok) {
    throw new Error(body.error);
  }
  return body;
};

export const getUser = async () => {
  const resp = await fetch(`${serverPath}/getuser`, {
    method: 'GET',
    credentials: 'include',
  });
  const body = await resp.json();

  if (resp.status === 404) {
    throw new Error('User not found');
  }
  if (!resp.ok) {
    throw new Error(body.error);
  }
  return body;
};

export const createUser = async (name, username, password) => {
  console.log('in createUser');
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
};

export const authenticateUser = async (username, password) => {
  console.log('in authenticate user');
  const resp = await fetch(`${serverPath}/login`, {
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
};

export const disconnectUser = async () => {
  await fetch(`${serverPath}/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(),
  });
};

export const isAuthenticated = async () => {
  const resp = await fetch('/authenticate', {
    method: 'GET',
    credentials: 'include',
  });
  return resp.ok;
};
