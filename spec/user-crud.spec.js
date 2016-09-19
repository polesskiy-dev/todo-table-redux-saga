/**
 * User CRUD test
 */
'use strict';
const app = require('../app');
const supertest = require("supertest")(app);
const {describe, it, before, after} = require('mocha');
const {expect} = require('chai');
const HttpStatus = require('http-status-codes');
const urls = require('../config/urls.config');
const TEST_USER = require('./spec-resources/test-user.json');
const TEST_ADMIN = require('./spec-resources/test-admin.json');

describe("User CRUD test with admin token", ()=> {
    before("Create new user as admin", (done)=> {
        supertest
            .post(urls.USERS_API + "/")
            .set("Content-Type", "application/json")
            .set("Authorization", TEST_ADMIN.token)
            .send(TEST_USER)
            .expect(HttpStatus.CREATED)
            .expect(({body})=> {
                expect(body.login).to.equal(TEST_USER.login);
                expect(body.email).to.equal(TEST_USER.email);
                expect(body.password).to.not.equal(TEST_USER.password);
            })
            .end(done)
    });

    it("GET All users as admin", (done) => {
        supertest
            .get(urls.USERS_API + "/")
            .set("Authorization", TEST_ADMIN.token)
            .expect(HttpStatus.OK)
            .expect(({body})=> {
                //console.log(body);
                expect(body).to.be.not.empty;
            })
            .end(done)
    });

    it("GET single user as admin", (done)=> {
        supertest
            .get(`${urls.USERS_API}/${TEST_USER.login}`)
            .set("Authorization", TEST_ADMIN.token)
            .expect(HttpStatus.OK)
            .expect(({body})=> {
                //console.log(body);
                expect(body.login).to.equal(TEST_USER.login);
                expect(body.email).to.equal(TEST_USER.email);
                expect(body.password).to.not.equal(TEST_USER.password);
            })
            .end(done)
    });

    it("PUT replace user as admin", (done)=> {
        supertest
            .put(`${urls.USERS_API}/${TEST_USER.login}`)
            .set("Content-Type", "application/json")
            .set("Authorization", TEST_ADMIN.token)
            .send(TEST_USER)
            .expect(HttpStatus.OK)
            .expect(({body})=> {
                //console.log(body);
                expect(body.login).to.equal(TEST_USER.login);
                expect(body.email).to.equal(TEST_USER.email);
                //expect(body.password).to.not.equal(TEST_USER.password);
            })
            .end(done)
    });

    after("Delete user as admin", (done)=> {
        supertest
            .del(`${urls.USERS_API}/${TEST_USER.login}`)
            .set("Authorization", TEST_ADMIN.token)
            .expect(HttpStatus.OK)
            .end(done);
    });

});