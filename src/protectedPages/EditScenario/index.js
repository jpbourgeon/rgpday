import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from '@reach/router'
import isEmpty from 'validator/lib/isEmpty'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import Breadcrumbs from '@material-ui/lab/Breadcrumbs'
import CloseIcon from '@material-ui/icons/Close'
import NavigateNext from '@material-ui/icons/NavigateNext'
import Edit from '@material-ui/icons/Edit'
import Link from 'src/components/Link'
import logger from 'src/logger'
import { createScenario, updateScenario } from 'src/graphql/mutations'
import { getScenario } from 'src/graphql/queries'
import API, { graphqlOperation } from '@aws-amplify/api'
import config from 'src/aws-exports'

API.configure(config)

const styles = theme => {
  return {
    '@global': {
      '.grecaptcha-badge': {
        visibility: 'hidden'
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
    paper: {
      backgroundSize: `100% 100%`,
      padding: theme.spacing.unit * 4,
      marginBottom: theme.spacing.unit * 8
    },
    breadcrumb: {
      marginBottom: theme.spacing.unit * 2
    },
    title: {
      marginBottom: theme.spacing.unit * 3
    },
    titleIcon: {
      fontSize: '2.5rem',
      marginBottom: '-0.5rem'
    },
    formContainer: {
      marginBottom: theme.spacing.unit * 6,
      display: 'flex',
      flexWrap: 'wrap'
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
  id: {
    isDirty: false,
    value: ''
  },
  description: {
    isDirty: false,
    value: ''
  },
  form: {
    isDisabled: false
  },
  snackbar: {
    open: false,
    message: ''
  }
}

class Component extends React.Component {
  constructor (props) {
    super(props)
    this.state = defaultState
    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.resetState = this.resetState.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this)
  }

  async componentWillMount () {
    const { scenarioId } = this.props
    if (scenarioId) {
      // GraphQL
      try {
        const result = await API.graphql(
          graphqlOperation(getScenario, { id: scenarioId })
        )
        if (!result.errors) {
          this.setState({
            id: {
              isDirty: false,
              value: result.data.getScenario.id
            },
            description: {
              isDirty: false,
              value: result.data.getScenario.description
            },
            form: {
              isDisabled: false
            },
            snackbar: {
              open: false,
              message: ''
            }
          })
        } else {
          logger.logger(result.error)
          this.resetState()
        }
      } catch (error) {
        logger.error('handleSubmit', error)
        this.resetState()
      }
    } else {
      this.resetState()
    }
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
    const { scenarioId } = this.props
    let state = this.state
    this.setState({ ...state, form: { isDisabled: true } })
    const id = state.id.value
    const description = (isEmpty(state.description.value)) ? null : state.description.value
    const searchable = [id, description].join(' ').toLowerCase()
    if (!isEmpty(state.id.value)) {
      state.form.isDisabled = true
      state.snackbar.message = `Sauvegarde en cours. Merci de patienter...`
      state.snackbar.open = true
      // GraphQL
      try {
        const action = (!scenarioId) ? createScenario : updateScenario
        const result = await API.graphql(
          graphqlOperation(action, { input: { id, description, searchable } })
        )
        if (!result.errors) {
          logger.info('handleSubmit', result)
          navigate('/dashboard/scenarios')
        } else {
          logger.error('handleSubmit', result)
          state.snackbar.message = `La sauvegarde a échoué.`
          state.snackbar.open = true
          this.setState({ ...state, form: { isDisabled: false } })
        }
      } catch (error) {
        logger.error('handleSubmit', error)
        state.snackbar.message = `La sauvegarde a échoué.`
        state.snackbar.open = true
        this.setState({ ...state, form: { isDisabled: false } })
      }
    } else {
      state.snackbar.message = `Votre scénario n'a pas été sauvegardé. Le formulaire est invalide.`
      state.snackbar.open = true
      this.setState({ ...state })
    }
  }

  resetState () {
    this.setState({ ...defaultState, form: { isDisabled: false }, snackbar: { open: false, message: '' } })
  }

  handleCancel (event = { preventDefault: () => {} }) {
    event.preventDefault()
    this.setState({ ...defaultState, form: { isDisabled: false }, snackbar: { open: false, message: '' } }, () => {
      navigate('/dashboard/scenarios')
    })
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
    const { classes, scenarioId } = this.props
    const { id } = this.state
    const pageTitle = (!scenarioId) ? 'Ajouter un scénario' : `Modifier le scénario ${id.value}`
    return (
      <div className={classes.layout}>
        <main>
          <Paper className={classes.paper}>
            <Grid container className={classes.container}>
              <Grid item xs={12} className={classes.breadcrumb}>
                <Breadcrumbs separator={<NavigateNext fontSize='small' />} arial-label='Breadcrumb'>
                  <Link to='/' color='inherit'>Accueil</Link>
                  <Link to='/dashboard' color='inherit'>Tableau de bord</Link>
                  <Link to='/dashboard/scenarios' color='inherit'>Scénarios</Link>
                  <Link to='.' color='inherit'>
                    {pageTitle}
                  </Link>
                </Breadcrumbs>
              </Grid>
              <Grid item xs={12} className={classes.title}>
                <Typography variant='h4' gutterBottom>
                  <Edit className={classes.titleIcon} />&nbsp;{pageTitle}
                </Typography>
                <Divider />
              </Grid>
              <Grid item md={12}>
                <form
                  className={classes.formContainer}
                  noValidate
                  autoComplete='off'
                  onSubmit={this.handleSubmit}
                >
                  <TextField
                    label='Nom *'
                    fullWidth
                    margin='normal'
                    variant='outlined'
                    onChange={(e) => this.handleChange(e, 'id')}
                    onBlur={(e) => this.handleBlur(e, 'id')}
                    value={this.state.id.value}
                    error={(this.state.id.isDirty && isEmpty(this.state.id.value))}
                    disabled={this.state.form.isDisabled || (typeof scenarioId !== 'undefined')}
                  />
                  <TextField
                    label='Description'
                    multiline
                    rows='5'
                    rowsMax='10'
                    fullWidth
                    margin='normal'
                    variant='outlined'
                    onChange={(e) => this.handleChange(e, 'description')}
                    onBlur={(e) => this.handleBlur(e, 'description')}
                    value={this.state.description.value}
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
              </Grid>
            </Grid>
          </Paper>
        </main>
      </div>
    )
  }
}

Component.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Component)
