import { ApolloServer, gql } from "apollo-server";
import { randomUUID } from "node:crypto";

const typeDefs = gql`
  type User {
    id: String!
    name: String!
  }

  type Query {
    users: [User!]!
    test: String!
  }

  type Mutation {
    createUser(name: String!): User!
  }
`;

interface User {
  id: string;
  name: string;
}

const users: User[] = [];

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      users: () => {
        return users;
      },
      test: () => {
        return "Test done!";
      },
    },

    Mutation: {
      createUser: (_, args) => {
        const user = { 
          id: randomUUID(),
          name: args.name,
        };

        users.push(user);

        return user;
      },
    },
  },
});

server.listen().then(({ url }) => {
  console.log(`HTTP server running on ${url}`);
});
