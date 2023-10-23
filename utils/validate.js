const { celebrate, Joi } = require("celebrate");

// его можно использовать и для создания юзера
const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateLoginUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string()
      .required()
      .regex(/^(https?:\/\/)?[^\s]*\.(jpg|jpeg|png|gif|bmp|test)$/),
    trailerLink: Joi.string()
      .required()
      .regex(
        /^(https?:\/\/)?[^\s]*\.(mp4|avi|mov|mkv|flv|wmv|3gp|youtube\.com|youtu\.be)/
      ),
    thumbnail: Joi.string()
      .required()
      .regex(/^(https?:\/\/)?[^\s]*\.(jpg|jpeg|png|gif|bmp|test)$/),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validateGetMovieId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().length(24).hex(),
  }),
});

module.exports = {
  validateLoginUser,
  validateCreateUser,
  validateUser,
  validateCreateMovie,
  validateGetMovieId,
};
