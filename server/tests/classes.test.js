const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const request = require('supertest');
const { dbURI } = require('./setUp');
const AccountRouter = require('../routers/accounts');
const ClassRouter = require('../routers/classes');
const User = require('../models/userModel');
const Class = require('../models/classModel');
const ClassDay = require('../models/classDayModel');

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
  app.use('/class', ClassRouter);

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
    classesEnrolled: ['62698af1657fd6b735c615eb'],
  });

  await Class.create({
    _id: '62698af1657fd6b735c615eb',
    className: 'CIS240',
    professor: 'Farmer',
  });
});

afterEach(async () => {
  await User.deleteOne({ _id: '633f5a3d73708c2029482058' });
  await Class.deleteOne({ _id: '62698af1657fd6b735c615eb' });
});

afterAll(async () => {
  mongoose.connection.close();
  if (server) server.close();
});

test('/class/getuserclasses retrieve user classes 200', async () => {
  // log in to pass authenticator
  const { header } = await request(app).post('/login').send({
    username: 'franSb',
    password: '123pass?',
  });
  const token = header['set-cookie'];

  const resp = await request(app).get('/class/getuserclasses').set('Cookie', token);
  expect(resp.status).toBe(200);
  expect(resp.body.message).toMatch('Retrieved all of users classes');
  expect(resp.body.userClasses[0]).toMatch('62698af1657fd6b735c615eb');
});

test('/class/getuserclasses/:username retrieve user classes 200', async () => {
  const resp = await request(app).get('/class/getuserclasses/franSb');
  expect(resp.status).toBe(200);
  expect(resp.body.message).toMatch('Retrieved all of users classes');
  expect(resp.body.userClasses[0]).toMatch('62698af1657fd6b735c615eb');
});

test('/class/getclasses retrieve classes 200', async () => {
  const resp = await request(app).get('/class/getclasses');
  expect(resp.status).toBe(200);
  expect(resp.body.message).toMatch('Retrieved all of the classes');
  expect(resp.body.classes[0]._id).toMatch('62698af1657fd6b735c615eb');
});

// test('/class/getclasses no classes 400', async () => {
//   await Class.deleteOne({ _id: '62698af1657fd6b735c615eb' });
//   const resp = await request(app).get('/class/getclasses');
//   expect(resp.status).toBe(400);
//   expect(resp.body.error).toMatch('No classes');
// });

test('/class/create retrieve classes 200', async () => {
  const resp = await request(app).post('/class/create').send({
    className: 'CIS350',
    professor: 'Fouh',
  });
  expect(resp.status).toBe(201);
  expect(resp.body.message).toMatch('Class is created');
  expect(resp.body.className).toMatch('CIS350');

  await Class.deleteOne({ className: 'CIS350' });
});

test('/class/create retrieve classes no professor 400', async () => {
  const resp = await request(app).post('/class/create').send({
    className: 'CIS350',
  });
  expect(resp.status).toBe(400);
  expect(resp.body.error).toMatch('Missing Required Information');
});

test('/class/create existing class 409', async () => {
  const resp = await request(app).post('/class/create').send({
    className: 'CIS240',
    professor: 'Farmer',
  });
  expect(resp.status).toBe(409);
  expect(resp.body.error).toMatch('class already exists');
});

test('/class/join user joined class 201', async () => {
  await Class.create({
    _id: '55598af1657fd6b735c615eb',
    className: 'CIS471',
    professor: 'Devietti',
  });

  // log in to pass authenticator
  const { header } = await request(app).post('/login').send({
    username: 'franSb',
    password: '123pass?',
  });
  const token = header['set-cookie'];

  const resp = await request(app).post('/class/join').set('Cookie', token).send({
    classId: '55598af1657fd6b735c615eb',
  });
  expect(resp.status).toBe(201);
  expect(resp.body.message).toMatch('user joined class');

  await Class.deleteOne({ className: 'CIS471' });
});

test('/class/join class not found 404', async () => {
  // log in to pass authenticator
  const { header } = await request(app).post('/login').send({
    username: 'franSb',
    password: '123pass?',
  });
  const token = header['set-cookie'];

  const resp = await request(app).post('/class/join').set('Cookie', token).send({
    classId: '55598af1657fd6b735c615eb',
  });
  expect(resp.status).toBe(404);
  expect(resp.body.error).toMatch('class not found');
});

test('/class/join user already in class 409', async () => {
  // log in to pass authenticator
  const { header } = await request(app).post('/login').send({
    username: 'franSb',
    password: '123pass?',
  });
  const token = header['set-cookie'];

  const resp = await request(app).post('/class/join').set('Cookie', token).send({
    classId: '62698af1657fd6b735c615eb',
  });
  expect(resp.status).toBe(409);
  expect(resp.body.error).toMatch('user already in class');
});

test('/class/read/classname read class 200', async () => {
  const resp = await request(app).get('/class/read/CIS240');
  expect(resp.status).toBe(200);
  expect(resp.body.message).toMatch('Read Class Data');
});

test('/class/read/classname class not found 404', async () => {
  const resp = await request(app).get('/class/read/CIS471');
  expect(resp.status).toBe(404);
  expect(resp.body.error).toMatch('class not found');
});

test('/class/readbyid/classId read class 200', async () => {
  const resp = await request(app).get('/class/readbyid/62698af1657fd6b735c615eb');
  expect(resp.status).toBe(200);
  expect(resp.body.message).toMatch('Read Class Data');
});

// test('/class/readbyid/classId class not found 404', async () => {
//   const resp = await request(app).get('/class/readbyid/55598af1657fd6b735c615eb');
//   expect(resp.status).toBe(404);
//   expect(resp.body.error).toMatch('class not found');
// });

test('/class/addDay class not found 404', async () => {
  const resp = await request(app).get('/class/addDay/cis371');
  expect(resp.status).toBe(404);
});

test('/class/readbyid/classId class not found 404', async () => {
  const resp = await request(app).get('/class/readbyid/55598af1657fd6b735c615eb');
  expect(resp.status).toBe(404);
  expect(resp.body.error).toMatch('class not found');
});

test('/class/addDay class day added 200', async () => {
  await ClassDay.create({
    classId: '62698af1657fd6b735c615eb',
    date: new Date('10/26/2012'),
    type: 'Recitation',
    topic: 'hi',
    notes: [],
  });

  const { header } = await request(app).post('/login').send({
    username: 'franSb',
    password: '123pass?',
  });
  const token = header['set-cookie'];

  const resp = await request(app).post('/class/addDay').set('Cookie', token).send({
    className: 'CIS240',
    date: new Date('10/26/2012'),
    type: 'Recitation',
    topic: 'hi',

  });
  expect(resp.status).toBe(201);
  expect(resp.body.message).toMatch('Class Day successfully created');
  await ClassDay.deleteOne({ type: 'Recitation' });
});

test('/class/readDays/classId class not found 404', async () => {
  const { header } = await request(app).post('/login').send({
    username: 'franSb',
    password: '123pass?',
  });
  const token = header['set-cookie'];

  const resp = await request(app).get('/class/readDays/55598af1657fd6b735c615eb').set('Cookie', token);
  expect(resp.status).toBe(404);
});

test('/class/addNote class note found 404', async () => {
  const { header } = await request(app).post('/login').send({
    username: 'franSb',
    password: '123pass?',
  });
  const token = header['set-cookie'];
  const resp = await request(app).post('/class/addNote').set('Cookie', token).send({
    classDayId: '55598af1657fd6b735c615eb',
    description: 'these are my notes',
    link: 'fakenote.com',

  });
  expect(resp.status).toBe(404);
});

test('/class/addNote error 500', async () => {
  const { header } = await request(app).post('/login').send({
    username: 'franSb',
    password: '123pass?',
  });
  const token = header['set-cookie'];
  const resp = await request(app).post('/class/addNote').set('Cookie', token).send({
    classDayId: '55598af1657fd6b735c615',
    description: 'CIS240',
    link: 'fakenote.com',
  });
  expect(resp.status).toBe(500);
});

test('/class/updateNote updateNote successful', async () => {
  const resp = await request(app).post('/class/updateNote').send({
    noteId: '55598af1657fd6b735c615ggjjhjgjeb',
    description: 'cis240',
    link: new Date('10/26/2012'),

  });
  expect(resp.status).toBe(500);
});

test('/class/readNotes/:classId class not found 404', async () => {
  const resp = await request(app).get('/class/readNotes/55598af1657fkkkd6b735c615eb');
  expect(resp.status).toBe(500);
});

test('/class/readClassDay class not found 404', async () => {
  const resp = await request(app).get('/class/readClassDay/11198af1657fd6b735c615eb');
  expect(resp.status).toBe(404);
});
