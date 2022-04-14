/*
Change the DATABASE URI
*/

const config = {
  production: {
    SECRET: process.env.SECRET,
    DATABASE: process.env.MONGODB_URI,
  },
  default: {
    SECRET: 'mysecretkey',
    DATABASE: 'mongodb+srv://cis557project:cis557project@cis557project.apfvx.mongodb.net/cis557project?retryWrites=true&w=majority',
  },
};

exports.get = function get(env) {
  return config[env] || config.default;
};
