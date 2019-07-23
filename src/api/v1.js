'use strict';

/**
 * API Router Module (V1)
 * Integrates with various models through a common Interface (.get(), .post(), .put(), .delete())
 * @module src/api/v1
 */

const cwd = process.cwd();

const express = require('express');

const modelFinder = require(`${cwd}/src/middleware/model-finder.js`);

const router = express.Router();

// Evaluate the model, dynamically
router.param('model', modelFinder);


// API Routes
router.get('/api/v1/:model', handleGetAll);
router.post('/api/v1/:model', handlePost);

router.get('/api/v1/:model/:id', handleGetOne);
router.put('/api/v1/:model/:id', handlePut);
router.delete('/api/v1/:model/:id', handleDelete);

// Route Handlers

/**
 * Gets all the data
 * @param {object} request - contains the request
 * @param {object} response - contains the response
 * @param {callback} next - calls the next function
 */
function handleGetAll(request,response,next) {
  request.model.get()
    .then( data => {
      const output = {
        count: data.length,
        results: data,
      };
      response.status(200).json(output);
    })
    .catch( next );
}

/**
 * Get the selected entry
 * @param {object} request - contains the request
 * @param {objec} response - contains the response
 * @param {callback} next - calls the next function
 */
function handleGetOne(request,response,next) {
  request.model.get(request.params.id)
    .then( result => response.status(200).json(result[0]) )
    .catch( next );
}

/**
 * Controls the flow of adding an entry to the database
 * @param {object} request - contains the request
 * @param {object} response - contains the response
 * @param {callback} next - calls the next function
 */
function handlePost(request,response,next) {
  request.model.post(request.body)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

/**
 * Controls the flow of updating an entry in the database
 * @param {object} request - contains the request
 * @param {object} response - contains the repsonse
 * @param {callback} next - calls the next function
 */
function handlePut(request,response,next) {
  request.model.put(request.params.id, request.body)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

/**
 * Controls the flow of deleting an entry from the database
 * @param {obejct} request - contains the request
 * @param {object} response - contains the response
 * @param {*} next - calls the next function
 */
function handleDelete(request,response,next) {
  request.model.delete(request.params.id)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

module.exports = router;
