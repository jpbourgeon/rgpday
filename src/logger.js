const Logger = require('@aws-amplify/core').Logger

if (typeof window !== 'undefined') window.LOG_LEVEL = 'INFO'

const logger = new Logger('rgpday')

module.exports = logger
