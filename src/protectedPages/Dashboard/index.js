import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import DashboardIcon from '@material-ui/icons/DashboardOutlined'
import Tile from '../../components/Tile'
import Coconstruction from './images/coconstruction.jpg'
import Conference from './images/conference.jpg'
import GameBoard from './images/gameboard.jpg'
import Admin from './images/controlpanel.jpg'
import Scenario from './images/scenario.jpg'

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
  title: {
    paddingTop: theme.spacing.unit * 3
  },
  titleIcon: {
    fontSize: '2.5rem',
    marginBottom: '-0.5rem'
  }
})

const DashboardComponent = props => {
  const { classes } = props
  return (
    <div className={classes.layout}>
      <main>
        <Grid container spacing={40}>
          <Grid item xs={12}>
            <Typography variant='h4' color='inherit' gutterBottom className={classes.title}>
              <DashboardIcon className={classes.titleIcon} />&nbsp;Session
            </Typography>
          </Grid>
          <Tile
            title='Conférence'
            description=''
            image={Conference}
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

        <Grid container spacing={40}>
          <Grid item xs={12}>
            <Typography variant='h4' color='inherit' gutterBottom className={classes.title}>
              <DashboardIcon className={classes.titleIcon} />&nbsp;Administration
            </Typography>
          </Grid>
          <Tile
            title='Scenarios'
            description=''
            image={Scenario}
            to='./scenarios'
          />
          <Tile
            title='Sessions'
            description=''
            image={Admin}
            to='./sessions'
          />
        </Grid>

      </main>
    </div>
  )
}

DashboardComponent.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(DashboardComponent)
