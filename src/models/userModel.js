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
  createUser: (userData) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO users SET ?';
      connection.query(query, userData, (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },

  getUserByUsernameOrEmail: (username, email) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users WHERE username = ? OR email = ?';
      connection.query(query, [username, email], (error, results) => {
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

  getUserByEmail: (email) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users WHERE email = ?';
      connection.query(query, [email], (error, results) => {
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
  }
};
