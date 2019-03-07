import React from 'react'
import PropTypes from 'prop-types'
import { Link as RouterLink } from '@reach/router'
import Link from '@material-ui/core/Link'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

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
    mainFeaturedPost: {
      backgroundSize: `100% 100%`,
      marginBottom: theme.spacing.unit * 4
    },
    mainFeaturedPostContent: {
      padding: `${theme.spacing.unit * 6}px`,
      [theme.breakpoints.up('md')]: {
        paddingRight: 0
      }
    }
  }
}

const LinkToHome = props => <RouterLink to='/' {...props} />

const Component = props => {
  const { classes } = props
  return (
    <div className={classes.layout}>
      <main>
        {/* Hero */}
        <Paper className={classes.mainFeaturedPost}>
          <Grid container>
            <Grid item md={6}>
              <div className={classes.mainFeaturedPostContent}>
                <Typography variant='h4' color='inherit' gutterBottom>
                    Scenarios : ce contenu est indisponible.
                </Typography>
                <Typography variant='subtitle1' color='inherit' gutterBottom>
                    Avez vous consulté la <Link component={LinkToHome} color='secondary'>page d'accueil</Link> du site ?
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Paper>
        {/* End Hero */}
      </main>
    </div>
  )
}

Component.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Component)
