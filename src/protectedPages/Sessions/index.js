import React from 'react'
import { Redirect } from '@reach/router'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Breadcrumbs from '@material-ui/lab/Breadcrumbs'
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
import Folder from '@material-ui/icons/FolderOpenOutlined'
import Search from '@material-ui/icons/Search'
import Close from '@material-ui/icons/Close'
import Delete from '@material-ui/icons/Delete'
import Edit from '@material-ui/icons/Edit'
import NavigateNext from '@material-ui/icons/NavigateNext'
import Add from '@material-ui/icons/Add'
import Play from '@material-ui/icons/PlayCircleFilled'
import Stop from '@material-ui/icons/Stop'
import Link from 'src/components/Link'
import MUILink from '@material-ui/core/Link'
import Tile from 'src/components/Tile'
import { deleteSession } from 'src/graphql/mutations'
import logger from 'src/logger'
import API, { graphqlOperation } from '@aws-amplify/api'
import config from 'src/aws-exports'

API.configure(config)
const listSessions = `query ListSessions(
  $filter: ModelSessionFilterInput
  $limit: Int
  $nextToken: String
) {
  listSessions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      description
      contact
      RGPDay
      startDate
      searchable
      scenario {
        id
      }
      presentation {
        id
      }
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
      backgroundSize: `100% 100%`,
      marginBottom: theme.spacing.unit * 4,
      padding: theme.spacing.unit * 4,
      textAlign: 'justify'
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
    itemActionIcon: {
      width: '1rem',
      height: '1rem'
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
    tileContent: {
      display: 'block'
    },
    dialog: {
      padding: '1em'
    }
  }
}

const defaultState = {
  items: [],
  limit: 10,
  nextToken: null,
  filter: '',
  delete: {
    id: '',
    openDialog: false
  }
}

class Component extends React.Component {
  constructor (props) {
    super(props)
    this._isMounted = false
    this.state = defaultState
    this.loadItems = this.loadItems.bind(this)
    this.handleChangeFilter = this.handleChangeFilter.bind(this)
    this.handleCancelFilter = this.handleCancelFilter.bind(this)
    this.handleDeleteDialog = this.handleDeleteDialog.bind(this)
    this.deleteSession = this.deleteSession.bind(this)
  }

  componentDidMount () {
    this._isMounted = true
    this.loadState()
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  loadState () {
    this.setState(defaultState, () => {
      this.loadItems()
    })
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
        graphqlOperation(listSessions, {
          filter,
          limit: this.state.limit,
          nextToken: this.state.nextToken
        })
      )
      logger.info(result)
      if (!result.errors) {
        state.nextToken = result.data.listSessions.nextToken
        state.items = [...state.items, ...result.data.listSessions.items]
        if (this._isMounted) {
          this.setState(state, () => {
            if (result.data.listSessions.items.length === 0 && result.data.listSessions.nextToken !== null) {
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
    this.setState(defaultState, () => {
      this.loadItems()
    })
  }

  handleDeleteDialog (id, openDialog) {
    this.setState({
      delete: {
        id,
        openDialog
      }
    })
  }

  async deleteSession () {
    try {
      // GraphQL
      const { config, setConfig } = this.props
      const id = this.state.delete.id
      if (config.sessionId === id) setConfig(null)
      if (this._isMounted) this.handleDeleteDialog('', false)
      const result = await API.graphql(
        graphqlOperation(deleteSession, { input: { id } })
      )
      if (!result.errors) {
        const items = this.state.items
        const index = items.findIndex(item => item.id === id)
        if (index > -1) {
          items.splice(index, 1)
        }
        if (this._isMounted) this.setState({ items })
      } else {
        logger.error('deleteSession', result)
      }
    } catch (error) {
      logger.error('deleteSession', error)
    }
  }

  render () {
    const { classes, setConfig, config } = this.props
    if (!config.isAdmin) return (<Redirect noThrow to='/dashboard' />)
    const renderActions = (id) => (
      <Grid container>
        <Grid item className={classes.grow}>{id}</Grid>
        <Grid item>
          <MUILink onClick={() => setConfig(id)} className={(config.sessionId === id) ? classes.hide : null}>
            <IconButton><Play size='small' className={classes.itemActionIcon} /></IconButton>
          </MUILink>
          <MUILink onClick={() => setConfig(null)} className={(config.sessionId !== id) ? classes.hide : null}>
            <IconButton><Stop size='small' className={classes.itemActionIcon} /></IconButton>
          </MUILink>
          <Link to={`./update/${id}`}>
            <IconButton><Edit className={classes.itemActionIcon} /></IconButton>
          </Link>
          <MUILink onClick={() => { this.handleDeleteDialog(id, true) }}>
            <IconButton><Delete size='small' className={classes.itemActionIcon} /></IconButton>
          </MUILink>
        </Grid>
      </Grid>
    )
    const renderItems = (items) => {
      return (
        items
          .map((item) => (
            <Tile
              key={item.id}
              title={renderActions(item.id)}
              isActive={(item.id === config.sessionId)}
              description={(
                <React.Fragment>
                  {(!item.description) ? null : (
                    <React.Fragment>
                      <span className={classes.tileContent}>{item.description.split('\n').map((line, key) => {
                        if (key !== item.description.split('\n').length) {
                          return (<React.Fragment key={key}>{line}<br /></React.Fragment>)
                        } else {
                          return (<React.Fragment key={key}>{line}</React.Fragment>)
                        }
                      })}
                      </span>
                    </React.Fragment>
                  )}
                  {(!item.RGPDay) ? null : (
                    <React.Fragment>
                      <span className={classes.tileContent}>
                        <strong>Date : </strong>{item.RGPDay}
                      </span>
                    </React.Fragment>
                  )}
                  {(!item.contact) ? null : (
                    <React.Fragment>
                      <span className={classes.tileContent}><strong>Contact : </strong>{item.contact.split('\n')
                        .map((line, key) => {
                          if (key !== item.contact.split('\n').length) {
                            return (<React.Fragment key={key}>{line}<br /></React.Fragment>)
                          } else {
                            return (<React.Fragment key={key}>{line}</React.Fragment>)
                          }
                        })
                      }</span>
                    </React.Fragment>
                  )}
                  {(!item.scenario.id) ? null : (
                    <React.Fragment>
                      <span className={classes.tileContent}>
                        <strong>Scénario : </strong>
                        <Link to={`../scenarios/update/${item.scenario.id}`}>{item.scenario.id}</Link>
                      </span>
                    </React.Fragment>
                  )}
                  {(!item.presentation.id) ? null : (
                    <React.Fragment>
                      <span className={classes.tileContent}>
                        <strong>Présentation : </strong>
                        <Link to={`../presentations/update/${item.presentation.id}`}>{item.presentation.id}</Link>
                      </span>
                    </React.Fragment>
                  )}
                </React.Fragment>
              )}
            />
          ))
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
                <Grid container spacing={40}>
                  {(Array.isArray(this.state.items) && this.state.items.length > 0) ? renderItems(this.state.items) : (
                    <Grid item>
                      <Typography variant='body1' gutterBottom>Il n'y a pas de session à afficher</Typography>
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
          onClose={() => { this.handleDeleteDialog('', false) }}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>Effacer le session {this.state.delete.id}</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              Attention, cette action est irréversible.
            </DialogContentText>
          </DialogContent>
          <DialogActions className={classes.dialog}>
            <Button onClick={this.deleteSession} color='secondary' variant='contained'>
              Confirmer
            </Button>
            <Button onClick={() => { this.handleDeleteDialog('', false) }} color='primary' autoFocus variant='outlined'>
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
