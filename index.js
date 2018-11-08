const operations = require('./src/operations');
const patterns = require('./src/patterns');
const utils = require('./src/utils');

module.exports = {
  ...operations,
  ...patterns,
  ...utils
}