import React from 'react'
import loadable from '@loadable/component'
import { navigate } from '@reach/router'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  '@global': {
    '.grecaptcha-badge': {
      display: 'none'
    }
  }
})

const AsyncPresentation = loadable(props => (import(`../../presentations/${props.presentationId}`)))

const Presentation = (props) => {
  const { location, config } = props
  if (config && config.presentationId) {
    return (<AsyncPresentation presentationId={config.presentationId} target={location.hash} />)
  } else {
    navigate('/dashboard')
    return null
  }
}

export default withStyles(styles)(Presentation)
