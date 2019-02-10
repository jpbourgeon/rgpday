'use strict'

// Do this as the first thing so that any code reading it knows the right env.
process.env.NODE_ENV = 'CI'

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err
})

const debug = require('debug')('app.weighers.club')
const fs = require('fs')
const Path = require('path')
const ciOptions = {
  'reactSnap': {
    'puppeteerArgs': ['--no-sandbox', '--disable-setuid-sandbox'],
    'puppeteerExecutablePath': '/opt/google/chrome/google-chrome'
  }
}
const packageDotJson = { ...require(Path.resolve(process.cwd(), './package.json')), ...ciOptions }
fs.writeFileSync(Path.resolve(process.cwd(), './package.json'), JSON.stringify(packageDotJson))

debug('ci-setup', 'finished')
