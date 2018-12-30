export default {
  Mutation: {
    signUp: async (_, { input }, { models }) => {

      await models.User.create({
        ...input,
      });

      return { token: 'sa;fmaiejf;iawjf;iajw;fija;wlfh;ahsf' };
    },
  },
};
