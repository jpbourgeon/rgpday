import React from 'react'
import Markdown from 'src/components/Markdown'
import Page1 from './rules/Page1.md.js'
import Page2 from './rules/Page2.md.js'

const scenario = new Map()
scenario.set('rules', [
  () => (<Markdown>{Page1}</Markdown>),
  () => (<Markdown>{Page2}</Markdown>)
])
scenario.set('services', {
  'arc': {
    name: 'Archives / Documentation',
    svgId: '2019-INGE-01-board-arc',
    primary: '#d7ccc8',
    secondary: '#795548',
    action: 'rules'
  },
  'dir': {
    name: 'Direction',
    svgId: '2019-INGE-01-board-dir',
    primary: '#4db6ac',
    secondary: '#009688',
    action: 'interview'
  },
  'rhf': {
    name: 'RH / Finances',
    svgId: '2019-INGE-01-board-rhf',
    primary: '#ff8a80',
    secondary: '#f44336',
    action: 'interview'
  },
  'it': {
    name: 'Informatique',
    svgId: '2019-INGE-01-board-it',
    primary: '#82b1ff',
    secondary: '#2196f3',
    action: 'interview'
  },
  'dpo': {
    name: 'DPO',
    svgId: '2019-INGE-01-board-dpo',
    primary: '#ffd180',
    secondary: '#ff9800',
    action: 'scores'
  }
})

export { scenario }
