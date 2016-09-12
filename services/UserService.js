const assert = require('assert');
const mongoose = require('mongoose');

class UserService {
    constructor() {
    }

    /**
     * Save user to DB
     * @param user
     * @param cb
     */
    saveUser(newUser, cb) {
        assert.ok(newUser);

        mongoose.model('User').save(newUser, cb);
    }

    /**
     * Replace user by new one by _id or login in DB
     * @param newUser
     * @param cb
     */
    replaceUser(userSelector, newUser, cb) {
        const {_id, login} = userSelector;
        assert.ok(_id || login, newUser);

        mongoose.model('User').findOneAndUpdate(_id ? {_id} : {login}, newUser, {new: true}, cb);
    }

    /**
     * Delete user by _id or login from DB
     * @param userSelector
     * @param cb
     */
    deleteUser(userSelector, cb) {
        const {_id, login} = userSelector;
        assert.ok(_id || login);

        mongoose.model('User').remove(_id ? {_id} : {login}, cb)
    }


    /**
     * Get user by _id or login or email from DB
     * @param userSelector
     * @param cb
     */
    getUser(userSelector, cb) {
        const {_id, login, email} = userSelector;
        assert.ok(_id || login || email);

        mongoose.model('User').findOne(_id ? {_id} : (login ? {login} : {email}), cb);
    }

    /**
     * Get all users from DB
     * @param cb
     */
    getAllUsers(cb) {
        mongoose.model('User').find({}, cb);
    }
}

const userServiceSingleton = new UserService();

module.exports = userServiceSingleton;