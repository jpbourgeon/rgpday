import React from 'react'
import PropTypes from 'prop-types'
import { Link as RouterLink } from '@reach/router'
import Link from '@material-ui/core/Link'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import AppBar from '../AppBar'

const styles = theme => {
  return {
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

const HomeComponent = props => {
  const { classes } = props
  return (
    <div className={classes.layout}>
      <AppBar />
      <main>
        {/* Hero */}
        <Paper className={classes.mainFeaturedPost}>
          <Grid container>
            <Grid item md={6}>
              <div className={classes.mainFeaturedPostContent}>
                <Typography variant='h4' color='inherit' gutterBottom>
                    Ce contenu n'existe pas.
                </Typography>
                <Typography variant='subtitle1' color='inherit' gutterBottom>
                    Essayez depuis la <Link component={LinkToHome}>page d'accueil</Link> du site.
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

HomeComponent.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(HomeComponent)
