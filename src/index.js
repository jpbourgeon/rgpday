import 'react-app-polyfill/ie11'
import React from 'react'
import { hydrate, render } from 'react-dom'
import * as serviceWorker from 'src/serviceWorker'
import App from 'src/App'

// Load Roboto typeface
import('typeface-roboto')

const rootElement = document.getElementById('root')
if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement)
} else {
  render(<App />, rootElement)
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
