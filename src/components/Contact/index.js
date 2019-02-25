import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { ReCaptcha } from 'recaptcha-v3-react'
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
import AppBar from '../AppBar'

const styles = theme => {
  return {
    '@global': {
      '.grecaptcha-badge': {
        visibility: 'visible !important'
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
      margin: theme.spacing.unit
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
  from: {
    isDirty: false,
    value: ''
  },
  form: {
    isDisabled: false
  },
  recaptcha: {
    token: ''
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
    this.state = { ...defaultState }

    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this)
    this.handleReCaptchaToken = this.handleReCaptchaToken.bind(this)
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

  handleSubmit (event) {
    event.preventDefault()
    const snackbar = {
      open: true,
      message: ''
    }
    if (
      isEmail(this.state.from.value) &&
      !isEmpty(this.state.from.value) &&
      !isEmpty(this.state.subject.value) &&
      !isEmpty(this.state.content.value) &&
      !isEmpty(this.state.recaptcha.token)
    ) {
      // TODO : Call SES Lambda and manage response (success if recaptcha verified and email sent, fail otherwise)
      // Disable form during Lambda call
      // Reset form on success but not on failure !
      snackbar.message = `Votre message a été envoyé avec succès.`
      this.setState({ snackbar })
    } else {
      snackbar.message = `Votre message n'a pas été envoyé. Le formulaire est invalide.`
      this.setState({ snackbar })
    }
  }

  handleCancel (event) {
    event.preventDefault()
    const state = { ...defaultState, recaptcha: this.state.recaptcha }
    this.setState({ ...state })
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

  handleReCaptchaToken (token) {
    const recaptcha = { token }
    this.setState({ recaptcha })
  }

  render () {
    const { classes } = this.props
    return (
      <div className={classes.layout}>
        <AppBar />
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
                      label='Votre email'
                      fullWidth
                      margin='normal'
                      variant='outlined'
                      onChange={(e) => this.handleChange(e, 'from')}
                      onBlur={(e) => this.handleBlur(e, 'from')}
                      value={this.state.from.value}
                      error={(
                        this.state.from.isDirty &&
                        (
                          !isEmail(this.state.from.value) ||
                          isEmpty(this.state.from.value)
                        )
                      )}
                      disabled={this.state.form.isDisabled}
                    />
                    <TextField
                      label='Sujet'
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
                      label='Description'
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
                    autoHideDuration={5000}
                    onClose={this.handleClose}
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
        />
      </div>
    )
  }
}

Contact.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Contact)
