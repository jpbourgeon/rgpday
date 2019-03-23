import React from 'react'
import loadable from '@loadable/component'
import { Redirect } from '@reach/router'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  '@global': {
    '.grecaptcha-badge': {
      display: 'none'
    }
  }
})

const AsyncPresentation = loadable(props => (import(`../../presentations/${props.presentationId}`)))

const PresentationPage = (props) => {
  const { location, config } = props
  if (config && config.presentationId) {
    return (
      <AsyncPresentation presentationId={config.presentationId} target={location.hash} />
    )
  } else {
    return (<Redirect to='/dashboard' noThrow />)
  }
}

export default withStyles(styles)(PresentationPage)
