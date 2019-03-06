import React from 'react'
import ReCaptcha from './'

class GetReCaptchaTokens extends React.Component {
  constructor (props) {
    super(props)
    this.state = { token: '' }
    this.ReCaptchaRef = React.createRef()
    this.getNewRecaptcha = this.getNewRecaptcha.bind(this)
    this.handleReCaptchaToken = this.handleReCaptchaToken.bind(this)
  }

  getNewRecaptcha () {
    this.ReCaptchaRef.current.getToken()
  }

  handleReCaptchaToken (token) {
    this.setState({ token })
  }

  render () {
    return (
      <div style={{ margin: '1em' }}>
        <code>
          <h1>rgpday.com reCaptcha</h1>
          <div><button onClick={this.getNewRecaptcha}>Get a token</button>
          </div><br />
          <div>{this.state.token}</div>
          <ReCaptcha
            action='contact'
            sitekey='6LedLpMUAAAAAG8Ai4M4x9wTcIs4rPmvYV82a7Yh'
            verifyCallback={this.handleReCaptchaToken}
            ref={this.ReCaptchaRef}
          />
        </code>
      </div>
    )
  }
}

export default GetReCaptchaTokens
