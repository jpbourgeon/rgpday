import consultantAvatar from './consultant.jpg'
import { quiz as common } from './common'
const quiz = [...common]

quiz.unshift({
  question: `Êtes-vous heureux ?`,
  hints: [],
  answers: [
    { label: `Oui`, isCorrect: true },
    { label: `Non`, isCorrect: false }
  ]
})

export { quiz, consultantAvatar }
