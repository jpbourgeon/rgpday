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
// const SeriousGame = (props) => (<Loadable loadablePath='protectedPages/SeriousGame' {...props} />)

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
          <Scenarios path='/scenarios' />
          <EditScenario path='/scenarios/add' />
          <EditScenario path='/scenarios/update/:scenarioId' />
          <Redirect noThrow from='/scenarios/update' to='/dashboard/scenarios/add' />
          <Presentations path='/presentations' />
          <EditPresentation path='/presentations/add' />
          <EditPresentation path='/presentations/update/:presentationId' />
          <Redirect noThrow from='/scenarios/update' to='/dashboard/scenarios/add' />
          <Sessions path='/sessions' setConfig={setConfig} config={config} />
          <EditSession path='/sessions/add' />
          <EditSession path='/sessions/update/:sessionId' />
          <Redirect noThrow from='/sessions/update' to='/dashboard' />
          <Presentation path='/presentation' config={config} />
          {/* <SeriousGame path='/seriousgame' config={config} /> */}
        </Router>
      )
    }
  }
}
const MyStyledRouter = withStyles(styles)(MyRouter)

class ProtectedRoutes extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      config: {
        _isLoaded: false,
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
    this.getConfig()
  }

  async getConfig () {
    try {
      const authData = await Auth.currentAuthenticatedUser()
      // GraphQL
      const result = await API.graphql(graphqlOperation(gqlGetConfig, { id: authData.username }))
      if (!result.errors) {
        const config = JSON.parse(result.data.getConfig.value)
        this.setState({ config })
        logger.info('protectedRoutes.getConfig::result', result)
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
      if (!result.errors && result.data.getConfig !== null) {
        config = JSON.parse(result.data.getConfig.value)
        gqlMutation = gqlUpdateConfig
        logger.info('protectedRoutes.setConfig::result', result)
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
        } else {
          config.sessionId = null
          config.scenarioId = null
          config.presentationId = null
        }
      }
      // GraphQL query Session
      console.log(config)
      if (config.sessionId !== null) {
        const getSession = await API.graphql(graphqlOperation(gqlGetSession, { id: config.sessionId }))
        if (!getSession.errors && getSession.data.getSession !== null) {
          const session = getSession.data.getSession
          config.scenarioId = session.scenario.id
          config.presentationId = session.presentation.id
          logger.info('protectedRoutes.setConfig::getSession', getSession)
        } else {
          logger.error('protectedRoutes.setConfig::getSession', getSession)
        }
      }
      console.log(config)
      // GraphQL Mutation
      const mutation = await API.graphql(graphqlOperation(gqlMutation, {
        input: {
          id: authData.username,
          value: JSON.stringify(config)
        }
      }))
      if (!mutation.errors) {
        logger.info('protectedRoutes.setConfig::mutation', mutation)
      } else {
        logger.error('protectedRoutes.setConfig::mutation', mutation)
      }
      this.setState({ config })
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
