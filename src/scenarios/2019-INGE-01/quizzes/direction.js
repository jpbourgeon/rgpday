import consultantAvatar from './consultant.jpg'
const quiz = []

quiz.push({
  question: `__Combien de traitements__ avez vous identifié dans ce service ?`,
  hints: [
    {
      label: `Nous avons identifié un traitement pour le démarchage commercial et un pour la gestion de la relation avec les partenaires`,
      jokerNumber: 3
    }
  ],
  answers: [
    { label: `Pas de traitement`, isCorrect: false, jokerNumber: 1 },
    { label: `1 traitement`, isCorrect: false, jokerNumber: 2 },
    { label: `2 traitements`, isCorrect: true },
    { label: `3 traitements`, isCorrect: false, jokerNumber: 3 },
    { label: `4 traitements`, isCorrect: false, jokerNumber: 2 },
    { label: `5 traitements`, isCorrect: false, jokerNumber: 1 }
  ],
  maxJokers: 3
})

quiz.push({
  question: `Quelle sont __la ou les bases légales__ des traitements que vous avez identifiés ?`,
  hints: [
    { label: `La seule base légale recevable pour les opérations commerciales et de démarchage est le recueil du consentement préalable.

Il est impératif de cesser d'exploiter les fichiers constitués sans le consentement des personnes qui y figurent.`,
    jokerNumber: 3 }
  ],
  answers: [
    { label: `Exécution d'un contrat`, isCorrect: false, jokerNumber: 1 },
    { label: `Obligation légale`, isCorrect: false, jokerNumber: 2 },
    { label: `Exécution d'une mission d'intérêt public ou relevant de l'exercice de l'autorité publique`, isCorrect: false, jokerNumber: 3 },
    { label: `Intérêt vital`, isCorrect: false, jokerNumber: 3 },
    { label: `Intérêt légitime`, isCorrect: false, jokerNumber: 2 },
    { label: `Consentement`, isCorrect: true }
  ],
  maxJokers: 3
})

quiz.push({
  question: `Qui est __le responsable__ des traitements que vous avez identifié pour ce service ?`,
  hints: [
    {
      label: `Le responsable est Yann D. le directeur`,
      jokerNumber: 3
    }
  ],
  answers: [
    { label: `Personne ne l'est`, isCorrect: false, jokerNumber: 1 },
    { label: `Yann D. - Directeur`, isCorrect: true },
    { label: `William B. - Responsable des systèmes d'information`, isCorrect: false, jokerNumber: 2 },
    { label: `Vous-même - DPO`, isCorrect: false, jokerNumber: 3 },
    { label: `Emilie J. - RGPDay consulting`, isCorrect: false, jokerNumber: 2 },
    { label: `Caroline G. - Responsable ressources humaines, finances`, isCorrect: false, jokerNumber: 2 }
  ],
  maxJokers: 3
})

quiz.push({
  question: `Qui sont les __responsables conjoints__ des traitements que vous avez identifié pour ce service ?`,
  hints: [
    { label: `Les responsables conjoints gèrent l'activité de traitement de manière plus opérationnelle. Ils contribuent à définir les finalités et les moyens pour les atteindre.`,
      jokerNumber: 1 },
    {
      label: `En l'espèce le directeur se déclare comme seul responsable de ces traitements.`,
      jokerNumber: 3
    }
  ],
  answers: [
    { label: `Personne ne l'est`, isCorrect: true },
    { label: `Yann D. - Directeur`, isCorrect: false, jokerNumber: 1 },
    { label: `William B. - Responsable des systèmes d'information`, isCorrect: false, jokerNumber: 2 },
    { label: `Vous-même - DPO`, isCorrect: false, jokerNumber: 1 },
    { label: `Emilie J. - RGPDay consulting`, isCorrect: false, jokerNumber: 3 },
    { label: `Caroline G. - Responsable ressources humaines, finances`, isCorrect: false, jokerNumber: 3 }
  ],
  maxJokers: 3
})

quiz.push({
  question: `Qui sont __la ou les personnes faisant l'objet des traitements__ que vous avez identifié pour ce service ?`,
  hints: [
    {
      label: `Les personnes de la mailing list font l'objet du traitement, ainsi que l'ensemble du carnet d'adresse dans le CRM`,
      jokerNumber: 3
    }
  ],
  answers: [
    { label: `Personne ne l'est`, isCorrect: false, jokerNumber: 1 },
    { label: `Yann D. - Directeur`, isCorrect: false, jokerNumber: 3 },
    { label: `Tous les joueurs`, isCorrect: false, jokerNumber: 2 },
    { label: `William B. - Responsable des systèmes d'information`, isCorrect: false, jokerNumber: 2 },
    { label: `Les personnes de la mailing list`, isCorrect: true },
    { label: `Vous-même - DPO`, isCorrect: false, jokerNumber: 3 },
    { label: `Toutes les personnes inscrites dans la base de contact du CRM`, isCorrect: true },
    { label: `Emilie J. - RGPDay consulting`, isCorrect: false, jokerNumber: 2 },
    { label: `Les contacts personnels dans le carnet d'adresse des employés de l'entreprise`, isCorrect: false, jokerNumber: 1 },
    { label: `Caroline G. - Responsable ressources humaines, finances`, isCorrect: false, jokerNumber: 3 }
  ],
  maxJokers: 3
})

quiz.push({
  question: `Tous traitements confondus pour ce service, quelles catégories de __données personnelles__ avez-vous identifié ?`,
  hints: [
    {
      label: `Il s'agit de données d'identification de type état civil, données d'identification, coordonnées, etc.`,
      jokerNumber: 3
    }
  ],
  answers: [
    { label: `Aucune`, isCorrect: false, jokerNumber: 3 },
    { label: `Traits d'identification`, isCorrect: true },
    { label: `Vie personnelle`, isCorrect: false, jokerNumber: 3 },
    { label: `Informations économiques et financières`, isCorrect: false, jokerNumber: 1 },
    { label: `Données de connexion`, isCorrect: false, jokerNumber: 2 },
    { label: `Données de localisation`, isCorrect: true }
  ],
  maxJokers: 3
})

quiz.push({
  question: `Tous traitements confondus pour ce service, quelles catégories de __données sensibles__ avez-vous identifié ?`,
  hints: [
    {
      label: `Les traitements de la direction n'impliquent aucune donnée sensible.`,
      jokerNumber: 3
    }
  ],
  answers: [
    { label: `Aucune`, isCorrect: true },
    { label: `Données concernant des mineurs`, isCorrect: false, jokerNumber: 3 },
    { label: `Données révélant l'origine raciale ou ethnique`, isCorrect: false, jokerNumber: 2 },
    { label: `Données révélant les opinions politiques`, isCorrect: false, jokerNumber: 3 },
    { label: `Données révélant les convictions religieuses ou philosophiques`, isCorrect: false, jokerNumber: 1 },
    { label: `Données révélant l'appartenance syndicale`, isCorrect: false, jokerNumber: 1 },
    { label: `Données génétiques`, isCorrect: false, jokerNumber: 2 },
    { label: `Données biométriques`, isCorrect: false, jokerNumber: 1 },
    { label: `Données concernant la santé`, isCorrect: false, jokerNumber: 3 },
    { label: `Données concernant la vie sexuelle ou l'orientation sexuelle`, isCorrect: false, jokerNumber: 1 },
    { label: `Données relative à des condamnations pénales ou infractions`, isCorrect: false, jokerNumber: 3 },
    { label: `Numéro d'identification national unique`, isCorrect: false, jokerNumber: 2 }
  ],
  maxJokers: 3
})

quiz.push({
  question: `Tous traitements confondus pour ce service, quels __moyens de conservation__ avez-vous identifié ?`,
  hints: [],
  answers: [
    { label: `Aucun`, isCorrect: false, jokerNumber: 1 },
    { label: `Le CRM`, isCorrect: true },
    { label: `Le jeu`, isCorrect: false, jokerNumber: 3 },
    { label: `Le système décisionnel`, isCorrect: false, jokerNumber: 2 },
    { label: `L'ensemble des logiciels métiers`, isCorrect: false, jokerNumber: 2 },
    { label: `Le logiciel de webmarketing`, isCorrect: true }
  ],
  maxJokers: 3
})

quiz.push({
  question: `Tous traitements confondus pour ce service, quelles __mesures techniques de sécurité__ avez-vous identifié ?`,
  hints: [],
  answers: [
    { label: `Aucune`, isCorrect: false, jokerNumber: 3 },
    { label: `Armoires dans les bureaux fermant à clé`, isCorrect: false, jokerNumber: 1 },
    { label: `Accès restreint par un dispositif biométrique`, isCorrect: false, jokerNumber: 2 },
    { label: `Sauvegardes`, isCorrect: true }
  ],
  maxJokers: 3
})

quiz.push({
  question: `Tous traitements confondus pour ce service, quelles __mesures organisationnelles de sécurité__ avez-vous identifié ?`,
  hints: [],
  answers: [
    { label: `Aucune`, isCorrect: true },
    { label: `Politique de gestion des accès`, isCorrect: false, jokerNumber: 1 },
    { label: `Politique de gestion des sécurités`, isCorrect: false, jokerNumber: 2 },
    { label: `Politique de gestion des pertes de données`, isCorrect: false, jokerNumber: 2 },
    { label: `Politique de gestion fuites`, isCorrect: false, jokerNumber: 1 },
    { label: `Clauses de confidentialité dans les contrats de travail`, isCorrect: false, jokerNumber: 3 },
    { label: `Autre`, isCorrect: false, jokerNumber: 3 }
  ],
  maxJokers: 3
})

quiz.push({
  question: `Tous traitements confondus pour ce service, quels __moyens de gestion des accès par les administrés ou leurs ayants droits__ avez-vous identifié ?`,
  hints: [],
  answers: [
    { label: `Aucun`, isCorrect: true },
    { label: `Procédure de contact`, isCorrect: false, jokerNumber: 3 },
    { label: `Formulaire de recueil du consentement`, isCorrect: false, jokerNumber: 1 },
    { label: `Bandeau d'information pour le dépôt de cookies`, isCorrect: false, jokerNumber: 2 }
  ],
  maxJokers: 3
})

quiz.push({
  question: `Tous traitements confondus pour ce service, quels __destinataires des données à caractère personnel__ avez-vous identifié ?`,
  hints: [],
  answers: [
    { label: `Aucun`, isCorrect: true },
    { label: `La CIA grâce au Patriot Act`, isCorrect: false, jokerNumber: 2 },
    { label: `Le centre des impôts`, isCorrect: false, jokerNumber: 2 },
    { label: `Les contacts commerciaux`, isCorrect: false, jokerNumber: 1 },
    { label: `L'éditeur du CRM`, isCorrect: false, jokerNumber: 3 },
    { label: `L'éditeur du logiciel de webmarketing`, isCorrect: false, jokerNumber: 3 },
    { label: `Les éditeurs des logiciels métiers`, isCorrect: false, jokerNumber: 1 }
  ],
  maxJokers: 3
})

quiz.push({
  question: `Tous traitements confondus pour ce service, quels __sous-traitants__ avez-vous identifié ?`,
  hints: [],
  answers: [
    { label: `Aucun`, isCorrect: false, jokerNumber: 1 },
    { label: `L'éditeur du CRM`, isCorrect: true },
    { label: `L'hébergeur / éditeur du logiciel de web-marketing`, isCorrect: false, jokerNumber: 1 },
    { label: `La presse`, isCorrect: false, jokerNumber: 3 },
    { label: `Les partenaires`, isCorrect: false, jokerNumber: 3 }
  ],
  maxJokers: 3
})

quiz.push({
  question: `Tous traitements confondus pour ce service, quels __transferts hors de l'Union européenne__ avez-vous identifié ?`,
  hints: [],
  answers: [
    { label: `Aucun`, isCorrect: false, jokerNumber: 1 },
    { label: `Google`, isCorrect: false, jokerNumber: 1 },
    { label: `L'éditeur du CRM`, isCorrect: false, jokerNumber: 3 },
    { label: `Facebook`, isCorrect: false, jokerNumber: 3 },
    { label: `L'éditeur du logiciel de web marketing`, isCorrect: true },
    { label: `Les éditeurs métiers`, isCorrect: false, jokerNumber: 3 }
  ],
  maxJokers: 3
})

quiz.push({
  question: `Selon vous, y-a-t-il lieu de réaliser une ou plusieurs __analyses d'impact relatives à la protection des données__ ?`,
  hints: [],
  answers: [
    { label: `Non`, isCorrect: true },
    { label: `1 AIPD`, isCorrect: false, jokerNumber: 1 },
    { label: `2 AIPD`, isCorrect: false, jokerNumber: 2 },
    { label: `3 AIPD`, isCorrect: false, jokerNumber: 3 },
    { label: `4 AIPD`, isCorrect: false, jokerNumber: 2 },
    { label: `5 AIPD`, isCorrect: false, jokerNumber: 3 }
  ],
  maxJokers: 3
})

quiz.push({
  question: `Combien de temps le directeur dopeutit-il conserver les données d'identification de ses __contacts en base active dans le CRM__ ?`,
  hints: [],
  answers: [
    { label: `A vie`, isCorrect: false, jokerNumber: 3 },
    { label: `Tant que les personnes concernées n'ont pas demandé à se désinscrire et que la newsletter est active`, isCorrect: true },
    { label: `1 mois`, isCorrect: false, jokerNumber: 1 },
    { label: `1 an`, isCorrect: false, jokerNumber: 1 }
  ],
  maxJokers: 3
})

quiz.push({
  question: `Combien de temps le directeur doit-il conserver les données personnelles des __personnes inscrites dans son logiciel de webmarketing__ ?`,
  hints: [],
  answers: [
    { label: `A vie`, isCorrect: false, jokerNumber: 3 },
    { label: `1 mois`, isCorrect: false, jokerNumber: 1 },
    { label: `1 an`, isCorrect: false, jokerNumber: 2 },
    { label: `Tant que les personnes concernées n'ont pas demandé à se désinscrire`, isCorrect: true },
    { label: `Il devrait les effacer au bout d'un certain temps d'inactivité, par exemple 1 an sans contact réel avec la personne`, isCorrect: true },
    { label: `3 ans maximum`, isCorrect: false, jokerNumber: 2 }
  ],
  maxJokers: 3
})

export { quiz, consultantAvatar }
