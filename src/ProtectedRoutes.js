import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Router, Redirect } from '@reach/router'
import SignIn from 'src/components/SignIn'
import Loadable from 'src/components/Loadable'

import Auth from '@aws-amplify/auth'
import { Authenticator } from 'aws-amplify-react'
import config from 'src/aws-exports'
Auth.configure(config)

const Default = () => (<Loadable path='pages/Default' />)
const Dashboard = () => (<Loadable path='protectedPages/Dashboard' />)
const Sessions = () => (<Loadable path='protectedPages/Sessions' />)
const Scenarios = () => (<Loadable path='protectedPages/Scenarios' />)
const EditScenario = () => (<Loadable path='protectedPages/EditScenario' />)
const EditSession = () => (<Loadable path='protectedPages/EditSession' />)

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
    const { authState } = this.props
    if (!this._validAuthStates.includes(authState)) {
      this._isHidden = true
      return null
    } else {
      this._isHidden = false
      return (
        <Router>
          <Default default />
          <Dashboard path='/' />
          <Sessions path='/sessions' />
          <Scenarios path='/scenarios' />
          <EditScenario path='/scenarios/add' />
          <EditScenario path='/scenarios/update/:scenarioId' />
          <Redirect noThrow from='/scenarios/update' to='/dashboard/scenarios/add' />
          <EditSession path='/sessions/add' />
          <EditSession path='/sessions/update/:sessionId' />
          <Redirect noThrow from='/sessions/update' to='/dashboard/sessions/add' />
        </Router>
      )
    }
  }
}
const MyStyledRouter = withStyles(styles)(MyRouter)

const ProtectedRoutes = () => (
  <React.Fragment>
    <Authenticator
      hideDefault
    >
      <SignIn />
      <MyStyledRouter />
    </Authenticator>
  </React.Fragment>
)

export default ProtectedRoutes
