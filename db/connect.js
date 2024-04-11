const { Sequelize } = require('sequelize');
const dbConfig = require("../config/db.config.js");

/*const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    database: dbConfig.DB,
    password: dbConfig.PASSWORD
  });

  connection.connect(err => {
    if (err) throw err;
    console.log("успешно соединено с базой данных");
  });*/
  const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: 'mysql'
  });
  
  // Проверка соединения
  sequelize.authenticate()
    .then(() => {
      console.log('Успешно соединено с базой данных');
    })
    .catch(err => {
      console.error('Ошибка подключения к базе данных:', err);
    });
  
  module.exports = sequelize;

  