const port = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET;
const EXPIRY_TIME = process.env.EXPIRY_TIME || '1h';
module.exports = { port, JWT_SECRET, EXPIRY_TIME };