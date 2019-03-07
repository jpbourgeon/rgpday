import React from 'react'
import logger from '../../logger'
import loadable from '@loadable/component'
import Loading from '../Loading'
import Default from '../Default'

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
    if (error) logger.error('componentDidCatch', error)
    if (info) logger.info('componentDidCatch', info)
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
    AsyncComponent = loadable(() => import(/* webpackPrefetch: true */ `../../${component}`),
      { fallback: <Loading /> })
  } else {
    AsyncComponent = loadable(() => import(`../../${component}`),
      { fallback: <Loading /> })
  }
  return (
    <ErrorBoundary>
      <AsyncComponent />
    </ErrorBoundary>
  )
}

export default Loadable
