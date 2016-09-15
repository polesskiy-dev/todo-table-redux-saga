const jwt = require('jsonwebtoken');
const HttpStatus = require('http-status-codes');
const {jwtSecret} = require('../config/auth.config.json');
const userService = require('../services/UserService');

class AuthController {
    constructor(user) {
        this.user = user;
    }

    fetchUserByToken(token) {
        /**decode jwt token*/
        const decodedUser = jwt.verify(token, jwtSecret);
        if (!decodedUser) throw "Invalid auth token";
        return userService.getUser(decodedUser)
            .then(
                user=> {
                    //if user exists and his password from jwt token and actual password matches
                    if (user && user.password === decodedUser.password) {
                        this.user = user;
                    }
                    else throw "Wrong login or password"
                }
            )
    }

    authMiddleware(req, res, next) {
        const {authorization} = req.headers;
        
        this.fetchUserByToken(authorization)
            .then(()=> {
                req.user = this.user;
                next();
            })
            .catch(err=>res.status(HttpStatus.UNAUTHORIZED).send(err))
    }
}

const authControllerSingleton = new AuthController();

module.exports = authControllerSingleton;