import { makeExecutableSchema } from 'graphql-tools';
import fs from 'fs';
import rootSchema from './rootSchema.gql';

const modules = fs.readdirSync(__dirname).filter(name => !name.includes('.'));

const typeDefs = [
  rootSchema,
  ...modules.map(folder => require(`~/modules/${folder}/schema.gql`)),
];

typeDefs.forEach(item => console.log(item))

const resolvers = Object.assign(
  {},
  ...modules.map(folder => require(`~/modules/${folder}/resolvers`).default)
);

export default makeExecutableSchema({ typeDefs, resolvers });
