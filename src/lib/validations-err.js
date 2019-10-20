'use strict';

/**
 * @fileOverview validations-err.js
 *
 * @author
 * @author waricoma
 * @version 1.0.0
 */

/**
 * main
 * @param {object} msg
 * @param {string} masterToken
 * @returns {string}
 */
const main = (msg, masterToken) => {
  // validations of token
  if (!('token' in msg)) {
    return 'you need to set token';
  }
  if (typeof msg.token !== 'string') {
    return 'you need to set string to token';
  }
  if (msg.token !== masterToken) {
    return 'illegal token';
  }

  // validations of docKey
  if (!('docKey' in msg)) {
    return 'you need to set docKey';
  }
  if (typeof msg.docKey !== 'string') {
    return 'you need to set string to docKey';
  }

  // validations of sheetName
  if (!('sheetName' in msg)) {
    return 'you need to set sheetName';
  }
  if (typeof msg.sheetName !== 'string') {
    return 'you need to set string to sheetName';
  }

  // validations of task
  if (!('task' in msg)) {
    return 'you need to set task';
  }
  if (!Array.isArray(msg.task)) {
    return 'you need to set array to task';
  }

  // validation of option
  if ('option' in msg) {
    if (Object.prototype.toString.call(msg.option) !== '[object Object]') {
      return 'you need to set object to option';
    }
  }

  return null;
};

module.exports = main;
