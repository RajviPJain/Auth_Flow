const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("auth", "root", "P@ssword123", {
  host: "localhost",
  dialect: "mysql",
  logging: false /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
});

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./users")(sequelize, DataTypes);
db.token = require("./token")(sequelize, DataTypes);

db.user.hasMany(db.token);

db.token.belongsTo(db.user);

//   var Employee = db.employee;
db.sequelize.sync({ force: false });

module.exports = db;
