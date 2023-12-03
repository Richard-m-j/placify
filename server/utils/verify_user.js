const jwt = require('jsonwebtoken');
const errorhandler = require('./error_handler.js');

const verify_user = async (req, res, next) => {
    console.log(req.cookies);
    const token = req.cookies.access_token;
    console.log(token);
    try {

        if (!token) {

            return next(errorhandler(401, 'Unauthorized'));
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            console.log("hai");
            if (err) {
                return next(errorhandler(403, 'Forbidden'));
            }
            req.user = decoded;
            next();
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};


module.exports = verify_user;