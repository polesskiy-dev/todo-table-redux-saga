/**
 * Auth controller test
 */
'use strict';
require('../app');
const {describe, it} = require('mocha');
const {expect} = require('chai');
const AuthController = require('../controllers/AuthController');
const [USER_ROLE, ADMIN_ROLE] = require('../config/auth.config.json').roles;
const TEST_USER = require('./spec-resources/test-user.json');
const TEST_ADMIN = require('./spec-resources/test-admin.json');

describe("Auth controller test", ()=> {
    it("Fabric method returns auth controller instance", ()=> {
        const authController = AuthController.getInstance();
        expect(authController.allowedLogins).to.be.instanceof(Array);
        expect(authController.allowedRoles).to.be.instanceof(Array);
    });

    it("AuthController.checkPermissions()", ()=> {
        let authController = AuthController.getInstance().allowRoles(ADMIN_ROLE);
        expect(authController.checkPermissions({role: ADMIN_ROLE})).to.be.true;
        expect(authController.checkPermissions({role: USER_ROLE})).to.be.false;

        authController = AuthController.getInstance().allowLogins(TEST_USER.login);
        expect(authController.checkPermissions(TEST_USER)).to.be.true;
        expect(authController.checkPermissions(TEST_ADMIN)).to.be.false;

        authController = AuthController.getInstance().allowRoles(ADMIN_ROLE).allowLogins(TEST_USER.login);
        expect(authController.checkPermissions(TEST_USER)).to.be.true;
        expect(authController.checkPermissions(TEST_ADMIN)).to.be.true;
        expect(authController.checkPermissions({login: "unallowed"})).to.be.false;
        expect(authController.checkPermissions({role: "unallowed"})).to.be.false;
    });

    it("AuthController.getUserByToken() and checking permissions for role 'admin'", async function () {
        try {
            const authController = AuthController.getInstance()
            await authController.getUserByToken(TEST_ADMIN.token);
            authController.allowRoles(ADMIN_ROLE)
            expect(authController.checkPermissions({role: ADMIN_ROLE})).to.be.true;
            expect(authController.checkPermissions({role: USER_ROLE})).to.be.false;
        } catch (e) {
            console.log(e.message);
            expect(e).to.not.exist;
        }
    });

});
