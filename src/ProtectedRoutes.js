import React from 'react'
import { Router } from '@reach/router'
import Loadable from 'react-loadable'
import Loading from './components/LoadingWithAppBar'

const LoadableDefault = Loadable({
  loader: () => import('./components/Default'),
  loading: Loading
})

const LoadableDashboard = Loadable({
  loader: () => import('./components/Dashboard'),
  loading: Loading
})

const ProtectedRoutes = () => (
  <React.Fragment>

    <Router>
      <LoadableDefault default />
      <LoadableDashboard path='/' />
    </Router>

  </React.Fragment>
)

export default ProtectedRoutes
