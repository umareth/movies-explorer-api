const Movie = require("../models/movie");
const {
  STATUS_OK,
  ERROR_INCORRECT_DATA,
  ERROR_NOT_FOUND,
  ERROR_NOT_ACCESS,
  SUCCESS_DEL,
  STATUS_CREATED,
} = require("../utils/constants");
const BadRequestErr = require("../middlewares/errors/badReq");
const NotFoundErr = require("../middlewares/errors/notFound");
const ForbiddenErr = require("../middlewares/errors/errForbidden");

// Получить все фильмы пользователя
const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user.id })
    .then((movies) => res.status(STATUS_OK).json(movies))
    .catch(next);
};

// Создать новый фильм
const createMovie = (req, res, next) => {
  const movieData = {
    owner: req.user.id,
    ...req.body,
  };

  Movie.create(movieData)
    .then((newMovie) => res.status(STATUS_CREATED).send(newMovie))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestErr(ERROR_INCORRECT_DATA));
      }
      return next(err); // Вернуть значение из catch блока
    });
};

const deleteMovie = async (req, res, next) => {
  try {
    const { _id } = req.params;
    // Находим фильм
    const movie = await Movie.findById(_id);
    // Проверяем, существует ли фильм
    if (!movie) {
      throw new NotFoundErr(ERROR_NOT_FOUND);
    }
    // Проверяем права доступа текущего пользователя на удаление фильма
    if (movie.owner.toString() !== req.user.id) {
      throw new ForbiddenErr(ERROR_NOT_ACCESS);
    }
    // Удаляем фильм
    const deletedMovie = await Movie.findByIdAndRemove(_id);
    if (!deletedMovie) {
      throw new NotFoundErr(ERROR_NOT_FOUND);
    }
    // Возвращаем успешный статус и сообщение
    return res.status(STATUS_OK).json(SUCCESS_DEL);
  } catch (err) {
    if (err.name === "CastError") {
      return next(new NotFoundErr(ERROR_INCORRECT_DATA));
    }
    return next(err);
  }
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
