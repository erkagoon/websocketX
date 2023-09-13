const Sequelize = require('sequelize');
const { dbconfig } = require('./dbConfig');

const sequelize = new Sequelize(dbconfig.database, dbconfig.user, dbconfig.password, {
    host: dbconfig.host,
    dialect: 'mysql',
    logging: false
});

module.exports = sequelize;
