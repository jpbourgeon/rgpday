import React from 'react'
import loadable from '@loadable/component'
import pMinDelay from 'p-min-delay'
import Loading from '../LoadingWithAppBar'
import Default from '../Default'

const debug = require('debug')('rgpday.com')

class ErrorBoundary extends React.Component {
  constructor (props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError () {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch (error, info) {
    // You can also log the error to an error reporting service
    debug(error, info)
  }

  render () {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <Default />
    }
    return this.props.children
  }
}

const Loadable = (props) => {
  const { component, prefetch } = props
  let AsyncComponent
  if (prefetch) {
    AsyncComponent = loadable(() => pMinDelay(import(/* webpackPrefetch: true */ `../../${component}`), 200),
      { fallback: <Loading /> })
  } else {
    AsyncComponent = loadable(() => pMinDelay(import(`../../${component}`), 200),
      { fallback: <Loading /> })
  }
  return (
    <ErrorBoundary>
      <AsyncComponent />
    </ErrorBoundary>
  )
}

export default Loadable
