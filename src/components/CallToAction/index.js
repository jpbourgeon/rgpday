import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Link as RouterLink } from '@reach/router'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

const styles = theme => ({
  cta: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4,
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
  const { classes, xs, md } = props
  return (
    <Grid container spacing={40} alignItems='center' direction='column'>
      <Grid item xs={xs} md={md}>
        <Paper className={classes.cta} elevation={1}>
          <Typography variant='h6'>
            Si ce format vous intéresse, <Link component={LinkToContact} color='secondary'>contactez-moi</Link>
          </Typography>
          <Typography variant='body1'>
            pour organiser le RGPDay dans votre établissement !
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  )
}

CallToAction.propTypes = {
  classes: PropTypes.object.isRequired,
  xs: PropTypes.number,
  md: PropTypes.number
}

CallToAction.defaultProps = {
  xs: 12,
  md: 6
}

export default withStyles(styles)(CallToAction)
