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
  Mutation: {
    createPost: async (_, { input }, { checkAuth, models }) => {
      const currUser = await checkAuth();

      const post = await models.Post.create({ ...input, userId: currUser.id });

      return await models.Post.findOne({
        where: { id: post.id },
        include: [models.User],
      });
    },

    deletePost: async (_, { id }, { checkAuth, models }) => {
      const currUser = await checkAuth();

      const post = await models.Post.findOne({
        where: { id },
        include: [models.User],
      });

      if (post.user.id !== currUser.id) throw new Error('Unauthorized');

      if (await models.Post.destroy({ where: { id } })) {
        return true;
      }

      return false;
    },

    updatePost: async (_, { input }, { checkAuth, models }) => {
      const currUser = await checkAuth();

      const post = await models.Post.findOne({
        where: { id: input.id },
        include: [models.User],
      });

      if (post.user.id !== currUser.id) throw new Error('Unauthorized');

      await models.Post.update(input, { where: { id: input.id } });

      return await models.Post.findOne({
        where: { id: input.id },
        include: [models.User],
      });
    },
  },
};
