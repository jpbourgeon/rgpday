import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Router } from '@reach/router'
import SignIn from './components/SignIn'
import Loadable from './components/Loadable'

import Auth from '@aws-amplify/auth'
import { Authenticator } from 'aws-amplify-react'
import config from './aws-exports'

Auth.configure(config)

const Default = () => (<Loadable component='components/Default' />)
const Dashboard = () => (<Loadable component='components/Dashboard' />)

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
