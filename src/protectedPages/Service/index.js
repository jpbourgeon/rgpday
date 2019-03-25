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
    }
  }
}

class Service extends React.Component {
  constructor (props) {
    super(props)
    this._isMounted = false
    this.Interview = null
    this.interviewRef = React.createRef()
    this.checkRefsReceivedTimer = null
    this.defaultState = {
      currentDialog: 0
    }
    this.state = this.defaultState

    this.checkRefsReceived = this.checkRefsReceived.bind(this)
    this.showDialog = this.showDialog.bind(this)
  }

  componentDidMount () {
    this._isMounted = true
    const { config, serviceId } = this.props
    // const { config, serviceId, service, navigate } = this.props
    // if (!service) navigate('/dashboard')
    this.Interview = (config.scenarioId && serviceId)
      ? loadable.lib(() => (import(`../../scenarios/${config.scenarioId}/interviews/${serviceId}.js`)))
      : null
    if (this._isMounted) this.forceUpdate()
  }

  componentWillUnmount () {
    this._isMounted = false
    clearTimeout(this.checkRefsReceivedTimer)
  }

  componentDidUpdate () {
    if (!this.interviewRef.current) {
      this.checkRefsReceived()
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

  render () {
    const { classes, interviewData } = this.props
    const Interview = this.Interview
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
                  key={key}
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
    const quizz = null
    const renderQuizz = () => {
      // if (quizz) {
      return (
        <Paper className={classes.paper}>
          <Typography variant='h5' color='inherit' gutterBottom>Quizz</Typography>
          <Typography variant='body1' gutterBottom component='div'><pre>{JSON.stringify(quizz)}</pre></Typography>
        </Paper>
      )
      // } else {
      // return <Loading />
      // }
    }
    return (
      <div className={classes.layout}>
        <main>
          {(Interview) ? <Interview ref={this.interviewRef} /> : null}
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
