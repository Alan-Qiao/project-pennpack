/*
Change the DATABASE URI
*/

const config = {
  production: {
    SECRET: process.env.SECRET,
    DATABASE: process.env.MONGODB_URI,
  },
  default: {
    SECRET: 'Adayq130hqehuQYAHg0qT69TRG99r5679F97R7f95e5E7RItv80c9E5YPBYVc65eRVOCe9cCW5E6ORFtyc9e5',
    DATABASE: 'mongodb+srv://pennpack:PennPack2022@cluster0.kpkio.mongodb.net/PennPack?retryWrites=true&w=majority',
  },
};

exports.get = function get(env) {
  return config[env] || config.default;
};
