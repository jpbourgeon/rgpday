import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import CallToAction from '../CallToAction'
import Tile from '../Tile'
import BookStore from './images/bookstore.jpg'
import Coconstruction from './images/coconstruction.jpg'
import Conference from './images/conference.jpg'
import GameBoard from './images/gameboard.jpg'

const styles = theme => {
  return {
    layout: {
      width: 'auto',
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
        width: 1100,
        marginLeft: 'auto',
        marginRight: 'auto'
      }
    },
    mainFeaturedPost: {
      background: `url('${BookStore}') no-repeat`,
      backgroundSize: `100% 100%`,
      color: theme.palette.common.white,
      marginBottom: theme.spacing.unit * 2
    },
    mainFeaturedPostContent: {
      padding: `${theme.spacing.unit * 6}px`,
      paddingBottom: `${theme.spacing.unit * 2}px`,
      [theme.breakpoints.up('md')]: {
        paddingRight: 0
      }
    },
    mainGrid: {
      marginTop: theme.spacing.unit * 3
    },
    avatar: {
      margin: 10,
      width: 100,
      height: 100,
      float: 'left'
    }
  }
}

const HomeComponent = props => {
  const { classes } = props
  return (
    <div className={classes.layout}>
      <main>
        <Paper className={classes.mainFeaturedPost}>
          <Grid container alignItems='center'>
            <Grid item xs={12} md={6}>
              <div className={classes.mainFeaturedPostContent}>
                <Typography variant='h4' color='inherit' gutterBottom>
                    Une journée pour expérimenter le RGPD et en comprendre les enjeux
                </Typography>
                <Typography variant='h5' color='inherit' paragraph>
                  La règlementation sur les données à caractère personnel est une opportunité
                  pour mieux gérer et pour valoriser les données de l'entreprise.
                  <br />Cette journée d'échange est l'occasion de le découvrir...
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <CallToAction xs={10} md={12} />
            </Grid>
          </Grid>
        </Paper>

        <Grid container spacing={40}>

          <Tile
            title='Une conférence'
            description={`Quel bilan pour le RGPD depuis son entrée en vigueur ? Comment l'insérer dans les outils de gestion des documents et des données au sein de l'entreprise ? Cette conférence fait le point sur la mise en oeuvre du RGPD au quotidien.`}
            image={Conference}
          />

          <Tile
            title='Un serious game'
            description={`Pour mettre en pratique de façon ludique les connaissances théoriques et défier les équipes des autres participants !`}
            image={GameBoard}
          />

          <Tile
            title='Une séance de co-constructrion'
            description={`Pour mettre en commun les enseignements de la journée et dégager une vision sur les actions à entreprendre pour tendre vers la conformité.`}
            image={Coconstruction}
          />

        </Grid>

      </main>
    </div>
  )
}

HomeComponent.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(HomeComponent)
