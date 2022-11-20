'use strict';
/**
 * @author pmendoar
 */
const { log } = require('console');

const logger = {
  info(...args) {
    log.call(null, ...['\x1b[35m\x1b[5m', 'info   ', '\x1b[0m', ...args]);
  },
  warning(...args) {
    log.call(null, ...['\x1b[33m\x1b[5m', 'warning', '\x1b[0m', ...args]);
  },
  success(...args) {
    log.call(null, ...['\x1b[32m\x1b[5m', 'success', '\x1b[0m', ...args]);
  }
};

module.exports = { logger };