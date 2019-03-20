import React from 'react'
import { ReactComponent as BoardImage } from './board.svg'
class Board extends React.Component {
  render () {
    const { scenarioId, ...other } = this.props
    return (
      <div><BoardImage {...other} /></div>
    )
  }
}
export default Board
