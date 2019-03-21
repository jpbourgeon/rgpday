import React from 'react'
import { ReactComponent as BoardImage } from './board.svg'
import toMaterialStyle from 'material-color-hash'

class Board extends React.Component {
  componentDidMount () {
    const { services, team } = this.props
    const avatarColors = toMaterialStyle(team.name)
    const avatarCircle = document.getElementById('2019-INGE-01-board-avatar-circle')
    avatarCircle.setAttribute('fill', avatarColors.backgroundColor)
    const avatarHtml = document.getElementById('2019-INGE-01-board-avatar-html')
    avatarHtml.style.color = avatarColors.color
    avatarHtml.innerHTML = team.initials
    const avatarText = document.getElementById('2019-INGE-01-board-avatar-text')
    avatarText.setAttribute('color', avatarColors.color)
    avatarText.innerHTML = team.initials
    Object.keys(services).forEach((id) => {
      const item = document.getElementById(services[id].svgId)
      item.style.cursor = 'pointer'
      item.style.transition = 'fill .175s ease-in'
      this.addListeners(this.props.services[id])
    })
  }

  componentWillUnmount () {
    const { services } = this.props
    Object.keys(services).forEach((service) => {
      this.removeListeners(this.props.services[service])
    })
  }

  addListeners (service) {
    const item = document.getElementById(service.svgId)
    if (service.action === 'rules') item.addEventListener('click', this.props.openRules)
    item.addEventListener('mouseover', () => this.fade(service.svgId, service.secondary))
    item.addEventListener('mouseleave', () => this.fade(service.svgId, service.primary))
  }

  removeListeners (service) {
    const item = document.getElementById(service.svgId)
    item.removeEventListener('click', this.props.openRules)
    item.removeEventListener('mouseover', () => this.fade(service.svgId, service.secondary))
    item.removeEventListener('mouseleave', () => this.fade(service.svgId, service.primary))
  }secondary

  fade (id, color) {
    document.getElementById(id).style.fill = color
  }

  render () {
    return (
      <BoardImage />
    )
  }
}
export default Board
