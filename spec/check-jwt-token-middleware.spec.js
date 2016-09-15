/**
 * Check jwt auth token middleware test
 */
'use strict';
//require('../app');
const {describe, it, before, after} = require('mocha');
const {expect} = require('chai');
const checkJwtAuth = require('../middleware/check-jwt-token-middleware');
const TEST_USER = require('./spec-resources/test-user.json');

describe("Check jwt auth token middleware test", ()=> {
})