import React from 'react'
import loadable from '@loadable/component'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Loading from 'src/components/Loading'
import Link from '@material-ui/core/Link'
import Avatar from '@material-ui/core/Avatar'
import toMaterialStyle from 'material-color-hash'
import stringHash from 'string-hash'
import Button from '@material-ui/core/Button'
import Hidden from '@material-ui/core/Hidden'
import MobileStepper from '@material-ui/core/MobileStepper'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Markdown from 'src/components/Markdown'
import logger from 'src/logger'
import API, { graphqlOperation } from '@aws-amplify/api'
import { createQuizz, updateQuizz } from 'src/graphql/mutations'
import config from 'src/aws-exports'

API.configure(config)

const mutations = { createQuizz, updateQuizz }

const getQuizz = `query GetQuizz($id: ID!) {
  getQuizz(id: $id) {
    id
    answers
  }
}
`

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
    paper: {
      padding: `${theme.spacing.unit * 5}px`
    },
    avatarIcon: {
      float: 'left',
      marginRight: theme.spacing.unit,
      width: 50,
      height: 50
    },
    divider: {
      margin: `${theme.spacing.unit * 3}px 0`
    },
    question: {
      clear: 'both'
    },
    mobileStepper: {
      marginBottom: theme.spacing.unit * 3
    }
  }
}

class Service extends React.Component {
  constructor (props) {
    super(props)
    this._isMounted = false
    this.Interview = null
    this.Quizz = null
    this.interviewRef = React.createRef()
    this.quizzRef = React.createRef()
    this.checkRefsReceivedTimer = null
    this.defaultState = {
      isDisabled: false,
      currentDialog: 0,
      currentQuestion: 0,
      quizz: {
        id: null,
        answers: null
      }
    }
    this.state = this.defaultState
    this.quizzMutation = 'createQuizz'

    this.checkRefsReceived = this.checkRefsReceived.bind(this)
    this.showDialog = this.showDialog.bind(this)
    this.setCurrentQuestion = this.setCurrentQuestion.bind(this)
    this.toggleAnswer = this.toggleAnswer.bind(this)
    this.loadQuizz = this.loadQuizz.bind(this)
    this.saveQuizz = this.saveQuizz.bind(this)
  }

  componentDidMount () {
    this._isMounted = true
    this.setState(this.defaultState)
    const { config, serviceId } = this.props
    // const { config, serviceId, service, navigate } = this.props
    // if (!service) navigate('/dashboard')
    this.Interview = (config.scenarioId && serviceId)
      ? loadable.lib(() => (import(`../../scenarios/${config.scenarioId}/interviews/${serviceId}.js`)))
      : null
    this.Quizz = (config.scenarioId && serviceId)
      ? loadable.lib(() => (import(`../../scenarios/${config.scenarioId}/quizzes/${serviceId}.js`)))
      : null
    if (this._isMounted) this.forceUpdate()
  }

  async componentWillUnmount () {
    if (this._isMounted) await this.saveQuizz()
    this._isMounted = false
    clearTimeout(this.checkRefsReceivedTimer)
  }

  async componentDidUpdate () {
    if (!this.interviewRef.current || !this.quizzRef.current) {
      this.checkRefsReceived()
      return null
    }
    if (!this.state.quizz.answers) {
      let quizz = (this._isMounted) ? await this.loadQuizz() : null
      if (!quizz) {
        quizz = this.defaultState.quizz
        quizz.answers = (this.quizzRef.current)
          ? this.quizzRef.current.quizz.map((item) => {
            return item.answers.map((item) => {
              return false
            })
          })
          : null
      }
      if (this._isMounted) this.setState({ quizz })
    }
  }

  checkRefsReceived () {
    clearTimeout(this.checkRefsReceivedTimer)
    this.checkRefsReceivedTimer = setTimeout(() => {
      if (this._isMounted) this.forceUpdate()
    }, 100)
  }

  async loadQuizz () {
    // GraphQL
    try {
      const { teamId: team, serviceId: service } = this.props
      const result = await API.graphql(
        graphqlOperation(getQuizz, { id: stringHash(JSON.stringify({ team, service })) })
      )
      if (!result.errors && result.data.getQuizz) {
        this.quizzMutation = 'updateQuizz'
        const quizz = result.data.getQuizz
        return { id: quizz.id, answers: JSON.parse(result.data.getQuizz.answers) }
      }
      if (result.errors) {
        this.quizzMutation = 'createQuizz'
        logger.error('loadQuizz', result)
        return this.defaultState.quizz
      }
    } catch (error) {
      this.quizzMutation = 'createQuizz'
      logger.error('loadQuizz', error)
      return this.defaultState.quizz
    }
  }

  async saveQuizz () {
    try {
      const { teamId: team, serviceId: service } = this.props
      const { answers } = this.state.quizz
      if (team && service && answers) {
        const input = {}
        input.id = stringHash(JSON.stringify({ team, service }))
        input.service = service
        input.answers = JSON.stringify(this.state.quizz.answers)
        input.quizzTeamId = team
        // GraphQL
        const result = await API.graphql(
          graphqlOperation(mutations[this.quizzMutation], { input })
        )
        if (result.errors) {
          logger.error('saveQuizz', result)
        }
      }
    } catch (error) {
      logger.error('saveQuizz', error)
    }
  }

  showDialog (id) {
    if (this.interviewRef.current) {
      const interview = this.interviewRef.current.interview
      const currentDialog = interview.findIndex(item => item.id === id)
      if (currentDialog > -1) this.setState({ currentDialog })
    }
  }

  async setCurrentQuestion (id) {
    if (this.quizzRef.current) {
      await this.saveQuizz()
      if (this._isMounted) this.setState({ isDisabled: true })
      const quizz = this.quizzRef.current.quizz
      let currentQuestion
      switch (true) {
        case (id < 0):
          currentQuestion = 0
          break
        case (id > quizz.length):
          currentQuestion = quizz.length
          break
        default:
          currentQuestion = id
          break
      }
      if (this._isMounted) this.setState({ currentQuestion, isDisabled: false })
    }
  }

  toggleAnswer (event, key) {
    event.preventDefault()
    const answers = this.state.quizz.answers
    answers[this.state.currentQuestion][key] = !answers[this.state.currentQuestion][key]
    const quizz = this.state.quizz
    quizz.answers = answers
    this.setState({ quizz })
  }

  render () {
    const { classes, interviewData, serviceId } = this.props
    const Interview = this.Interview
    const Quizz = this.Quizz
    const renderInterview = () => {
      if (this.interviewRef.current) {
        const team = (interviewData) ? interviewData.team : { name: '???', initials: '???' }
        const interview = this.interviewRef.current.interview
        const interviewee = this.interviewRef.current.interviewee
        const intervieweeAvatar = this.interviewRef.current.avatar
        return (
          <Paper className={classes.paper}>
            <Typography variant='h4' color='inherit' gutterBottom>Interview</Typography>
            <Typography variant='h5' color='inherit' gutterBottom component='div'>
              <Avatar
                alt={interviewee}
                src={intervieweeAvatar}
                className={classes.avatarIcon}
              />
              {interviewee}
            </Typography>
            <Typography component='div' variant='body1' gutterBottom>
              <Markdown>{interview[this.state.currentDialog].content}</Markdown>
            </Typography>
            <Divider className={classes.divider} />
            <Typography variant='h5' gutterBottom component='div'>
              <Avatar
                alt={team.name}
                className={classes.avatarIcon}
                style={toMaterialStyle(team.name)}
              >{team.initials}</Avatar>
              Vous :
            </Typography>
            {
              interview[this.state.currentDialog].questions.map((element, key) => (
                <Typography
                  key={stringHash(JSON.stringify([serviceId, element.label]))}
                  variant='body1'
                  gutterBottom
                  component='div'
                  className={(element.target) ? classes.question : null}
                >
                  {
                    (element.target)
                      ? <Link
                        variant='body1'
                        component='button'
                        color='secondary'
                        onClick={() => this.showDialog(element.target)}
                      >
                        <Markdown>{element.label}</Markdown>
                      </Link>
                      : element.label
                  }
                </Typography>
              ))
            }
          </Paper>
        )
      } else {
        return <Loading />
      }
    }
    const renderQuizz = () => {
      if (this.quizzRef.current) {
        const quizz = this.quizzRef.current.quizz
        const currentQuestion = quizz[this.state.currentQuestion]
        const numberOfAnswers = (this.state.quizz.answers)
          ? this.state.quizz.answers.filter((answer) => {
            return answer.filter(field => field).length > 0
          }).length
          : 0
        return (
          <Paper className={classes.paper}>
            <Typography variant='h4' color='inherit' gutterBottom>Quizz</Typography>
            <Typography variant='body1' color='inherit' gutterBottom component='div'>
              {numberOfAnswers} réponses / {quizz.length} questions
            </Typography>
            <MobileStepper
              variant='progress'
              steps={quizz.length}
              position='static'
              activeStep={this.state.currentQuestion}
              backButton={
                <Button
                  size='small'
                  onClick={() => this.setCurrentQuestion(this.state.currentQuestion - 1)}
                  disabled={this.state.currentQuestion <= 0}
                >
                  <KeyboardArrowLeft />
                  <Hidden xsDown>Précédente</Hidden>
                </Button>
              }
              nextButton={
                <Button
                  size='small'
                  onClick={() => this.setCurrentQuestion(this.state.currentQuestion + 1)}
                  disabled={this.state.currentQuestion >= quizz.length - 1}
                >
                  <Hidden xsDown>Suivante</Hidden>
                  <KeyboardArrowRight />
                </Button>
              }
              className={classes.mobileStepper}
            />
            <Typography variant='subtitle1' color='inherit' gutterBottom>
              <Markdown>{currentQuestion.question}</Markdown>
            </Typography>
            <FormControl component='fieldset' disabled={this.state.isDisabled}>
              <FormGroup>
                {currentQuestion.answers.map((answer, key) => {
                  return (
                    <FormControlLabel
                      key={stringHash(JSON.stringify([serviceId, answer.label]))}
                      value={answer.label}
                      control={
                        <Checkbox
                          checked={(this.state.quizz.answers)
                            ? this.state.quizz.answers[this.state.currentQuestion][key]
                            : false
                          }
                          onClick={(event) => this.toggleAnswer(event, key)}
                        />
                      }
                      label={answer.label}
                    />
                  )
                })}
              </FormGroup>
            </FormControl>
            <Divider className={classes.divider} />
            <Typography variant='subtitle1' color='inherit' gutterBottom>
              <Link color='secondary' href='#'>Demander l'avis du cabinet de consultants</Link>
            </Typography>
          </Paper>
        )
      } else {
        return <Loading />
      }
    }
    return (
      <div className={classes.layout}>
        <main>
          {(Interview) ? <Interview ref={this.interviewRef} /> : null}
          {(Quizz) ? <Quizz ref={this.quizzRef} /> : null}
          <Grid container spacing={32}>
            <Grid item xs={12} md={6}>{renderInterview()}</Grid>
            <Grid item xs={12} md={6}>{renderQuizz()}</Grid>
          </Grid>
        </main>
      </div>
    )
  }
}

Service.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Service)
