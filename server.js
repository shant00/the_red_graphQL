const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const jwt = require('jsonwebtoken'); // Import jsonwebtoken
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const authenticate = require('./Middleware/auth');
const dataSources = require('./dataSource');

// Secret key for signing JWT tokens (store securely in env variables in production)
const JWT_SECRET = 'your_jwt_secret_key';

// Create an instance of Express
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Implement a login route with token generation
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // You can authenticate the user here (e.g., check credentials)
    if (username === 'admin' && password === 'password') {
        // Generate a JWT token for the authenticated user
        const token = jwt.sign(
            { username },           // Payload with user information
            JWT_SECRET,             // Secret key to sign the token
            { expiresIn: '1h' }     // Token expiration time
        );
        return res.json({ token: `Bearer ${token}` });
    }

    return res.status(401).json({ message: 'Invalid credentials' });
});

// Set up Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const user = authenticate(req); // This function can verify the token
        return { user, dataSources };
    }
});

// Apply Apollo Server middleware to the Express app
server.start().then(() => {
    server.applyMiddleware({ app });

    // Start the Express app
    app.listen({ port: 4000 }, () => {
        console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
        console.log(`Login route ready at http://localhost:4000/login`);
    });
});
