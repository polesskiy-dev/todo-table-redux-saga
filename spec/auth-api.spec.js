/**
 * Auth API test
 */
'use strict';
const app = require('../app');
const supertest = require("supertest")(app);
const {describe, it, after} = require('mocha');
const {expect} = require('chai');
const HttpStatus = require('http-status-codes');
const urls = require('../config/urls.config');
const TEST_ADMIN = require('./spec-resources/test-admin.json');
const testUser = require('./spec-resources/test-user.json');

describe("Auth API test", ()=> {
    it("Register new user", (done)=> {
        supertest
            .post(urls.AUTH_API + "/" + urls.REGISTRATION)
            .set("Content-Type", "application/json")
            .send(testUser)
            .expect(HttpStatus.CREATED)
            .expect(({body})=> {
                /** update password by hashed password from server */
                testUser.password = body.password;
                expect(body.token).to.exist;
                expect(body.login).to.exist;
            })
            .end(done)
    });

    it("Login as user", (done)=> {
        supertest
            .post(urls.AUTH_API + "/" + urls.LOGIN)
            .set("Authorization", "application/json")
            .send(testUser)
            .expect(HttpStatus.OK)
            .expect(({body})=> {
                expect(body.token).to.exist;
                expect(body.login).to.exist;
            })
            .end(done)
    });

    after("Delete user as admin", (done)=> {
        supertest
            .del(`${urls.USERS_API}/${testUser.login}`)
            .set("Authorization", TEST_ADMIN.token)
            .expect(HttpStatus.OK)
            .end(done);
    });

});