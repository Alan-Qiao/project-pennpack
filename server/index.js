const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const db = require('./config').get(process.env.NODE_ENV);
const AccountRouter = require('./routers/accounts');
const ClassRouter = require('./routers/classes');
// const DeactivateRouter = require('./routers/deactivate')
// const SignupRouter = require('./routers/follow')
const app = express();

const multer = require('multer')

// Database connection
mongoose.Promise = global.Promise;

mongoose.connect(db.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, async err => {
  if (err) {
    console.log(err);
  }
  console.log('Database is connected');
});

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:3000', allowedHeaders: ['Content-Type', 'Authorization', 'Accept'] }));

// Endpoints
app.use('/class', ClassRouter);
app.use('/', AccountRouter);

// error handler
app.use((err, req, res, next) => {
  if (res.headersSent) {
    next(err);
    return;
  }
  res.status(err.statusCode || 500).json({ error: err, message: err.message });
});

// listening port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App is live at ${PORT}`);
});
