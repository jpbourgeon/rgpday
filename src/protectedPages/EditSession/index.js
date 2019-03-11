import React from 'react'
import PropTypes from 'prop-types'
import { navigate, Location } from '@reach/router'
import isEmpty from 'validator/lib/isEmpty'
import isInt from 'validator/lib/isInt'
import isISO8601 from 'validator/lib/isISO8601'
import isLength from 'validator/lib/isLength'
import isIn from 'validator/lib/isIn'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
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
import { createSession, updateSession } from 'src/graphql/mutations'
import { getSession } from 'src/graphql/queries'
import API, { graphqlOperation } from '@aws-amplify/api'
import config from 'src/aws-exports'

API.configure(config)
const listScenariosIds = `query ListScenarios(
  $filter: ModelScenarioFilterInput
  $limit: Int
  $nextToken: String
) {
  listScenarios(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
    }
  }
}
`

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
      marginRight: theme.spacing.unit
    },
    closeSnackbar: {
      padding: theme.spacing.unit / 2
    },
    menu: {
      width: 200
    }
  }
}

const defaultState = {
  sessionId: '',
  id: {
    isDirty: false,
    value: ''
  },
  description: {
    isDirty: false,
    value: ''
  },
  contact: {
    isDirty: false,
    value: ''
  },
  numberOfParticipants: {
    isDirty: false,
    value: ''
  },
  RGPDay: {
    isDirty: false,
    value: ''
  },
  startDate: {
    isDirty: false,
    value: ''
  },
  endDate: {
    isDirty: false,
    value: ''
  },
  scenario: {
    isDirty: false,
    value: ''
  },
  scenarios: [],
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
    const { location } = this.props
    const state = defaultState
    const queryScenarios = () => (API.graphql(
      graphqlOperation(listScenariosIds)
    ))
    let querySession
    if (location.pathname.includes('update')) {
      state.sessionId = location.pathname.split('/').pop()
      querySession = () => (API.graphql(
        graphqlOperation(getSession, { id: state.sessionId })
      ))
    } else {
      querySession = () => Promise.resolve({ errors: true })
    }
    // GraphQL
    try {
      const [scenarios, session] = await Promise.all([queryScenarios(), querySession()])
      if (!scenarios.errors) {
        state.scenarios = scenarios.data.listScenarios.items
      } else {
        logger.info('scenarios', scenarios.error)
      }
      if (!session.errors) {
        state.id.value = session.data.getSession.id
        state.description.value = session.data.getSession.description
        state.contact.value = session.data.getSession.contact
        state.numberOfParticipants.value = session.data.getSession.numberOfParticipants.toString()
        state.RGPDay.value = session.data.getSession.RGPDay
        state.startDate.value = session.data.getSession.startDate
        state.endDate.value = session.data.getSession.endDate
        state.scenario.value = session.data.getSession.scenario.id
      } else {
        logger.info('session', session.error)
      }
      state.form.isDisabled = false
      state.snackbar.open = false
      state.snackbar.message = ''
      this.setState(state)
    } catch (error) {
      logger.error('handleSubmit', error)
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
    let state = this.state
    state.form.isDisabled = true
    this.setState(state)
    const id = (isEmpty(state.id.value))
      ? null
      : state.id.value
    const description = (isEmpty(state.description.value))
      ? null
      : state.description.value
    const contact = (isEmpty(state.contact.value))
      ? null
      : state.contact.value
    const numberOfParticipants = (!isInt(this.state.numberOfParticipants.value))
      ? null
      : state.numberOfParticipants.value
    const RGPDay = (isEmpty(this.state.RGPDay.value) ||
        !isISO8601(this.state.RGPDay.value) ||
        !isLength(this.state.RGPDay.value, { min: 10, max: 10 }))
      ? null
      : state.RGPDay.value
    const startDate = (isEmpty(this.state.startDate.value) ||
        !isISO8601(this.state.startDate.value) ||
        !isLength(this.state.startDate.value, { min: 10, max: 10 }))
      ? null
      : state.startDate.value
    const endDate = (isEmpty(this.state.endDate.value) ||
        !isISO8601(this.state.endDate.value) ||
        !isLength(this.state.endDate.value, { min: 10, max: 10 }))
      ? null
      : state.endDate.value
    const sessionScenarioId = (isEmpty(this.state.scenario.value) ||
        !isIn(this.state.scenario.value, this.state.scenarios.map(i => (i.id))))
      ? null
      : state.scenario.value
    const searchable = [
      id,
      description,
      contact,
      numberOfParticipants,
      RGPDay,
      startDate,
      endDate,
      sessionScenarioId
    ].join(' ').toLowerCase()
    if (id && RGPDay && startDate && endDate && sessionScenarioId) {
      state.form.isDisabled = true
      state.snackbar.message = `Sauvegarde en cours. Merci de patienter...`
      state.snackbar.open = true
      this.setState(state)
      // GraphQL
      try {
        const action = (isEmpty(state.sessionId)) ? createSession : updateSession
        const result = await API.graphql(
          graphqlOperation(action, { input: {
            id,
            description,
            contact,
            numberOfParticipants,
            RGPDay,
            startDate,
            endDate,
            sessionScenarioId,
            searchable
          } })
        )
        if (!result.errors) {
          logger.info('handleSubmit', result)
          state.snackbar.open = false
          state.form.isDisabled = false
          this.setState(defaultState, () => {
            navigate('/dashboard/sessions')
          })
        } else {
          logger.error('handleSubmit', result)
          state.snackbar.message = `La sauvegarde a échoué.`
          state.snackbar.open = true
          state.form.isDisabled = false
          this.setState(state)
        }
      } catch (error) {
        logger.error('handleSubmit', error)
        state.snackbar.message = `La sauvegarde a échoué.`
        state.snackbar.open = true
        state.form.isDisabled = false
        this.setState(state)
      }
    } else {
      state.snackbar.message = `Votre session n'a pas été sauvegardé. Le formulaire est invalide.`
      state.snackbar.open = true
      state.form.isDisabled = false
      this.setState(state)
    }
  }

  resetState () {
    this.setState(defaultState)
  }

  handleCancel (event = { preventDefault: () => {} }) {
    event.preventDefault()
    this.setState({ ...defaultState, form: { isDisabled: false }, snackbar: { open: false, message: '' } }, () => {
      navigate('/dashboard/sessions')
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
    const { classes, location } = this.props
    const { id } = this.state
    const pageTitle = (location.pathname.includes('add'))
      ? 'Ajouter une session'
      : `Modifier la session ${id.value}`
    const renderScenarioOptions = () => {
      const list = [{ id: '' }, ...this.state.scenarios]
      return (
        list.map(option => (
          <MenuItem key={option.id} value={option.id}>
            {option.id}
          </MenuItem>
        ))
      )
    }
    return (
      <div className={classes.layout}>
        <main>
          <Paper className={classes.paper}>
            <Grid container className={classes.container}>
              <Grid item xs={12} className={classes.breadcrumb}>
                <Breadcrumbs separator={<NavigateNext fontSize='small' />} arial-label='Breadcrumb'>
                  <Link to='/' color='inherit'>Accueil</Link>
                  <Link to='/dashboard' color='inherit'>Tableau de bord</Link>
                  <Link to='/dashboard/sessions' color='inherit'>Sessions</Link>
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
              <Grid item xs={12}>
                <form
                  className={classes.formContainer}
                  noValidate
                  autoComplete='off'
                  onSubmit={this.handleSubmit}
                >
                  <Grid container spacing={24}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label='Nom *'
                        fullWidth
                        margin='normal'
                        variant='outlined'
                        onChange={(e) => this.handleChange(e, 'id')}
                        onBlur={(e) => this.handleBlur(e, 'id')}
                        value={this.state.id.value}
                        error={(this.state.id.isDirty && isEmpty(this.state.id.value))}
                        disabled={this.state.form.isDisabled || !isEmpty(this.state.sessionId)}
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
                      <TextField
                        label='Contact'
                        multiline
                        rows='5'
                        rowsMax='10'
                        fullWidth
                        margin='normal'
                        variant='outlined'
                        onChange={(e) => this.handleChange(e, 'contact')}
                        onBlur={(e) => this.handleBlur(e, 'contact')}
                        value={this.state.contact.value}
                        disabled={this.state.form.isDisabled}
                      />
                      <TextField
                        label='Nombre de participants'
                        helperText='Nombre entier'
                        fullWidth
                        margin='normal'
                        variant='outlined'
                        onChange={(e) => this.handleChange(e, 'numberOfParticipants')}
                        onBlur={(e) => this.handleBlur(e, 'numberOfParticipants')}
                        value={this.state.numberOfParticipants.value}
                        error={(this.state.numberOfParticipants.isDirty &&
                          !isInt(this.state.numberOfParticipants.value))}
                        disabled={this.state.form.isDisabled}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label='Date de la session RGPDay *'
                        helperText='Format ISO-8601'
                        fullWidth
                        margin='normal'
                        variant='outlined'
                        onChange={(e) => this.handleChange(e, 'RGPDay')}
                        onBlur={(e) => this.handleBlur(e, 'RGPDay')}
                        value={this.state.RGPDay.value}
                        error={(this.state.RGPDay.isDirty &&
                          (isEmpty(this.state.RGPDay.value) ||
                            !isISO8601(this.state.RGPDay.value) ||
                            !isLength(this.state.RGPDay.value, { min: 10, max: 10 })
                          )
                        )}
                        disabled={this.state.form.isDisabled}
                      />
                      <TextField
                        label={`Date d'ouverture du jeu *`}
                        helperText='Format ISO-8601'
                        fullWidth
                        margin='normal'
                        variant='outlined'
                        onChange={(e) => this.handleChange(e, 'startDate')}
                        onBlur={(e) => this.handleBlur(e, 'startDate')}
                        value={this.state.startDate.value}
                        error={(this.state.startDate.isDirty &&
                          (isEmpty(this.state.startDate.value) ||
                            !isISO8601(this.state.startDate.value) ||
                            !isLength(this.state.startDate.value, { min: 10, max: 10 })
                          )
                        )}
                        disabled={this.state.form.isDisabled}
                      />
                      <TextField
                        label='Date de fermeture du jeu *'
                        helperText='Format ISO-8601'
                        fullWidth
                        margin='normal'
                        variant='outlined'
                        onChange={(e) => this.handleChange(e, 'endDate')}
                        onBlur={(e) => this.handleBlur(e, 'endDate')}
                        value={this.state.endDate.value}
                        error={(this.state.endDate.isDirty &&
                          (isEmpty(this.state.endDate.value) ||
                            !isISO8601(this.state.endDate.value) ||
                            !isLength(this.state.endDate.value, { min: 10, max: 10 })
                          )
                        )}
                        disabled={this.state.form.isDisabled}
                      />
                      <TextField
                        label='Scenario *'
                        select
                        fullWidth
                        margin='normal'
                        variant='outlined'
                        value={this.state.scenario.value}
                        onChange={(e) => this.handleChange(e, 'scenario')}
                        onBlur={(e) => this.handleBlur(e, 'scenario')}
                        error={(this.state.scenario.isDirty &&
                          (isEmpty(this.state.scenario.value) ||
                            !isIn(this.state.scenario.value, this.state.scenarios.map(i => (i.id)))
                          )
                        )}
                        SelectProps={{
                          MenuProps: {
                            className: classes.menu
                          }
                        }}
                      >
                        {renderScenarioOptions()}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} md={12}>
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
                    </Grid>
                  </Grid>
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

const WithLocation = (props) => (
  <Location>
    {({ location }) => (
      <Component {...props} location={location} />
    )}
  </Location>
)

export default withStyles(styles)(WithLocation)
