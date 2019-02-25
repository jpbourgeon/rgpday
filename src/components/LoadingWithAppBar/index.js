import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import AppBar from '../AppBar'

const styles = theme => ({
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
  container: {
    position: 'fixed',
    top: 0,
    height: '100vh'
  },
  item: {
    textAlign: 'center'
  }
})

function Loading (props) {
  const { classes } = props

  if (props.pastDelay) {
    return (
      <div className={classes.layout}>
        <AppBar />
        <main>

          <Grid container alignContent='center' alignItems='center' className={classes.container}>
            <Grid item xs={12} className={classes.item}>
              <CircularProgress color='secondary' />
            </Grid>
          </Grid>
        </main>
      </div>
    )
  } else {
    return null
  }
}

Loading.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Loading)
