const User = require("../models/User");
const jwt = require('jsonwebtoken');
const validator = require('validator');


// create json web token
const maxAge = 3 * 24 * 60 * 60;//in seconds
const createToken = (id) => {
    return jwt.sign({ id }, 'ss', {
        expiresIn: maxAge
    });
};


module.exports.signup_post = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await User.signup({ name, email, password });
        const token = createToken(user._id);
        user.token = token;
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ name,email,token });
    }
    catch (error) {
        res.status(400).json({ error: error.message});
    }
}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        user.token = token;
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ name:user.name, email, token });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }

}

module.exports.logout = (req, res) => {
    try {
        res.cookie('jwt', '', { maxAge: 1 });
        res.status(200).json({
            success: true,
            message: "logged out"
        })
        //res.redirect('/');
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }

}