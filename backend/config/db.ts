import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('database', 'Borko', '', {
  dialect: 'sqlite',
  host: 'localhost',
  storage: './database.sqlite'
});