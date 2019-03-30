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
      currentDialog: 0,
      currentQuestion: 0,
      answers: null
    }
    this.state = this.defaultState

    this.checkRefsReceived = this.checkRefsReceived.bind(this)
    this.showDialog = this.showDialog.bind(this)
    this.setCurrentQuestion = this.setCurrentQuestion.bind(this)
    this.toggleAnswer = this.toggleAnswer.bind(this)
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

  componentWillUnmount () {
    this._isMounted = false
    clearTimeout(this.checkRefsReceivedTimer)
  }

  componentDidUpdate () {
    if (!this.interviewRef.current || !this.quizzRef.current) {
      this.checkRefsReceived()
      return null
    }
    if (!this.state.answers) {
      const answers = (this.quizzRef.current)
        ? this.quizzRef.current.quizz.map((item) => {
          return item.answers.map((item) => {
            return { isChecked: false }
          })
        })
        : null
      this.setState({ answers })
    }
  }

  checkRefsReceived () {
    clearTimeout(this.checkRefsReceivedTimer)
    this.checkRefsReceivedTimer = setTimeout(() => {
      if (this._isMounted) this.forceUpdate()
    }, 100)
  }

  showDialog (id) {
    if (this.interviewRef.current) {
      const interview = this.interviewRef.current.interview
      const currentDialog = interview.findIndex(item => item.id === id)
      if (currentDialog > -1) this.setState({ currentDialog })
    }
  }

  setCurrentQuestion (id) {
    if (this.quizzRef.current) {
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
      this.setState({ currentQuestion })
    }
  }

  toggleAnswer (event, key) {
    event.preventDefault()
    const answers = this.state.answers
    answers[this.state.currentQuestion][key].isChecked = !answers[this.state.currentQuestion][key].isChecked
    this.setState(answers)
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
        const numberOfAnswers = (this.state.answers)
          ? this.state.answers.filter((answer) => {
            return answer.filter((item) => item.isChecked).length > 0
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
            <FormControl component='fieldset'>
              <FormGroup>
                {currentQuestion.answers.map((answer, key) => {
                  return (
                    <FormControlLabel
                      key={stringHash(JSON.stringify([serviceId, answer.label]))}
                      value={answer.label}
                      control={
                        <Checkbox
                          checked={(this.state.answers)
                            ? this.state.answers[this.state.currentQuestion][key].isChecked
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
