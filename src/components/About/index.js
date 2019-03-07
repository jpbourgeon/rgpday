import React from 'react'
import PropTypes from 'prop-types'
import Link from '@material-ui/core/Link'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Avatar from '@material-ui/core/Avatar'
import Info from '@material-ui/icons/InfoOutlined'
import CallToAction from '../CallToAction'
import JPB from './images/avatar.jpg'

const styles = theme => ({
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
  paper: {
    backgroundSize: `100% 100%`,
    marginBottom: theme.spacing.unit * 4,
    padding: theme.spacing.unit * 4,
    textAlign: 'justify'
  },
  title: {
    marginBottom: theme.spacing.unit * 3,
    order: 0
  },
  titleIcon: {
    fontSize: '2.5rem',
    marginBottom: '-0.5rem'
  },
  avatar: {
    order: 1,
    minHeight: `${110 + (theme.spacing.unit * 6)}px`,
    [theme.breakpoints.down('sm')]: {
      marginBottom: `-${theme.spacing.unit * 4}px`
    }
  },
  avatarIcon: {
    width: 110,
    height: 110,
    margin: 'auto'
  },
  post: {
    paddingBottom: theme.spacing.unit * 6,
    order: 2,
    [theme.breakpoints.down('sm')]: {
      order: 3
    }
  },
  cta: {
    order: 3,
    [theme.breakpoints.down('sm')]: {
      order: 2,
      marginBottom: `-${theme.spacing.unit * 4}px`
    }
  }
})

const About = props => {
  const { classes } = props
  return (
    <div className={classes.layout}>
      <main>
        <Paper className={classes.paper}>
          <Grid container className={classes.container}>
            <Grid item xs={12} className={classes.title}>
              <Typography variant='h4' gutterBottom>
                <Info className={classes.titleIcon} />&nbsp;À propos
              </Typography>
              <Divider />
            </Grid>
            <Grid item xs={12} sm={4} md={2} className={classes.avatar}>
              <Avatar alt='Jean-Philippe Bourgeon' src={JPB} className={classes.avatarIcon} />
            </Grid>
            <Grid item xs={12} sm={12} md={6} className={classes.post}>
              <Typography variant='body1' gutterBottom>
                En qualité de <strong>Responsable du pôle Systèmes d'information</strong>, gestion des données et des méthodes au Centre de gestion de la fonction publique territoriale de Saône-et-Loire, <strong>je développe avec mon équipe</strong>, des solutions pour accompagner les collectivités territoriales du département dans la gestion quotidienne de leurs données. Bien sûr, un des premiers services que nous rendons est <strong>la mutualisation du Délégué à la Protection des Données</strong> : nous accompagnons nos adhérents dans leur mise en conformité avec le RGPD.
              </Typography>
              <Typography variant='body1' gutterBottom>
                Cette journée a été conçue pour répondre à un problème <strong>simple et concret</strong>. Une fois renseigné et formé aux concepts de la protection des données à caractère personnel, <strong>par où doit-on commencer la mise en conformité</strong> ? Comment cette démarche est-elle liée aux autres outils de gestion de l'information dans l'entreprise ?
              </Typography>
              <Typography variant='body1' gutterBottom>
                Le <strong>RGPDay</strong> s'adresse à <strong>tous les organismes de formation</strong>, initiale ou continue, dans le domaine de la gestion de l'information, qui souhaitent proposer <strong>une expérience du RGPD pratique et ludique</strong> à leurs étudiants, dans le prolongement de leur formation théorique.
              </Typography>
              <Typography variant='body1' gutterBottom>
                --<br />
                Jean-Philippe Bourgeon<br />
                <Link href='https://www.linkedin.com/in/jpbourgeon'>Profil LinkedIn</Link>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={4} className={classes.cta}>
              <CallToAction xs={12} sm={10} md={10} />
            </Grid>
          </Grid>
        </Paper>
      </main>
    </div>
  )
}

About.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(About)
