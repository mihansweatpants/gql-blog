export default {
  Mutation: {
    signUp: async (_, { input }, { models }) => {
      console.log(JSON.stringify(input, null, 4));

      await models.User.create({
        ...input,
        id: 1
      });

      return { token: 'sa;fmaiejf;iawjf;iajw;fija;wlfh;ahsf' };
    },
  },
};
