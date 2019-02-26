import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import { Link } from '@reach/router'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Hidden from '@material-ui/core/Hidden'
import Info from '@material-ui/icons/Info'
// import Email from '@material-ui/icons/Email'
import Game from '@material-ui/icons/VideogameAsset'
import SignOut from '@material-ui/icons/PowerSettingsNew'
import classNames from 'classnames'

import Auth from '@aws-amplify/auth'
import { Hub } from '@aws-amplify/core'
import config from '../../aws-exports'

Auth.configure(config)

const debug = require('debug')('rgpday.com')

const styles = theme => ({
  root: {
    paddingBottom: theme.spacing.unit * 4
  },
  grow: {
    flexGrow: 1
  },
  menuLink: {
    fontFamily: 'Roboto',
    fontSize: 'bold',
    color: theme.palette.common.white,
    textDecoration: 'none',
    margin: '0 0.5em',
    cursor: 'pointer'
  },
  hide: {
    display: 'none'
  }
})

class AppBarComponent extends React.Component {
  constructor (props) {
    super(props)

    if (!Auth || typeof Auth.signOut !== 'function') {
      throw new Error('No Auth module found, please ensure @aws-amplify/auth is imported')
    }
    this.signOut = this.signOut.bind(this)

    this.state = {}
    Hub.listen('auth', this)
  }

  componentDidMount () {
    this._isMounted = true
    this.findState()
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  triggerAuthEvent (event) {
    const state = this.props.authState
    if (this.props.onAuthEvent) { this.props.onAuthEvent(state, event) }
  }

  changeState (state, data) {
    if (this.props.onStateChange) { this.props.onStateChange(state, data) }

    this.triggerAuthEvent({
      type: 'stateChange',
      data: state
    })
  }

  findState () {
    if (!this.props.authState && !this.props.authData) {
      Auth.currentAuthenticatedUser()
        .then(user => {
          this.setState({
            authState: 'signedIn',
            authData: user,
            stateFromStorage: true
          })
        })
        .catch(err => debug(err))
    } else if (this.props.stateFromStorage) {
      this.setState({
        stateFromStorage: true
      })
    }
  }

  onHubCapsule (capsule) {
    if (this._isMounted) {
      const { channel, payload } = capsule
      if (channel === 'auth' && payload.event === 'signIn') {
        this.setState({
          authState: 'signedIn',
          authData: payload.data
        })
      } else if (channel === 'auth' && payload.event === 'signOut' && (!this.props.authState)) {
        this.setState({
          authState: 'signIn'
        })
      }

      if (channel === 'auth' && payload.event === 'signIn' && (!this.props.authState)) {
        this.setState({ stateFromStorage: true })
      }
    }
  }

  async signOut () {
    if (!Auth || typeof Auth.signOut !== 'function') {
      throw new Error('No Auth module found, please ensure @aws-amplify/auth is imported')
    }
    await Auth.signOut()
      .catch(err => debug(err))
    this.changeState('signedOut')
  }

  render () {
    const { classes } = this.props
    const authState = this.props.authState || this.state.authState
    const signedIn = (authState === 'signedIn')

    return (
      <div className={classes.root}>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6' color='inherit' className={classes.grow}>
              <Link to='/' className={classes.menuLink}>RGPDay</Link>
            </Typography>
            <Link to='/about' className={classes.menuLink}>
              <Hidden smUp><Info /></Hidden>
              <Hidden xsDown>À propos</Hidden>

            </Link>
            {/*
            <Link to='/contact' className={classes.menuLink}>
              <Hidden smUp><Email /></Hidden>
              <Hidden xsDown>Contact</Hidden>
            </Link>
            */}
            <Link to='/session' className={classes.menuLink}>
              <Hidden smUp><Game /></Hidden>
              <Hidden xsDown>Session</Hidden>
            </Link>
            <div onClick={this.signOut} className={classNames(classes.menuLink, !signedIn && classes.hide)}>
              <Hidden smUp><SignOut /></Hidden>
              <Hidden xsDown>Déconnexion</Hidden>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

AppBarComponent.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AppBarComponent)
