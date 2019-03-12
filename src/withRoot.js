import React from 'react'
import { create } from 'jss'
import JssProvider from 'react-jss/lib/JssProvider'
import {
  MuiThemeProvider,
  createMuiTheme,
  jssPreset
} from '@material-ui/core/styles'
import primary from '@material-ui/core/colors/brown'
import secondary from '@material-ui/core/colors/deepOrange'
import CssBaseline from '@material-ui/core/CssBaseline'

// replace default name generator (http://cssinjs.org/js-api/?v=v9.5.0#generate-your-own-class-names) with a variation which uses random strings as part of the class name and wrap the app with this HOC.
// https://github.com/stereobooster/react-snap/issues/99
const createGenerateClassName = () => {
  let counter = 0
  return (rule, sheet) => `c${Math.random().toString(36).substring(2, 4) + Math.random().toString(36).substring(2, 4)}-${rule.key}-${counter++}`
}

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: primary[50],
      main: primary[500],
      dark: primary[700]
    },
    secondary: {
      light: secondary['A200'],
      main: secondary['A400'],
      dark: secondary['A700']
    }
  },
  typography: {
    useNextVariants: true,
    htmlFontSize: 20
  }
})

// Create a JSS instance with the default preset of plugins.
// It's optional.
const jss = create(jssPreset())

// The standard class name generator.
// It's optional.
const generateClassName = createGenerateClassName()

function withRoot (Component) {
  function WithRoot (props) {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <JssProvider jss={jss} generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...props} />
        </MuiThemeProvider>
      </JssProvider>
    )
  }

  return WithRoot
}

export default withRoot
