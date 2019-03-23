import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from '@reach/router'
// import { navigate, Redirect } from '@reach/router'
import isEmpty from 'validator/lib/isEmpty'
import toMaterialStyle from 'material-color-hash'
import stringHash from 'string-hash'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
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
import { createTeam, updateTeam } from 'src/graphql/mutations'
import { getTeam } from 'src/graphql/queries'
import API, { graphqlOperation } from '@aws-amplify/api'
import config from 'src/aws-exports'
import getInitials from 'src/utils/getInitials'

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
      padding: theme.spacing.unit * 4,
      marginBottom: theme.spacing.unit * 8,
      [theme.breakpoints.down('sm')]: {
        textAlign: 'center'
      }
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
    fieldsContainer: {
      margin: 'auto'
    },
    button: {
      marginRight: theme.spacing.unit,
      marginTop: theme.spacing.unit * 2
    },
    closeSnackbar: {
      padding: theme.spacing.unit / 2
    },
    avatar: {
      margin: 'auto',
      width: 80,
      height: 80,
      fontSize: theme.typography.h4.fontSize,
      color: theme.palette.grey['700'],
      backgroundColor: theme.palette.background.default
    },
    avatarContainer: {
      marginTop: '0.75rem'
    },
    buttonContainer: {
      [theme.breakpoints.up('sm')]: {
        textAlign: 'center'
      }
    }
  }
}

class EditTeam extends React.Component {
  constructor (props) {
    super(props)
    this.defaultState = {
      name: {
        isDirty: false,
        value: ''
      },
      initials: '',
      style: {},
      form: {
        isDisabled: false
      },
      snackbar: {
        open: false,
        message: ''
      }
    }
    this.state = this.defaultState
    this._isMounted = false
    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this)
  }

  componentDidMount () {
    this._isMounted = true
    this.loadTeam()
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  async loadTeam () {
    const { teamId } = this.props
    if (teamId) {
      // GraphQL
      try {
        const result = await API.graphql(
          graphqlOperation(getTeam, { id: teamId })
        )
        if (!result.errors && result.data.getTeam) {
          if (this._isMounted) {
            const state = this.state
            state.name.value = result.data.getTeam.name
            state.initials = result.data.getTeam.initials
            state.style = (state.name.value) ? toMaterialStyle(state.name.value) : {}
            this.setState(state)
          }
        } else {
          logger.error(result.error)
          if (this._isMounted) this.setState(this.defaultState)
        }
      } catch (error) {
        logger.error('loadTeam', error)
        if (this._isMounted) this.setState(this.defaultState)
      }
    } else {
      if (this._isMounted) this.setState(this.defaultState)
    }
  }

  handleChange (event, field) {
    const state = {}
    state.name = {
      isDirty: this.state.name.isDirty,
      value: event.target.value.substr(0, 60)
    }
    state.style = (state.name.value) ? toMaterialStyle(state.name.value) : {}
    state.initials = (state.name.value) ? getInitials(state.name.value) : ''
    this.setState({ ...state })
  }

  handleBlur (event) {
    const state = {}
    state.name = {
      isDirty: true,
      value: this.state.name.value
    }
    this.setState({ ...state })
  }

  async handleSubmit (event) {
    event.preventDefault()
    const { teamId, config } = this.props
    let state = this.state
    if (this._isMounted) this.setState({ ...state, form: { isDisabled: true } })
    const name = state.name.value
    const initials = getInitials(name)
    const teamSessionId = config.sessionId
    const searchable = [name, initials].join(' ').toLowerCase()
    if (!isEmpty(name) && !isEmpty(teamSessionId)) {
      state.form.isDisabled = true
      state.snackbar.message = `Sauvegarde en cours. Merci de patienter...`
      state.snackbar.open = true
      // GraphQL
      try {
        const action = (!teamId) ? createTeam : updateTeam
        const input = { name, initials, searchable, teamSessionId }
        input.id = teamId || stringHash(JSON.stringify({ teamSessionId, name }))
        const result = await API.graphql(
          graphqlOperation(action, { input })
        )
        if (!result.errors) {
          if (result.data.createTeam) navigate(`/dashboard/serious-game/board/${result.data.createTeam.id}`)
          if (result.data.updateTeam) navigate('/dashboard/serious-game')
        } else {
          logger.error('handleSubmit', result)
          state.snackbar.message = `La sauvegarde a échoué.`
          state.snackbar.open = true
          if (this._isMounted) this.setState({ ...state, form: { isDisabled: false } })
        }
      } catch (error) {
        logger.error('handleSubmit', error)
        state.snackbar.message = `La sauvegarde a échoué.`
        state.snackbar.open = true
        if (this._isMounted) this.setState({ ...state, form: { isDisabled: false } })
      }
    } else {
      state.snackbar.message = `Votre équipe n'a pas été sauvegardée. Le formulaire est invalide.`
      state.snackbar.open = true
      if (this._isMounted) this.setState({ ...state })
    }
  }

  handleCancel (event = { preventDefault: () => {} }) {
    event.preventDefault()
    this.setState({ ...this.defaultState, form: { isDisabled: false }, snackbar: { open: false, message: '' } }, () => {
      navigate('/dashboard/serious-game')
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
    const { classes, teamId } = this.props
    // const { classes, teamId, config } = this.props
    // if (!config.sessionId) return (<Redirect noThrow to='/dashboard' />)
    const pageTitle = (!teamId)
      ? (<span>Ajouter une&nbsp;équipe</span>)
      : `Modifier l'équipe : ${this.state.name.value}`
    return (
      <div className={classes.layout}>
        <main>
          <Paper className={classes.paper}>
            <Grid container className={classes.container}>
              <Grid item xs={12} className={classes.breadcrumb}>
                <Breadcrumbs separator={<NavigateNext fontSize='small' />} arial-label='Breadcrumb'>
                  <Link to='/' color='inherit'>Accueil</Link>
                  <Link to='/dashboard' color='inherit'>Tableau de bord</Link>
                  <Link to='/dashboard/serious-game' color='inherit'>Equipes</Link>
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
              <Grid item xs={12} sm={8} md={6} className={classes.fieldsContainer}>
                <form
                  className={classes.formContainer}
                  noValidate
                  autoComplete='off'
                  onSubmit={this.handleSubmit}
                >
                  <Grid container>
                    <Grid item xs={12} className={classes.avatarContainer}>
                      <Avatar className={classes.avatar} style={this.state.style} >{
                        (!this.state.initials) ? '?' : this.state.initials
                      }</Avatar>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label='Nom *'
                        helperText={`${60 - this.state.name.value.length} caractères restants - pas de données personnelles`}
                        fullWidth
                        margin='normal'
                        variant='outlined'
                        onChange={(e) => this.handleChange(e)}
                        onBlur={(e) => this.handleBlur(e)}
                        value={this.state.name.value}
                        error={(this.state.name.isDirty && isEmpty(this.state.name.value))}
                        disabled={this.state.form.isDisabled}
                      />
                    </Grid>
                    <Grid item xs={12} className={classes.buttonContainer}>
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

EditTeam.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EditTeam)
