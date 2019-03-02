import React from 'react'
import { ReCaptcha } from 'recaptcha-v3-react'

class Contact extends React.Component {
  constructor (props) {
    super(props)
    this.state = { token: '' }
    this.recaptcha = React.createRef()
    this.getNewRecaptcha = this.getNewRecaptcha.bind(this)
    this.handleReCaptchaToken = this.handleReCaptchaToken.bind(this)
  }

  getNewRecaptcha () {
    this.recaptcha.current.execute()
  }

  handleReCaptchaToken (token) {
    this.setState({ token })
  }

  render () {
    return (
      <code style={{ padding: '1em' }}>
        <h1>Get ReCaptcha tokens</h1>
        <div><button onClick={this.getNewRecaptcha}>Reload</button>
          <ReCaptcha
            action='contact'
            sitekey='6LedLpMUAAAAAG8Ai4M4x9wTcIs4rPmvYV82a7Yh'
            verifyCallback={this.handleReCaptchaToken}
            ref={this.recaptcha}
          />
        </div><br />
        <div>{this.state.token}</div>
      </code>
    )
  }
}

export default Contact
