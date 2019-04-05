import consultantAvatar from './consultant.jpg'
const quiz = []

quiz.push({
  question: `__Combien de traitements__ avez vous identifié dans ce service ?`,
  hints: [
    { label: `Premier indice`, jokerNumber: 99 },
    { label: `Deuxième indice`, jokerNumber: 99 }
  ],
  answers: [
    { label: `Pas de traitement`, isCorrect: false, jokerNumber: 99 },
    { label: `1 traitement`, isCorrect: false },
    { label: `2 traitements`, isCorrect: false, jokerNumber: 99 },
    { label: `3 traitements`, isCorrect: false },
    { label: `4 traitements`, isCorrect: false, jokerNumber: 99 },
    { label: `5 traitements`, isCorrect: false, jokerNumber: 99 }
  ],
  maxJokers: 0
})

quiz.push({
  question: `Quelle sont __la ou les bases légales__ des traitements que vous avez identifiés ?`,
  hints: [],
  answers: [
    { label: `Exécution d'un contrat`, isCorrect: false },
    { label: `Obligation légale`, isCorrect: false },
    { label: `Exécution d'une mission d'intérêt public ou relevant de l'exercice de l'autorité publique`, isCorrect: false, jokerNumber: 99 },
    { label: `Intérêt vital`, isCorrect: false, jokerNumber: 99 },
    { label: `Intérêt légitime`, isCorrect: false },
    { label: `Consentement`, isCorrect: false }
  ],
  maxJokers: 0
})

quiz.push({
  question: `Qui est __le responsable__ des traitements que vous avez identifié pour ce service ?`,
  hints: [],
  answers: [
    { label: `Personne ne l'est`, isCorrect: false },
    { label: `Yann D. - Directeur`, isCorrect: false },
    { label: `William B. - Responsable des systèmes d'information`, isCorrect: false },
    { label: `Vous-même - DPO`, isCorrect: false, jokerNumber: 99 },
    { label: `Emilie J. - RGPDay consulting`, isCorrect: false, jokerNumber: 99 },
    { label: `Caroline G. - Responsable ressources humaines, finances`, isCorrect: false }
  ],
  maxJokers: 0
})

quiz.push({
  question: `Qui sont les __responsables conjoints__ des traitements que vous avez identifié pour ce service ?`,
  hints: [],
  answers: [
    { label: `Personne ne l'est`, isCorrect: false },
    { label: `Yann D. - Directeur`, isCorrect: false },
    { label: `William B. - Responsable des systèmes d'information`, isCorrect: false },
    { label: `Vous-même - DPO`, isCorrect: false, jokerNumber: 99 },
    { label: `Emilie J. - RGPDay consulting`, isCorrect: false, jokerNumber: 99 },
    { label: `Caroline G. - Responsable ressources humaines, finances`, isCorrect: false }
  ],
  maxJokers: 0
})

quiz.push({
  question: `Qui sont __la ou les personnes faisant l'objet des traitements__ que vous avez identifié pour ce service ?`,
  hints: [],
  answers: [
    { label: `Personne ne l'est`, isCorrect: false },
    { label: `Yann D. - Directeur`, isCorrect: false },
    { label: `William B. - Responsable des systèmes d'information`, isCorrect: false },
    { label: `Vous-même - DPO`, isCorrect: false, jokerNumber: 99 },
    { label: `Emilie J. - RGPDay consulting`, isCorrect: false, jokerNumber: 99 },
    { label: `Caroline G. - Responsable ressources humaines, finances`, isCorrect: false }
  ],
  maxJokers: 0
})

quiz.push({
  question: `Tous traitements confondus pour ce service, quelles catégories de __données personnelles__ avez-vous identifié ?`,
  hints: [],
  answers: [
    { label: `Aucune`, isCorrect: false },
    { label: `Traits d'identification`, isCorrect: false },
    { label: `Vie personnelle`, isCorrect: false },
    { label: `Informations économiques et financières`, isCorrect: false },
    { label: `Données de connexion`, isCorrect: false },
    { label: `Données de localisation`, isCorrect: false }
  ],
  maxJokers: 0
})

quiz.push({
  question: `Tous traitements confondus pour ce service, quelles catégories de __données sensibles__ avez-vous identifié ?`,
  hints: [],
  answers: [
    { label: `Aucune`, isCorrect: false },
    { label: `Données concernant des mineurs`, isCorrect: false },
    { label: `Données révélant l'origine raciale ou ethnique`, isCorrect: false },
    { label: `Données révélant les opinions politiques`, isCorrect: false, jokerNumber: 99 },
    { label: `Données révélant les convictions religieuses ou philosophiques`, isCorrect: false, jokerNumber: 99 },
    { label: `Données révélant l'appartenance syndicale`, isCorrect: false, jokerNumber: 99 },
    { label: `Données génétiques`, isCorrect: false, jokerNumber: 99 },
    { label: `Données biométriques`, isCorrect: false, jokerNumber: 99 },
    { label: `Données concernant la santé`, isCorrect: false, jokerNumber: 99 },
    { label: `Données concernant la vie sexuelle ou l'orientation sexuelle`, isCorrect: false, jokerNumber: 99 },
    { label: `Données relative à des condamnations pénales ou infractions`, isCorrect: false, jokerNumber: 99 },
    { label: `Numéro d'identification national unique`, isCorrect: false, jokerNumber: 99 }
  ],
  maxJokers: 0
})

quiz.push({
  question: `Tous traitements confondus pour ce service, quels __moyens de conservation__ avez-vous identifié ?`,
  hints: [],
  answers: [
    { label: `Aucun`, isCorrect: false, jokerNumber: 99 }
  ],
  maxJokers: 0
})

quiz.push({
  question: `Tous traitements confondus pour ce service, quelles __mesures techniques de sécurité__ avez-vous identifié ?`,
  hints: [],
  answers: [
    { label: `Aucun`, isCorrect: false, jokerNumber: 99 }
  ],
  maxJokers: 0
})

quiz.push({
  question: `Tous traitements confondus pour ce service, quelles __mesures organisationnelles de sécurité__ avez-vous identifié ?`,
  hints: [],
  answers: [
    { label: `Aucun`, isCorrect: false, jokerNumber: 99 }
  ],
  maxJokers: 0
})

quiz.push({
  question: `Tous traitements confondus pour ce service, quels __moyens de gestion des accès par les administrés ou leurs ayants droits__ avez-vous identifié ?`,
  hints: [],
  answers: [
    { label: `Aucun`, isCorrect: false, jokerNumber: 99 }
  ],
  maxJokers: 0
})

quiz.push({
  question: `Tous traitements confondus pour ce service, quels __destinataires des données à caractère personnel__ avez-vous identifié ?`,
  hints: [],
  answers: [
    { label: `Aucun`, isCorrect: false, jokerNumber: 99 }
  ],
  maxJokers: 0
})

quiz.push({
  question: `Tous traitements confondus pour ce service, quels __sous-traitants__ avez-vous identifié ?`,
  hints: [],
  answers: [
    { label: `Aucun`, isCorrect: false }
  ],
  maxJokers: 0
})

quiz.push({
  question: `Tous traitements confondus pour ce service, quels __transferts hors de l'Union européenne__ avez-vous identifié ?`,
  hints: [],
  answers: [
    { label: `Aucun`, isCorrect: false, jokerNumber: 99 }
  ],
  maxJokers: 0
})

export { quiz, consultantAvatar }
