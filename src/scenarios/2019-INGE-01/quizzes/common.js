const quizz = []

quizz.push({
  question: `__Combien de traitements__ avez vous identifié dans ce service ?`,
  answers: [
    { label: `Pas de traitement`, isCorrect: false },
    { label: `1 traitement`, isCorrect: true },
    { label: `2 traitements`, isCorrect: false },
    { label: `3 traitements`, isCorrect: true },
    { label: `4 traitements`, isCorrect: false },
    { label: `5 traitements`, isCorrect: false }
  ],
  jokersUsed: 0
})

quizz.push({
  question: `Quelle sont __la ou les bases légales__ des traitements que vous avez identifiés ?`,
  answers: [
    { label: `Exécution d'un contrat`, isCorrect: true },
    { label: `Obligation légale`, isCorrect: true },
    { label: `Exécution d'une mission d'intérêt public ou relevant de l'exercice de l'autorité publique`, isCorrect: false },
    { label: `Intérêt vital`, isCorrect: false },
    { label: `Intérêt légitime`, isCorrect: true },
    { label: `Consentement`, isCorrect: true }
  ],
  jokersUsed: 0
})

quizz.push({
  question: `Tous traitements confondus, quelles catégories de __données personnelles__ avez-vous identifiées ?`,
  answers: [
    { label: `Traits d'identification`, isCorrect: true },
    { label: `Vie personnelle`, isCorrect: true },
    { label: `Informations économiques et financières`, isCorrect: true },
    { label: `Données de connexion`, isCorrect: true },
    { label: `Données de localisation`, isCorrect: true }
  ],
  jokersUsed: 0
})

quizz.push({
  question: `Tous traitements confondus, quelles catégories de __données sensibles__ avez-vous identifiées ?`,
  answers: [
    { label: `Données concernant des mineurs`, isCorrect: true },
    { label: `Données révélant l'origine raciale ou ethnique`, isCorrect: true },
    { label: `Données révélant les opinions politiques`, isCorrect: false },
    { label: `Données révélant les convictions religieuses ou philosophiques`, isCorrect: false },
    { label: `Données révélant l'appartenance syndicale`, isCorrect: false },
    { label: `Données génétiques`, isCorrect: false },
    { label: `Données biométriques`, isCorrect: false },
    { label: `Données concernant la santé`, isCorrect: false },
    { label: `Données concernant la vie sexuelle ou l'orientation sexuelle`, isCorrect: false },
    { label: `Données relative à des condamnations pénales ou infractions`, isCorrect: false },
    { label: `Numéro d'identification national unique`, isCorrect: false }
  ],
  jokersUsed: 0
})

export { quizz }
