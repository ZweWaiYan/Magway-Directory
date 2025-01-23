const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, secret, { algorithms: ['HS256'] });
        req.user = decoded;
        next();
    } catch (err) {
        if(err.name === 'TokenExpiredError'){
            res.status(403).json({message:'Token expired'});
        }
        return res.status(403)
    }
};

module.exports = authenticateJWT;