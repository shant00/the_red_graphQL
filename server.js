const { ApolloServer } = require('apollo-server');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const authenticate = require('./Middleware/auth');
const dataSources = require('./dataSource');

const server = new ApolloServer({
    typeDefs,
    resolvers,

    context: ({ req }) => {
        const user = authenticate(req);
        return { user, dataSources };
    }
});

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
