import { AuthorizationError } from '~/helpers/auth';

export default {
  Query: {
    echo: async (_, { text }, { checkAuth }) => {
      try {
        const currentUser = await checkAuth();

        console.log(currentUser.username);

        return text || 'echo';
      } catch (err) {
        throw new AuthorizationError(err.message);
      }
    },
  },
};
