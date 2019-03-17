const Logger = require('@aws-amplify/core').Logger

const logger = new Logger('rgpday', 'INFO')

if (typeof window !== 'undefined') {
  window.LOG_LEVEL = (process.env.NODE_ENV === 'development') ? 'INFO' : 'ERROR'
}

module.exports = logger
