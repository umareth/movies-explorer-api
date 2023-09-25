const {
  PORT = 3000,
  MONGO = 'mongodb://127.0.0.1:27017/bitfilmsdb',
  JWT_SECRET = 'some-secret-key',
  NODE_ENV,
} = process.env;

const allowedCors = [
  'http://shakh.movies.nomoredomainsrocks.ru',
  'https://shakh.movies.nomoredomainsrocks.ru',
  'http://localhost:3000',
  'https://localhost:3000',
];

module.exports = {
  PORT,
  NODE_ENV,
  MONGO,
  JWT_SECRET,
  allowedCors,
};
