const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const db = require('../database');

const authenticateJWT = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, secret, { algorithms: ['HS256'] });
        req.user = decoded;

        const query = `SELECT is_banned FROM users WHERE id = ?`;
        const [result] = await db.query(query,[decoded.user_id]);

        if(result[0].is_banned){
            return res.status(403).send({message:'Your account is banned.'})
        }else{
            next();
        }
        
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(403).json({ message: 'Token expired' });
        }
        return res.status(403).json({ message: 'Unauthorized: Invalid token' });
    }
};

module.exports = authenticateJWT;
