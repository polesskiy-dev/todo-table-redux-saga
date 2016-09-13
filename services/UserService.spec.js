'use strict';
import '../app';
import test from 'ava';
import {expect} from 'chai';
import userService from './UserService'
import * as TEST_USER from '../config/spec-resources/test-user.json'

test.before("Create new user", async function () {
    try {
        let res = await userService.saveUser(TEST_USER);

        expect(res.login).to.equal(TEST_USER.login);
        expect(res.email).to.equal(TEST_USER.email);
        expect(res.password).to.not.equal(TEST_USER.password);
    } catch (e) {
        console.log(e.message);
        expect(e).to.not.exist;
    }
});


test("GET single user", async function () {
    try {
        let res = await userService.getUser(TEST_USER);
        console.log("Res for get single user", res);
        expect(res.login).to.equal(TEST_USER.login);
        expect(res.email).to.equal(TEST_USER.email);
    } catch (e) {
        console.error(e.message);
        expect(e).to.not.exist;
    }
});

test("GET all users", async function () {
    try {
        let res = await userService.getAllUsers();
        console.log("Res for get all users", res);
    } catch (e) {
        console.error(e.message);
        expect(e).to.not.exist;
    }
});

test("PUT replace user", async function () {
    try {
        let res = await userService.replaceUser(TEST_USER, TEST_USER);
        console.log("Res for update single user", res);
        expect(res.login).to.equal(TEST_USER.login);
        expect(res.email).to.equal(TEST_USER.email);
    } catch (e) {
        console.error(e.message);
        expect(e).to.not.exist;
    }
});

test.after.always("Delete user", async function () {
    try {
        let res = await userService.deleteUser(TEST_USER);
        expect(res.result.ok).to.be.ok
    } catch (e) {
        console.log(e.message);
        expect(e).to.not.exist;
    }
})