import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Breadcrumbs from '@material-ui/lab/Breadcrumbs'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Fab from '@material-ui/core/Fab'
import Folder from '@material-ui/icons/FolderOpenOutlined'
import NavigateNext from '@material-ui/icons/NavigateNext'
import Add from '@material-ui/icons/Add'
import Link from 'src/components/Link'
// import { listSessions } from 'src/graphql/queries'

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
    paper: {
      backgroundSize: `100% 100%`,
      marginBottom: theme.spacing.unit * 4,
      padding: theme.spacing.unit * 4,
      textAlign: 'justify'
    },
    breadcrumb: {
      marginBottom: theme.spacing.unit * 2
    },
    title: {
      marginBottom: theme.spacing.unit * 3
    },
    titleIcon: {
      fontSize: '2.5rem',
      marginBottom: '-0.5rem'
    },
    post: {
      paddingBottom: theme.spacing.unit * 6
    },
    fab: {
      [theme.breakpoints.up('sm')]: {
        float: 'right'
      },
      [theme.breakpoints.down('xs')]: {
        position: 'fixed',
        bottom: theme.spacing.unit,
        right: theme.spacing.unit
      }
    }
  }
}

const Component = props => {
  const { classes } = props
  return (
    <div className={classes.layout}>
      <main>
        <Paper className={classes.paper}>
          <Grid container className={classes.container}>
            <Grid item xs={12} className={classes.breadcrumb}>
              <Breadcrumbs separator={<NavigateNext fontSize='small' />} arial-label='Breadcrumb'>
                <Link to='/' color='inherit'>Accueil</Link>
                <Link to='../' color='inherit'>Tableau de bord</Link>
                <Link to='.' color='inherit'>Sessions</Link>
              </Breadcrumbs>
            </Grid>
            <Grid item xs={12} className={classes.title}>
              <Typography variant='h4' gutterBottom>
                <div className={classes.fab}>
                  <Link to='./add'>
                    <Fab color='primary' aria-label='Ajouter'>
                      <Add />
                    </Fab>
                  </Link>
                </div>
                <Folder className={classes.titleIcon} />&nbsp;Sessions
              </Typography>
              <Divider />
            </Grid>
            <Grid item md={12}>
              <div className={classes.post} />
            </Grid>
          </Grid>
        </Paper>
      </main>

    </div>
  )
}

Component.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Component)
