import React from 'react'
import PropTypes from 'prop-types'
import { Link as RouterLink } from '@reach/router'
import Link from '@material-ui/core/Link'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  card: {
    display: 'flex'
  },
  cardDetails: {
    flex: 1
  },
  cardMedia: {
    width: '25%'
  }
})

const LinkTo = props => <RouterLink to={props.to} {...props} />

const Tile = props => {
  const { title: label, description, image, classes, to } = { ...props }
  let title = (!to) ? label : (<Link component={LinkTo} to={to} color='primary'>{label}</Link>)
  return (
    <Grid item xs={12} md={6}>
      <Card className={classes.card}>
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
        <CardMedia
          className={classes.cardMedia}
          title={title}
          image={image}
        />
      </Card>
    </Grid>
  )
}

Tile.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string,
  to: PropTypes.string
}

Tile.defaultProps = {
  description: '',
  to: ''
}

export default withStyles(styles)(Tile)
