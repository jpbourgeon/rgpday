import React from 'react'
import PropTypes from 'prop-types'
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import toMaterialStyle from 'material-color-hash'
import Paper from '@material-ui/core/Paper'
import MUIDataTable from 'mui-datatables'
import Grid from '@material-ui/core/Grid'
import logger from 'src/logger'
import Loading from 'src/components/Loading'
import isEqual from 'react-fast-compare'
import API, { graphqlOperation } from '@aws-amplify/api'
import PubSub from '@aws-amplify/pubsub'
// import Auth from '@aws-amplify/auth'
import config from 'src/aws-exports'

// Auth.configure(config)
PubSub.configure(config)
API.configure(config)

const getSession = `query GetSession($id: ID!) {
  getSession(id: $id) {
    id
    teams {
      items {
        id
        name
        initials
        numberOfInterviews
        quizzes {
          items {
            id
            service
            answers
            numberOfJokers
          }
          nextToken
        }
      }
      nextToken
    }
  }
}
`

const watchChanges = `subscription watchChanges {
  onCreateSession { id }
  onUpdateSession { id }
  onDeleteSession { id }
  onCreateTeam { id }
  onUpdateTeam { id }
  onDeleteTeam { id }
  onCreateQuiz { id }
  onUpdateQuiz { id }
  onDeleteQuiz { id }
}
`

const scoreTheQuizzes = (team, gameScoringData) => {
  const { quizzes: { items: quizzes } } = team
  const { quizzesCorrectAnswers: correctAnswers } = gameScoringData
  const value = quizzes.reduce((result, quiz) => {
    const answers = JSON.parse(quiz.answers)
    const correction = correctAnswers[quiz.service]
    if (!answers || !correction) {
      return result
    } else {
      const score = answers.reduce((result, answer, index) => {
        return (isEqual(answer, correction[index])) ? result + 1 : result
      }, 0)
      return result + score
    }
  }, 0)
  const numberOfQuestions = Object.entries(correctAnswers).reduce((result, quiz) => (result + quiz[1].length), 0)
  const score = value / numberOfQuestions
  return { score, value, numberOfQuestions }
}

const scoreTheCosts = (team, gameScoringData, coeff) => {
  const numberOfInterviews = team.numberOfInterviews || 0
  const numberOfJokers = team.quizzes.items.reduce((result, quiz) => {
    const count = JSON.parse(quiz.numberOfJokers).reduce((result, nb) => (result + nb))
    return result + count
  }, 0)
  const value = ((numberOfInterviews * gameScoringData.interviewLength * gameScoringData.DPODailyCost) +
      (numberOfJokers * gameScoringData.consultationLength * gameScoringData.consultantDailyCost))
  const score = (coeff)
    ? (1 - Math.min(1, value / gameScoringData.consultantQuotation)) * coeff
    : 0
  return { score, value, numberOfJokers }
}

const scoreTheDuration = (team, gameScoringData, coeff) => {
  const numberOfInterviews = team.numberOfInterviews || 0
  const numberOfJokers = team.quizzes.items.reduce((result, quiz) => {
    const count = JSON.parse(quiz.numberOfJokers).reduce((result, nb) => (result + nb))
    return result + count
  }, 0)
  const value = ((numberOfInterviews * gameScoringData.interviewLength) +
    (numberOfJokers * gameScoringData.consultationLength))
  const score = (coeff)
    ? (1 - Math.min(1, value / gameScoringData.consultantEstimatedDuration)) * coeff
    : 0
  return { score, value }
}

const styles = theme => {
  return {
    '@global': {
      '.grecaptcha-badge': {
        visibility: 'hidden !important'
      }
    },
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
    avatarIcon: {
      marginBottom: theme.spacing.unit,
      width: 40,
      height: 40,
      fontSize: theme.typography.h6.fontSize
    }
  }
}

class Score extends React.Component {
  constructor (props) {
    super(props)
    this._isMounted = false
    this.defaultState = { scores: null }
    this.state = this.defaultState
    this.subscription = null
    this.loadScores = this.loadScores.bind(this)
    this.getMuiTheme = this.getMuiTheme.bind(this)
  }

  async componentDidMount () {
    this._isMounted = true
    try {
      if (this.props.config.sessionId) {
        this.loadScores()
        this.subscription = await API.graphql(graphqlOperation(watchChanges))
          .subscribe({
            next: this.loadScores
          })
      }
    } catch (error) {
      logger.error('componentDidMount', error)
    }
  }

  async componentWillUnmount () {
    if (this.subscription) this.subscription.unsubscribe()
    this._isMounted = false
  }

  async loadScores () {
    const { classes } = this.props
    const gameScoringData = this.props.gameScoringData
    const data = await this.loadSession()
    try {
      if (data && gameScoringData) {
        const scores = data.teams.items.map((team) => {
          const avatar = (
            <Avatar alt={team.name} className={classes.avatarIcon} style={toMaterialStyle(team.name)}>
              {team.initials}
            </Avatar>
          )
          const quality = scoreTheQuizzes(team, gameScoringData)
          const cost = scoreTheCosts(team, gameScoringData, quality.score)
          const duration = scoreTheDuration(team, gameScoringData, quality.score)
          const average = (quality.score + cost.score + duration.score) / 3 || 0
          return ([
            avatar,
            team.numberOfInterviews,
            cost.numberOfJokers,
            team.name,
            `${cost.value.toFixed(2)} €`,
            `${duration.value} jour(s)`,
            `${quality.value}/${quality.numberOfQuestions} réponse(s)`,
            `${(average * 100).toFixed(2)}/100`
          ])
        })
        if (this._isMounted) this.setState({ scores })
      }
    } catch (error) {
      logger.error('loadScores', error)
    }
  }

  async loadSession () {
    // GraphQL
    try {
      const { sessionId } = this.props.config
      if (sessionId) {
        const result = await API.graphql(
          graphqlOperation(getSession, { id: sessionId })
        )
        if (!result.errors && result.data.getSession) {
          return result.data.getSession
        }
        if (result.errors) {
          logger.error('loadSession', result)
          return {}
        }
      }
    } catch (error) {
      logger.error('loadSession', error)
      return {}
    }
  }
  getMuiTheme () {
    const { theme } = this.props
    return createMuiTheme({
      typography: {
        useNextVariants: true
      },
      overrides: {
        MUIDataTableHeadCell: {
          root: {
            fontSize: theme.typography.body1.fontSize
          }
        },
        MUIDataTableBodyCell: {
          root: {
            fontSize: theme.typography.body1.fontSize
          }
        },
        MUIDataTableToolbar: {
          root: {
            paddingTop: theme.spacing.unit * 5
          },
          titleText: {
            fontSize: theme.typography.h4.fontSize
          }
        }
      }
    })
  }

  render () {
    const { classes, config } = this.props
    const options = {
      selectableRows: false,
      elevation: 4,
      responsive: 'scroll',
      rowsPerPage: 20,
      rowsPerPageOptions: [10, 20, 30],
      print: false,
      download: false,
      filter: false,
      textLabels: {
        body: {
          noMatch: `Désolé, aucune enregistrement correspondant n'a été trouvé`,
          toolTip: 'Trier'
        },
        pagination: {
          next: 'Page suivante',
          previous: 'Page précédentes',
          rowsPerPage: 'Lignes par page :',
          displayRows: '/'
        },
        toolbar: {
          search: 'Chercher',
          viewColumns: 'Afficher les colonnes',
          filterTable: 'Filtrer le tableau'
        },
        filter: {
          all: 'Tout',
          title: 'FILTRES',
          reset: 'REINITIALISER'
        },
        viewColumns: {
          title: 'Afficher les colonnes',
          titleAria: 'Afficher/masquer les colonnes de tableau'
        },
        selectedRows: {
          text: 'Ligne(s) sélectionnée(s)',
          delete: 'Effacer',
          deleteAria: 'Effacer les lignes sélectionnées'
        }
      }
    }
    const renderTeam = (value, tableMeta) => {
      const avatar = tableMeta.rowData[0]
      const numberOfInterviews = tableMeta.rowData[1]
      const numberOfJokers = tableMeta.rowData[2]
      return (
        <Grid container>
          <Grid item xs={12} md={3}>{avatar}</Grid>
          <Grid item xs={12} md={9}>
            <strong>{value}</strong><br />
            {numberOfInterviews} interview(s)<br />
            {numberOfJokers} joker(s)
          </Grid>
        </Grid>
      )
    }

    const columns = [
      { label: 'Avatar', options: { display: 'excluded', sort: false, searchable: false } },
      { label: 'Nombre d\'interviews', options: { display: 'excluded', sort: false, searchable: false } },
      { label: 'Nombre de consultations', options: { display: 'excluded', sort: false, searchable: false } },
      { label: 'Équipe', options: { sort: true, searchable: true, customBodyRender: renderTeam } },
      { label: 'Coût', options: { sort: true, searchable: false } },
      { label: 'Délai', options: { sort: true, searchable: false } },
      { label: 'Qualité', options: { sort: true, searchable: false } },
      { label: 'Score', options: { sort: true, sortDirection: 'desc', searchable: false } }
    ]

    const title = (config.gameOver) ? `Scores (la partie est terminée)` : 'Scores'

    // Filter the admin team from the presented results
    const data = (this.state.scores)
      ? this.state.scores.filter((value) => (value[3].toLowerCase() !== 'admin'))
      : []

    return (
      <div className={classes.layout}>
        <main>
          <Grid container spacing={32}>
            <Grid item xs={12}>
              {
                (this.state.scores)
                  ? (
                    <MuiThemeProvider theme={this.getMuiTheme()}>
                      <MUIDataTable
                        title={title}
                        options={options}
                        columns={columns}
                        data={data}
                      />
                    </MuiThemeProvider>
                  )
                  : <Paper><Loading /></Paper>
              }
            </Grid>
          </Grid>
        </main>
      </div>
    )
  }
}

Score.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(Score)
