import React from 'react'
import loadable from '@loadable/component'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  '@global': {
    '.grecaptcha-badge': {
      visibility: 'hidden'
    }
  }
})

const AsyncPresentation = loadable(props => import(`../../presentations/${props.presentationId}`))

const Presentation = (props) => {
  const { presentationId } = props.config
  if (presentationId !== null) {
    return (<AsyncPresentation presentationId={presentationId} />)
  } else {
    return null
  }
}

export default withStyles(styles)(Presentation)
