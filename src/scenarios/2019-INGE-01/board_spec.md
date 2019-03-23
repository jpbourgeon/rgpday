### Spécifications du SVG

Le fichier du plateau de jeu est dans le sous-dossier ``assets``

## Optimisation de l'export SVG

- Paramètre de l'export : ne pas inclure la map, fond transparent, exporter la sélection uniquement
- Dans draw.io, il est fondamental d'importer un nombre très limité de bitmap, et de les compresser à mort pour limiter la taille du svg final
- pour faire une petite optimisation supplémentaire : optimiser les codes couleurs noirs et blancs en remplaçant le code hexadécimal à 6 caractère par 3 caractères (gain < 0.5% gzippé ...)
- La compression svgomg n'est pas vraiment utile et rend le fichier difficile à paramétrer (gain de 1% sur svg gzippé)

## Configuration du SVG

A partir de l'export SVG issu de draw.io
- Les "planchers colorés" des services ont la valeur ``pointer-events="all"``
- Tous les autres objets ont la valeur ``pointer-events="none"``
- Ajouter un id au planchers colorés correspondent au code du service dans le fichier de configuration du scénario. Il est possible de les retrouver en recherchant le code de la couleur de remplissage à l'aide de l'expression régulière suivante : ``<rect(((?!>).)*)fill="#((?!(000000|ffffff|")).)*"``
- identifier et repositionner l'avatar

## 2019-INGE-01 : identifiants et paramètres

- Services: couleur primaire, couleur secondaire
  - 2019-INGE-01-board-arc: #d7ccc8, #795548
  - 2019-INGE-01-board-dir: #4db6ac, #009688
  - 2019-INGE-01-board-rhf: #ff8a80, #f44336
  - 2019-INGE-01-board-it:  #82b1ff, #2962ff
  - 2019-INGE-01-board-dpo: #ffd180, #ff9800
- Avatar
  - 2019-INGE-01-board-avatar-circle
  - 2019-INGE-01-board-avatar-html
  - 2019-INGE-01-board-avatar-text

## React component

Utiliser l'import de SVG de creat-react-app 2 pour créer un component React et le rendre dynamique
- Ajouter les styles pour l'effet de rollover
- Ajouter/Enlever les évènements onclick (les fonctions sont passées en props à partir du composant principal) sur les fonctions du cycle de vie (componentDidMount et componentWillUnmount):
  - openRules : ouvrir les règles du jeu