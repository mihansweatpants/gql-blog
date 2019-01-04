import Sequelize from 'sequelize';
import path from 'path';

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

const models = {
  User: sequelize.import(path.resolve(__dirname, './user')),
  Post: sequelize.import(path.resolve(__dirname, './post')),
};

for (const model of Object.values(models)) {
  if ('associate' in model) {
    model.associate(models);
  }
}

export { sequelize, models };
