import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Router, Redirect } from '@reach/router'
import SignIn from 'src/components/SignIn'
import Loadable from 'src/components/Loadable'
import logger from 'src/logger'
import Auth from '@aws-amplify/auth'
import API, { graphqlOperation } from '@aws-amplify/api'
import { Authenticator } from 'aws-amplify-react'
import { getConfig as gqlGetConfig } from 'src/graphql/queries'
import { createConfig as gqlCreateConfig, updateConfig as gqlUpdateConfig } from 'src/graphql/mutations'
import config from 'src/aws-exports'

Auth.configure(config)
API.configure(config)
const gqlGetSession = `query GetSession($id: ID!) {
  getSession(id: $id) {
    id
    scenario {
      id
    }
    presentation {
      id
    }
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
const Board = (props) => (<Loadable loadablePath='protectedPages/Board' {...props} />)
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
          <Board path='/serious-game/board/:teamId' config={config} />
          <Service path='/serious-game/board/:teamId/:serviceId' config={config} />
          <Score path='/serious-game/board/:teamId/score' config={config} />
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
    this.state.config = (this.props.config) ? this.props.config : {
      config: {
        isAdmin: false,
        sessionId: null,
        scenarioId: null,
        presentationId: null
      }
    }
    this.setConfig = this.setConfig.bind(this)
    this.getConfig = this.getConfig.bind(this)
  }

  componentDidMount () {
    this._isMounted = true
    this.getConfig()
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
            config.presentationId !== prevConfig.presentationId
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
        config.scenarioId = null
        config.presentationId = null
      } else if (group === 'admins') {
        config.isAdmin = true
        if (typeof id !== 'undefined') {
          config.sessionId = id
          config.scenarioId = null
          config.presentationId = null
        }
      }
      // GraphQL query Session
      if (config.sessionId !== null) {
        const getSession = await API.graphql(graphqlOperation(gqlGetSession, { id: config.sessionId }))
        if (!getSession.errors && getSession.data.getSession) {
          const session = getSession.data.getSession
          config.scenarioId = session.scenario.id
          config.presentationId = session.presentation.id
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
          />
        </Authenticator>
      </React.Fragment>
    )
  }
}

export default ProtectedRoutes
