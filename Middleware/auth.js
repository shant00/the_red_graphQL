const jwt = require('jsonwebtoken');
const secretKey = 'your_jwt_secret_key';

const authenticate = (req) => {
    const authHeader = req.headers.authorization || '';

    const token = authHeader.replace('Bearer ', '');
    if (!token) throw new Error('Unauthorized');

    try {
        const user = jwt.verify(token, secretKey);
        return user;
    } catch (e) {
        throw new Error('Unauthorized');
    }
};

module.exports = authenticate;
