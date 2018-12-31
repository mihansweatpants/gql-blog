import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default {
  Mutation: {
    signUp: async (_, { input }, { models }) => {
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
  },
};
