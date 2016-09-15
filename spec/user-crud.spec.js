/**
 * User CRUD test
 */
'use strict';
const app = require('../app');
const supertest = require("supertest")(app);
const {describe, it, before, after} = require('mocha');
const {expect} = require('chai');
const HttpStatus = require('http-status-codes');
const urls = require('../config/urls.config.json');
const TEST_USER = require('./spec-resources/test-user.json');

describe("User CRUD test", ()=> {
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

    it("GET All users", (done) => {
        supertest
            .get(urls.USERS_API + "/")
            .expect(HttpStatus.OK)
            .expect(({body})=> {
                //console.log(body);
                expect(body).to.be.not.empty;
            })
            .end(done)
    });

    it("GET single user", (done)=> {
        supertest
            .get(`${urls.USERS_API}/${TEST_USER.login}`)
            .expect(HttpStatus.OK)
            .expect(({body})=> {
                //console.log(body);
                expect(body.login).to.equal(TEST_USER.login);
                expect(body.email).to.equal(TEST_USER.email);
                expect(body.password).to.not.equal(TEST_USER.password);
            })
            .end(done)
    });

    it("PUT replace user", (done)=> {
        supertest
            .put(`${urls.USERS_API}/${TEST_USER.login}`)
            .set("Content-Type", "application/json")
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

    after("Delete user", (done)=> {
        supertest
            .del(`${urls.USERS_API}/${TEST_USER.login}`)
            .expect(HttpStatus.OK)
            .end(done);
    });

});