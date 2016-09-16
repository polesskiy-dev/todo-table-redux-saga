"use strict";
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {roles, salt} = require('../config/auth.config.json');

/**
 * User schema.
 *
 * Encapsulates fields validators.
 */
var UserSchema = new mongoose.Schema({
    login: {
        type: String,
        unique: true,
        match: [/^[a-z0-9_-]{3,15}$/, "Invalid login!"],
        required: [true, "No login"]
    },
    email: {
        type: String,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email!"],
        required: [true, "No email!"]
    },
    password: {
        type: String,
        required: [true, "No password!"]
    },
    /** while user register - set role automatically*/
    role: {
        type: String,
        enum: roles,
        required: [true, "No role"]
    }
});

/* methods */

/**
 * Hash value
 *
 * @param val
 * @returns {string} - hashed value
 */
UserSchema.methods.generateHash = function (val) {
    return bcrypt.hashSync(val, bcrypt.genSaltSync(salt), null);
};


/**
 * Validate candidate password with actual user password
 *
 * @param candidatePassword
 * @returns {boolean}
 */
UserSchema.methods.validatePassword = function (candidatePassword) {
    return candidatePassword === this.password
    //return bcrypt.compareSync(candidatePassword, this.password);
};

/**
 * Add jwt token as field to user
 *
 * @param jwtSecret
 * @returns {Object} user
 */
UserSchema.methods.addJwtToken = function (jwtSecret) {
    const {_doc} =this;
    _doc.token = jwt.sign(_doc, jwtSecret);
    return this;
};

/* hooks */

/**
 * Actions performing before VALIDATION of user fields.
 *
 * Set user role as default.
 */
UserSchema.pre('validate', function (next) {
    const [USER_ROLE] = roles;

    /** set user role as default - USER */
    this.role = USER_ROLE;
    next();
});

/**
 * Hash password before saving (not works fro updating)
 */
UserSchema.pre('save', function (next) {
    try {
        this.password = this.generateHash(this.password);
    }
    catch (e) {
        next(e)
    }
    next();
});

module.exports = mongoose.model('User', UserSchema);