import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
  container: {
    margin: 0,
    padding: theme.spacing.unit * 4,
    justifyContent: 'center',
    AlignItems: 'stretch'
  },
  row: {
    textAlign: 'center'
  }
})

function Loading (props) {
  const { classes } = props

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} className={classes.row}>
        <CircularProgress color='secondary' />
      </Grid>
    </Grid>
  )
}

Loading.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Loading)
