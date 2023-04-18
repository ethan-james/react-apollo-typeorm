import { DataSource } from 'typeorm';
import { User } from '@react-apollo-typeorm/entities';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: ':memory:',
  logging: true,
  entities: [User],
  synchronize: true,
});
