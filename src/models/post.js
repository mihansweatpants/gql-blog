const post = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'post',
    {
      title: {
        type: DataTypes.STRING,
      },
      text: {
        type: DataTypes.STRING,
      },
      thumbnail: {
        type: DataTypes.STRING,
      },
      url: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: 'posts',
    }
  );

  Post.associate = models => {
    Post.belongsTo(models.User);
  };

  return Post;
};

module.exports = post;
