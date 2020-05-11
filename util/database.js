const Sequelize = require('sequelize');
const sequelize = new Sequelize('store','root','password', {
    dialect: 'mysql',
     host: 'localhost'
});

module.exports = sequelize;