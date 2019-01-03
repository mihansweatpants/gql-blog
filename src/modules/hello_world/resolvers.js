export default {
  Query: {
    echo: async (_, { text }, { checkAuth }) => {
      const currentUser = await checkAuth();

      console.log(currentUser.username);

      return text || 'echo';
    },
  },
};
