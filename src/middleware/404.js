'use strict';

/**
 * Handles 404 error
 * @module 404error
 */

module.exports = (req,res,next) => {
  let error = { error: 'Resource Not Found' };
  res.status(404).json(error).end();
};
