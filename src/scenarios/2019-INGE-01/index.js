import React from 'react'
import Markdown from 'src/components/Markdown'
import Page1 from './rules/Page1.md.js'
import Page2 from './rules/Page2.md.js'

const scenario = {
  'rules': [
    () => (<Markdown>{Page1}</Markdown>),
    () => (<Markdown>{Page2}</Markdown>)
  ],
  'services': {
    'archives-documentation': {
      name: 'Archives / Documentation',
      primary: '#d7ccc8',
      secondary: '#795548',
      action: 'rules'
    },
    'direction': {
      name: 'Direction',
      primary: '#4db6ac',
      secondary: '#009688',
      action: 'service'
    },
    'ressources-humaines-finances': {
      name: 'RH / Finances',
      primary: '#ff8a80',
      secondary: '#f44336',
      action: 'service'
    },
    'informatique': {
      name: 'Informatique',
      primary: '#82b1ff',
      secondary: '#2196f3',
      action: 'service'
    },
    'dpo': {
      name: 'DPO',
      primary: '#ffd180',
      secondary: '#ff9800',
      action: 'score'
    }
  }
}

export { scenario }
