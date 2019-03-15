import React from 'react'
import logger from 'src/logger'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ReCaptcha from 'src/components/ReCaptcha'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Email from '@material-ui/icons/EmailOutlined'
import isEmail from 'validator/lib/isEmail'
import isEmpty from 'validator/lib/isEmpty'

import API, { graphqlOperation } from '@aws-amplify/api'
import { sendMail } from 'src/graphql/queries'
import config from 'src/aws-exports'

API.configure(config)

const styles = theme => {
  return {
    '@global': {
      '.grecaptcha-badge': {
        visibility: 'visible'
      }
    },
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
    titleIcon: {
      fontSize: '2.5rem',
      marginBottom: '-0.5rem'
    },
    formContainer: {
      display: 'flex',
      flexWrap: 'wrap'
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
    },
    closeSnackbar: {
      padding: theme.spacing.unit / 2
    }
  }
}

const defaultState = {
  content: {
    isDirty: false,
    value: ''
  },
  sender: {
    isDirty: false,
    value: ''
  },
  form: {
    isDisabled: false
  },
  snackbar: {
    open: false,
    message: ''
  },
  subject: {
    isDirty: false,
    value: ''
  }
}

class Contact extends React.Component {
  constructor (props) {
    super(props)
    this._isMounted = false
    this.state = { ...defaultState }
    this.ReCaptchaRef = React.createRef()

    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this)
    this.handleReCaptchaToken = this.handleReCaptchaToken.bind(this)
  }

  componentDidMount () {
    this._isMounted = true
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  handleChange (event, field) {
    const state = {}
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

  async handleSubmit (event) {
    event.preventDefault()
    let state = this.state
    if (
      !isEmpty(this.state.sender.value) && isEmail(this.state.sender.value) &&
      !isEmpty(this.state.subject.value) &&
      !isEmpty(this.state.content.value)
    ) {
      state.form.isDisabled = true
      state.snackbar.message = `Votre message est en cours d'envoi. Merci de patienter...`
      state.snackbar.open = true
      if (this._isMounted) {
        this.setState({ state }, () => {
          this.ReCaptchaRef.current.execute()
        })
      }
    } else {
      state.snackbar.message = `Votre message n'a pas été envoyé. Le formulaire est invalide.`
      state.snackbar.open = true
      if (this._isMounted) this.setState({ state })
    }
  }

  handleCancel (event = { preventDefault: () => {} }) {
    event.preventDefault()
    this.setState({ ...defaultState, form: { isDisabled: false }, snackbar: { open: false, message: '' } })
  }

  handleCloseSnackbar (event, reason) {
    if (reason === 'clickaway') {
      return
    }
    const snackbar = {
      open: false,
      message: ''
    }
    this.setState({ snackbar })
  }

  async handleReCaptchaToken (token) {
    let state = this.state
    try {
      const result = await API.graphql(
        graphqlOperation(sendMail, {
          'sender': this.state.sender.value,
          'content': this.state.content.value,
          'subject': this.state.subject.value,
          'recaptcha': token
        })
      )
      logger.info(result)
      if (!result.errors) {
        logger.info('handleSubmit', result)
        state = { ...defaultState }
        state.snackbar.message = `Votre message a été envoyé avec succès.`
        state.snackbar.open = true
      } else {
        logger.error('handleSubmit', result)
        state.snackbar.message = `L'envoi de votre message a échoué.`
        state.snackbar.open = true
      }
    } catch (error) {
      logger.error('handleSubmit', error)
      state.snackbar.message = `L'envoi de votre message a échoué.`
      state.snackbar.open = true
    } finally {
      if (this._isMounted) this.setState({ ...state, form: { isDisabled: false } })
    }
  }

  render () {
    const { classes } = this.props
    return (
      <div className={classes.layout}>
        <main>
          <Paper className={classes.mainFeaturedPost}>
            <Grid container>
              <Grid item xs={12}>
                <div className={classes.mainFeaturedPostContent}>
                  <Typography variant='h4' color='inherit' gutterBottom>
                    <Email className={classes.titleIcon} />&nbsp;Contact
                  </Typography>

                  <form
                    className={classes.formContainer}
                    noValidate
                    autoComplete='off'
                    onSubmit={this.handleSubmit}
                  >
                    <TextField
                      label='Votre email *'
                      fullWidth
                      margin='normal'
                      variant='outlined'
                      onChange={(e) => this.handleChange(e, 'sender')}
                      onBlur={(e) => this.handleBlur(e, 'sender')}
                      value={this.state.sender.value}
                      error={(
                        this.state.sender.isDirty &&
                        (
                          !isEmail(this.state.sender.value) ||
                          isEmpty(this.state.sender.value)
                        )
                      )}
                      disabled={this.state.form.isDisabled}
                    />
                    <TextField
                      label='Sujet *'
                      fullWidth
                      margin='normal'
                      variant='outlined'
                      onChange={(e) => this.handleChange(e, 'subject')}
                      onBlur={(e) => this.handleBlur(e, 'subject')}
                      value={this.state.subject.value}
                      error={(this.state.subject.isDirty && isEmpty(this.state.subject.value))}
                      disabled={this.state.form.isDisabled}
                    />
                    <TextField
                      label='Message *'
                      multiline
                      rows='10'
                      fullWidth
                      margin='normal'
                      variant='outlined'
                      onChange={(e) => this.handleChange(e, 'content')}
                      onBlur={(e) => this.handleBlur(e, 'content')}
                      value={this.state.content.value}
                      error={(this.state.content.isDirty && isEmpty(this.state.content.value))}
                      disabled={this.state.form.isDisabled}
                    />
                    <Button
                      variant='outlined'
                      color='secondary'
                      className={classes.button}
                      type='submit'
                      disabled={this.state.form.isDisabled}
                    >
                    Envoyer
                    </Button>
                    <Button
                      variant='outlined'
                      className={classes.button}
                      onClick={this.handleCancel}
                      disabled={this.state.form.isDisabled}
                    >
                    Annuler
                    </Button>
                  </form>

                  <Snackbar
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center'
                    }}
                    open={this.state.snackbar.open}
                    autoHideDuration={10000}
                    onClose={this.handleCloseSnackbar}
                    ContentProps={{
                      'aria-describedby': 'message-id'
                    }}
                    message={<span id='message-id'>{this.state.snackbar.message}</span>}
                    action={[
                      <IconButton
                        key='close'
                        aria-label='Close'
                        color='inherit'
                        className={classes.closeSnackbar}
                        onClick={this.handleCloseSnackbar}
                      >
                        <CloseIcon />
                      </IconButton>
                    ]}
                  />
                </div>
              </Grid>
            </Grid>
          </Paper>
        </main>
        <ReCaptcha
          action='contact'
          sitekey='6LedLpMUAAAAAG8Ai4M4x9wTcIs4rPmvYV82a7Yh'
          verifyCallback={this.handleReCaptchaToken}
          ref={this.ReCaptchaRef}
        />
      </div>
    )
  }
}

Contact.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Contact)
