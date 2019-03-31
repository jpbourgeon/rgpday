import consultantAvatar from './consultant.jpg'
import { quizz as common } from './common'
const quizz = [...common]

quizz.push({
  question: `Êtes-vous en couple ?`,
  hints: [],
  answers: [
    { label: `Oui`, isCorrect: true },
    { label: `Non`, isCorrect: false }
  ]
})

export { quizz, consultantAvatar }
