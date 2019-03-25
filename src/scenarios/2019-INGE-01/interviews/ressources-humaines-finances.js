import avatar from './ressources-humaines-finances.jpg'
const interviewee = 'Caroline G. - Responsable ressources humaines, finances'
const interview = []

interview.push({
  id: 1,
  content: 'Bonjour.\nJ\'espère que votre mission se passe bien.\nQue puis-je faire pour vous ?',
  questions: [
    { label: 'Bonjour monsieur le directeur.\n La mise en conformité suis son cours et nous sommes très motivés par la mission ! Nous avons quelques questions à vous poser :', target: null },
    { label: 'Êtes vous satisfait de notre travail ?', target: 2 },
    { label: 'Pouvez-vous augmenter notre salaire ?', target: 3 },
    { label: 'Finalement, nous n\'avons besoin de rien, merci.', target: 4 }
  ]
})

interview.push({
  id: 2,
  content: `Vous travaillez bien et je suis satisfait de la qualité de vos résultats.
  Je ne vous cache pas que j'ai peur des coûts engendrés par la démarche ! ;-)`,
  questions: [
    { label: 'Nous ferons attention au budget et aux délais.', target: null },
    { label: 'Nous avons d\'autres questions...', target: 1 },
    { label: 'Nous n\'avons plus de questions. Au revoir.', target: 4 }
  ]
})

interview.push({
  id: 3,
  content: `Désolé les gars mais je dois préparer une réunion importante là et je n'aurais pas le temps d'en parler.
  Nous verrons cela une autre fois si vous le voulez bien.`,
  questions: [
    { label: 'Merci d\'y avoir réfléchi.', target: null },
    { label: 'Nous avons d\'autres questions...', target: 1 },
    { label: 'Nous n\'avons plus de questions. Au revoir.', target: 4 }
  ]
})

interview.push({
  id: 4,
  content: `Au revoir. Travaillez bien.`,
  questions: [
    { label: 'Au revoir monsieur le directeur.', target: null },
    { label: 'Finalement, nous avons encore quelques questions...', target: 1 }
  ]
})

export { interview, avatar, interviewee }
