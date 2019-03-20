import React from 'react'
import loadable from '@loadable/component'
import PropTypes from 'prop-types'
import { withStyles, withTheme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Loading from 'src/components/Loading'

const styles = theme => {
  return {
    '@global': {
      '.grecaptcha-badge': {
        display: 'none !important'
      }
    },
    layout: {
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    board: {
      padding: 10
    },
    svg: {
      // display: 'block'
    }
  }
}
// const AsyncScenario = loadable(props => (import(`../../scenarios/${props.scenarioId}`)))
// const AsyncBoard = loadable(props => (import(`../../scenarios/${props.scenarioId}/Board`)))

class Board extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.scenarioRef = React.createRef()
    this.boardRef = React.createRef()
    this.reload = this.reload.bind(this)
  }

  componentDidMount () {
    window.addEventListener('resize', this.reload, false)
  }

  componentDidUpdate () {
    console.log(this.scenarioRef)
    if (this.scenarioRef.current) console.log(this.scenarioRef.current.getArticle(1))
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.reload, false)
  }

  reload (event) {
    event.preventDefault()
    this.forceUpdate()
  }

  render () {
    const { classes, config, theme } = this.props
    const Scenario = (config.scenarioId)
      ? loadable.lib(() => (import(`../../scenarios/${config.scenarioId}`)))
      : null
    const GameBoard = (config.scenarioId)
      ? loadable(props => (import(`../../scenarios/${config.scenarioId}/Board`)))
      : null
    const paperHeight = window.innerHeight - theme.spacing.unit * 8
    const maxSVGHeight = (window.innerWidth * 707 / 1042) - theme.spacing.unit * 8
    const height = Math.min(paperHeight, maxSVGHeight)
    return (
      <div className={classes.layout} style={{ height, width: height * 1042 / 707 }}>
        {(Scenario) ? <Scenario ref={this.scenarioRef} /> : null }
        <main>
          <Paper elevation={8} style={{ height }}>
            <Grid container>
              <Grid item xs={12} className={classes.board}>
                {(GameBoard) ? <GameBoard ref={this.boardRef} /> : <Loading />}
              </Grid>
            </Grid>
          </Paper>
        </main>
      </div>
    )
  }
}

Board.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}

export default withTheme()(withStyles(styles)(Board))
