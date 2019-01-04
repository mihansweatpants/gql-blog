export default {
  Query: {
    posts: async (_, args, { models }) => {
      return await models.Post.findAll({
        include: [models.User],
      });
    },

    post: async (_, { id }, { models }) => {
      return await models.Post.findOne({
        where: { id },
        include: [models.User],
      });
    },
  },
};
