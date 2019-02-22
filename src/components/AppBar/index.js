import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import { Link } from '@reach/router'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Hidden from '@material-ui/core/Hidden'
import Info from '@material-ui/icons/Info'
import Email from '@material-ui/icons/Email'
import AccountCircle from '@material-ui/icons/AccountCircle'

const styles = theme => ({
  root: {
    paddingBottom: theme.spacing.unit * 4
  },
  grow: {
    flexGrow: 1
  },
  menuLink: {
    fontFamily: 'Roboto',
    fontSize: 'bold',
    color: theme.palette.common.white,
    textDecoration: 'none',
    margin: '0 0.5em'
  }
})

const AppBarComponent = props => {
  const { classes } = props
  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' color='inherit' className={classes.grow}>
            <Link to='/' className={classes.menuLink}>RGPDay</Link>
          </Typography>
          <Link to='/about' className={classes.menuLink}>
            <Hidden smUp><Info /></Hidden>
            <Hidden xsDown>À propos</Hidden>

          </Link>
          <Link to='/contact' className={classes.menuLink}>
            <Hidden smUp><Email /></Hidden>
            <Hidden xsDown>Contact</Hidden>
          </Link>
          <Link to='/login' className={classes.menuLink}>
            <Hidden smUp><AccountCircle /></Hidden>
            <Hidden xsDown>Login</Hidden>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  )
}

AppBarComponent.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AppBarComponent)
