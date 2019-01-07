import bcrypt from 'bcryptjs';
import { generateToken, setCookie } from '~/helpers/auth';

export default {
  Query: {
    me: async (_, args, { checkAuth }) => {
      return await checkAuth();
    },

    users: async (_, args, { models, checkAuth }) => {
      await checkAuth();

      return await models.User.findAll();
    },

    user: async (_, { id }, { models, checkAuth }) => {
      await checkAuth();

      return await models.User.findOne({ where: { id } });
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
          where: { username: input.username },
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
        // setCookie(res, token);
        res.cookie('token', token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24,
        });

        return { token };
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
