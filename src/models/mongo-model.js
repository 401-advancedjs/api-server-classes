'use strict';

/**
 * Represents a Model of the data
 * @class
 */

class Model {
  /**
   * Creates a new model
   * @constructor
   * @param {object} schema - schema that the model should follow.
   */
  constructor(schema) {
    this.schema = schema;
  }

  /**
   * Gets the information from the database using its id
   * @param {string} _id - id of the selected entry
   */
  get(_id) {
    let queryObject = _id ? {_id} : {};
    return this.schema.find(queryObject);
  }

  /**
   * Adds entry to the database
   * @param {object} record - conatiains required information to be added 
   */
  
  post(record) {
    let newRecord = new this.schema(record);
    return newRecord.save();
  }

  /**
   * Updtes the information of the entry to the database
   * @param {string} _id - id of the selected entry
   * @param {object} record - contains the information to be updated
   */
  put(_id, record) {
    return this.schema.findByIdAndUpdate(_id, record, {new:true});
  }

  /**
   * Deletes the information of the entry from the database
   * @param {string} _id - id of the selected entry
   */
  delete(_id) {
    return this.schema.findByIdAndDelete(_id);
  }

}

module.exports = Model;
