const quiz = []

quiz.push({
  question: `__Combien de traitements__ avez vous identifié dans ce service ?`,
  hints: [
    { label: `Premier indice`, jokerNumber: 1 },
    { label: `Deuxième indice`, jokerNumber: 2 }
  ],
  answers: [
    { label: `Pas de traitement`, isCorrect: false, jokerNumber: 1 },
    { label: `1 traitement`, isCorrect: true },
    { label: `2 traitements`, isCorrect: false, jokerNumber: 1 },
    { label: `3 traitements`, isCorrect: true },
    { label: `4 traitements`, isCorrect: false, jokerNumber: 3 },
    { label: `5 traitements`, isCorrect: false, jokerNumber: 2 }
  ],
  maxJokers: 3
})

quiz.push({
  question: `Quelle sont __la ou les bases légales__ des traitements que vous avez identifiés ?`,
  hints: [],
  answers: [
    { label: `Exécution d'un contrat`, isCorrect: true },
    { label: `Obligation légale`, isCorrect: true },
    { label: `Exécution d'une mission d'intérêt public ou relevant de l'exercice de l'autorité publique`, isCorrect: false, jokerNumber: 1 },
    { label: `Intérêt vital`, isCorrect: false, jokerNumber: 1 },
    { label: `Intérêt légitime`, isCorrect: true },
    { label: `Consentement`, isCorrect: true }
  ],
  maxJokers: 0
})

quiz.push({
  question: `Tous traitements confondus, quelles catégories de __données personnelles__ avez-vous identifiées ?`,
  hints: [],
  answers: [
    { label: `Aucune`, isCorrect: true },
    { label: `Traits d'identification`, isCorrect: true },
    { label: `Vie personnelle`, isCorrect: true },
    { label: `Informations économiques et financières`, isCorrect: true },
    { label: `Données de connexion`, isCorrect: true },
    { label: `Données de localisation`, isCorrect: true }
  ],
  maxJokers: 0
})

quiz.push({
  question: `Tous traitements confondus, quelles catégories de __données sensibles__ avez-vous identifiées ?`,
  hints: [],
  answers: [
    { label: `Aucune`, isCorrect: true },
    { label: `Données concernant des mineurs`, isCorrect: true },
    { label: `Données révélant l'origine raciale ou ethnique`, isCorrect: true },
    { label: `Données révélant les opinions politiques`, isCorrect: false, jokerNumber: 1 },
    { label: `Données révélant les convictions religieuses ou philosophiques`, isCorrect: false, jokerNumber: 1 },
    { label: `Données révélant l'appartenance syndicale`, isCorrect: false, jokerNumber: 1 },
    { label: `Données génétiques`, isCorrect: false, jokerNumber: 1 },
    { label: `Données biométriques`, isCorrect: false, jokerNumber: 1 },
    { label: `Données concernant la santé`, isCorrect: false, jokerNumber: 1 },
    { label: `Données concernant la vie sexuelle ou l'orientation sexuelle`, isCorrect: false, jokerNumber: 1 },
    { label: `Données relative à des condamnations pénales ou infractions`, isCorrect: false, jokerNumber: 1 },
    { label: `Numéro d'identification national unique`, isCorrect: false, jokerNumber: 1 }
  ],
  maxJokers: 0
})

export { quiz }
