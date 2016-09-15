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
let testUser = require('./spec-resources/test-user.json');

describe("Auth API test", ()=> {
    it("Register new user", (done)=> {
        supertest
            .post(urls.AUTH_API + "/sign-up")
            .set("Content-Type", "application/json")
            .send(testUser)
            .expect(HttpStatus.CREATED)
            .expect(({body})=> {
                /** update password by hashed password from server */
                testUser.password = body.password;
                expect(body.token).to.be.not.undefined;
                expect(body.login).to.be.not.undefined;
            })
            .end(done)
    });

    it("Login as user", (done)=> {
        supertest
            .post(urls.AUTH_API + "/login")
            .set("Authorization", "application/json")
            .send(testUser)
            .expect(HttpStatus.OK)
            .expect(({body})=> {
                expect(body.token).to.be.not.undefined;
                expect(body.login).to.be.not.undefined;
            })
            .end(done)
    });

    after("Delete user", (done)=> {
        supertest
            .del(`${urls.USERS_API}/${testUser.login}`)
            .expect(HttpStatus.OK)
            .end(done);
    });

});