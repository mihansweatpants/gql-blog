const user = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      password: {
        type: DataTypes.STRING,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: 'user',
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: 'users',
    }
  );

  return User;
};

module.exports = user;
