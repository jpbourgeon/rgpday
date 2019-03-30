import { quizz as common } from './common'
const quizz = [...common]

quizz.push({
  question: `Êtes-vous en couple ?`,
  answers: [
    { label: `Oui`, isCorrect: true },
    { label: `Non`, isCorrect: false }
  ],
  jokersUsed: 0
})

export { quizz }
