const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const request = require('supertest');
const { dbURI } = require('./setUp');
const AccountRouter = require('../routers/accounts');
const ChatRouter = require('../routers/chats');
const User = require('../models/userModel');
const Chat = require('../models/chatModel');
const Message = require('../models/messageModel');

const port = 6666;
let app = null;
let server = null;

beforeAll(async () => {
  await mongoose.connect(dbURI, { useNewURLParser: true, useUnifiedTopology: true }, async err => {
    if (err) {
      console.log(err);
    }
    console.log('Database is connected');
  });
  app = express();
  app.use(express.json());
  app.use(cookieParser());
  app.use(cors({ credentials: true, origin: 'http://localhost:6666', allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Access-Control-Allow-Origin'] }));

  // Endpoints
  app.use('/', AccountRouter);
  app.use('/chat', ChatRouter);

  // error handler
  app.use((err, req, res, next) => {
    if (res.headersSent) {
      next(err);
      return;
    }
    res.status(err.statusCode || 500).json({ error: err, message: err.message });
  });

  server = app.listen(port);
});

beforeEach(async () => {
  await User.create({
    _id: '11198af1657fd6b735c615eb',
    name: 'Francium Sorbet',
    username: 'franSb',
    password: '123pass?',
    classesEnrolled: ['62698af1657fd6b735c615eb'],
  });

  await User.create({
    _id: '55598af1657fd6b735c615eb',
    name: 'Donald Duck',
    username: 'duckie123',
    password: '123pass?',
    classesEnrolled: ['62698af1657fd6b735c615eb'],
    chats: ['00098af1657fd6b735c615eb'],
  });

  await User.create({
    _id: '22298af1657fd6b735c615eb',
    name: 'Princess Diana',
    username: 'princess',
    password: '123pass?',
    classesEnrolled: ['62698af1657fd6b735c615eb'],
    chats: [],
  });

  await Chat.create({
    _id: '00098af1657fd6b735c615eb',
    userIdA: '11198af1657fd6b735c615eb',
    userIdB: '55598af1657fd6b735c615eb',
    messages: [],
  });
});

afterEach(async () => {
  await User.deleteOne({ _id: '11198af1657fd6b735c615eb' });
  await User.deleteOne({ _id: '22298af1657fd6b735c615eb' });
  await User.deleteOne({ _id: '55598af1657fd6b735c615eb' });
  await Chat.deleteOne({ _id: '00098af1657fd6b735c615eb' });
});

afterAll(async () => {
  mongoose.connection.close();
  if (server) server.close();
});

test('/chat/sendmessage sent message 201', async () => {
  const { header } = await request(app).post('/login').send({
    username: 'franSb',
    password: '123pass?',
  });
  const token = header['set-cookie'];

  const resp = await request(app).post('/chat/sendmessage').set('Cookie', token).send({
    message: {
      type: 'text',
      content: 'hey, this is a test',
      sender: '11198af1657fd6b735c615eb',
      chatId: '00098af1657fd6b735c615eb',
    },
  });
  expect(resp.status).toBe(201);
  expect(resp.body.message).toMatch('Message is created');
  expect(resp.body.newlyCreatedMessage.content).toMatch('hey, this is a test');

  const newlyCreatedMessageId = resp.body.newlyCreatedMessage;
  await Message.deleteOne({ newlyCreatedMessageId });
});

test('/chat/messages/chatId retrieved chat messages 200', async () => {
  const { header } = await request(app).post('/login').send({
    username: 'franSb',
    password: '123pass?',
  });
  const token = header['set-cookie'];

  const resp = await request(app).get('/chat/messages/00098af1657fd6b735c615eb').set('Cookie', token);
  expect(resp.status).toBe(200);
  expect(resp.body.message).toMatch('Retrieved chat messages');
});

test('/chat/messages/chatId no chat 404', async () => {
  const { header } = await request(app).post('/login').send({
    username: 'franSb',
    password: '123pass?',
  });
  const token = header['set-cookie'];

  const resp = await request(app).get('/chat/messages/11198af1657fd6b735c615eb').set('Cookie', token);
  expect(resp.status).toBe(404);
  expect(resp.body.error).toMatch('Chat not found');
});

test('/chat/getchats retrieved users chats 200', async () => {
  const { header } = await request(app).post('/login').send({
    username: 'franSb',
    password: '123pass?',
  });
  const token = header['set-cookie'];

  const resp = await request(app).get('/chat/getchats').set('Cookie', token);
  expect(resp.status).toBe(200);
  expect(resp.body.message).toMatch('Retrieved all of users classes');
});

test('/chat/getchats user not found 404', async () => {
  const { header } = await request(app).post('/login').send({
    username: 'franSb',
    password: '123pass?',
  });
  const token = header['set-cookie'];

  await User.deleteOne({ _id: '11198af1657fd6b735c615eb' });

  const resp = await request(app).get('/chat/getchats').set('Cookie', token);
  expect(resp.status).toBe(404);
  expect(resp.body.error).toMatch('user not found');
});

test('/chat/create create new chat 201', async () => {
  const { header } = await request(app).post('/login').send({
    username: 'franSb',
    password: '123pass?',
  });
  const token = header['set-cookie'];

  const resp = await request(app).post('/chat/create').set('Cookie', token).send({
    userBId: '22298af1657fd6b735c615eb',
  });
  expect(resp.status).toBe(201);
  expect(resp.body.message).toMatch('Chat is created');

  const newlyCreatedChatId = resp.body.newlyCreatedChat;
  await Chat.deleteOne({ _id: newlyCreatedChatId });
});

test('/chat/create chat already exists 409', async () => {
  const { header } = await request(app).post('/login').send({
    username: 'franSb',
    password: '123pass?',
  });
  const token = header['set-cookie'];

  const resp = await request(app).post('/chat/create').set('Cookie', token).send({
    userBId: '55598af1657fd6b735c615eb',
  });
  expect(resp.status).toBe(409);
  expect(resp.body.error).toMatch('Chat already exists');
});

test('/chat/create chat already exists part 2, 409', async () => {
  const { header } = await request(app).post('/login').send({
    username: 'duckie123',
    password: '123pass?',
  });
  const token = header['set-cookie'];

  const resp = await request(app).post('/chat/create').set('Cookie', token).send({
    userBId: '11198af1657fd6b735c615eb',
  });
  expect(resp.status).toBe(409);
  expect(resp.body.error).toMatch('Chat already exists');
});
