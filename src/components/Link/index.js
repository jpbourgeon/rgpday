import React from 'react'
import { Link as RouterLink } from '@reach/router'
import MUILink from '@material-ui/core/Link'

const myLink = props => <RouterLink to={props.to} {...props} />

const Link = (props) => (
  <MUILink component={myLink} to={props.to} {...props}>{props.children}</MUILink>
)

export default Link
