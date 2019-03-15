const Logger = require('@aws-amplify/core').Logger

const logger = new Logger('rgpday', 'WARN')

if (typeof window !== 'undefined') {
  window.LOG_LEVEL = (process.env.NODE_ENV === 'development') ? 'WARN' : null
}

module.exports = logger
