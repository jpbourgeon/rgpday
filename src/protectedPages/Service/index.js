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
import Check from '@material-ui/icons/CheckCircle'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Markdown from 'src/components/Markdown'
import logger from 'src/logger'
import API, { graphqlOperation } from '@aws-amplify/api'
import { createQuiz, updateQuiz } from 'src/graphql/mutations'
import config from 'src/aws-exports'
import isEqual from 'react-fast-compare'

API.configure(config)

const mutations = { createQuiz, updateQuiz }

const getQuiz = `query GetQuiz($id: ID!) {
  getQuiz(id: $id) {
    id
    answers
    numberOfJokers
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
    },
    joker: {
      width: '100%',
      textAlign: 'center',
      paddingBottom: theme.spacing.unit * 2
    },
    hide: {
      display: 'none'
    },
    incorrect: {
      textDecoration: 'line-through'
    },
    check: {
      marginLeft: theme.spacing.unit,
      marginBottom: `-${theme.spacing.unit * 0.5}px`,
      width: theme.spacing.unit * 2,
      height: theme.spacing.unit * 2
    }
  }
}

class Service extends React.Component {
  constructor (props) {
    super(props)
    this._isMounted = false
    this.Interview = null
    this.Quiz = null
    this.interviewRef = React.createRef()
    this.quizRef = React.createRef()
    this.checkRefsReceivedTimer = null
    this.defaultState = {
      isDisabled: false,
      currentDialog: 0,
      currentQuestion: 0,
      quiz: {
        id: null,
        answers: null,
        numberOfJokers: 0
      }
    }
    this.state = this.defaultState
    this.quizMutation = 'createQuiz'

    this.checkRefsReceived = this.checkRefsReceived.bind(this)
    this.showDialog = this.showDialog.bind(this)
    this.setCurrentQuestion = this.setCurrentQuestion.bind(this)
    this.toggleAnswer = this.toggleAnswer.bind(this)
    this.loadQuiz = this.loadQuiz.bind(this)
    this.saveQuiz = this.saveQuiz.bind(this)
    this.buyAJoker = this.buyAJoker.bind(this)
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
    this.Quiz = (config.scenarioId && serviceId)
      ? loadable.lib(() => (import(`../../scenarios/${config.scenarioId}/quizzes/${serviceId}.js`)))
      : null
    if (this._isMounted) this.forceUpdate()
  }

  async componentWillUnmount () {
    await this.saveQuiz()
    this._isMounted = false
    clearTimeout(this.checkRefsReceivedTimer)
  }

  async componentDidUpdate (prevProps) {
    if (!this.interviewRef.current || !this.quizRef.current) {
      this.checkRefsReceived()
      return null
    }
    if (!isEqual(this.props.config, prevProps.config)) this.forceUpdate()
    if (!this.state.quiz.answers) {
      let quiz = (this._isMounted) ? await this.loadQuiz() : null
      if (!quiz) quiz = this.defaultState.quiz
      if (!quiz.answers) {
        quiz.answers = (this.quizRef.current)
          ? this.quizRef.current.quiz.map((item) => {
            return item.answers.map((item) => {
              return false
            })
          })
          : null
      }
      if (this._isMounted) this.setState({ quiz })
    }
  }

  checkRefsReceived () {
    clearTimeout(this.checkRefsReceivedTimer)
    this.checkRefsReceivedTimer = setTimeout(() => {
      if (this._isMounted) this.forceUpdate()
    }, 100)
  }

  async loadQuiz () {
    // GraphQL
    try {
      const { teamId: team, serviceId: service } = this.props
      const result = await API.graphql(
        graphqlOperation(getQuiz, { id: stringHash(JSON.stringify({ team, service })) })
      )
      if (!result.errors && result.data.getQuiz) {
        this.quizMutation = 'updateQuiz'
        const quiz = result.data.getQuiz
        return {
          id: quiz.id,
          answers: JSON.parse(result.data.getQuiz.answers),
          numberOfJokers: quiz.numberOfJokers
        }
      }
      if (result.errors) {
        this.quizMutation = 'createQuiz'
        logger.error('loadQuiz', result)
        return this.defaultState.quiz
      }
    } catch (error) {
      this.quizMutation = 'createQuiz'
      logger.error('loadQuiz', error)
      return this.defaultState.quiz
    }
  }

  async saveQuiz () {
    try {
      const { teamId: team, serviceId: service } = this.props
      const { answers, numberOfJokers } = this.state.quiz
      if (team && service && answers) {
        const input = {}
        input.id = stringHash(JSON.stringify({ team, service }))
        input.service = service
        input.answers = JSON.stringify(answers)
        input.numberOfJokers = numberOfJokers
        input.quizTeamId = team
        // GraphQL
        const result = await API.graphql(
          graphqlOperation(mutations[this.quizMutation], { input })
        )
        if (result.errors) {
          logger.error('saveQuiz', result)
        }
      }
    } catch (error) {
      logger.error('saveQuiz', error)
    }
  }

  async buyAJoker (event) {
    event.preventDefault()
    try {
      const quiz = this.state.quiz
      quiz.numberOfJokers = quiz.numberOfJokers + 1
      await this.saveQuiz()
      if (this._isMounted) this.setState({ quiz })
    } catch (error) {
      logger.error('saveQuiz', error)
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
    if (this.quizRef.current) {
      await this.saveQuiz()
      if (this._isMounted) this.setState({ isDisabled: true })
      const quiz = this.quizRef.current.quiz
      let currentQuestion
      switch (true) {
        case (id < 0):
          currentQuestion = 0
          break
        case (id > quiz.length):
          currentQuestion = quiz.length
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
    const answers = this.state.quiz.answers
    answers[this.state.currentQuestion][key] = !answers[this.state.currentQuestion][key]
    const quiz = this.state.quiz
    quiz.answers = answers
    this.setState({ quiz })
  }

  render () {
    const { classes, interviewData, serviceId } = this.props
    const { gameOver } = this.props.config
    const Interview = this.Interview
    const Quiz = this.Quiz
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
              {team.name}
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
    const renderQuiz = () => {
      if (this.quizRef.current) {
        const quiz = this.quizRef.current.quiz
        const consultantAvatar = this.quizRef.current.consultantAvatar
        const currentQuestion = quiz[this.state.currentQuestion]
        const disabled = (this.state.isDisabled || gameOver)
        const numberOfAnswers = (this.state.quiz.answers)
          ? this.state.quiz.answers.filter((answer) => {
            return answer.filter(field => field).length > 0
          }).length
          : 0
        const hints = quiz[this.state.currentQuestion].hints.filter(
          hint => {
            return hint.jokerNumber <= this.state.quiz.numberOfJokers
          }
        )
        return (
          <Paper className={classes.paper}>
            <Typography variant='h4' color='inherit' gutterBottom>Quiz</Typography>
            <Typography variant='body1' color='inherit' gutterBottom component='div'>
              {numberOfAnswers} réponses / {quiz.length} questions
            </Typography>
            <MobileStepper
              variant='progress'
              steps={quiz.length}
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
                  disabled={this.state.currentQuestion >= quiz.length - 1}
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
            <FormControl component='fieldset'>
              <FormGroup>
                {currentQuestion.answers.map((answer, key) => {
                  return (
                    <FormControlLabel
                      key={stringHash(JSON.stringify([serviceId, answer.label]))}
                      value={answer.label}
                      control={
                        <Checkbox
                          checked={(this.state.quiz.answers)
                            ? this.state.quiz.answers[this.state.currentQuestion][key]
                            : false
                          }
                          onClick={(event) => this.toggleAnswer(event, key)}
                          disabled={disabled || (quiz[this.state.currentQuestion].answers[key].jokerNumber <= this.state.quiz.numberOfJokers && !this.state.quiz.answers[this.state.currentQuestion][key])}
                        />
                      }
                      label={<span
                        className={(quiz[this.state.currentQuestion].answers[key].jokerNumber <= this.state.quiz.numberOfJokers) ? classes.incorrect : null}
                      >
                        <Markdown>{answer.label}</Markdown>
                        {(gameOver && quiz[this.state.currentQuestion].answers[key].isCorrect)
                          ? <Check color='secondary' className={classes.check} />
                          : null
                        }
                      </span>}
                    />
                  )
                })}
              </FormGroup>
            </FormControl>
            <Divider className={(quiz[this.state.currentQuestion].maxJokers > 0 ||
              (quiz[this.state.currentQuestion].maxJokers > this.state.quiz.numberOfJokers && !gameOver))
              ? classes.divider
              : classes.hide
            } />
            <Typography variant='subtitle1' color='inherit' gutterBottom component='div'>
              <Link
                color='secondary'
                component='button'
                onClick={(e) => this.buyAJoker(e)}
                className={(quiz[this.state.currentQuestion].maxJokers > this.state.quiz.numberOfJokers && !gameOver)
                  ? classes.joker
                  : classes.hide
                }
              >
                Demander l'avis du cabinet de consultants
              </Link>
            </Typography>
            <Typography
              variant='h5'
              color='inherit'
              gutterBottom
              component='div'
              className={(hints.length <= 0) ? classes.hide : null}
            >
              <Avatar
                alt='Consultant'
                src={consultantAvatar}
                className={classes.avatarIcon}
              />
              Emilie J. - RGPDay consulting
            </Typography>
            {
              hints.map((element, key) => (
                <Typography
                  key={stringHash(JSON.stringify([element, key]))}
                  variant='body1'
                  gutterBottom
                  component='div'
                  className={classes.question}
                >
                  <Markdown>{element.label}</Markdown>
                </Typography>
              ))
            }
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
          {(Quiz) ? <Quiz ref={this.quizRef} /> : null}
          <Grid container spacing={32}>
            <Grid item xs={12} md={6}>{renderInterview()}</Grid>
            <Grid item xs={12} md={6}>{renderQuiz()}</Grid>
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
