export default {
  Query: {
    posts: async (_, args, { models }) => {
      const posts = await models.Post.findAll();

      return posts;
    },
  },
};
