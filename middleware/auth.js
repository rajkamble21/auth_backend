require('dotenv').config();
const jwt = require('jsonwebtoken')


const auth = (req, res, next) => {
    let token = req?.headers?.authorization;
    if (!token) {
        res.status(401).json({ error: 'Access denied no token provided' })
    }
    try {
        token = token.split(' ')[1];
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid Token' });
    }
}

module.exports = {
    auth
};