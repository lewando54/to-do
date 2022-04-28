const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Check for token
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied.');

    // Validate token and move on or not
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).send('Invalid token.');
    }
};