import React from 'react'
import loadable from '@loadable/component'
import PropTypes from 'prop-types'
import { withStyles, withTheme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Loading from 'src/components/Loading'
import Rules from './Rules'
import logger from 'src/logger'
import API, { graphqlOperation } from '@aws-amplify/api'
import config from 'src/aws-exports'

API.configure(config)
const getTeam = `query GetTeam($id: ID!) {
  getTeam(id: $id) {
    id
    name
    initials
  }
}
`

const styles = theme => {
  return {
    '@global': {
      '.grecaptcha-badge': {
        display: 'none !important'
      }
    },
    layout: {
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    board: {
      padding: 10
    }
  }
}

class Board extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.state.team = {
      id: null,
      name: null,
      initials: null

    }
    this.state.ready = false
    this.state.openRules = true
    this.state.openRules = true
    this.reload = this.reload.bind(this)
    this.openRules = this.openRules.bind(this)
    this.closeRules = this.closeRules.bind(this)

    this._isMounted = false
    this.Scenario = null
    this.GameBoard = null
    this.scenarioRef = React.createRef()
    this.boardRef = React.createRef()
    this.checkRefsReceivedTimer = null
    this.checkRefsReceived = this.checkRefsReceived.bind(this)
  }

  async componentDidMount () {
    this._isMounted = true
    const { config } = this.props
    window.addEventListener('resize', this.reload, false)
    this.GameBoard = (config.scenarioId) ? loadable(() => (import(`../../scenarios/${config.scenarioId}/Board`))) : null
    this.Scenario = (config.scenarioId) ? loadable.lib(() => (import(`../../scenarios/${config.scenarioId}`))) : null
    this.checkRefsReceived()
    await this.getTeam()
  }

  componentWillUnmount () {
    this._isMounted = false
    clearTimeout(this.checkRefsReceivedTimer)
    window.removeEventListener('resize', this.reload, false)
  }

  componentDidUpdate () {
    if (!this.scenarioRef.current || !this.boardRef.current) {
      this.checkRefsReceived()
    }
  }

  checkRefsReceived () {
    clearTimeout(this.checkRefsReceivedTimer)
    this.checkRefsReceivedTimer = setTimeout(() => {
      this.forceUpdate()
    }, 300)
  }

  reload (event) {
    event.preventDefault()
    this.forceUpdate()
  }

  openRules () {
    this.setState({ openRules: true })
  }

  closeRules () {
    this.setState({ openRules: false })
  }

  async getTeam () {
    // GraphQL
    const result = await API.graphql(
      graphqlOperation(getTeam, { id: this.props.teamId })
    )
    if (!result.errors && result.data.getTeam) {
      const team = { ...result.data.getTeam }
      if (this._isMounted) {
        this.setState({ team })
      }
    } else {
      logger.error('loadItems', result)
    }
  }

  render () {
    const { classes, theme } = this.props
    const paperHeight = window.innerHeight - theme.spacing.unit * 8
    const maxSVGHeight = (window.innerWidth * 707 / 1042) - theme.spacing.unit * 8
    const height = Math.min(paperHeight, maxSVGHeight)
    const Scenario = this.Scenario
    const GameBoard = this.GameBoard
    const rules = (this.scenarioRef.current)
      ? this.scenarioRef.current.scenario.get('rules')
      : [() => (<Loading />)]
    return (
      <div className={classes.layout} style={{ height, width: height * 1042 / 707 }}>
        {(Scenario) ? <Scenario ref={this.scenarioRef} /> : null }
        <main>
          <Paper elevation={8} style={{ height }}>
            <Grid container>
              <Grid item xs={12} className={classes.board}>
                {(GameBoard && this.scenarioRef.current) ? <GameBoard
                  ref={this.boardRef}
                  team={this.state.team}
                  openRules={this.openRules}
                  services={this.scenarioRef.current.scenario.get('services')}
                /> : <Loading />}
              </Grid>
            </Grid>
          </Paper>
          <Rules
            pages={rules}
            open={this.state.openRules}
            handleOpen={this.openRules}
            handleClose={this.closeRules}
          />
        </main>
      </div>
    )
  }
}

Board.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}

export default withTheme()(withStyles(styles)(Board))
