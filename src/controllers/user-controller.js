const User = require('../models/user');
const AuthService = require('../services/auth-service');
const config = require('../config');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const BCRYPT_SALT_ROUNDS = 12;

async function logIn(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: `Email ${email} no se encuentra registrado` });
        }
        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) {
            return res.status(403).send({ message: `Contraseña inválida` });
        }
        return res.status(200).send({
            token: AuthService.createToken(user)
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message });
    }
}

async function signup(req, res) {
    const { name, lastName, email, password } = req.body;
    try {
        const userCheck = await User.findOne({ email });
        if (userCheck) {
            return res.status(400).send({ message: `Email ${userCheck.email} ya se encuentra registrado` });
        }
        const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
        const token = crypto.randomBytes(20).toString('hex');
        const user = new User({
            name,
            last_name: lastName,
            email,
            password: hashedPassword,
            validate_token: token
        });
        const userSave = await user.save();
        return res.status(201).send({ user: userSave });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message });
    }
}

module.exports = {
    logIn,
    signup
}