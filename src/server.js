import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import Sequelize from 'sequelize';
import chalk from 'chalk';
import cowsay from 'cowsay';
import schema from '~/modules/schema';

const app = express();
const graphQLServer = new ApolloServer({ schema });

graphQLServer.applyMiddleware({ app });

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  }
);

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
