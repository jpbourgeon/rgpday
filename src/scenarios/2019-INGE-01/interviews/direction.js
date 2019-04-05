import avatar from './direction.jpg'
const interviewee = 'Yann D. - Directeur'
const interview = []

interview.push({
  id: 1,
  content: 'Bonjour.\nJ\'espère que votre mission se passe bien.\nQue puis-je faire pour vous ?',
  questions: [
    { label: 'Bonjour monsieur le directeur.\n La mise en conformité suis son cours et nous sommes très motivés par la mission ! Nous avons quelques questions à vous poser :', target: null },
    { label: 'Êtes vous satisfait de notre travail ?', target: 2 },
    { label: 'Pouvez-vous nous en dire plus sur vos missions ?', target: 5 },
    { label: 'Pouvez-vous augmenter notre salaire ?', target: 3 },
    { label: 'Finalement, nous n\'avons besoin de rien, merci.', target: 4 }
  ]
})

interview.push({
  id: 2,
  content: `Vous travaillez bien et je suis satisfait de la qualité de vos résultats.
  Mais je ne vous cache pas que je suis inquiet des coûts que cette démarche va occasionner ! ;-)`,
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
    { label: 'Nous n\'avons plus de questions.', target: 4 }
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

interview.push({
  id: 5,
  content: `Je suis dirige cette entreprise.

Je m'occupe essentiellement de la gestion du pilotage de l'entreprise. Je gère également l'ensemble des relations avec les partenaires extérieurs. Et puis je m'occupe de toute la partie commerciale et de la promotion de l'activité.`,
  questions: [
    { label: 'Dites nous en plus sur le pilotage de l\'entreprise', target: 6 },
    { label: 'Dites nous en plus sur les relations avec les partenaires extérieurs et le marketing', target: 7 },
    { label: 'Nous n\'avons plus de questions.', target: 4 }
  ]
})

// Pilotage de l'entreprise

interview.push({
  id: 6,
  content: `Et bien que voulez vous savoir ?`,
  questions: [
    { label: 'En quoi est-ce que cela consiste, le pilotage de l\'entreprise ?', target: 61 },
    { label: 'Cette activité nécessite t\'elle des données personnelles pour être menée à bien ?', target: 62 },
    { label: 'Quelles sont les personnes impliquées dans cette activité ?', target: 63 },
    { label: 'Où sont stockés vos fichiers ?', target: 65 },
    { label: 'Qui peut accéder à ces informations ?', target: 66 },
    { label: 'Transférez-vous ces données personnelles en dehors de l\'Union Européenne ?', target: 67 },
    { label: 'Nous n\'avons plus de questions à ce sujet.', target: 5 }
  ]
})

interview.push({
  id: 61,
  content: `Je définis les objectifs de notre entreprise et la stratégie pour nous développer.`,
  questions: [
    { label: 'C\'est bien noté.', target: null },
    { label: 'A propos du pilotage de l\'entreprise...', target: 6 }
  ]
})

interview.push({
  id: 62,
  content: `Pas vraiment.

Nous travaillons à partir des données d'activité, financières et RH qui sont consolidée dans le logiciel décisionnel sous la forme de tableaux de bord.

Ces données nous arrivent anonymisées à travers le logiciel décisionnel.`,
  questions: [
    { label: 'D\'accord.', target: null },
    { label: 'Sur le pilotage de l\'entreprise...', target: 6 }
  ]
})

interview.push({
  id: 63,
  content: `Et bien c'est un travail collectif que j'anime avec les membres du comité de direction. William et Caroline.
`,
  questions: [
    { label: 'Merci pour ces informations.', target: null },
    { label: 'A propos du pilotage de l\'entreprise...', target: 6 }
  ]
})

interview.push({
  id: 65,
  content: `Tout est consolidé depuis les applicatifs métiers (les données analytiques du jeu, les données financières, commerciales, RH, etc.) dans le logiciel décisionnel. Il y a aussi les sauvegardes`,
  questions: [
    { label: 'Ah. Je vois.', target: null },
    { label: 'A propos du pilotage de l\'entreprise...', target: 6 }
  ]
})

interview.push({
  id: 66,
  content: `En gros moi, William et Caroline. Nous exploitons les résultats en comité de direction.

William est celui qui fait les intégrations et le paramétrage de l'ETL pour le logiciel décisionnel.

Caroline l'aide à alimenter le logiciel avec les données RH et financières.

C'est très empirique.`,
  questions: [
    { label: 'C\'est très intéressant.', target: null },
    { label: 'Sur le pilotage de l\'entreprise...', target: 6 }
  ]
})

interview.push({
  id: 67,
  content: `Non, pas sur cette partie de l'activité.`,
  questions: [
    { label: 'D\'accord, merci.', target: null },
    { label: 'A propos du pilotage de l\'entreprise...', target: 6 }
  ]
})

// Relations avec les partenaires extérieurs

interview.push({
  id: 7,
  content: `Et bien que voulez vous savoir ?`,
  questions: [
    { label: 'En quoi est-ce que cela consiste, la gestion des relations extérieures et le marketing ?', target: 71 },
    { label: 'Cette activité nécessite t\'elle des données personnelles pour être menée à bien ?', target: 72 },
    { label: 'Quelles sont les personnes impliquées dans cette activité ?', target: 73 },
    { label: 'Avez-vous mis en place des procédures pour permettre aux personnes concernées d\'accéder et de modifier leur données personnelles ?', target: 74 },
    { label: 'Où sont stockés vos fichiers contenant des données personnelles ?', target: 75 },
    { label: 'Qui peut accéder à ces informations ?', target: 76 },
    { label: 'Transférez-vous ces données personnelles en dehors de l\'Union Européenne ?', target: 77 },
    { label: 'Nous n\'avons plus de questions à ce sujet.', target: 5 }
  ]
})

interview.push({
  id: 71,
  content: `Je développe la promotion du jeu.

Cela passe par le démarchage direct par les canaux marketings classiques : une newsletter que j'ai alimenté avec le temps, j'en suis fier de cette base de contacts ! Il y aussi le ciblage à partir de l'analytique de navigation dans le jeu et sur le site web, l'optimisation des moteurs de recherche.

Et puis j'ai le réseau de correspondant de presse. Je les informe personnellement des nouveautés du logiciel pour avoir une couverture maximale.

Et enfin je suis en relation avec un grand nombre de professionels du métier pour développer des partenariats en faveur de l'entreprise.`,
  questions: [
    { label: 'C\'est bien noté.', target: null },
    { label: 'A propos du marketing...', target: 6 }
  ]
})

interview.push({
  id: 72,
  content: `Ah complètement !

Il y a la newsletter qui s'est formée spontanément en agglomérant différentes sources de mails et en achetant des fichiers commerciaux.

Et j'ai toutes les coordonnées des contacts professionnels que je me suis fait dans les salons ou par le démarchage direct.

Ce sont essentiellement des données d'état civil (nom, prénom et compagnie vous voyez) et puis les coordonnées : téléphone, email, adresse postale. Vous voyez ?`,
  questions: [
    { label: 'D\'accord.', target: null },
    { label: 'Sur le marketing...', target: 6 }
  ]
})

interview.push({
  id: 73,
  content: `L'ensemble des collègues ont un accès au CRM pour répondre aux questions des clients. Mais c'est moi qui pilote et réalise le marketing. On est une petite boîte vous savez !`,
  questions: [
    { label: 'Merci pour ces informations.', target: null },
    { label: 'A propos du marketing...', target: 6 }
  ]
})

interview.push({
  id: 74,
  content: `... non, désolé ... tout le monde fait comme ça dans le métier. Mais s'il faut changer de façon de procéder, on le fera.`,
  questions: [
    { label: 'Ah. Je vois.', target: null },
    { label: 'A propos du marketing...', target: 6 }
  ]
})

interview.push({
  id: 75,
  content: `Les données sont accessibles dans le CRM. Il protégé par mot de passe, c'est classique. Je n'ai pas d'autre source données. Je consolide tout là et après je me débarasse des fichiers. Je déteste les fichiers qui trainent.

Il y a aussi les sauvegardes.`,
  questions: [
    { label: 'C\'est très intéressant.', target: null },
    { label: 'Sur le marketing...', target: 6 }
  ]
})

interview.push({
  id: 76,
  content: `Tout le monde a accès au CRM pour l'alimenter et répondre aux questions de nos contacts.`,
  questions: [
    { label: 'Revenons au marketing...', target: 6 }
  ]
})

interview.push({
  id: 77,
  content: `Maintenant que vous le dites... Je transfère les données dans un logiciel de webmarketing pour faciliter les mailings et gérer mon démarchage en ligne. La boîte est américaine, je crois.`,
  questions: [
    { label: 'Je comprends mieux maintenant.', target: null },
    { label: 'A propos du marketing...', target: 6 }
  ]
})

export { interview, avatar, interviewee }
