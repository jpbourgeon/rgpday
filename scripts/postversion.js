'use strict'

// Do this as the first thing so that any code reading it knows the right env.
process.env.NODE_ENV = 'CI'

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err
})

const logger = require('../src/logger')
const git = require('simple-git')(__dirname)

git
  .push(['origin', 'dev'], (err) => {
    if (err) {
      logger.error('postversion:push', err)
    } else {
      logger.info('postversion:push', 'success')
    }
  })
  .pushTags('origin', (err) => {
    if (err) {
      logger.error('postversion:pushTags', err)
    } else {
      logger.info('postversion:pushTags', 'success')
    }
  })
