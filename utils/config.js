const {
  PORT = 3000,
  MONGO = "mongodb://127.0.0.1:27017/bitfilmsdb",
  JWT_SECRET = "some-secret-key",
  NODE_ENV,
} = process.env;

const allowedCors = [
  "http://shakheth.nomoredomainsrocks.ru",
  "https://shakheth.nomoredomainsrocks.ru",
  "http://localhost:3001",
  "https://localhost:3001",
];

module.exports = {
  PORT,
  NODE_ENV,
  MONGO,
  JWT_SECRET,
  allowedCors,
};
