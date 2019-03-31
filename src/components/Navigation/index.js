import React from 'react'
import PropTypes from 'prop-types'
import logger from 'src/logger'
import { navigate } from '@reach/router'
import { withStyles, withTheme } from '@material-ui/core/styles'
import classnames from 'classnames'
import AppBar from '@material-ui/core/AppBar'
import Link from 'src/components/Link'
import MUILink from '@material-ui/core/Link'
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
import config from 'src/aws-exports'

Auth.configure(config)

const styles = theme => {
  return ({
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
      left: theme.spacing.unit,
      zIndex: 10
    }
  })
}
class Navigation extends React.Component {
  constructor (props) {
    super(props)

    if (!Auth || typeof Auth.signOut !== 'function') {
      throw new Error('No Auth module found, please ensure @aws-amplify/auth is imported')
    }
    this.signOut = this.signOut.bind(this)
    this.reload = this.reload.bind(this)
    this.goTo = this.goTo.bind(this)
    this._timer = null
    this.state = {
      moved: false
    }
    Hub.listen('auth', (capsule) => {
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
    })
  }

  componentDidMount () {
    this._isMounted = true
    window.addEventListener('resize', this.reload, false)
    this.findState()
    document.documentElement.onmousemove = () => {
      clearTimeout(this._timer)
      if (this._isMounted) {
        if (!this.state.moved) this.setState({ moved: true })
        this._timer = setTimeout(function () {
          this.setState({ moved: false })
        }.bind(this), 3000)
      }
    }
  }

  componentWillUnmount () {
    this._isMounted = false
    document.documentElement.onmousemove = () => {}
    window.removeEventListener('resize', this.reload, false)
  }

  reload (event) {
    event.preventDefault()
    this.forceUpdate()
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
        .catch(err => logger.info('findState', err))
    } else if (this.props.stateFromStorage) {
      this.setState({
        stateFromStorage: true
      })
    }
  }

  async signOut () {
    if (!Auth || typeof Auth.signOut !== 'function') {
      throw new Error('No Auth module found, please ensure @aws-amplify/auth is imported')
    }
    await Auth.signOut()
      .catch(err => logger.info('signOut', err))
    if (this._isMounted) this.changeState('signedOut')
  }

  goTo (fabTo, openRules) {
    this.props.toggleRules(openRules)
    navigate(fabTo)
  }

  render () {
    const { classes, minified, board, paper, faded, theme, location } = this.props
    const { moved } = this.state
    const authState = this.props.authState || this.state.authState
    const signedIn = (authState === 'signedIn')
    const appbar = (
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

            <Link to='/dashboard' className={classes.menuLink}>
              <Hidden smUp><Game /></Hidden>
              <Hidden xsDown>Session</Hidden>
            </Link>
            <div onClick={this.signOut} className={classnames(classes.menuLink, !signedIn && classes.hide)}>
              <Hidden smUp><SignOut /></Hidden>
              <Hidden xsDown>Déconnexion</Hidden>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    )
    let marginLeft
    if (paper) {
      marginLeft = (window.innerWidth >= 1100 + theme.spacing.unit * 3 * 2)
        ? (window.innerWidth - (1100 + theme.spacing.unit * 3 * 2)) / 2
        : 0
    }
    if (board) {
      const paperHeight = window.innerHeight - theme.spacing.unit * 8
      const maxSVGHeight = (Math.min(window.innerWidth, 1100) * 707 / 1042) - theme.spacing.unit * 8
      const height = Math.min(paperHeight, maxSVGHeight)
      const width = height * 1042 / 707
      marginLeft = (window.innerWidth - width) / 2 - theme.spacing.unit * 4
    }

    let openRules = true
    let fabTo
    switch (true) {
      case (location.pathname.startsWith('/dashboard/serious-game/board')):
        openRules = false
        const pathArray = location.pathname.split('/')
        switch (pathArray.length) {
          case 6:
            fabTo = `/dashboard/serious-game/board/${pathArray[4]}`
            break
          default:
            fabTo = '/dashboard/serious-game'
            break
        }
        break
      case (location.pathname === ('/dashboard/serious-game')):
        fabTo = '/dashboard'
        break
      case (location.pathname.startsWith('/dashboard/serious-game')):
        fabTo = '/dashboard/serious-game'
        break
      default:
        fabTo = '/dashboard'
        break
    }
    const fab = (
      <div>
        <MUILink onClick={() => this.goTo(fabTo, openRules)}>
          <Fab
            color='primary'
            aria-label='Retour'
            className={classes.fab}
            style={(board || paper) ? {
              marginLeft,
              marginRight: 'auto'
            } : null
            }
          >
            <ArrowBack />
          </Fab>
        </MUILink>
      </div>
    )
    if (minified && faded) return <Fade in={moved}>{fab}</Fade>
    if (minified && !faded) {
      return (
        <React.Fragment>
          {fab}
          <div className={classes.root} />
        </React.Fragment>
      )
    }
    return appbar
  }
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  board: PropTypes.bool,
  paper: PropTypes.bool,
  faded: PropTypes.bool,
  minified: PropTypes.bool
}
Navigation.defaultProps = {
  minified: false,
  board: false,
  paper: false,
  faded: false
}

export default withTheme()(withStyles(styles)(Navigation))
