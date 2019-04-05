import React from 'react'
import Markdown from 'src/components/Markdown'
import Page1 from './rules/Page1.md.js'
// import Page2 from './rules/Page2.md.js'
import { quiz as quizDirection } from './quizzes/direction'
// import { quiz as quizRHF } from './quizzes/ressources-humaines-finances'
// import { quiz as quizInformatique } from './quizzes/informatique'

const getCorrectAnswers = (quiz) => {
  return quiz.map((item) => {
    return item.answers.map((answer) => {
      return answer.isCorrect
    })
  })
}

const scenario = {
  rules: [
    () => (<Markdown>{Page1}</Markdown>)
  ],
  gameScoringData: {
    interviewLength: 3,
    consultationLength: 1,
    DPODailyCost: 500,
    consultantDailyCost: 1200,
    consultantQuotation: 24000,
    consultantEstimatedDuration: 10800,
    // interviewLength: 3,
    // consultationLength: 1,
    // DPODailyCost: 500,
    // consultantDailyCost: 1200,
    // consultantQuotation: 24000,
    // consultantEstimatedDuration: 20,
    quizzesCorrectAnswers: {
      direction: getCorrectAnswers(quizDirection)
      // 'ressources-humaines-finances': getCorrectAnswers(quizRHF),
      // informatique: getCorrectAnswers(quizInformatique)
    }
  },
  services: {
    'archives-documentation': {
      name: 'Archives / Documentation',
      primary: '#d7ccc8',
      secondary: '#795548',
      action: 'rules'
    },
    direction: {
      name: 'Direction',
      primary: '#4db6ac',
      secondary: '#009688',
      action: 'service'
    },
    // 'ressources-humaines-finances': {
    //   name: 'RH / Finances',
    //   primary: '#ff8a80',
    //   secondary: '#f44336',
    //   action: 'service'
    // },
    // informatique: {
    //   name: 'Informatique',
    //   primary: '#82b1ff',
    //   secondary: '#2196f3',
    //   action: 'service'
    // },
    dpo: {
      name: 'DPO',
      primary: '#ffd180',
      secondary: '#ff9800',
      action: 'score'
    }
  }
}

export { scenario }
