const Logger = require('@aws-amplify/core').Logger

window.LOG_LEVEL = null
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') window.LOG_LEVEL = 'INFO'

const logger = new Logger('rgpday')

module.exports = logger
