const Logger = require('@aws-amplify/core').Logger

const logger = new Logger('rgpday', 'INFO')

if (typeof window !== 'undefined') {
  window.LOG_LEVEL = (process.env.NODE_ENV === 'development') ? 'INFO' : null
}

module.exports = logger
