import { ReCaptcha } from 'recaptcha-v3-react'

class MyReCaptcha extends ReCaptcha {
  componentDidMount () { return null }

  componentDidUpdate () { return null }

  getToken () {
    if (this.state.ready) {
      this.execute()
    }
  }

  render () { return null }
}

export default MyReCaptcha
