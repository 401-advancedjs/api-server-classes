'use strict';


const Model = require('../mongo-model.js');
const schema = require('./teams-schema.js');

/**
 * Creates a new Team
 * @class
 */
class Teams extends Model {}

module.exports = new Teams(schema);

