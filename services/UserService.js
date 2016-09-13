const assert = require('assert');
const UserSchema = require('../models/UserSchema');
const mongoose = require('mongoose');
// Use native promises
mongoose.Promise = global.Promise;
mongoose.set('debug', true);

class UserService {
    /**
     * Save user to DB
     *
     * @param newUser
     * @returns Promise
     */
    saveUser(newUser) {
        assert.ok(newUser);
        const userSchemaInstance = new UserSchema(newUser);
        return userSchemaInstance.save();
    }

    /**
     * Replace user by new one by _id or login in DB
     *
     * @param newUser
     * @returns Promise
     */
    replaceUser(userSelector, newUser) {
        const {_id, login} = userSelector;
        assert.ok(_id || login, newUser);

        return UserSchema.findOneAndUpdate(_id ? {_id} : {login}, newUser, {new: true});
    }

    /**
     * Delete user by _id or login from DB
     *
     * @param userSelector
     * @returns Promise
     */
    deleteUser(userSelector) {
        const {_id, login} = userSelector;
        assert.ok(_id || login);

        return UserSchema.remove(_id ? {_id} : {login})
    }


    /**
     * Get user by _id or login or email from DB
     *
     * @param userSelector
     * @returns Promise
     */
    getUser(userSelector) {
        const {_id, login, email} = userSelector;
        assert.ok(_id || login || email);

        return UserSchema.findOne(_id ? {_id} : (login ? {login} : {email}));
    }

    /**
     * Get all users from DB
     *
     * @returns Promise
     */
    getAllUsers() {
        return UserSchema.find({});
    }
}

const userServiceSingleton = new UserService();

module.exports = userServiceSingleton;