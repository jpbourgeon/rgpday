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
const comp = require('compare-versions')

const config = {}

git
  // CI git clone is shallow: https://github.com/travis-ci/travis-ci/issues/6069#issuecomment-266546552
  .raw(['remote', 'set-branches', '--add', 'origin', 'master'])
  .fetch()
  .fetch('origin', '--tags')
  // Start comparing tags
  .raw(['describe', '--tags', 'origin/master'], (err, tag) => {
    if (!err) {
      config.latestTagOnMaster = tag.trim()
      logger.info('ci-push-to-master', `Latest tag on master: ${config.latestTagOnMaster}`)
    }
  })
  .tags((err, tags) => {
    if (!err) {
      config.latestTag = tags.latest.trim()
      logger.info('ci-push-to-master', `Latest tag: ${config.latestTag}`)
    }
  })
  .revparse(['HEAD'], (err, commit) => {
    if (!err) {
      config.currentCommit = commit.trim()
      logger.info('ci-push-to-master', `Current commit: ${config.currentCommit}`)
    }
  })
  .tag(['-l', '--points-at', 'HEAD'], (err, commit) => {
    if (!err) {
      config.currentCommitTag = commit.trim()
      logger.info('ci-push-to-master', `Current commit tag: ${config.currentCommitTag}`)
    }
    // if there is a tag associated to the current commit
    if (config.currentCommitTag) {
      // and if the current commit tag is the latest tag available
      if (comp(config.currentCommitTag, config.latestTag) >= 0) {
        // and if this is the first tag pushed to master or the tag is newer than the last tag pushed to master
        if (!config.latestTagOnMaster || comp(config.currentCommitTag, config.latestTagOnMaster) > 0) {
          // then push the current commit tag to master
          logger.info('ci-push-to-master', `Pushing current commit tag to master (${config.currentCommitTag})`)
          git
            .push(['origin', `+${config.currentCommitTag}~0:master`])
        } else {
          logger.info('ci-push-to-master', `Master is already up to date with the latest tag (${config.latestTagOnMaster})`)
        }
      } else {
        logger.info('ci-push-to-master', 'The current commit tag is not the latest tag')
      }
    } else {
      logger.info('ci-push-to-master', 'There is no tag associated with the current commit')
    }
  })
