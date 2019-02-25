import React from 'react'
import PropTypes from 'prop-types'
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

const Tile = props => {
  const { title, description, image, classes } = { ...props }
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
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Tile)
