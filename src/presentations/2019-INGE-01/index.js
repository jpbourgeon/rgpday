import React from 'react'
import {
  BlockQuote,
  Cite,
  Deck,
  Heading,
  List,
  ListItem,
  Quote,
  Slide,
  Text
} from 'spectacle'
import createTheme from 'spectacle/lib/themes/default'
import createHistory from 'history/createHashHistory'

const history = createHistory()
const theme = createTheme(
  {
    primary: 'white',
    secondary: '#1F2022',
    tertiary: '#03A9FC',
    quaternary: '#CECECE'
  },
  {
    primary: 'Roboto',
    secondary: 'Helvetica'
  }
)

class Presentation extends React.Component {
  constructor (props) {
    super(props)
    this._isMounted = false
  }

  componentWillMount () {
    this._isMounted = true
    const { target } = this.props
    if (target === '#/start') history.push('/')
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  render () {
    return (
      <Deck
        theme={theme}
        transition={['zoom', 'slide']}
        transitionDuration={500}
        history={history}
      >
        <Slide transition={['zoom']} bgColor='primary'>
          <Heading size={1} fit caps lineHeight={1} textColor='secondary'>
            Spectacle Boilerplate
          </Heading>
          <Text margin='10px 0 0' textColor='tertiary' fit bold>
            open the presentation/index.js file to get started
          </Text>
        </Slide>
        <Slide transition={['fade']} bgColor='tertiary'>
          <Heading size={6} textColor='primary' caps>
            Typography
          </Heading>
          <Heading size={1} textColor='secondary'>
            Heading 1
          </Heading>
          <Heading size={2} textColor='secondary'>
            Heading 2
          </Heading>
          <Heading size={3} textColor='secondary'>
            Heading 3
          </Heading>
          <Heading size={4} textColor='secondary'>
            Heading 4
          </Heading>
          <Heading size={5} textColor='secondary'>
            Heading 5
          </Heading>
          <Text size={6} textColor='secondary'>
            Standard text
          </Text>
        </Slide>
        <Slide bgColor='primary' textColor='tertiary'>
          <Heading size={6} textColor='secondary' caps>
            Standard List
          </Heading>
          <List>
            <ListItem>Item 1</ListItem>
            <ListItem>Item 2</ListItem>
            <ListItem>Item 3</ListItem>
            <ListItem>Item 4</ListItem>
          </List>
        </Slide>
        <Slide transition={['fade']} bgColor='secondary' textColor='primary'>
          <BlockQuote>
            <Quote>Example Quote</Quote>
            <Cite>Author</Cite>
          </BlockQuote>
        </Slide>
      </Deck>
    )
  }
}

export default Presentation
