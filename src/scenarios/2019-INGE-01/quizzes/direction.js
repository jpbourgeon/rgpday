import consultantAvatar from './consultant.jpg'
import { quizz as common } from './common'
const quizz = [...common]

quizz.unshift({
  question: `Êtes-vous heureux ?`,
  hints: [],
  answers: [
    { label: `Oui`, isCorrect: true },
    { label: `Non`, isCorrect: false }
  ]
})

export { quizz, consultantAvatar }
