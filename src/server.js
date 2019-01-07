import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import chalk from 'chalk';
import cowsay from 'cowsay';

import schema from '~/modules/schema';
import { sequelize, models } from '~/models';
import { checkAuth } from '~/helpers/auth';
import seed from '~/helpers/seed';

import oauth from '~/oauth';

const app = express();

app.use('/oauth', oauth);

const graphQLServer = new ApolloServer({
  schema,
  context: ({ req, res }) => ({
    models,
    res,
    checkAuth: () => checkAuth(req, models.User),
  }),
});

graphQLServer.applyMiddleware({ app });

sequelize
  .sync({ force: true })
  .then(seed)
  .then(() => {
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
