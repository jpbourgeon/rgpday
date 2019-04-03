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
import { updateTeam } from 'src/graphql/mutations'
import config from 'src/aws-exports'

API.configure(config)
const getTeam = `query GetTeam($id: ID!) {
  getTeam(id: $id) {
    id
    name
    initials
    numberOfInterviews
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

class SeriousGame extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.state.team = {
      id: null,
      name: null,
      initials: null,
      numberOfInterviews: null
    }
    this.state.ready = false
    this.state.openRules = props.openRules || typeof props.openRules === 'undefined'
    this._isMounted = false
    this.Scenario = null
    this.GameBoard = null
    this.scenarioRef = React.createRef()
    this.boardRef = React.createRef()
    this.checkRefsReceivedTimer = null

    this.checkRefsReceived = this.checkRefsReceived.bind(this)
    this.reload = this.reload.bind(this)
    this.openRules = this.openRules.bind(this)
    this.goTo = this.goTo.bind(this)
    this.closeRules = this.closeRules.bind(this)
  }

  async componentDidMount () {
    try {
      this._isMounted = true
      const { config } = this.props
      window.addEventListener('resize', this.reload, false)
      this.GameBoard = (config.scenarioId)
        ? loadable(() => (import(`../../scenarios/${config.scenarioId}/Board`)))
        : null
      this.Scenario = (config.scenarioId)
        ? loadable.lib(() => (import(`../../scenarios/${config.scenarioId}`)))
        : null
      await this.getTeam()
      if (this._isMounted) this.forceUpdate()
    } catch (error) {
      logger.error(error)
    }
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
      if (this._isMounted) this.forceUpdate()
    }, 100)
  }

  reload (event) {
    event.preventDefault()
    if (this._isMounted) this.forceUpdate()
  }

  openRules () {
    this.setState({ openRules: true })
  }

  async goTo (to, id) {
    try {
      if (!to.includes('score')) {
        const service = (this.scenarioRef.current)
          ? this.scenarioRef.current.scenario.services[id]
          : null
        const input = this.state.team
        input.numberOfInterviews = (input.numberOfInterviews) ? input.numberOfInterviews + 1 : 1
        // GraphQL
        const result = await API.graphql(
          graphqlOperation(updateTeam, { input })
        )
        if (result.errors) {
          logger.error('goTo', result)
        } else {
          this.props.setInterviewData({ service, team: input })
          this.props.navigate(to)
        }
      } else {
        const gameScoringData = (this.scenarioRef.current)
          ? this.scenarioRef.current.scenario.gameScoringData
          : null
        this.props.setGameScoringData(gameScoringData)
        this.props.navigate(to)
      }
    } catch (error) {
      logger.error('goTo', error)
    }
  }

  closeRules () {
    this.setState({ openRules: false })
  }

  async getTeam () {
    try {
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
        this.props.navigate('/dashboard')
      }
    } catch (error) {
      logger.error(error)
    }
  }

  render () {
    const { classes, theme, location: { pathname } } = this.props
    const paperHeight = window.innerHeight - theme.spacing.unit * 8
    const maxSVGHeight = (Math.min(window.innerWidth, 1100) * 707 / 1042) - theme.spacing.unit * 8
    const height = Math.min(paperHeight, maxSVGHeight)
    const Scenario = this.Scenario
    const GameBoard = this.GameBoard
    const rules = (this.scenarioRef.current)
      ? this.scenarioRef.current.scenario.rules
      : [() => (<Loading />)]
    return (
      <div className={classes.layout} style={{ height, width: height * 1042 / 707 }}>
        {(Scenario) ? <Scenario ref={this.scenarioRef} /> : null}
        <main>
          <Paper elevation={8} style={{ height }}>
            <Grid container>
              <Grid item xs={12} className={classes.board}>
                {(GameBoard && this.scenarioRef.current) ? <GameBoard
                  ref={this.boardRef}
                  team={this.state.team}
                  openRules={this.openRules}
                  navigate={this.goTo}
                  pathname={pathname}
                  services={this.scenarioRef.current.scenario.services}
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

SeriousGame.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}

export default withTheme()(withStyles(styles)(SeriousGame))
