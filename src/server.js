import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import chalk from 'chalk';
import cowsay from 'cowsay';

import schema from '~/modules/schema';
import { sequelize, models } from '~/models';

const app = express();
const graphQLServer = new ApolloServer({
  schema,
  context: ({ res }) => ({ models, res }),
});

graphQLServer.applyMiddleware({ app });

sequelize.sync().then(() => {
  const PORT = process.env.GRAPHQL_APP_PORT || 8000;
  app.listen(PORT, () =>
    console.log(
      cowsay.say({
        text: `${chalk.magenta(
          'GraphQL'
        )} server started at localhost:${PORT} \n GUI at http://localhost:${PORT}/graphql`,
      })
    )
  );
});
