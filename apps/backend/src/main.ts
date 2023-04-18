import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { AppDataSource } from './data-source';
import { User } from '@react-apollo-typeorm/entities';

export const resolvers = {
  Query: {
    users: async () => await AppDataSource.manager.find(User),
  },
  Mutation: {
    addUser: async (_: any, { firstName, lastName, age }: User) => {
      try {
        const user = await AppDataSource.manager.create(User, {
          firstName,
          lastName,
          age,
        });
        await AppDataSource.manager.save(user);
        return true;
      } catch (error) {
        return false;
      }
    },
    deleteUser: async (_: any, { id }: { id: number }) => {
      try {
        await AppDataSource.manager.delete(User, id);
        return true;
      } catch (error) {
        return false;
      }
    },
  },
};

export const typeDefs = `
  type Query {
    users: [User]
  }

  type Mutation {
    addUser(firstName: String!, lastName: String, age: Int!): Boolean!
    deleteUser(id: Int!): Boolean!
  }

  type User {
    id: Int!
    firstName: String!
    lastName: String!
    age: Int!
  }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

AppDataSource.initialize()
  .then(async () => {
    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
    });

    console.log(`🚀  Server ready at: ${url}`);
  })
  .catch((error) => console.log(error));
