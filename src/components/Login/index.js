import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import AccountCircle from '@material-ui/icons/AccountCircleOutlined'
import isEmpty from 'validator/lib/isEmpty'
import AppBar from '../AppBar'

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
  form: {
    isDisabled: false
  },
  sessionid: {
    isDirty: false,
    value: ''
  },
  snackbar: {
    open: false,
    message: ''
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
    if (!isEmpty(this.state.sessionid.value)) {
      // TODO : Call background AWS Cognito Login
      // Disable form during login
      // Reset form on success and navigate but not on failure !
      snackbar.message = `Connexion réussie.`
      this.setState({ snackbar })
    } else {
      snackbar.message = `Connexion refusée. Saisissez un identifiant de session.`
      this.setState({ snackbar })
    }
  }

  handleCancel (event) {
    event.preventDefault()
    this.setState({ ...defaultState })
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

  render () {
    const { classes } = this.props
    return (
      <div className={classes.layout}>
        <AppBar />
        <main>
          <Paper className={classes.mainFeaturedPost}>
            <Grid container alignContent='center' direction='column'>
              <Grid item xs={12} md={6}>
                <div className={classes.mainFeaturedPostContent}>
                  <Typography variant='h4' color='inherit' gutterBottom>
                    <AccountCircle style={{ fontSize: '2.5rem', marginBottom: '-0.5rem' }} />&nbsp;Connexion
                  </Typography>

                  <form
                    className={classes.formContainer}
                    noValidate
                    autoComplete='off'
                    onSubmit={this.handleSubmit}
                  >
                    <TextField
                      label='Identifiant de session'
                      fullWidth
                      margin='normal'
                      variant='outlined'
                      onChange={(e) => this.handleChange(e, 'sessionid')}
                      onBlur={(e) => this.handleBlur(e, 'sessionid')}
                      value={this.state.sessionid.value}
                      error={(this.state.sessionid.isDirty && isEmpty(this.state.sessionid.value))}
                      disabled={this.state.form.isDisabled}
                    />
                    <Button
                      variant='outlined'
                      color='secondary'
                      className={classes.button}
                      type='submit'
                      disabled={this.state.form.isDisabled}
                    >
                    Login
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
      </div>
    )
  }
}

Contact.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Contact)
