const jwt = require('jsonwebtoken');
const User = require("../models/User");

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
  //  console.log(req.headers.authorization);
    if (token) {
        jwt.verify(token, 'ss', async (err, decodedToken) => {
            if (err) {
                res.status(401).json({
                    success: false,
                    message: "Login First1"
                })
            } else {
                //  console.log(decodedToken);
                // let user = await User.findById(decodedToken.id);
                // console.log(user);
                req.user = await User.findById(decodedToken.id);
                next();
            }
        });
    } else {
        res.status(401).json({
            success: false,
            message: "Login First2"
        })
    }
};


module.exports = { requireAuth };

