import { mergeSchemas, makeExecutableSchema } from 'graphql-tools';
import fs from 'fs';
import rootSchema from './rootSchema.gql';

const typeDefs = [rootSchema];

const schemas = fs
  .readdirSync(__dirname)
  .filter(name => !name.includes('.'))
  .map(folder => {
    const resolvers = require(`~/modules/${folder}/resolvers`).default;
    typeDefs.push(require(`~/modules/${folder}/schema.gql`));

    return makeExecutableSchema({ resolvers, typeDefs });
  });

export default mergeSchemas({ schemas });
