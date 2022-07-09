/*
Change the DATABASE URI
*/

const config = {
  production: {
    SECRET: process.env.SECRET,
    DATABASE: process.env.MONGODB_URI,
  },
  default: {
    SECRET: '',
    DATABASE: '',
  },
};

exports.get = function get(env) {
  return config[env] || config.default;
};
