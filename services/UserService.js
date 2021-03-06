const EventEmitter = require('events');
const assert = require('assert');
const UserModel = require('../models/UserSchema');

let userService = null;

class UserService extends EventEmitter {
    static get instance() {
        return userService
    }

    constructor() {
        if (UserService.instance) return UserService.instance;

        super();
    }

    /**
     * Save user to DB
     *
     * @param newUser
     * @returns Promise
     */
    saveUser(newUser) {
        assert.ok(newUser);
        const userModel = new UserModel(newUser);
        this.emit("users-list-changed");

        return userModel.save();
    }

    /**
     * Replace user by new one by _id or login in DB
     *
     * @param newUser
     * @returns Promise
     */
    replaceUser(userSelector, newUser) {
        //TODO: fix password updating
        const {_id, login} = userSelector;
        assert.ok(_id || login, newUser);
        this.emit("users-list-changed");

        return UserModel.findOneAndUpdate(_id ? {_id} : {login}, newUser, {new: true});
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
        this.emit("users-list-changed");

        return UserModel.remove(_id ? {_id} : {login})
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

        return UserModel.findOne(_id ? {_id} : (login ? {login} : {email}));
    }

    /**
     * Get all users from DB
     *
     * @returns Promise
     */
    getAllUsers() {
        return UserModel.find({});
    }
}

userService = new UserService();
//const userServiceSingleton = new UserService();

module.exports = UserService;//userServiceSingleton;