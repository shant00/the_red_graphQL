const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../helpers/variables');


const authenticate = (req) => {
    const authHeader = req.headers.authorization || '';

    const token = authHeader.replace('Bearer ', '');
    if (!token) throw new Error('Unauthorized');

    try {
        const user = jwt.verify(token, JWT_SECRET);
        return user;
    } catch (e) {
        throw new Error('Unauthorized');
    }
};

module.exports = authenticate;
