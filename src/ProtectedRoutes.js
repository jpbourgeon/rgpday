import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Router, Redirect } from '@reach/router'
import SignIn from 'src/components/SignIn'
import Loadable from 'src/components/Loadable'
import logger from 'src/logger'
import Auth from '@aws-amplify/auth'
import API, { graphqlOperation } from '@aws-amplify/api'
import PubSub from '@aws-amplify/pubsub'
import { Authenticator } from 'aws-amplify-react'
import { getConfig as gqlGetConfig } from 'src/graphql/queries'
import { createConfig as gqlCreateConfig, updateConfig as gqlUpdateConfig } from 'src/graphql/mutations'
import config from 'src/aws-exports'

Auth.configure(config)
PubSub.configure(config)
API.configure(config)
const gqlGetSession = `query GetSession($id: ID!) {
  getSession(id: $id) {
    id
    gameOver
    scenario {
      id
    }
    presentation {
      id
    }
  }
}
`

const onUpdateSession = `subscription onUpdateSession {
  onUpdateSession { 
    id
    gameOver
  }
}
`

const Default = (props) => (<Loadable loadablePath='pages/Default' {...props} />)
const Dashboard = (props) => (<Loadable loadablePath='protectedPages/Dashboard' {...props} />)
const Sessions = (props) => (<Loadable loadablePath='protectedPages/Sessions' {...props} />)
const Scenarios = (props) => (<Loadable loadablePath='protectedPages/Scenarios' {...props} />)
const Presentations = (props) => (<Loadable loadablePath='protectedPages/Presentations' {...props} />)
const EditSession = (props) => (<Loadable loadablePath='protectedPages/EditSession' {...props} />)
const EditScenario = (props) => (<Loadable loadablePath='protectedPages/EditScenario' {...props} />)
const EditPresentation = (props) => (<Loadable loadablePath='protectedPages/EditPresentation' {...props} />)
const Presentation = (props) => (<Loadable loadablePath='protectedPages/Presentation' {...props} />)
const Teams = (props) => (<Loadable loadablePath='protectedPages/Teams' {...props} />)
const EditTeam = (props) => (<Loadable loadablePath='protectedPages/EditTeam' {...props} />)
const SeriousGame = (props) => (<Loadable loadablePath='protectedPages/SeriousGame' {...props} />)
const Service = (props) => (<Loadable loadablePath='protectedPages/Service' {...props} />)
const Score = (props) => (<Loadable loadablePath='protectedPages/Score' {...props} />)

const styles = {
  '@global': {
    '.grecaptcha-badge': {
      visibility: 'visible'
    }
  }
}

class MyRouter extends React.Component {
  constructor (props) {
    super(props)
    this._validAuthStates = ['signedIn']
  }

  render () {
    const { authState, config, setConfig } = this.props
    if (!this._validAuthStates.includes(authState)) {
      this._isHidden = true
      return null
    } else {
      this._isHidden = false
      return (
        <Router>
          <Default default />
          <Dashboard path='/' config={config} />
          <Scenarios path='/scenarios' config={config} />
          <EditScenario path='/scenarios/add' config={config} />
          <EditScenario path='/scenarios/update/:scenarioId' config={config} />
          <Redirect noThrow from='/scenarios/update' to='/dashboard/scenarios/add' />
          <Presentations path='/presentations' config={config} />
          <EditPresentation path='/presentations/add' config={config} />
          <EditPresentation path='/presentations/update/:presentationId' config={config} />
          <Redirect noThrow from='/scenarios/update' to='/dashboard/scenarios/add' />
          <Sessions path='/sessions' setConfig={setConfig} config={config} />
          <EditSession path='/sessions/add' config={config} />
          <EditSession path='/sessions/update/:sessionId' config={config} />
          <Redirect noThrow from='/sessions/update' to='/dashboard' />
          <Presentation path='/presentation' config={config} />
          <Teams path='/serious-game' config={config} />
          <EditTeam path='/serious-game/add-team' config={config} />
          <EditTeam path='/serious-game/update-team/:teamId' config={config} />
          <Redirect noThrow from='/serious-game/update-team' to='/dashboard' />
          <SeriousGame
            path='/serious-game/board/:teamId'
            config={config}
            openRules={this.props.openRules}
            setInterviewData={this.props.setInterviewData}
            setGameScoringData={this.props.setGameScoringData}
          />
          <Service path='/serious-game/board/:teamId/:serviceId'
            config={config}
            openRules={this.props.openRules}
            interviewData={this.props.interviewData}
          />
          <Score path='/serious-game/board/:teamId/score'
            config={config}
            gameScoringData={this.props.gameScoringData}
          />
          <Redirect noThrow from='/serious-game/board' to='/dashboard/serious-game' />
        </Router>
      )
    }
  }
}
const MyStyledRouter = withStyles(styles)(MyRouter)

class ProtectedRoutes extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this._isMounted = false
    this.subscription = null
    this.state.config = (this.props.config) ? this.props.config : {
      config: {
        isAdmin: false,
        sessionId: null,
        scenarioId: null,
        presentationId: null,
        interviewData: null,
        gameScoringData: null,
        gameOver: null
      }
    }
    this.setConfig = this.setConfig.bind(this)
    this.getConfig = this.getConfig.bind(this)
    this.setInterviewData = this.setInterviewData.bind(this)
    this.setGameScoringData = this.setGameScoringData.bind(this)
    this.setGameOver = this.setGameOver.bind(this)
  }

  async componentDidMount () {
    this._isMounted = true
    try {
      await this.getConfig()
      if (this.state.config.sessionId) {
        this.subscription = await API.graphql(graphqlOperation(onUpdateSession))
          .subscribe({
            next: (response) => {
              const data = response.value.data.onUpdateSession
              if (data.id === this.state.config.sessionId &&
                data.gameOver !== this.state.config.gameOver) this.setConfig(data.id)
            }
          })
      }
    } catch (error) {
      logger.error('componentDidMount', error)
    }
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  async getConfig () {
    try {
      const authData = await Auth.currentAuthenticatedUser()
      // GraphQL
      const result = await API.graphql(graphqlOperation(gqlGetConfig, { id: authData.username }))
      if (!result.errors && result.data.getConfig) {
        const config = JSON.parse(result.data.getConfig.value)
        const prevConfig = this.state.config
        if (this._isMounted && (
          config.isAdmin !== prevConfig.isAdmin ||
            config.sessionId !== prevConfig.sessionId ||
            config.scenarioId !== prevConfig.scenarioId ||
            config.presentationId !== prevConfig.presentationId ||
            config.gameOver !== prevConfig.gameOver
        )) this.setState({ config })
      } else {
        logger.error('protectedRoutes.getConfig::result', result)
      }
    } catch (error) {
      logger.error('ProtectedRoutes.getConfig', error)
    }
  }

  async setConfig (id) {
    try {
      const authData = await Auth.currentAuthenticatedUser()
      const group = (authData.signInUserSession.idToken.payload['cognito:groups'][0])
      let config
      let gqlMutation
      // GraphQL Query config
      const result = await API.graphql(graphqlOperation(gqlGetConfig, { id: authData.username }))
      if (!result.errors && result.data.getConfig) {
        config = JSON.parse(result.data.getConfig.value)
        gqlMutation = gqlUpdateConfig
      } else {
        gqlMutation = gqlCreateConfig
        config = this.state.config
        logger.error('protectedRoutes.setConfig::result', result)
      }
      // Adjust config
      if (group === 'sessions') {
        config.isAdmin = false
        config.sessionId = authData.username
      } else if (group === 'admins') {
        config.isAdmin = true
        if (typeof id !== 'undefined') {
          config.sessionId = id
        }
      }
      config.scenarioId = null
      config.presentationId = null
      config.gameOver = null
      // GraphQL query Session
      if (config.sessionId !== null) {
        const getSession = await API.graphql(graphqlOperation(gqlGetSession, { id: config.sessionId }))
        if (!getSession.errors && getSession.data.getSession) {
          const session = getSession.data.getSession
          config.scenarioId = session.scenario.id
          config.presentationId = session.presentation.id
          config.gameOver = session.gameOver
        } else {
          logger.error('protectedRoutes.setConfig::getSession', { config, getSession })
        }
      }
      // GraphQL Mutation
      const mutation = await API.graphql(graphqlOperation(gqlMutation, {
        input: {
          id: authData.username,
          value: JSON.stringify(config)
        }
      }))
      if (mutation.errors) logger.error('protectedRoutes.setConfig::mutation', mutation)
      if (this._isMounted) this.setState({ config })
    } catch (error) {
      logger.error('ProtectedRoutes.setConfig', error)
    }
  }

  setInterviewData (interviewData) {
    this.setState({ interviewData })
  }

  setGameScoringData (gameScoringData) {
    this.setState({ gameScoringData })
  }

  setGameOver (gameOver) {
    const { config } = this.state
    config.gameOver = gameOver
    this.setState({ config })
  }

  render () {
    return (
      <React.Fragment>
        <Authenticator
          hideDefault
        >
          <SignIn
            setConfig={this.setConfig}
          />
          <MyStyledRouter
            config={this.state.config}
            setConfig={this.setConfig}
            openRules={this.props.openRules}
            interviewData={this.state.interviewData}
            setInterviewData={this.setInterviewData}
            gameScoringData={this.state.gameScoringData}
            setGameScoringData={this.setGameScoringData}
          />
        </Authenticator>
      </React.Fragment>
    )
  }
}

export default ProtectedRoutes
