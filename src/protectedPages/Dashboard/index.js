import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import DashboardIcon from '@material-ui/icons/DashboardOutlined'
import Help from '@material-ui/icons/HelpOutline'
import Settings from '@material-ui/icons/SettingsOutlined'
import Tile from 'src/components/Tile'
import Coconstruction from './images/coconstruction.jpg'
import Conference from './images/conference.jpg'
import GameBoard from './images/gameboard.jpg'
import Admin from './images/controlpanel.jpg'
import Scenario from './images/scenario.jpg'
import Presentation from './images/presentation.jpg'

const styles = theme => ({
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
    marginBottom: theme.spacing.unit * 6,
    padding: `0px ${theme.spacing.unit * 4}px ${theme.spacing.unit * 6}px ${theme.spacing.unit * 4}px`,
    textAlign: 'justify'
  },
  breadcrumb: {
    marginBottom: theme.spacing.unit
  },

  title: {
    paddingTop: theme.spacing.unit * 3
  },
  titleIcon: {
    fontSize: '2.5rem',
    marginBottom: '-0.5rem'
  }
})

const DashboardComponent = (props) => {
  const { classes, config } = props
  const renderSession = (!config.sessionId) ? null : (
    <Grid container spacing={40}>
      <Grid item xs={12}>
        <Typography variant='h4' color='inherit' gutterBottom className={classes.title}>
          <DashboardIcon className={classes.titleIcon} />&nbsp;Session {config.sessionId}
        </Typography>
      </Grid>
      <Tile
        title='Conférence'
        description=''
        image={Conference}
        to='/dashboard/presentation#/start'
      />
      <Tile
        title='Serious game'
        description=''
        image={GameBoard}
      />
      <Tile
        title={`Plan d'action`}
        description=''
        image={Coconstruction}
      />
    </Grid>
  )
  const renderAdmin = (!config.isAdmin) ? null : (
    <React.Fragment>
      <Grid container spacing={40}>
        <Grid item xs={12}>
          <Typography variant='h4' color='inherit' gutterBottom className={classes.title}>
            <Settings className={classes.titleIcon} />&nbsp;Administration
          </Typography>
        </Grid>
        <Tile
          title='Scénarios'
          description=''
          image={Scenario}
          to='./scenarios'
        />
        <Tile
          title='Présentations'
          description=''
          image={Presentation}
          to='./presentations'
        />
        <Tile
          title='Sessions'
          description=''
          image={Admin}
          to='./sessions'
        />
      </Grid>
      <Grid container spacing={40}>
        <Grid item xs={12}>
          <Typography variant='h4' color='inherit' gutterBottom className={classes.title}>
            <Help className={classes.titleIcon} />&nbsp;Aide
          </Typography>
        </Grid>
        <Tile
          title='Scénarios'
          description={`L'identifiant d'un scénario doit correspondre à un scénario disponible dans le code source.`}
        />
        <Tile
          title='Présentations'
          description={`L'identifiant d'une présentation doit correspondre à un scénario disponible dans le code source.`}
        />
        <Tile
          title='Sessions'
          description={(
            <React.Fragment>
              <span>1. Créer une session avec un identifiant de type [YYYY-ID-DE-SESSION]</span><br />
              <span>2. Créer un utilisateur vérifié dans la console AWS Cognito (no&#8209;reply@rgpday.com) avec pour nom d'utilisateur et pour mot de passe, l'identifiant de session créé à l'étape 1</span><br />
              <span>3. Valider le compte en se connectant sur le site dans les 7 jours suivants sa création</span>
            </React.Fragment>
          )}
        />
      </Grid>
    </React.Fragment>
  )
  return (
    <div className={classes.layout}>
      <main>
        <Paper className={classes.paper}>
          {renderSession}
          {renderAdmin}
        </Paper>
      </main>
    </div>
  )
}

DashboardComponent.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(DashboardComponent)
