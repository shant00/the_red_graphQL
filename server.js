const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cors = require('cors');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const authenticate = require('./Middleware/auth');
const dataSources = require('./dataSource');
const { port, JWT_SECRET, EXPIRY_TIME } = require('./helpers/variables');


const app = express();
app.use(cors())
app.use(express.json());

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'admin' && password === 'password') {
        const token = jwt.sign(
            { username },
            JWT_SECRET,
            { expiresIn: EXPIRY_TIME }
        );
        return res.json({ token: `Bearer ${token}` });
    }

    return res.status(401).json({ message: 'Invalid credentials' });
});

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const user = authenticate(req);
        return { user, dataSources };
    }
});

server.start().then(() => {
    server.applyMiddleware({ app });
    app.listen({ port: port }, () => {
        console.log(`Server running at port ${port}`);
    });
});
