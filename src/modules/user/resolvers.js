import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default {
  Mutation: {
    signup: async (_, { input }, { models }) => {
      try {
        const user = await models.User.create({
          ...input,
          password: await bcrypt.hash(input.password, 10),
        });

        const token = jwt.sign(
          {
            id: user.id,
          },
          process.env.JWT_SECRET,
          { expiresIn: '1d' }
        );

        return { token };
      } catch (err) {
        throw new Error(err);
      }
    },

    login: async (_, { input }, { models }) => {
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

        const token = jwt.sign(
          {
            id: user.id,
          },
          process.env.JWT_SECRET,
          { expiresIn: '1d' }
        );

        return { token };
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
