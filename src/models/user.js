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
    },
    {
      tableName: 'users',
    }
  );

  User.associate = models => {
    User.hasMany(models.Post);
  };

  return User;
};

module.exports = user;
