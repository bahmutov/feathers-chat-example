'use strict';

const globalHooks = require('../../../hooks');


exports.before = {
  all: [
    // call global hook
    globalHooks.myHook()
  ],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: [function remove(req) {
    console.log('removing message', req.id)
  }]
};

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
