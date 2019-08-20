'use strict'
const EventEmitter = require('events').EventEmitter
let instance = null
if (instance === null) instance = new EventEmitter()
module.exports = instance
