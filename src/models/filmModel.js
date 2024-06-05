const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to database with id ' + connection.threadId);
});

module.exports = {
  createFilm: (filmData) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO films SET ?';
      connection.query(query, filmData, (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },

  getAllFilms: () => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM films';
      connection.query(query, (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },

  getFilmById: (filmId) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM films WHERE id = ?';
      connection.query(query, [filmId], (error, results) => {
        if (error) {
          return reject(error);
        }
        if (results.length === 0) {
          resolve(null);
        } else {
          resolve(results[0]);
        }
      });
    });
  },

  updateFilmById: (filmId, newData) => {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE films SET ? WHERE id = ?';
      connection.query(query, [newData, filmId], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results.affectedRows > 0);
      });
    });
  },

  deleteFilmById: (filmId) => {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM films WHERE id = ?';
      connection.query(query, [filmId], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results.affectedRows > 0);
      });
    });
  }
};
