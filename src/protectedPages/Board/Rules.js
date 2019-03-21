import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Button from '@material-ui/core/Button'
import MobileStepper from '@material-ui/core/MobileStepper'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'

const styles = theme => ({
  root: {
    maxWidth: 400,
    flexGrow: 1
  }
})

class Rules extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activeStep: 0
    }
    this.handleNext = this.handleNext.bind(this)
    this.handleBack = this.handleBack.bind(this)
    this.close = this.close.bind(this)
  }

  handleNext () {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1
    }))
  }

  handleBack () {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1
    }))
  }

  close () {
    this.setState({
      activeStep: 0
    }, () => {
      this.props.handleClose()
    })
  }

  render () {
    const { classes, pages } = this.props
    const { activeStep } = this.state
    const maxSteps = pages.length
    const ActiveContent = pages[activeStep]
    return (
      <Dialog
        fullWidth
        maxWidth='md'
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby='max-width-dialog-title'
        scroll='paper'
      >
        <DialogContent>
          <DialogContentText component='div'>
            <ActiveContent />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div className={classes.navigation}>
            <MobileStepper
              steps={maxSteps}
              position='static'
              activeStep={activeStep}
              backButton={
                <Button size='small' onClick={this.handleBack} disabled={activeStep <= 0}>
                  <KeyboardArrowLeft />
                  Précédent
                </Button>
              }
              nextButton={
                <Button size='small' onClick={this.handleNext} disabled={activeStep >= maxSteps - 1}>
                  Suivant
                  <KeyboardArrowRight />
                </Button>
              }
            />
          </div>
          <Button onClick={this.close} color='primary'>
              Fermer
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

Rules.propTypes = {
  classes: PropTypes.object.isRequired,
  pages: PropTypes.array,
  open: PropTypes.bool,
  handleOpen: PropTypes.func,
  handleClose: PropTypes.func
}

Rules.defaultPropTypes = {
  pages: [],
  open: true,
  handleOpen: () => {},
  handleClose: () => {}
}

export default withStyles(styles, { withTheme: true })(Rules)
