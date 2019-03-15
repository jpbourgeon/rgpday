import React from 'react'
import PropTypes from 'prop-types'
import logger from 'src/logger'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import AccountCircle from '@material-ui/icons/AccountCircleOutlined'
import Collapse from '@material-ui/core/Collapse'
import isEmpty from 'validator/lib/isEmpty'
import ReCaptcha from 'src/components/ReCaptcha'

import Auth from '@aws-amplify/auth'
import config from 'src/aws-exports'

Auth.configure(config)

const styles = theme => {
  return {
    layout: {
      width: 'auto',
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
        width: 1100,
        marginLeft: 'auto',
        marginRight: 'auto'
      }
    },
    formContainer: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    titleIcon: {
      fontSize: '2.5rem',
      marginBottom: '-0.5rem'
    },
    mainFeaturedPost: {
      backgroundSize: `100% 100%`,
      marginBottom: theme.spacing.unit * 4
    },
    mainFeaturedPostContent: {
      padding: `${theme.spacing.unit * 6}px`
    },
    button: {
      marginRight: theme.spacing.unit,
      marginTop: theme.spacing.unit * 2
    }
  }
}

const defaultState = {
  loading: false,
  form: {
    isDisabled: false,
    showPassword: false
  },
  username: {
    isDirty: false,
    value: ''
  },
  password: {
    isDirty: false,
    value: ''
  }
}

class SignIn extends React.Component {
  constructor (props) {
    super(props)
    this.state = defaultState
    this.ReCaptchaRef = React.createRef()

    this._isMounted = false
    this._validAuthStates = ['signIn', 'signedOut']
    this._isHidden = true
    this.changeState = this.changeState.bind(this)
    this.signIn = this.signIn.bind(this)

    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  componentDidMount () {
    this._isMounted = true
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
  handleChange (event, field) {
    const state = {}
    state.form = this.state.form
    if (field === 'username') {
      if (event.target.value === 'Admin') {
        state.form.showPassword = true
        state.password = {
          isDirty: false,
          value: ''
        }
      } else {
        state.form.showPassword = false
        state.password = {
          isDirty: true,
          value: event.target.value
        }
      }
    }
    state[field] = {
      isDirty: this.state[field].isDirty,
      value: event.target.value
    }

    this.setState({ ...state })
  }

  handleBlur (event, field) {
    const state = {}
    state[field] = {
      isDirty: true,
      value: this.state[field].value
    }
    this.setState({ ...state })
  }

  handleSubmit (event) {
    event.preventDefault()
    let state = this.state
    if (!isEmpty(this.state.username.value) && !isEmpty(this.state.password.value)) {
      state.loading = true
      this.setState({ state }, () => {
        this.ReCaptchaRef.current.execute()
      })
    }
  }

  handleCancel (event) {
    event.preventDefault()
    const state = { ...defaultState }
    state.form.showPassword = false
    this.setState(state)
  }

  async signIn (token) {
    const { setConfig } = this.props
    try {
      const { username: { value: username }, password: { value: password } } = this.state
      if (!Auth || typeof Auth.signIn !== 'function') {
        throw new Error('No Auth module found, please ensure @aws-amplify/auth is imported')
      }
      const validationData = { recaptcha: token }
      const user = await Auth.signIn({ username, password, validationData })
      if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        if (this._isMounted) this.changeState('requireNewPassword', user)
        Auth.completeNewPassword(
          user, // the Cognito User Object
          password // same password
        ).catch(e => logger.error('signIn', e))
      }
      if (this._isMounted) this.changeState('signedIn', user)
      setConfig()
    } catch (err) {
      logger.error('signIn', err)
    } finally {
      const event = {
        preventDefault: () => (null)
      }
      if (this._isMounted) this.handleCancel(event)
    }
  }

  render () {
    const { classes } = this.props
    if (!this._validAuthStates.includes(this.props.authState)) {
      this._isHidden = true
      this.inputs = {}
      return null
    }

    if (this._isHidden) {
      this.inputs = {}
      const { track } = this.props
      if (track) track()
    }
    this._isHidden = false
    return (
      <div className={classes.layout}>
        <main>
          <Paper className={classes.mainFeaturedPost}>
            <Grid container alignContent='center' direction='column'>
              <Grid item xs={12} md={6}>
                <div className={classes.mainFeaturedPostContent}>
                  <Typography variant='h4' color='inherit' gutterBottom>
                    <AccountCircle className={classes.titleIcon} />&nbsp;Connexion
                  </Typography>

                  <form
                    className={classes.formContainer}
                    noValidate
                    autoComplete='off'
                    onSubmit={this.handleSubmit}
                  >
                    <Grid container>
                      <Grid item xs={12}>
                        <TextField
                          label='Identifiant de session'
                          fullWidth
                          margin='normal'
                          variant='outlined'
                          onChange={(e) => this.handleChange(e, 'username')}
                          onBlur={(e) => this.handleBlur(e, 'username')}
                          value={this.state.username.value}
                          error={(this.state.username.isDirty && isEmpty(this.state.username.value))}
                          disabled={this.state.loading}
                        />
                        <Collapse in={this.state.form.showPassword}>
                          <TextField
                            label='mot de passe'
                            fullWidth
                            margin='normal'
                            variant='outlined'
                            type='password'
                            onChange={(e) => this.handleChange(e, 'password')}
                            onBlur={(e) => this.handleBlur(e, 'password')}
                            value={this.state.password.value}
                            error={(this.state.password.isDirty && isEmpty(this.state.password.value))}
                            disabled={this.state.loading}
                          />
                        </Collapse>
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant='outlined'
                          color='secondary'
                          className={classes.button}
                          type='submit'
                          disabled={this.state.loading}
                        >
                    Login
                        </Button>
                        <Button
                          variant='outlined'
                          className={classes.button}
                          onClick={this.handleCancel}
                          disabled={this.state.loading}
                        >
                    Annuler
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </main>
        <ReCaptcha
          action='contact'
          sitekey='6LedLpMUAAAAAG8Ai4M4x9wTcIs4rPmvYV82a7Yh'
          verifyCallback={this.signIn}
          ref={this.ReCaptchaRef}
        />
      </div>
    )
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SignIn)
