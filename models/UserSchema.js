"use strict";
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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

/**
 * Actions performing before VALIDATION of user fields.
 *
 * Set user role as default.
 */
UserSchema.pre('validate', function (next) {
    const [USER_ROLE] = roles;

    let user = this;
    /** set user role as default - USER */
    user.role = USER_ROLE;
    next();
});

/**
 * bcrypt pre hook password hashing.
 *
 * Performing before saving User to DB,
 * automatically hash the password before it’s saved to the database.
 */
"use strict";
UserSchema.pre('save', function (next) {
    let user = this;

    // only hash the password if it has been modified (or is new)
    if (this.isModified('password') || this.isNew) {
        //generate salt
        bcrypt.genSalt(salt, function (err, salt) {
            if (err) return next(err);

            // hash the password along with our new salt
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);

                // override the plain text password with the hashed one
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

/**
 * Password comparing.
 * @param {password}
 * @user {password}
 */
UserSchema.methods.comparePasswords = ({password:pass1}, {password:pass2}) => bcrypt.compareSync(pass1, pass2);

module.exports = mongoose.model('User', UserSchema);