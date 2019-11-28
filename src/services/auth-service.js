const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config');

exports.createToken= function (user) {
    const payload = {
        sub: user._id,
        name: user.name,
        iat: moment().unix(),
        exp: moment().add(15, 'days').unix()
    }
    return jwt.encode(payload, config.secret_token);
}