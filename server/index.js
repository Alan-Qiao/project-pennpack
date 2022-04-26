const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const db = require('./config').get(process.env.NODE_ENV);
const AccountRouter = require('./routers/accounts');
const ClassRouter = require('./routers/classes');
// const DeactivateRouter = require('./routers/deactivate')
// const SignupRouter = require('./routers/follow')
const app = express();
const cors = require('cors');

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
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// Endpoints
app.use('/class', ClassRouter);
app.use('/', AccountRouter);

// listening port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App is live at ${PORT}`);
});
