import React from 'react'
import PropTypes from 'prop-types'
import logger from '../../logger'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import AppBar from '@material-ui/core/AppBar'
import { Link } from '@reach/router'
import Toolbar from '@material-ui/core/Toolbar'
import Fade from '@material-ui/core/Fade'
import Typography from '@material-ui/core/Typography'
import Hidden from '@material-ui/core/Hidden'
import Info from '@material-ui/icons/Info'
import Email from '@material-ui/icons/Email'
import Game from '@material-ui/icons/VideogameAsset'
import SignOut from '@material-ui/icons/PowerSettingsNew'
import ArrowBack from '@material-ui/icons/ArrowBack'
import Fab from '@material-ui/core/Fab'
import Auth from '@aws-amplify/auth'
import { Hub } from '@aws-amplify/core'
import config from '../../aws-exports'

Auth.configure(config)

const styles = theme => ({
  root: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto'
    },
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
  },
  fab: {
    position: 'fixed',
    top: theme.spacing.unit,
    left: theme.spacing.unit
  }
})

class AppBarComponent extends React.Component {
  constructor (props) {
    super(props)

    if (!Auth || typeof Auth.signOut !== 'function') {
      throw new Error('No Auth module found, please ensure @aws-amplify/auth is imported')
    }
    this.signOut = this.signOut.bind(this)
    this._timer = null
    this.state = {
      moved: false
    }
    Hub.listen('auth', this)
  }

  componentDidMount () {
    this._isMounted = true
    this.findState()
    document.documentElement.onmousemove = () => {
      clearTimeout(this._timer)
      if (!this.state.moved) this.setState({ moved: true })
      this._timer = setTimeout(function () {
        this.setState({ moved: false })
      }.bind(this), 3000)
    }
  }

  componentWillUnmount () {
    this._isMounted = false
    document.documentElement.onmousemove = () => {}
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
        .catch(err => logger.error('findState', err))
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
      .catch(err => logger.error('signOut', err))
    this.changeState('signedOut')
  }

  render () {
    const { classes, minified } = this.props
    const { moved } = this.state
    const authState = this.props.authState || this.state.authState
    const signedIn = (authState === 'signedIn')

    if (minified) {
      return (<React.Fragment>
        <Fade in={moved}>
          <Link to='../'>
            <Fab color='primary' aria-label='Back' className={classes.fab}>
              <ArrowBack />
            </Fab>
          </Link>
        </Fade>
        <div className={classes.root} />
      </React.Fragment>)
    }
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

            <Link to='/contact' className={classes.menuLink}>
              <Hidden smUp><Email /></Hidden>
              <Hidden xsDown>Contact</Hidden>
            </Link>

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
  classes: PropTypes.object.isRequired,
  minified: PropTypes.bool
}
AppBarComponent.defaultProps = {
  minified: false
}

export default withStyles(styles)(AppBarComponent)
