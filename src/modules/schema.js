import { mergeSchemas, makeExecutableSchema } from 'graphql-tools';
import fs from 'fs';

const schemas = fs
  .readdirSync('src/modules')
  .filter(name => !name.includes('.'))
  .map(folder => {
    const resolvers = require(`~/modules/${folder}/resolvers`).default;
    const typeDefs = require(`~/modules/${folder}/schema.gql`);

    return makeExecutableSchema({ resolvers, typeDefs });
  });

export default mergeSchemas({ schemas });
