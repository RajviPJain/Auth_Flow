module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define(
    "token",
    {
      token: {
        type: DataTypes.STRING,
      },
    },
    { tablename: "tokens" }
  );

  return Token;
};
