import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Link as RouterLink } from '@reach/router'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Hidden from '@material-ui/core/Hidden'

const styles = theme => ({
  cta: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 6,
    textAlign: 'center'
  },
  link: {
    '&:hover': {
      cursor: 'pointer',
      textDecoration: 'underline'
    }
  }
})

const LinkToContact = props => <RouterLink to='/contact' {...props} />

const CallToAction = (props) => {
  const { classes, xs, sm, md } = props
  const cta = (
    <React.Fragment>
      <Link component={LinkToContact} color='secondary'>Contactez-moi&nbsp;!</Link><br />
    pour organiser le RGPDay dans votre établissement
    </React.Fragment>
  )
  return (
    <Grid container spacing={40} alignItems='center' direction='column'>
      <Grid item xs={xs} sm={sm} md={md}>
        <Paper className={classes.cta} elevation={1}>
          <Hidden mdUp><Typography variant='h6'>{cta}</Typography></Hidden>
          <Hidden smDown><Typography variant='h6'>{cta}</Typography></Hidden>
        </Paper>
      </Grid>
    </Grid>
  )
}

CallToAction.propTypes = {
  classes: PropTypes.object.isRequired,
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number
}

CallToAction.defaultProps = {
  xs: 12,
  sm: 12,
  md: 6
}

export default withStyles(styles)(CallToAction)
