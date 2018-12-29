import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import chalk from 'chalk';
import cowsay from 'cowsay';
import schema from '~/modules/schema';

const app = express();
const graphQLServer = new ApolloServer({ schema });

graphQLServer.applyMiddleware({ app });

const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(
    cowsay.say({
      text: `${chalk.magenta(
        'GraphQL'
      )} server started at localhost:${PORT} \n GUI at http://localhost:${PORT}/graphql`,
    })
  )
);
