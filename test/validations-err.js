'use strict';

/**
 * @fileOverview validations-err.js (test)
 *
 * @author
 * @author waricoma
 * @version 1.0.0
 */

const assert = require('assert');
const validationsErr = require('../src/lib/validations-err');

const masterMsgForTest = {
  token: 'sample',
  docKey: '1EgPQuTuC2OazDFQotgRaAflBpqOXpLJpYgWzEShHoRo',
  sheetName: 'Sheet1',
  task: [
    [0, 1, 2],
    [3, 4, 5],
    ['=SUM(A1+A2)', '=SUM(B1+B2)', '=SUM(C1+C2)']
  ],
  option: {
    clear: true,
    resize: true
  }
};

const masterToken = 'sample';

describe('ValidationsErr', () => {
  describe('test of token', () => {
    it('if forget to set token', () => {
      const msgForTest = Object.assign({}, masterMsgForTest);
      delete msgForTest.token;
      assert.strictEqual('you need to set token', validationsErr(msgForTest, masterToken));
    });
    it('if set not string type data to token', () => {
      const msgForTest = Object.assign({}, masterMsgForTest);
      msgForTest.token = 100;
      assert.strictEqual('you need to set string to token', validationsErr(msgForTest, masterToken));
      msgForTest.token = null;
      assert.strictEqual('you need to set string to token', validationsErr(msgForTest, masterToken));
    });
    it('if set illegal token', () => {
      const msgForTest = Object.assign({}, masterMsgForTest);
      msgForTest.token = 'illegal token';
      assert.strictEqual('illegal token', validationsErr(msgForTest, masterToken));
    });
  });

  describe('test of docKey', () => {
    it('if forget to set docKey', () => {
      const msgForTest = Object.assign({}, masterMsgForTest);
      delete msgForTest.docKey;
      assert.strictEqual('you need to set docKey', validationsErr(msgForTest, masterToken));
    });
    it('if set not string type data to docKey', () => {
      const msgForTest = Object.assign({}, masterMsgForTest);
      msgForTest.docKey = 100;
      assert.strictEqual('you need to set string to docKey', validationsErr(msgForTest, masterToken));
      msgForTest.docKey = null;
      assert.strictEqual('you need to set string to docKey', validationsErr(msgForTest, masterToken));
    });
  });

  describe('test of sheetName', () => {
    it('if forget to set sheetName', () => {
      const msgForTest = Object.assign({}, masterMsgForTest);
      delete msgForTest.sheetName;
      assert.strictEqual('you need to set sheetName', validationsErr(msgForTest, masterToken));
    });
    it('if set not string type data to sheetName', () => {
      const msgForTest = Object.assign({}, masterMsgForTest);
      msgForTest.sheetName = 100;
      assert.strictEqual('you need to set string to sheetName', validationsErr(msgForTest, masterToken));
      msgForTest.sheetName = null;
      assert.strictEqual('you need to set string to sheetName', validationsErr(msgForTest, masterToken));
    });
  });

  describe('test of task', () => {
    it('if forget to set task', () => {
      const msgForTest = Object.assign({}, masterMsgForTest);
      delete msgForTest.task;
      assert.strictEqual('you need to set task', validationsErr(msgForTest, masterToken));
    });
    it('if set not array type data to task', () => {
      const msgForTest = Object.assign({}, masterMsgForTest);
      msgForTest.task = 100;
      assert.strictEqual('you need to set array to task', validationsErr(msgForTest, masterToken));
      msgForTest.task = null;
      assert.strictEqual('you need to set array to task', validationsErr(msgForTest, masterToken));
    });
  });

  describe('test of option', () => {
    it('if forget to set option, no problem', () => {
      const msgForTest = Object.assign({}, masterMsgForTest);
      delete msgForTest.option;
      assert.strictEqual(null, validationsErr(msgForTest, masterToken));
    });
    it('if set not object type data to option', () => {
      const msgForTest = Object.assign({}, masterMsgForTest);
      msgForTest.option = 100;
      assert.strictEqual('you need to set object to option', validationsErr(msgForTest, masterToken));
      msgForTest.option = null;
      assert.strictEqual('you need to set object to option', validationsErr(msgForTest, masterToken));
    });
  });
});
