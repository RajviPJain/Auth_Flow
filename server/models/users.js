module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true,
          notEmpty: true,
        },
      },

      password: {
        type: DataTypes.STRING,
      },
    },
    { tablename: "users" }
  );

  return User;
};
