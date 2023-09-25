const router = require('express').Router();
const validate = require('../utils/validate');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', validate.validateCreateMovie, createMovie);
router.delete('/:_id', validate.validateGetMovieId, deleteMovie);

module.exports = router;
