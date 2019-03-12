import React from 'react'
import PropTypes from 'prop-types'
import Link from '../Link'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import classnames from 'classnames'

const styles = theme => ({
  card: {
    display: 'flex',
    height: '100%'
  },
  cardDetails: {
    flex: 1
  },
  cardMedia: {
    width: '25%'
  },
  isActive: {
    background: theme.palette.primary.light
  }
})

const Tile = props => {
  const { title: label, description, image, classes, to, isActive } = { ...props }
  let title = (!to) ? label : (<Link to={to} color='primary'>{label}</Link>)
  return (
    <Grid item xs={12} md={6}>
      <Card className={classnames([
        classes.card,
        (!isActive) ? null : classes.isActive
      ])}>
        <div className={classes.cardDetails}>
          <CardContent>
            <Typography variant='h5'>
              {title}
            </Typography>
            <Typography variant='subtitle1' paragraph>
              {description}
            </Typography>
          </CardContent>
        </div>
        {(image === '') ? null : (
          <CardMedia
            className={classes.cardMedia}
            title={title}
            image={image}
          />
        )}
      </Card>
    </Grid>
  )
}

Tile.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.node.isRequired,
  image: PropTypes.string,
  description: PropTypes.node,
  isActive: PropTypes.bool,
  to: PropTypes.string,
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  xl: PropTypes.number
}

Tile.defaultProps = {
  description: '',
  to: '',
  image: '',
  isActive: false,
  xs: 12,
  sm: 12,
  md: 6,
  lg: 6,
  xl: 6
}

export default withStyles(styles)(Tile)
