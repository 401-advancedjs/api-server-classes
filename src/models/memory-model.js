'use strict';

const uuid = require('uuid/v4');

/**
 * Represents a Model of the data
 * @class
 */

class Model {
  /**
   * Creates a new model
   * @constructor
   * @param {object} schema - schema that the model should follow 
   */
  constructor(schema) {
    this.schema = schema;
    this.database = [];
  }
  /**
   * Validates and formats the entry
   * @param {object} entry - contains the information of an entry
   */
  sanitize(entry) {

    /**
     * @type {boolean}
     */
    let valid = true;
    let record = {};

    Object.keys(this.schema).forEach( field => {
      if ( this.schema[field].required ) {
        if (entry[field]) {
          record[field] = entry[field];
        } else {
          valid = false;
        }
      }
      else {
        record[field] = entry[field];
      }
    });
    
    return valid ? record : undefined;
  }
  
  /**
   * Returns the size of the database
   */
  count() {
    return this.database.length;
  }

  /**
   * Gets the entry of the selected item from the database
   * @param {string} id - id of the selected entry
   */
  get(id) {
    const records = id ? this.database.filter( (record) => record._id === id ) : this.database;
    return Promise.resolve(records);
  }

  /**
   * Adds the entry to the databse
   * @param {object} entry - contains the required information of an entry
   */
  post(entry) {
    entry._id = uuid();
    let record = this.sanitize(entry);
    if ( record._id ) { this.database.push(record); }
    return Promise.resolve(record);
  }

  /**
   * Deletes the entry using its id
   * @param {string} id - id of the selected entry
   */
  delete(id) {
    this.database = this.database.filter((record) => record._id !== id );
    return this.get(id);
  }

  /**
   * Updates the selected entry in the database
   * @param {string} id - id of the selected entry
   * @param {object} entry - contains the information used to update the entry
   */
  put(id, entry) {
    let record = this.sanitize(entry);
    if( record._id ) { this.database = this.database.map((item) => (item._id === id) ? record : item  ); }
    return this.get(id);
  }
  
}

module.exports = Model;