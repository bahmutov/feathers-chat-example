'use strict';

// const service = require('feathers-mongoose');
const path = require('path')
const NeDB = require('nedb')
const service = require('feathers-nedb')
const message = require('./message-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const db = new NeDB({
    filename: path.join(__filename, '../../../../message.db'),
    autoload: true
  })

  const options = {
    Model: db,
    paginate: {
      default: 25,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/messages', service(options));

  // Get our initialize service to that we can bind hooks
  const messageService = app.service('/messages');

  // Set up our before hooks
  messageService.before(hooks.before);

  // Set up our after hooks
  messageService.after(hooks.after);
};
