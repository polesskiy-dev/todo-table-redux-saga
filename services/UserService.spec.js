'use strict';
import test from 'ava';
import chai from 'chai';
import userService from './UserService'
import * as TEST_USER from '../config/spec-resources/test-user.json'

test("Create new user", async function (t) {
    await userService.saveUser(TEST_USER)
});
