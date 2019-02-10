import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import CssBaseline from '@material-ui/core/CssBaseline'
import Hidden from '@material-ui/core/Hidden'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import { mainListItems, secondaryListItems } from './listItems'
import withRoot from './withRoot'

const drawerWidth = 240

const styles = theme => ({
  root: {
    display: 'flex'
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  title: {
    flexGrow: 1
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      flexShrink: 0,
      whiteSpace: 'nowrap'
    }
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    height: '100vh',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto'
  }
})

class Dashboard extends React.Component {
  constructor (props) {
    super(props)
    const wideScreen = isWidthUp('md', this.props.width)
    this.state = {
      openMobile: false,
      openMiniDrawer: wideScreen
    }
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this)
    this.handleMiniDrawerToggle = this.handleMiniDrawerToggle.bind(this)
  }

  handleDrawerToggle () {
    this.setState(state => ({ openMobile: !state.openMobile }))
  };

  handleMiniDrawerToggle () {
    this.setState(state => ({ openMiniDrawer: !state.openMiniDrawer }))
  };

  render () {
    const { classes, children } = this.props

    const drawer = (
      <React.Fragment>
        <div className={classes.toolbarIcon}>
          <IconButton onClick={this.handleDrawerToggle}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </React.Fragment>
    )

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position='fixed'
          className={classNames(classes.appBar)}
        >
          <Toolbar disableGutters className={classes.toolbar}>
            <Hidden smUp implementation='js'>
              <IconButton
                color='inherit'
                aria-label='Open drawer'
                onClick={this.handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Hidden xsDown implementation='js'>
              <IconButton
                color='inherit'
                aria-label='Open drawer'
                onClick={this.handleMiniDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Typography
              component='h1'
              variant='h6'
              color='inherit'
              noWrap
              className={classes.title}
            >
              The Weighers Club
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          {/* The implementation can be swap with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation='js'>
            <Drawer
              variant='temporary'
              open={this.state.openMobile}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
              ModalProps={{
                keepMounted: true // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation='js'>
            <Drawer
              variant='permanent'
              classes={{
                paper: classNames(classes.drawerPaper, !this.state.openMiniDrawer && classes.drawerPaperClose)
              }}
              open={this.state.openMiniDrawer}
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          { children }
        </main>
      </div>
    )
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRoot(withWidth()(withStyles(styles)(Dashboard)))
