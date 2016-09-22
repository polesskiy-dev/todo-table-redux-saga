/**
 * User service test
 */
'use strict';
require('../app');
const {describe, it, before, after} = require('mocha');
const {expect} = require('chai');
const UserService = require('../services/UserService');
const TEST_USER = require('./spec-resources/test-user.json');

describe("User service test", ()=> {
        before("Create new user", async function () {
            try {
                let res = await UserService.instance.saveUser(TEST_USER);

                expect(res.login).to.equal(TEST_USER.login);
                expect(res.email).to.equal(TEST_USER.email);
                expect(res.password).to.not.equal(TEST_USER.password);
            } catch (e) {
                console.log(e.message);
                expect(e).to.not.exist;
            }
        });

        it("GET single user", async function () {
            try {
                let user = await UserService.instance.getUser(TEST_USER);
                expect(user.login).to.equal(TEST_USER.login);
                expect(user.email).to.equal(TEST_USER.email);
            } catch (e) {
                console.error(e.message);
                expect(e).to.not.exist;
            }
        });

        it("GET all users", async function () {
            try {
                let users = await UserService.instance.getAllUsers();
                expect(users).to.be.not.empty;
            } catch (e) {
                console.error(e.message);
                expect(e).to.not.exist;
            }
        });

        it("PUT replace user", async function () {
            try {
                let user = await UserService.instance.replaceUser(TEST_USER, TEST_USER);
                expect(user.login).to.equal(TEST_USER.login);
                expect(user.email).to.equal(TEST_USER.email);
            } catch (e) {
                console.error(e.message);
                expect(e).to.not.exist;
            }
        });

        after("Delete user", async function () {
            try {
                let res = await UserService.instance.deleteUser(TEST_USER);
                expect(res.result.ok).to.be.ok
            } catch (e) {
                console.log(e.message);
                expect(e).to.not.exist;
            }
        });
    }
);
