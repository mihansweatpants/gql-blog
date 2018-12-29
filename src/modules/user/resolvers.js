export default {
  Mutation: {
    signUp: async (_, { input }) => {
      console.log(JSON.stringify(input, null, 4));

      return { token: 'sa;fmaiejf;iawjf;iajw;fija;wlfh;ahsf' };
    },
  },
};
