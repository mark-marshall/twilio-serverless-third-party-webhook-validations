const crypto = require('crypto')

exports.handler = function (context, event, callback) {
  // Declare
  console.log(event)
  callback(null, { hello: 'world' })
}
