// models/index.js
const { Sequelize, DataTypes } = require('sequelize');

/*const sequelize = new Sequelize('astaga', 'root', 'palemb2703', {
    host: 'localhost',
    dialect: 'mysql',
});*/

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});


const User = require('./user')(sequelize, DataTypes);
const Production = require('./production')(sequelize, DataTypes);
const Report = require('./report')(sequelize, DataTypes);

// Define associations
User.associate && User.associate({ Report, Production });
Production.associate && Production.associate({ Report });
Report.associate && Report.associate({ Production, User });

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synchronized');
  })
  .catch(err => {
    console.error('Error synchronizing database:', err);
  });

module.exports = { sequelize, User, Production, Report };
