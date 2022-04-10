const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../database/models/user.model');
const config = require('../config.json');


// Register user
async function registerUser(req, res) {
    const email = req.body.email.trim();
    const password = req.body.password.trim();

    try {
        const user = await User.findOne({
            email
        });
        if (user) {
            return res.status(400).json({
                type: 'Bad Request',
                msg: 'Този имейл вече съществува!'
            });
        }
        return bcrypt.hash(password, 10).then((hash) => {
            const token = jwt.sign({ email }, config.secret);
            const newUser = new User({
                email,
                password: hash
            });
            newUser.save().then(() => {
                res.status(200).json({
                    success: true,
                    email,
                    token
                });
            });
        });
    } catch (err) {
        res.status(500).json({
            type: 'Not Found',
            msg: err
        });
    }
}

// Login user
async function loginUser(req, res) {
    try {
        const email = req.body.email.trim();
        const password = req.body.password.trim();

        const user = await User.findOne({
            email
        });
        if (!user) {
            return res.status(400).json({
                type: 'Bad Request',
                msg: 'Грешен имейл или парола!'
            });
        }
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            const token = jwt.sign({ email: user.email }, config.secret);
            res.status(200).json({
                success: true,
                token,
                userId: user._id,
                email: user.email
            });
        } else {
            res.status(500).json({
                type: 'Not Found',
                msg: 'Грешен имейл или парола!'
            });
        }
    } catch (err) {
        res.status(500).json({
            type: 'Not Found',
            msg: err
        });
    }
}

// Edit user by Id
function editUsers(req, res) {
    User.findOneAndUpdate(
        { _id: req.body.id },
        {
            $set: { isActive: true }
        }
    ).then(() => {
        res.status(200).json({
            success: true
        });
    });
}

module.exports = {
    editUsers,
    registerUser,
    loginUser
};
