if (process.env.NODE_ENV === 'test') {
  module.exports = require('./test.server')
}
