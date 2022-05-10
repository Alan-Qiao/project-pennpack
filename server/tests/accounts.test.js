const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const request = require('supertest');
const { dbURI } = require('./setUp');
const AccountRouter = require('../routers/accounts');
const User = require('../models/userModel');

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
    _id: '633f5a3d73708c2029482058',
    name: 'Francium Sorbet',
    username: 'franSb',
    password: '123pass?',
  });
});

afterEach(async () => {
  await User.deleteOne({ _id: '633f5a3d73708c2029482058' });
});

afterAll(async () => {
  mongoose.connection.close();
  if (server) server.close();
});

test('/getuser/:username find user 200', async () => {
  // log in to pass authenticator
  const { header } = await request(app).post('/login').send({
    username: 'franSb',
    password: '123pass?',
  });
  const token = header['set-cookie'];

  const resp = await request(app).get('/getuser/franSb').set('Cookie', token);
  expect(resp.status).toBe(200);
  expect(resp.body.message).toMatch('Read User');
  expect(resp.body.user.username).toMatch('franSb');
});

test('/getuser/:username user not exist 404', async () => {
  // log in to pass authenticator
  const { header } = await request(app).post('/login').send({
    username: 'franSb',
    password: '123pass?',
  });
  const token = header['set-cookie'];

  const resp = await request(app).get('/getuser/frankel').set('Cookie', token);
  expect(resp.status).toBe(404);
  expect(resp.body.error).toMatch('User not found');
});

test('/getuser get info of logged in user 200', async () => {
  // log in to pass authenticator
  const { header } = await request(app).post('/login').send({
    username: 'franSb',
    password: '123pass?',
  });
  const token = header['set-cookie'];

  const resp = await request(app).get('/getuser').set('Cookie', token);
  expect(resp.status).toBe(200);
  expect(resp.body.user.username).toMatch('franSb');
});

test('/getuser not logged in 403', async () => {
  const resp = await request(app).get('/getuser');
  expect(resp.status).toBe(403);
  expect(resp.body.error).toMatch('User is not authenticated');
});

test('/login existing user 200', async () => {
  const resp = await request(app).post('/login').send({
    username: 'franSb',
    password: '123pass?',
  });
  expect(resp.status).toBe(200);
  expect(resp.body.message).toMatch('Logged in franSb');
  expect(resp.body.user.username).toMatch('franSb');
});

test('/login nonexistant user 404', async () => {
  const resp = await request(app).post('/login').send({
    username: 'frankel',
    password: '123pass?',
  });
  expect(resp.status).toBe(404);
  expect(resp.body.error).toMatch('user not found');
});

test('/login incorrect password 401', async () => {
  const resp = await request(app).post('/login').send({
    username: 'franSb',
    password: 'wrongpassword',
  });
  expect(resp.status).toBe(401);
  expect(resp.body.error).toMatch('incorrect password');
});

test('/login locked account 403', async () => {
  await request(app).post('/login').send({
    username: 'franSb',
    password: 'wrongpassword',
  });
  await request(app).post('/login').send({
    username: 'frankel',
    password: 'wrongpassword',
  });
  await request(app).post('/login').send({
    username: 'franSb',
    password: 'wrongpassword',
  });
  await request(app).post('/login').send({
    username: 'franSb',
    password: 'wrongpassword',
  });
  const resp = await request(app).post('/login').send({
    username: 'franSb',
    password: '123pass?',
  });
  expect(resp.status).toBe(403);
  expect(resp.body.error).toMatch('account is locked');
});

test('/logout removes token and logs out user 200', async () => {
  const { header } = await request(app).post('/login').send({
    username: 'franSb',
    password: '123pass?',
  });
  const token = header['set-cookie'];
  const resp = await request(app).post('/logout').set('Cookie', token);
  expect(resp.status).toBe(200);
  expect(resp.body.message).toMatch('Logged out.');
});

test('/logout not logged in  403', async () => {
  const resp = await request(app).post('/logout');
  expect(resp.status).toBe(403);
  expect(resp.body.error).toMatch('User is not authenticated');
});

test('/signup new user 201', async () => {
  const resp = await request(app).post('/signup').send({
    name: 'May',
    username: 'mayS',
    password: 'newpass',
  });
  expect(resp.status).toBe(201);
  expect(resp.body.message).toMatch('User created');
  await User.deleteOne({ username: 'mayS' });
});

test('/signup missing arguments 400', async () => {
  let resp = await request(app).post('/signup').send({
    name: 'May',
    password: 'newpass',
  });
  expect(resp.status).toBe(400);
  expect(resp.body.error).toMatch('Missing Required Information');
  resp = await request(app).post('/signup').send({
    username: 'mayS',
    password: 'newpass',
  });
  expect(resp.status).toBe(400);
  expect(resp.body.error).toMatch('Missing Required Information');
  resp = await request(app).post('/signup').send({
    name: 'May',
    username: 'mayS',
  });
  expect(resp.status).toBe(400);
  expect(resp.body.error).toMatch('Missing Required Information');
});

test('/signup invalid input 400', async () => {
  let resp = await request(app).post('/signup').send({
    name: 'May??',
    username: 'mayS',
    password: 'newpass',
  });
  expect(resp.status).toBe(400);
  expect(resp.body.error).toMatch('Invalid Username or Name');
  resp = await request(app).post('/signup').send({
    name: 'May',
    username: 'may S',
    password: 'newpass',
  });
  expect(resp.status).toBe(400);
  expect(resp.body.error).toMatch('Invalid Username or Name');
});

test('/signup existing user 409', async () => {
  const resp = await request(app).post('/signup').send({
    name: 'Francium Sorbet',
    username: 'franSb',
    password: '123pass?',
  });
  expect(resp.status).toBe(409);
  expect(resp.body.error).toMatch('Username already exists');
});

test('/resetPassword sets new password 200', async () => {
  const resp = await request(app).post('/resetPassword').send({
    username: 'franSb',
    password: 'pass123?',
  });
  expect(resp.status).toBe(200);
  expect(resp.body.message).toMatch('Password Updated');
  const loginResp = await request(app).post('/login').send({
    username: 'franSb',
    password: 'pass123?',
  });
  expect(loginResp.status).toBe(200);
});

test('/resetPassword missing info 400', async () => {
  let resp = await request(app).post('/resetPassword').send({
    username: 'franSb',
  });
  expect(resp.status).toBe(400);
  expect(resp.body.error).toMatch('Missing Required Information');
  resp = await request(app).post('/resetPassword').send({
    password: 'pass123?',
  });
  expect(resp.status).toBe(400);
  expect(resp.body.error).toMatch('Missing Required Information');
});

test('/resetPassword user does not exist 404', async () => {
  const resp = await request(app).post('/resetPassword').send({
    username: 'frankle',
    password: 'pass123?',
  });
  expect(resp.status).toBe(404);
  expect(resp.body.error).toMatch('User does not exist');
});

test('/authenticate user is logged in 200', async () => {
  const { header } = await request(app).post('/login').send({
    username: 'franSb',
    password: '123pass?',
  });
  const token = header['set-cookie'];

  const resp = await request(app).get('/authenticate').set('Cookie', token);
  expect(resp.status).toBe(200);
  expect(resp.body.message).toMatch('authenticated');
});

test('/authenticate user is not logged in 401', async () => {
  const resp = await request(app).get('/authenticate');
  expect(resp.status).toBe(401);
  expect(resp.body.message).toMatch('unauthenticated');
});
