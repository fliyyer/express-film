const express = require('express');
const router = express.Router();
const filmController = require('../controllers/filmController');

router.post('/', filmController.createFilm);
router.get('/', filmController.getAllFilms);
router.get('/:id', filmController.getFilmById);
router.put('/:id', filmController.updateFilmById);
router.delete('/:id', filmController.deleteFilmById);

module.exports = router;
