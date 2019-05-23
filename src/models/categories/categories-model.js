'use strict';

const Model = require('../memory-model.js');

/**
 * formats the category data
 * @const {object}
 */
const schema = {
  _id: {required:true},
  name: {required:true},
};

/**
 * Creates a new model
 * @class
 */
class Categories extends Model {}

module.exports = new Categories(schema);
