import React from 'react'
import PropTypes from 'prop-types'
import { navigate, Redirect } from '@reach/router'
import isEmpty from 'validator/lib/isEmpty'
import isInt from 'validator/lib/isInt'
import isISO8601 from 'validator/lib/isISO8601'
import isLength from 'validator/lib/isLength'
import isIn from 'validator/lib/isIn'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
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
const listPresentationsIds = `query ListPresentations(
  $filter: ModelPresentationFilterInput
  $limit: Int
  $nextToken: String
) {
  listPresentations(filter: $filter, limit: $limit, nextToken: $nextToken) {
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

class EditSession extends React.Component {
  constructor (props) {
    super(props)
    this._isMounted = false
    this.defaultState = {
      id: { isDirty: false, value: '' },
      gameOver: { isDirty: false, value: false },
      description: { isDirty: false, value: '' },
      contact: { isDirty: false, value: '' },
      numberOfParticipants: { isDirty: false, value: '0' },
      startDate: { isDirty: false, value: '' },
      endDate: { isDirty: false, value: '' },
      scenario: { isDirty: false, value: '' },
      presentation: { isDirty: false, value: '' },
      snackbar: { open: false, message: '' },
      scenarios: [],
      presentations: [],
      form: { isDisabled: false }
    }
    this.state = this.defaultState
    this.handleChange = this.handleChange.bind(this)
    this.handleCheck = this.handleCheck.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this)
  }

  componentDidMount () {
    this._isMounted = true
    this.loadSession()
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  async loadSession () {
    const { sessionId } = this.props
    const state = this.defaultState
    const queryScenarios = () => (API.graphql(
      graphqlOperation(listScenariosIds)
    ))
    const queryPresentations = () => (API.graphql(
      graphqlOperation(listPresentationsIds)
    ))
    let querySession
    if (sessionId) {
      querySession = () => (API.graphql(
        graphqlOperation(getSession, { id: sessionId })
      ))
    } else {
      querySession = () => Promise.resolve({ errors: true })
    }
    // GraphQL
    try {
      const [scenarios, presentations, session] = await Promise.all([
        queryScenarios(),
        queryPresentations(),
        querySession()
      ])
      if (!scenarios.errors && scenarios.data.listScenarios) {
        state.scenarios = scenarios.data.listScenarios.items
      } else {
        logger.error('scenarios', scenarios.error)
      }
      if (!presentations.errors && presentations.data.listPresentations) {
        state.presentations = presentations.data.listPresentations.items
      } else {
        logger.error('presentations', presentations.error)
      }
      if (!session.errors && session.data.getSession) {
        const data = session.data.getSession
        state.id.value = data.id
        state.gameOver.value = data.gameOver || false
        state.description.value = data.description
        state.contact.value = data.contact
        state.numberOfParticipants.value = (data.numberOfParticipants) ? data.numberOfParticipants.toString() : '0'
        state.startDate.value = data.startDate
        state.endDate.value = data.endDate
        state.scenario.value = data.scenario.id
        state.presentation.value = data.presentation.id
      } else {
        logger.error('session', session.error)
      }
      state.form.isDisabled = false
      state.snackbar.open = false
      state.snackbar.message = ''
      if (this._isMounted) this.setState(state)
    } catch (error) {
      logger.error('handleSubmit', error)
      if (this._isMounted) this.setState(this.defaultState)
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

  handleCheck (event, field) {
    const state = {}
    state[field] = {
      isDirty: true,
      value: event.target.checked
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
    const { sessionId } = this.props
    let state = this.state
    state.form.isDisabled = true
    if (this._isMounted) this.setState(state)
    const id = (isEmpty(state.id.value))
      ? null
      : state.id.value
    const gameOver = state.gameOver.value
    const description = (isEmpty(state.description.value))
      ? null
      : state.description.value
    const contact = (isEmpty(state.contact.value))
      ? null
      : state.contact.value
    const numberOfParticipants = (!isInt(this.state.numberOfParticipants.value))
      ? null
      : state.numberOfParticipants.value
    const startDate = (!isISO8601(this.state.startDate.value) ||
        !isLength(this.state.startDate.value, { min: 10, max: 10 }))
      ? null
      : state.startDate.value
    const endDate = (!isISO8601(this.state.endDate.value) ||
        !isLength(this.state.endDate.value, { min: 10, max: 10 }))
      ? null
      : state.endDate.value
    const sessionScenarioId = (isEmpty(this.state.scenario.value) ||
        !isIn(this.state.scenario.value, this.state.scenarios.map(i => (i.id))))
      ? null
      : state.scenario.value
    const sessionPresentationId = (isEmpty(this.state.presentation.value) ||
        !isIn(this.state.presentation.value, this.state.presentations.map(i => (i.id))))
      ? null
      : state.presentation.value
    const searchable = [
      id,
      description,
      contact,
      startDate,
      endDate,
      sessionScenarioId,
      sessionPresentationId
    ].join(' ').toLowerCase()
    if (id && sessionScenarioId && sessionPresentationId) {
      state.form.isDisabled = true
      state.snackbar.message = `Sauvegarde en cours. Merci de patienter...`
      state.snackbar.open = true
      if (this._isMounted) this.setState(state)
      // GraphQL
      try {
        const action = (!sessionId) ? createSession : updateSession
        const result = await API.graphql(
          graphqlOperation(action, { input: {
            id,
            gameOver,
            description,
            contact,
            numberOfParticipants,
            startDate,
            endDate,
            sessionScenarioId,
            sessionPresentationId,
            searchable
          } })
        )
        if (!result.errors) {
          state.snackbar.open = false
          state.form.isDisabled = false
          if (this._isMounted) {
            this.setState(this.defaultState, () => {
              navigate('/dashboard/sessions')
            })
          }
        } else {
          logger.error('handleSubmit', result)
          state.snackbar.message = `La sauvegarde a échoué.`
          state.snackbar.open = true
          state.form.isDisabled = false
          if (this._isMounted) this.setState(state)
        }
      } catch (error) {
        logger.error('handleSubmit', error)
        state.snackbar.message = `La sauvegarde a échoué.`
        state.snackbar.open = true
        state.form.isDisabled = false
        if (this._isMounted) this.setState(state)
      }
    } else {
      state.snackbar.message = `Votre session n'a pas été sauvegardé. Le formulaire est invalide.`
      state.snackbar.open = true
      state.form.isDisabled = false
      if (this._isMounted) this.setState(state)
    }
  }

  handleCancel (event = { preventDefault: () => {} }) {
    event.preventDefault()
    this.setState({ ...this.defaultState, form: { isDisabled: false }, snackbar: { open: false, message: '' } }, () => {
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
    const { classes, sessionId, config } = this.props
    if (!config.isAdmin) return (<Redirect noThrow to='/dashboard' />)
    const { id } = this.state
    const pageTitle = (!sessionId) ? 'Ajouter une session' : `Modifier la session : ${id.value}`
    const renderOptions = (data) => {
      const list = [{ id: '' }, ...data]
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
                        disabled={this.state.form.isDisabled || (typeof sessionId !== 'undefined')}
                      />
                      <TextField
                        label='Description'
                        multiline
                        rows='8'
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
                        rows='8'
                        rowsMax='10'
                        fullWidth
                        margin='normal'
                        variant='outlined'
                        onChange={(e) => this.handleChange(e, 'contact')}
                        onBlur={(e) => this.handleBlur(e, 'contact')}
                        value={this.state.contact.value}
                        disabled={this.state.form.isDisabled}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
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
                      <TextField
                        label={`Début de la session`}
                        helperText='Format ISO-8601'
                        fullWidth
                        margin='normal'
                        variant='outlined'
                        onChange={(e) => this.handleChange(e, 'startDate')}
                        onBlur={(e) => this.handleBlur(e, 'startDate')}
                        value={this.state.startDate.value}
                        error={(this.state.startDate.isDirty &&
                          (!isISO8601(this.state.startDate.value) ||
                            !isLength(this.state.startDate.value, { min: 10, max: 10 })
                          )
                        )}
                        disabled={this.state.form.isDisabled}
                      />
                      <TextField
                        label='Fin de la session'
                        helperText='Format ISO-8601'
                        fullWidth
                        margin='normal'
                        variant='outlined'
                        onChange={(e) => this.handleChange(e, 'endDate')}
                        onBlur={(e) => this.handleBlur(e, 'endDate')}
                        value={this.state.endDate.value}
                        error={(this.state.endDate.isDirty &&
                          (!isISO8601(this.state.endDate.value) ||
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
                        {renderOptions(this.state.scenarios)}
                      </TextField>
                      <TextField
                        label='Presentation *'
                        select
                        fullWidth
                        margin='normal'
                        variant='outlined'
                        value={this.state.presentation.value}
                        onChange={(e) => this.handleChange(e, 'presentation')}
                        onBlur={(e) => this.handleBlur(e, 'presentation')}
                        error={(this.state.presentation.isDirty &&
                          (isEmpty(this.state.presentation.value) ||
                            !isIn(this.state.presentation.value, this.state.presentations.map(i => (i.id)))
                          )
                        )}
                        SelectProps={{
                          MenuProps: {
                            className: classes.menu
                          }
                        }}
                      >
                        {renderOptions(this.state.presentations)}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={this.state.gameOver.value}
                            onChange={(e) => this.handleCheck(e, 'gameOver')}
                            disabled={this.state.form.isDisabled}
                            value='Game over'
                          />
                        }
                        label='La partie est terminée (game over)'
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <Button
                        variant='outlined'
                        color='secondary'
                        className={classes.button}
                        type='submit'
                        disabled={this.state.form.isDisabled}
                      >
                        Valider
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

EditSession.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EditSession)
