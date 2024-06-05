const filmModel = require('../models/filmModel');

exports.createFilm = async (req, res, next) => {
  try {
    const { title, description, image_thumbnail } = req.body;

    const newFilm = {
      title,
      description,
      image_thumbnail
    };

    const savedFilm = await filmModel.createFilm(newFilm);

    res.status(201).json({ message: 'Film created successfully' });
  } catch (error) {
    next(error);
  }
};

exports.getAllFilms = async (req, res, next) => {
  try {
    const films = await filmModel.getAllFilms();

    res.status(200).json(films);
  } catch (error) {
    next(error);
  }
};

exports.getFilmById = async (req, res, next) => {
  try {
    const filmId = req.params.id;

    const film = await filmModel.getFilmById(filmId);

    if (!film) {
      return res.status(404).json({ error: 'Film not found' });
    }

    res.status(200).json(film);
  } catch (error) {
    next(error);
  }
};

exports.updateFilmById = async (req, res, next) => {
  try {
    const filmId = req.params.id;
    const { title, description, image_thumbnail } = req.body;

    const updatedFilm = await filmModel.updateFilmById(filmId, { title, description, image_thumbnail });

    if (!updatedFilm) {
      return res.status(404).json({ error: 'Film not found or failed to update' });
    }

    res.status(200).json({ message: 'Film updated successfully' });
  } catch (error) {
    next(error);
  }
};

exports.deleteFilmById = async (req, res, next) => {
  try {
    const filmId = req.params.id;
    const deletedFilm = await filmModel.deleteFilmById(filmId);

    if (!deletedFilm) {
      return res.status(404).json({ error: 'Film not found or failed to delete' });
    }

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
