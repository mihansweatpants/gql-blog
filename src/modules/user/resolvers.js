import bcrypt from 'bcryptjs';
import { AuthenticationError } from 'apollo-server-express';
import { generateToken, setCookie } from '~/helpers/auth';

export default {
  Query: {
    me: async (_, args, { models, checkAuth }) => {
      const currUser = await checkAuth();

      return currUser;
    },
  },
  Mutation: {
    signup: async (_, { input }, { models, res }) => {
      try {
        const user = await models.User.create({
          ...input,
          password: await bcrypt.hash(input.password, 10),
        });

        const token = generateToken({ id: user.id });
        setCookie(res, token);

        return { token };
      } catch (err) {
        throw new Error(err);
      }
    },

    login: async (_, { input }, { models, res }) => {
      try {
        const user = await models.User.findOne({
          where: { username: input.username, email: input.email },
        });

        if (!user) {
          throw new Error('User does not exist');
        }

        const isValidPassword = await bcrypt.compare(
          input.password,
          user.password
        );

        if (!isValidPassword) {
          throw new Error('Incorrect password');
        }

        const token = generateToken({ id: user.id });
        setCookie(res, token);

        return { token };
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
