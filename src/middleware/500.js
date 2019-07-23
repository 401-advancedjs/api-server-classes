'use strict';

/**
 * Handles 500 error
 * @module 500error
 */
module.exports = (err, req, res, next) => {
  let error = { error: err };
  res.status(500).json(error).end();
};
