const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config');

function isAuth(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'Usuario no autorizado'});
    }
    
    const token = req.headers.authorization.split(" ")[1];
    let payload = null;
    try {
        payload = jwt.decode(token, config.secret_token);
    } catch (err) {
        return res.status(401).send({ message: 'El token es inválido' });
    }
    
    if (payload.exp <= moment().unix()) {
        return res.status(401).send({ message: 'El token ha expirado' });
    }
    req.user = payload.sub;
    next();
}

module.exports = isAuth;