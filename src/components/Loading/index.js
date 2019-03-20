import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
  layout: {
    width: 'auto',
    height: '100vh'
  },
  container: {
    height: '100%'
  },
  item: {
    textAlign: 'center'
  }
})

function Loading (props) {
  const { classes } = props

  return (
    <div className={classes.layout}>
      <Grid container alignContent='center' alignItems='center' className={classes.container}>
        <Grid item xs={12} className={classes.item}>
          <CircularProgress color='secondary' />
        </Grid>
      </Grid>
    </div>
  )
}

Loading.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Loading)
