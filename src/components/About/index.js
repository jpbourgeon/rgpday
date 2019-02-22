import React from 'react'
import PropTypes from 'prop-types'
import { Link as RouterLink } from '@reach/router'
import Link from '@material-ui/core/Link'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Avatar from '@material-ui/core/Avatar'
import Paper from '@material-ui/core/Paper'
import Info from '@material-ui/icons/InfoOutlined'
import AppBar from '../AppBar'
import JPB from './images/avatar.jpg'

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
    avatar: {
      margin: 10,
      width: 100,
      height: 100,
      float: 'left'
    },
    cta: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
      marginTop: theme.spacing.unit * 4,
      marginBottom: theme.spacing.unit * 4,
      textAlign: 'center'
    }
  }
}

const LinkToContact = props => <RouterLink to='/contact' {...props} />

const HomeComponent = props => {
  const { classes } = props
  return (
    <div className={classes.layout}>
      <AppBar />
      <main>

        <Grid container spacing={40}>
          <Grid item xs={12}>
            <Typography variant='h4' gutterBottom>
              <Info style={{ fontSize: '2.5rem', marginBottom: '-0.5rem' }} />&nbsp;À propos
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Avatar alt='Remy Sharp' src={JPB} className={classes.avatar} />
            <Typography variant='body1' gutterBottom>
              En qualité de Responsable du pôle Systèmes d'information, gestion des données et des méthodes au Centre de gestion de la fonction publique territoriale de Saône-et-Loire, <strong>je développe avec mon équipe</strong>, des solutions pour accompagner les collectivités territoriales du département dans la gestion quotidienne de leurs données. Bien sûr, un des premiers services que nous rendons est <strong>la mutualisation du Délégué à la Protection des Données</strong> : nous accompagnons nos adhérents dans leur mise en conformité avec le RGPD.
            </Typography>
            <Typography variant='body1' gutterBottom>
              Cette journée a été conçue pour répondre à un problème <strong>simple et concret</strong>. Une fois renseigné et formé aux concepts de la protection des données à caractère personnel, <strong>par où doit-on commencer la mise en conformité</strong> ? Comment cette démarche est-elle liée aux autres outils de gestion de l'information dans l'entreprise ?
            </Typography>
            <Typography variant='body1' gutterBottom>
              Le <strong>RGPDay</strong> s'adresse à <strong>tous les organismes de formation</strong>, initiale ou continue, dans le domaine de la gestion de l'information, qui souhaitent proposer <strong>une expérience du RGPD pratique et ludique</strong> à leurs étudiants, dans le prolongement de leur formation théorique.
            </Typography>
            <Grid container spacing={40} alignItems='center' direction='column'>
              <Grid item xs={12} md={6}>
                <Paper className={classes.cta} elevation={1}>
                  <Typography variant='h6'>
                Si ce format vous intéresse, <Link component={LinkToContact} color='secondary'>contactez-moi</Link>
                  </Typography>
                  <Typography variant='body1'>
                pour organiser le RGPDay dans votre établissement !
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
            <Typography variant='body1' gutterBottom>
              --<br />
              Jean-Philippe Bourgeon<br />
              LinkedIn : <Link href='https://www.linkedin.com/in/jpbourgeon'>https://www.linkedin.com/in/jpbourgeon</Link>
            </Typography>
          </Grid>
        </Grid>
      </main>
    </div>
  )
}

HomeComponent.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(HomeComponent)