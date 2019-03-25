import React from 'react'
import { ReactComponent as BoardImage } from './board.svg'
import toMaterialStyle from 'material-color-hash'

class BoardComponent extends React.Component {
  constructor () {
    super()
    this.prefix = '2019-INGE-01-board-'
  }
  componentDidMount () {
    const { services, team } = this.props
    const avatarColors = toMaterialStyle(team.name || '???')
    const avatarCircle = document.getElementById(`${this.prefix}avatar-circle`)
    if (avatarCircle) avatarCircle.setAttribute('fill', avatarColors.backgroundColor)
    const avatarHtml = document.getElementById(`${this.prefix}avatar-html`)
    if (avatarHtml) {
      avatarHtml.style.color = avatarColors.color
      avatarHtml.innerHTML = team.initials
    }
    const avatarText = document.getElementById(`${this.prefix}avatar-text`)
    if (avatarText) {
      avatarText.setAttribute('color', avatarColors.color)
      avatarText.innerHTML = team.initials
    }
    Object.keys(services).forEach((id) => {
      const item = document.getElementById(this.prefix + id)
      item.style.cursor = 'pointer'
      item.style.transition = 'fill .175s ease-in'
      this.addListeners(this.props.services[id], id)
    })
  }

  componentWillUnmount () {
    const { services } = this.props
    Object.keys(services).forEach((id) => {
      this.removeListeners(this.props.services[id], id)
    })
  }

  addListeners (service, id) {
    const { pathname } = this.props
    const item = document.getElementById(this.prefix + id)
    if (service.action === 'rules') item.addEventListener('click', this.props.openRules)
    if (service.action === 'service') {
      item.addEventListener('click', () => (this.props.navigate(`${pathname}/${id}`, id)))
    }
    if (service.action === 'score') {
      item.addEventListener('click', () => (this.props.navigate(`${pathname}/score`, id)))
    }
    item.addEventListener('mouseover', () => this.fade(this.prefix + id, service.secondary))
    item.addEventListener('mouseleave', () => this.fade(this.prefix + id, service.primary))
  }

  removeListeners (service, id) {
    const { pathname } = this.props
    const item = document.getElementById(this.prefix + id)
    if (service.action === 'rules') item.removeEventListener('click', this.props.openRules)
    if (service.action === 'service') {
      item.removeEventListener('click', () => (this.props.navigate(`${pathname}/${id}`, id)))
    }
    if (service.action === 'score') {
      item.removeEventListener('click', () => (this.props.navigate(`${pathname}/score`, id)))
    }
    item.removeEventListener('mouseover', () => this.fade(this.prefix + id, service.secondary))
    item.removeEventListener('mouseleave', () => this.fade(this.prefix + id, service.primary))
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
export default BoardComponent
