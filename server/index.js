const express = require('express');
const mongoose = require('mongoose');
const db = require('./config').get(process.env.NODE_ENV);
// const LoginRouter = require('./routers/comment')
// const DeactivateRouter = require('./routers/deactivate')
// const SignupRouter = require('./routers/follow')
const app = express();

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

// Endpoints (JUST EXAMPLES FOR NOW)
// app.use('/login', LoginRouter);
// app.use('/signup', SignupRouter);
// app.use('/class', ClassRouter );

// listening port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App is live at ${PORT}`);
});
