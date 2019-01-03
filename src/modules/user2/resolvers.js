import { AuthorizationError } from '~/helpers/auth';

export default {
  Query: {
    echo: (_, { text }, { checkAuth }) => {
      try {
        const currentUser = checkAuth();

        return text || 'echo';
      } catch (err) {
        throw new AuthorizationError(err.message);
      }
    },
  },
};
