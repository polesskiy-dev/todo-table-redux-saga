/**
 * Check jwt auth token middleware test
 */
'use strict';
const app = require('../app');
const supertest = require("supertest")(app);
const {describe, it, before, after} = require('mocha');
const {expect} = require('chai');
const checkJwtAuth = require('../middleware/check-jwt-token-middleware');
const HttpStatus = require('http-status-codes');
const urls = require('../config/urls.config.json');
const TEST_USER = require('./spec-resources/test-user.json');


xdescribe("Check jwt auth token middleware test", ()=> {
    before("Create new user", (done)=> {
        supertest
            .post(urls.USERS_API + "/")
            .set("Content-Type", "application/json")
            .send(TEST_USER)
            .expect(HttpStatus.CREATED)
            .expect(({body})=> {
                expect(body.login).to.equal(TEST_USER.login);
                expect(body.email).to.equal(TEST_USER.email);
                expect(body.password).to.not.equal(TEST_USER.password);
            })
            .end(done)
    });

    after("Delete user", (done)=> {
        supertest
            .del(`${urls.USERS_API}/${TEST_USER.login}`)
            .expect(HttpStatus.OK)
            .end(done);
    });

});