import React from 'react'
import { navigate } from '@reach/router'
// import { navigate, Redirect } from '@reach/router'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Breadcrumbs from '@material-ui/lab/Breadcrumbs'
import Avatar from '@material-ui/core/Avatar'
import toMaterialStyle from 'material-color-hash'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Dialog from '@material-ui/core/Dialog'
import Fab from '@material-ui/core/Fab'
import Game from '@material-ui/icons/VideogameAssetOutlined'
import Search from '@material-ui/icons/Search'
import Close from '@material-ui/icons/Close'
import Delete from '@material-ui/icons/Delete'
import Play from '@material-ui/icons/PlayCircleFilled'
import Edit from '@material-ui/icons/Edit'
import NavigateNext from '@material-ui/icons/NavigateNext'
import Add from '@material-ui/icons/Add'
import Link from 'src/components/Link'
import MUILink from '@material-ui/core/Link'
import Tile from 'src/components/Tile'
import { deleteTeam } from 'src/graphql/mutations'
import logger from 'src/logger'
import API, { graphqlOperation } from '@aws-amplify/api'
import config from 'src/aws-exports'

API.configure(config)
const listTeams = `query ListTeams(
  $filter: ModelTeamFilterInput
  $limit: Int
  $nextToken: String
) {
  listTeams(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      initials
      searchable
    }
    nextToken
  }
}
`

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
      marginBottom: theme.spacing.unit * 4,
      padding: theme.spacing.unit * 4
    },
    breadcrumb: {
      marginBottom: theme.spacing.unit * 2
    },
    title: {
      marginBottom: theme.spacing.unit * 2
    },
    titleIcon: {
      fontSize: '2.5rem',
      marginBottom: '-0.5rem'
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
    },
    grow: {
      flexGrow: 1
    },
    loadMoreLink: {
      cursor: 'pointer'
    },
    loadMoreItem: {
      textAlign: 'center'
    },
    hide: {
      display: 'none'
    },
    formContainer: {
      marginBottom: theme.spacing.unit * 2
    },
    filterButtonsContainer: {
      display: 'inline-flex',
      flexDirection: 'column',
      textAlign: 'center',
      justifyContent: 'center'
    },
    filterButtons: {
      padding: theme.spacing.unit,
      marginTop: theme.spacing.unit
    },
    dialog: {
      padding: '1em'
    },
    avatar: {
      margin: 'auto',
      width: 50,
      height: 50,
      fontSize: theme.typography.h6.fontSize,
      color: theme.palette.grey['700'],
      backgroundColor: theme.palette.background.default
    },
    tile: {
      textAlign: 'center',
      justifyContent: 'flex-start'
    },
    tileTitle: {
      marginTop: '1em !important',
      marginBottom: '-0.5em !important'
    },
    tileAvatar: {
      height: '100%'
    },
    tileActions: {
      padding: '0.5em !important',
      marginBottom: '-1em !important'
    },
    itemActionIcon: {
      width: 18,
      height: 18
    },
    itemLargeActionIcon: {
      width: 36,
      height: 36
    },
    itemActionDivider: {
      marginBottom: '0.5em'
    }
  }
}

class Component extends React.Component {
  constructor (props) {
    super(props)
    this._isMounted = false
    this.defaultState = {
      items: [],
      limit: 10,
      nextToken: null,
      filter: '',
      delete: {
        id: '',
        name: '',
        openDialog: false
      }
    }
    this.state = this.defaultState
    this.loadItems = this.loadItems.bind(this)
    this.handleChangeFilter = this.handleChangeFilter.bind(this)
    this.handleCancelFilter = this.handleCancelFilter.bind(this)
    this.handleDeleteDialog = this.handleDeleteDialog.bind(this)
    this.deleteTeam = this.deleteTeam.bind(this)
  }

  componentDidMount () {
    this._isMounted = true
    this.loadItems()
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  async loadItems (event = { preventDefault: () => {} }) {
    event.preventDefault()
    try {
      const state = this.state
      if (state.nextToken === null) state.items = []
      let filter = null
      if (this.state.filter !== '') {
        filter = { searchable: { contains: this.state.filter.toLowerCase() } }
      }
      // GraphQL
      const result = await API.graphql(
        graphqlOperation(listTeams, {
          filter,
          limit: this.state.limit,
          nextToken: this.state.nextToken
        })
      )
      if (!result.errors && result.data.listTeams) {
        state.nextToken = result.data.listTeams.nextToken
        state.items = [...state.items, ...result.data.listTeams.items]
        if (this._isMounted) {
          this.setState(state, () => {
            if (result.data.listTeams.items.length === 0 && result.data.listTeams.nextToken !== null) {
              this.loadItems()
            }
          })
        }
      } else {
        logger.error('loadItems', result)
      }
    } catch (error) {
      logger.error('loadItems', error)
    }
  }

  handleChangeFilter (event) {
    const state = this.state
    state.filter = event.target.value
    this.setState(state)
  }

  handleCancelFilter (event) {
    event.preventDefault()
    this.setState(this.defaultState, () => {
      this.loadItems()
    })
  }

  handleDeleteDialog (id, name, openDialog) {
    this.setState({
      delete: {
        id,
        name,
        openDialog
      }
    })
  }

  async deleteTeam () {
    try {
      // GraphQL
      const id = this.state.delete.id
      if (this._isMounted) this.handleDeleteDialog('', '', false)
      const result = await API.graphql(
        graphqlOperation(deleteTeam, { input: { id } })
      )
      if (!result.errors) {
        const items = this.state.items
        const index = items.findIndex(item => item.id === id)
        if (index > -1) {
          items.splice(index, 1)
        }
        if (this._isMounted) this.setState({ items })
      } else {
        logger.error('deleteTeam', result)
      }
    } catch (error) {
      logger.error('deleteTeam', error)
    }
  }

  render () {
    const { classes, config } = this.props
    // if (!config.sessionId) return (<Redirect noThrow to='/dashboard' />)
    const renderTitle = (item) => (
      <Grid container spacing={40} className={classes.tile}>
        <Grid item xs={12} component='span'>
          <Avatar className={classes.avatar} style={toMaterialStyle(item.name)} >{
            (!item.initials) ? '?' : item.initials
          }</Avatar>
          <div className={classes.tileTitle}>{item.name}</div>
        </Grid>
        <Grid item xs={12} component='span' className={classes.tileActions}>
          <Divider className={classes.itemActionDivider} />
          <div style={{ float: 'left' }}>
            <MUILink onClick={() => { navigate(`/dashboard/serious-game/board/${item.id}`) }}>
              <IconButton><Play color='secondary' className={classes.itemLargeActionIcon} /></IconButton>
            </MUILink>
          </div>
          <div style={{ float: 'right', paddingTop: 9 }}>
            <Link to={`./update-team/${item.id}`}>
              <IconButton><Edit className={classes.itemActionIcon} /></IconButton>
            </Link>
            <MUILink
              onClick={() => { this.handleDeleteDialog(item.id, item.name, true) }}
              className={(config.isAdmin) ? null : classes.hide}
            >
              <IconButton><Delete className={classes.itemActionIcon} /></IconButton>
            </MUILink>
          </div>
        </Grid>
      </Grid>
    )
    const renderItems = (items) => {
      return (
        items.map((item) => {
          return (
            <Tile
              xs={12}
              sm={6}
              md={4}
              key={item.id}
              title={renderTitle(item)}
            />
          )
        })
      )
    }
    return (
      <div className={classes.layout}>
        <main>
          <Paper className={classes.paper}>
            <Grid container className={classes.container}>
              <Grid item xs={12} className={classes.breadcrumb}>
                <Breadcrumbs separator={<NavigateNext fontSize='small' />} arial-label='Breadcrumb'>
                  <Link to='/' color='inherit'>Accueil</Link>
                  <Link to='../' color='inherit'>Tableau de bord</Link>
                  <Link to='.' color='inherit'>Serious Game : choix de l'équipe</Link>
                </Breadcrumbs>
              </Grid>
              <Grid item xs={12} className={classes.title}>
                <Typography variant='h4' gutterBottom>
                  <Game className={classes.titleIcon} />&nbsp;Serious Game
                  <div className={classes.fab}>
                    <Link to='./add-team'>
                      <Fab color='primary' aria-label='Ajouter'>
                        <Add />
                      </Fab>
                    </Link>
                  </div>
                </Typography>
                <Divider className={classes.title} />
                <Typography variant='h5' gutterBottom>
                  Choisissez votre équipe ou créez-en une nouvelle
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <form
                  className={classes.formContainer}
                  noValidate
                  autoComplete='off'
                  onSubmit={(e) => { this.loadItems(e, true) }}
                >
                  <Grid container>
                    <Grid item className={classes.grow}>
                      <TextField
                        label='Filtrer'
                        fullWidth
                        margin='normal'
                        variant='outlined'
                        onChange={(e) => this.handleChangeFilter(e)}
                        value={this.state.filter}
                      />
                    </Grid>
                    <Grid item className={classes.filterButtonsContainer}>
                      <div className={classes.filterButtons}>
                        <IconButton
                          type='submit'
                        >
                          <Search />
                        </IconButton>
                        <IconButton
                          onClick={this.handleCancelFilter}
                        >
                          <Close />
                        </IconButton>
                      </div>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={40} alignItems='baseline'>
                  {(this.state.items.length > 0) ? renderItems(this.state.items) : (
                    <Grid item xs={12}>
                      <Typography variant='body1' gutterBottom>Il n'y a pas d'équipe à afficher</Typography>
                    </Grid>
                  )}
                  <Grid item xs={12} className={(this.state.nextToken === null) ? classes.hide : null}>
                    <Typography variant='body1' gutterBottom className={classes.loadMoreItem}>
                      <MUILink
                        onClick={this.loadItems}
                        className={classes.loadMoreLink}>
                          Afficher plus de résultats
                      </MUILink>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </main>
        <Dialog
          open={this.state.delete.openDialog}
          onClose={() => { this.handleDeleteDialog('', '', false) }}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>Effacer l'équipe {this.state.delete.name}</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              Attention, cette action est irréversible.
            </DialogContentText>
          </DialogContent>
          <DialogActions className={classes.dialog}>
            <Button onClick={this.deleteTeam} color='secondary' variant='contained'>
              Confirmer
            </Button>
            <Button onClick={() => { this.handleDeleteDialog('', '', false) }} color='primary' autoFocus variant='outlined'>
              Annuler
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

Component.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Component)
