import React from 'react'
import {
  BlockQuote,
  Cite,
  Deck,
  Heading,
  List,
  ListItem,
  Quote,
  Slide,
  Text,
  Image
} from 'spectacle'
import createTheme from 'spectacle/lib/themes/default'
import { createHashHistory } from 'history'
import preloader from 'spectacle/lib/utils/preloader'

const history = createHashHistory()
const theme = createTheme(
  {
    bgLight: '#f5f5f5',
    bgDark: '#424242',
    primary: '#795548',
    pLight: '#a98274',
    pDark: '#4b2c20',
    secondary: '#ff3d00',
    sLight: '#ff7539',
    sDark: '#c30000'
  },
  {
    primary: 'Roboto',
    secondary: 'Helvetica'
  }
)

const images = {
  AngryTyping: require('./assets/angrytyping.gif'),
  Joey: require('./assets/joey.gif'),
  Police: require('./assets/police.gif'),
  IceAge: require('./assets/iceage.gif'),
  Timeline: require('./assets/timeline.png'),
  Gouvernance: require('./assets/gouvernance.png'),
  Piliers: require('./assets/piliers.png'),
  Liceite: require('./assets/liceite.png'),
  SousTraitants: require('./assets/soustraitants.png'),
  Conservation: require('./assets/conservation.png'),
  Risque: require('./assets/risque.png'),
  Aipd: require('./assets/aipd.png'),
  Notification: require('./assets/notification.png'),
  Sensibles: require('./assets/sensibles_risquees.png'),
  Droit: require('./assets/droit.png'),
  Definitions0: require('./assets/definitions0.png'),
  Definitions1: require('./assets/definitions1.png'),
  Definitions2: require('./assets/definitions2.png'),
  Acteurs0: require('./assets/acteurs0.png'),
  Acteurs1: require('./assets/acteurs1.png'),
  Acteurs2: require('./assets/acteurs2.png'),
  Acteurs3: require('./assets/acteurs3.png'),
  Acteurs4: require('./assets/acteurs4.png')
}

preloader(images)

class PresentationComponent extends React.Component {
  constructor (props) {
    super(props)
    this._isMounted = false
  }

  componentDidMount () {
    this._isMounted = true
    const { target } = this.props
    if (target === '#/start') history.push('/')
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  render () {
    return (
      <Deck
        theme={theme}
        transition={['zoom', 'slide']}
        transitionDuration={500}
        history={history}
        showFullscreenControl={false}
        progress='bar'
      >
        <Slide transition={['fade']} bgColor='bgDark'>
          <Heading size={1} fit caps lineHeight={1} textColor='secondary'>
            LE RGPD
          </Heading>
          <Text margin='10px 0 0' textColor='pLight' fit bold>
            et la Gouvernance des Données
          </Text>
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={6} textColor='secondary' caps>
            Au sommaire
          </Heading>
          <List ordered>
            <ListItem style={{ paddingBottom: '1em' }}>
              Un informaticien est confronté aux enjeux de la gouvernance des données
            </ListItem>
            <ListItem style={{ paddingBottom: '1em' }}>
              Où l'on comprend que ces contraintes sont aussi des opportunités
            </ListItem>
            <ListItem style={{ paddingBottom: '1em' }}>
              L'informaticien apprend les moyens nécessaires pour triompher et rencontre des alliés
            </ListItem>
            <ListItem style={{ paddingBottom: '1em' }}>
              Notre héros sortira t'il victorieux de sa quête ?
            </ListItem>
          </List>
        </Slide>

        <Slide transition={['spin']} bgColor='bgDark' textColor='pLight'>
          <Heading size={5} textColor='secondary' caps>
            Un informaticien est confronté aux enjeux de la gouvernance des données
          </Heading>
          <Image src={images.AngryTyping} />
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            Ça aurait pu être pire...
          </Heading>
          <List>
            <ListItem style={{ paddingBottom: '1em' }}>
              Un pirate profite d'un vieil accès TSE oublié pour exécuter une ransonware dans la DMZ
            </ListItem>
            <ListItem style={{ paddingBottom: '1em' }}>
              Le service informatique restaure les données à partir des sauvegardes. L'impact est limité.
            </ListItem>
            <ListItem style={{ paddingBottom: '1em' }}>
              Le directeur est conscient d'avoir échappé au pire. Il vous charge de travailler sur la protection les données de l'entreprise.
            </ListItem>
            <ListItem style={{ paddingBottom: '1em' }}>
              Vous allez découvrir l'ampleur du problème...
            </ListItem>
          </List>
        </Slide>

        <Slide transition={['spin']} bgColor='bgDark' textColor='pLight'>
          <Heading size={5} textColor='secondary' caps>
            La régulation des données
          </Heading>
          <List ordered>
            <ListItem>Maîtriser les données, un problème qui ne date pas d'hier</ListItem>
            <ListItem>Les objectifs de la régulation</ListItem>
            <ListItem>La législation</ListItem>
            <ListItem>Le G29 (1995)</ListItem>
            <ListItem>La CNIL (1978)</ListItem>
            <ListItem>Exemples de sanctions</ListItem>
            <ListItem>Focus sur le cloud souverain</ListItem>
          </List>
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            Maîtriser les données, un problème qui ne date pas d'hier
          </Heading>
          <List>
            <ListItem>
              <strong>Années 1970-1980 - Vigilance face aux gros fichiers de l'Etat</strong><br />
              SAFARI : un projet de « mise en fiches » de la population française (INSEE)
            </ListItem>
            <ListItem>
              <strong>Années 1990 - Les données du marketing</strong>
            </ListItem>
            <ListItem>
              <strong>Années 2000 - Mondialisation</strong><br />
              Naissance des géants de l'internet
            </ListItem>
            <ListItem>
              <strong>Années 2010 - Prise de conscience collective</strong><br />
              La réglementation se renforce ; les GAFA dans le viseur ; 2013 - affaire Snowden
            </ListItem>
          </List>
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            Maîtriser les données, un problème qui ne date pas d'hier
          </Heading>
          <div style={{ paddingTop: '1em' }}>
            <iframe title='La CNIL a 40 ans' width='560' height='315' src='https://www.youtube.com/embed/Th-rzrc3488' frameBorder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowFullScreen />
          </div>
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            Les objectifs de la régulation
          </Heading>
          <List>
            <ListItem><strong>Responsabilité</strong><br />
            Efficacité de la gestion et sécurité des données</ListItem>
            <ListItem><strong>Transparence</strong><br />
            Renforcer les relations entre parties prenantes</ListItem>
            <ListItem><strong>Confiance</strong><br />
            Développer l'économie numérique et favoriser l'innovation</ListItem>
          </List>
        </Slide>

        <Slide
          transition={['slide']}
          bgColor='bgLight'
          textColor='primary'
          bgImage={images.Timeline}
          bgSize='contain'
          bgRepeat='no-repeat'
          align='center flex-start'
        >
          <Heading size={5} lineHeight={1} textColor='secondary' style={{ paddingTop: '1.5em' }}>
            La législation
          </Heading>
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            Le Comité Européen de la Protection des données : le G29
          </Heading>
          <Text style={{ paddingTop: '1em' }}>
            L'organisation qui réunit l'ensemble des CNIL européennes.
          </Text>
          <List>
            <ListItem><strong>Contribue à l’élaboration des normes</strong><br />
              européennes en adoptant des recommandations
            </ListItem>
            <ListItem><strong>Rend des avis</strong><br />
              sur le niveau de protection dans les pays hors UE
            </ListItem>
            <ListItem><strong>Conseille la Commission européenne</strong><br />
              sur tout projet ayant une incidence la protection des données et libertés des personnes
            </ListItem>
          </List>
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            La CNIL : ses missions
          </Heading>
          <List>
            <ListItem>Informer, protéger les droits</ListItem>
            <ListItem>Accompagner la conformité / conseiller</ListItem>
            <ListItem>Anticiper et innover</ListItem>
            <ListItem>Contrôler et sanctionner</ListItem>
          </List>
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            La CNIL : son fonctionnement
          </Heading>
          <List>
            <ListItem>Autorité administrative indépendante</ListItem>
            <ListItem>
              Collège pluridisciplinaire de 18 membres (députés, représentant de la CADA, experts, etc.)
            </ListItem>
            <ListItem>Commission plénière hebdomadaire de 5 membres</ListItem>
          </List>
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            La CNIL : sanctions et conséquences
          </Heading>
          <List>
            <ListItem><strong>Opérationnelles</strong><br />
              &nbsp;&nbsp;-&nbsp;Interdiction / suppression<br />
              &nbsp;&nbsp;-&nbsp;Retrait de certification pour les outils de conformité
            </ListItem>
            <ListItem><strong>Image</strong><br />
              &nbsp;&nbsp;-&nbsp;Dégradation de l'image et de la réputation
            </ListItem>
            <ListItem><strong>Financières</strong><br />
              &nbsp;&nbsp;-&nbsp;Amendes administratives jusqu'à 20 millions d'euros<br />
              &nbsp;&nbsp;-&nbsp;Actions judiciaires individuelles ou collectives
            </ListItem>
          </List>
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            Le RGPD : bilan 6 mois après
          </Heading>
          <List>
            <ListItem><strong>32000</strong> organismes ont désigné un délégué à la protection des données</ListItem>
            <ListItem><strong>1000</strong> notifications de violations de données ont été reçues, soit environ 7 par jour depuis le 25 mai</ListItem>
            <ListItem><strong>9700</strong> plaintes soit 34% de plus qu’en 2017 sur la même période</ListItem>
            <ListItem><strong>345</strong> plaintes transfrontalières</ListItem>
            <ListItem><strong>3</strong> plaintes collectives</ListItem>
            <ListItem><strong>66%</strong> des Français se disent plus sensibles que ces dernières années à la protection de leurs données personnelles</ListItem>
          </List>
        </Slide>

        <Slide transition={['zoom']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            Exemples de sanctions
          </Heading>
          <BlockQuote>
            <Quote textSize='1.5em'>
              Ces amis trop empressés qui vous rendent des services qu'on ne leur a pas demandés - La pire forme d'indiscrétion. On ne devrait pas s'occuper de nous sans notre consentement.
            </Quote>
            <Cite textSize='1em' textColor='secondary'>Emil Michel Cioran - Cahiers, 1957-1972</Cite>
          </BlockQuote>
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
          ASSISTANCE CENTRE D’APPELS<br />10 000 €
          </Heading>
          <BlockQuote>
            <Quote textSize='1.5em'>
              Pour avoir notamment mis en œuvre illégalement un système biométrique à des fins de contrôle des horaires des salariés.
            </Quote>
            <Cite textSize='1em' textColor='secondary'>20 septembre 2018</Cite>
          </BlockQuote>
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            ALLIANCE FRANCAISE<br />PARIS ÎLE DE FRANCE<br />30 000 €
          </Heading>
          <BlockQuote>
            <Quote textSize='1.5em'>
            Pour avoir insuffisamment sécurisé les données des personnes suivant les cours de français qu’elle dispense.
            </Quote>
            <Cite textSize='1em' textColor='secondary'>27 septembre 2018</Cite>
          </BlockQuote>
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            UBER<br />400 000 €
          </Heading>
          <BlockQuote>
            <Quote textSize='1.5em'>
              Pour avoir insuffisamment sécurisé les données des utilisateurs de son service de VTC.
            </Quote>
            <Cite textSize='1em' textColor='secondary'>20 décembre 2018</Cite>
          </BlockQuote>
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            BOUYGUES TELECOM<br />250 000 €
          </Heading>
          <BlockQuote>
            <Quote textSize='1.5em'>
              Pour avoir insuffisamment protégé les données de clients B&You.
            </Quote>
            <Cite textSize='1em' textColor='secondary'>27 décembre 2018</Cite>
          </BlockQuote>
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            Google LLC<br />50 000 000 €
          </Heading>
          <BlockQuote>
            <Quote textSize='1.5em'>
              En application du RGPD pour manque de transparence, information insatisfaisante et absence de consentement valable pour la personnalisation de la publicité.
            </Quote>
            <Cite textSize='1em' textColor='secondary'>21 janvier 2019</Cite>
          </BlockQuote>
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            Focus sur le cloud souverain
          </Heading>
          <List>
            <ListItem>Confidentialité et sécurité des données face aux législations étrangères (Patriot Act)</ListItem>
            <ListItem>Les données et documents numériques considérés commes des "trésors nationaux"</ListItem>
            <ListItem>Ne pas soumettre nos données à ces lois</ListItem>
            <ListItem>05/04/2016 : circulaire de la Direction générale des collectivités locales, conjointement avec la Direction générale des patrimoines</ListItem>
          </List>
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            Cloud souverain : quelles options
          </Heading>
          <List>
            <ListItem>Cloud privé interne</ListItem>
            <ListItem>Utiliser des datas centers situés sur le territoire nationale, par des sociétés de droit français ou européen</ListItem>
            <ListItem>Fiasco du programme Andromède (2009) : Cloudwatt (Orange / Thales), Numergy (SFR / Bull)</ListItem>
            <ListItem>Référentiel de certification : SecNumCloud (ANSSI)</ListItem>
            <ListItem>Référentiel de certification franco-allemand : European Secure Cloud - ESCloud (ANSSI / BSI)</ListItem>
          </List>
        </Slide>

        <Slide transition={['spin']} bgColor='bgDark' textColor='pLight'>
          <Heading size={5} textColor='secondary' caps>
            En résumé : la régulation des données
          </Heading>
          <List ordered>
            <ListItem>Maîtriser les données, un problème qui ne date pas d'hier</ListItem>
            <ListItem>Les objectifs de la régulation</ListItem>
            <ListItem>La législation</ListItem>
            <ListItem>Le G29 (1995)</ListItem>
            <ListItem>La CNIL (1978)</ListItem>
            <ListItem>Exemples de sanctions</ListItem>
            <ListItem>Focus sur le cloud souverain</ListItem>
          </List>
        </Slide>

        <Slide transition={['spin']} bgColor='bgDark' textColor='pLight'>
          <Heading size={5} textColor='secondary' caps>
            Où l'on comprend que ces contraintes sont aussi des opportunités
          </Heading>
          <Image src={images.Joey} />
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            Un monde d'opportunités
          </Heading>
          <List>
            <ListItem style={{ paddingBottom: '1em' }}>
              Vous venez de découvrir les contraintes qui pèsent sur l'activité de votre entreprise et les risques que vous prenez à essayer de rester sous le radar de l'autorité de régulation.
            </ListItem>
            <ListItem style={{ paddingBottom: '1em' }}>
              Mais en passant, vous allez apprendre que les données sont une source de valeur qu'il serait dommage de négliger...
            </ListItem>
          </List>
        </Slide>

        <Slide transition={['spin']} bgColor='bgDark' textColor='pLight'>
          <Heading size={5} textColor='secondary' caps>
            L'économie de la donnée et du numérique en 2018
          </Heading>
          <List ordered>
            <ListItem>Informations publiées sur le net à travers le monde</ListItem>
            <ListItem>Les particuliers en France</ListItem>
            <ListItem>Les entreprises en France</ListItem>
            <ListItem>Plaidoyer pour la qualité des données</ListItem>
          </List>
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            Informations publiées sur le net à travers le monde
          </Heading>
          <List>
            <ListItem><strong>3 800 000 000</strong> d’humains utilisent Internet dans le monde.</ListItem>
            <ListItem><strong>90%</strong> des données disponibles dans le monde ont été créées dans les deux dernières années.</ListItem>
            <ListItem>Un volume d'information de <strong>2,5 quintilions d’octets</strong> est créé chaque jour soit <strong>29 000 Gigaoctets</strong> par seconde.</ListItem>
          </List>
          <Cite textColor='secondary'>Source : planetoscope.com</Cite>
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            Les particuliers en France
          </Heading>
          <List>
            <ListItem><strong>46%</strong> de la population se connecte à internet via le smartphone</ListItem>
            <ListItem><strong>Une personne sur deux</strong> utilise internet pour rechercher des informations sur sa santé ou celle de ses proches</ListItem>
            <ListItem><strong>67%</strong> des particuliers ont réalisé au moins une commande en ligne</ListItem>
            <ListItem>En 10 ans le chiffre d'affaires des ventes aux particuliers via internet est passé de 20 milliards à <strong>81,7 milliards d'euros</strong></ListItem>
          </List>
          <Cite textColor='secondary'>Source : BAROMÈTRE DU NUMÉRIQUE 2018</Cite>
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            Les entreprises en France
          </Heading>
          <List>
            <ListItem><strong>100%</strong> disposent d'une connexion internet à haut débit</ListItem>
            <ListItem><strong>51%</strong> achètent en ligne et <strong>17%</strong> vendent en ligne</ListItem>
            <ListItem>La vente en ligne génère <strong>19%</strong> du chiffre d'affaires en Europe</ListItem>
            <ListItem>L’Open Data Index classe la France en 4e position mondiale en 2016, derrière Taïwan (1er) et
le Royaume-Uni et l’Australie (2èmes ex aequo).</ListItem>
          </List>
          <Cite textColor='secondary'>Source : Chiffres clés du numérique 2018, DGE</Cite>
        </Slide>

        <Slide transition={['zoom']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            Plaidoyer pour la qualité des données
          </Heading>
          <BlockQuote>
            <Quote textSize='1em'>
              La paix, Montag. Proposez des concours où l'on gagne en se souvenant des paroles de quelque chanson populaire, du nom de la capitale de tel ou tel État ou de la quantité de maïs récoltée dans l'Iowa l'année précédente. Bourrez les gens de données incombustibles, gorgez-les de “faits”, qu'ils se sentent gavés, mais absolument “brillants” côté information. Ils auront alors l'impression de penser, ils auront le sentiment du mouvement tout en faisant du sur-place.
            </Quote>
            <Cite textSize='1em' textColor='secondary'>Ray Bradbury - Fahrenheit 451 (1955)</Cite>
          </BlockQuote>
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            Plaidoyer pour la qualité des données
          </Heading>
          <List>
            <ListItem>Une qualité imposée par le réglementaire : lutte contre la fraude, RGPD...</ListItem>
            <ListItem>Une qualité exigée par l'usager : traçabilité, personnalisation ...</ListItem>
          </List>
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            Plaidoyer pour la qualité des données
          </Heading>
          <List>
            <ListItem>Toutes les organisations portent un intérêt croissant aux données qu'elles produisent</ListItem>
            <ListItem>Les possibilités sont multiples : efficacité opérationnelle ou commerciale, informatique décisionnelle, créations de nouveaux services, redéfinition de modèles économiques...</ListItem>
            <ListItem>Mais ces finalités ne peuvent être atteinte que si l'on maîtrise sa production de données</ListItem>
            <ListItem>Gouverner les données avant qu'elles ne nous gouvernent : sémantique partagée, vision unifiée, métadonnées</ListItem>
          </List>
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            Plaidoyer pour la qualité des données
          </Heading>
          <List>
            <ListItem>Gouverner les données avant qu'elles ne nous gouvernent</ListItem>
            <ListItem>Sémantique partagée</ListItem>
            <ListItem>Vision unifiée</ListItem>
            <ListItem>Métadonnées structurées</ListItem>
            <ListItem>Au coeur de l'entreprise : sponsor, équipes convaincues, etc.</ListItem>
          </List>
        </Slide>

        <Slide transition={['spin']} bgColor='bgDark' textColor='pLight'>
          <Heading size={5} textColor='secondary' caps>
            En résumé : l'économie de la donnée et du numérique en 2018
          </Heading>
          <List ordered>
            <ListItem>Informations publiées sur le net à travers le monde</ListItem>
            <ListItem>Les particuliers en France</ListItem>
            <ListItem>Les entreprises en France</ListItem>
            <ListItem>Plaidoyer pour la qualité des données</ListItem>
          </List>
        </Slide>

        <Slide transition={['spin']} bgColor='bgDark' textColor='pLight'>
          <Heading size={5} textColor='secondary' caps>
            L'informaticien apprend les moyens nécessaires pour triompher et rencontre des alliés
          </Heading>
          <Image src={images.Police} />
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            Par où commencer ?
          </Heading>
          <List>
            <ListItem style={{ paddingBottom: '1em' }}>
              Vous êtes face aux menaces et aux opportunités qu'incarnent les données dans votre organisation.
            </ListItem>
            <ListItem style={{ paddingBottom: '1em' }}>
              Vous devez maintenant apprendre les outils et les techniques, et rencontrer les alliés qui vous aideront à réussir dans votre tâche...
            </ListItem>
          </List>
        </Slide>

        <Slide transition={['spin']} bgColor='bgDark' textColor='pLight'>
          <Heading size={5} textColor='secondary' caps>
            La gouvernance des données
          </Heading>
          <List ordered>
            <ListItem>Les systèmes d'informations</ListItem>
            <ListItem>L'archiviste, un partenaire privilégié</ListItem>
            <ListItem>La conformité RGPD</ListItem>
            <ListItem>La sécurité des données personnelles</ListItem>
          </List>
        </Slide>

        <Slide
          transition={['slide']}
          bgColor='bgLight'
          textColor='primary'
          bgImage={images.Gouvernance}
          bgSize='contain'
          bgRepeat='no-repeat'
          align='center flex-start'
        />

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            L'archiviste, un partenaire privilégié
          </Heading>
          <List>
            <ListItem>L'archiviste est un professionnel de l'information chargé de la gestion des archives.</ListItem>
            <ListItem>En France, le terme d'« archiviste » s'applique indifféremment à toute personne gérant des documents, quels qu'en soient l'âge ou l'usage.</ListItem>
            <ListItem>Les anglo-saxons font la différence entre l'archiviste qui gère les archives historiques et le Records manager qui est chargé de la gestion des documents</ListItem>
          </List>
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            La conformité RGPD - Quels objectifs
          </Heading>
          <List>
            <ListItem>Recenser <strong>l’exhaustivité des traitements de données personnelles réalisés</strong> par l’entité (responsable de traitement et sous-traitants) et identifier les potentiels facteurs de risque</ListItem>
            <ListItem>Démontrer aux autorités de contrôle <strong>la conformité au RGPD</strong> des traitements</ListItem>
          </List>
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            La conformité RGPD - Qui sont les responsables
          </Heading>
          <List>
            <ListItem><strong>Le responsable de traitement</strong> (celui qui définit notamment le périmètre de données personnelles et la finalité du traitement) est en charge de la tenue et de la mise à jour du registre des traitements qui sont réalisés sous sa responsabilité.</ListItem>
            <ListItem><strong>Chaque sous-traitant</strong> tient un registre de toutes les catégories d'activités de traitement effectuées pour le compte du responsable du traitement</ListItem>
          </List>
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={6} textColor='secondary'>
            La conformité RGPD - Qu'est ce qu'une donnée personnelle ?
          </Heading>
          <Image src={images.Definitions0} />
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={6} textColor='secondary'>
            La conformité RGPD - Qu'est ce qu'une donnée personnelle ?
          </Heading>
          <Image src={images.Definitions1} />
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={6} textColor='secondary'>
            La conformité RGPD - Qu'est ce qu'une donnée personnelle ?
          </Heading>
          <Image src={images.Definitions2} />
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={6} textColor='secondary'>
            La conformité RGPD - Qui sont les acteurs?
          </Heading>
          <Image src={images.Acteurs0} />
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={6} textColor='secondary'>
            La conformité RGPD - Qui sont les acteurs?
          </Heading>
          <Image src={images.Acteurs1} />
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={6} textColor='secondary'>
            La conformité RGPD - Qui sont les acteurs?
          </Heading>
          <Image src={images.Acteurs2} />
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={6} textColor='secondary'>
            La conformité RGPD - Qui sont les acteurs?
          </Heading>
          <Image src={images.Acteurs3} />
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={6} textColor='secondary'>
            La conformité RGPD - Qui sont les acteurs?
          </Heading>
          <Image src={images.Acteurs4} />
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={6} textColor='secondary'>
            La conformité RGPD - Les 4 fondamentaux du registre des traitements
          </Heading>
          <Image src={images.Piliers} />
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            La conformité RGPD - les finalités du traitement
          </Heading>
          <List>
            <ListItem>La finalité du traitements est l’objectif poursuivi par le traitement.</ListItem>
            <Text>Les finalités doivent être :</Text>
            <ListItem>Homogènes afin d’alimenter le registre des traitements</ListItem>
            <ListItem>Représentatives des enjeux en matière de données personnelles pour l’organisation</ListItem>
          </List>
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={6} textColor='secondary'>
            La conformité RGPD - licéité d'un traitement
          </Heading>
          <Image src={images.Liceite} />
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={6} textColor='secondary'>
            La conformité RGPD - les sous-traitants
          </Heading>
          <Image src={images.SousTraitants} />
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={6} textColor='secondary'>
            La conformité RGPD - la conservation
          </Heading>
          <Image src={images.Conservation} />
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={6} textColor='secondary'>
            La conformité RGPD - identifier les traitements à risque
          </Heading>
          <Image src={images.Risque} />
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={6} textColor='secondary'>
            La conformité RGPD - l'analyse d'impact relative à la protection des données
          </Heading>
          <Image src={images.Aipd} />
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={6} textColor='secondary'>
            La conformité RGPD - les données sensibles et les données risquées
          </Heading>
          <Image src={images.Sensibles} />
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={6} textColor='secondary'>
            La conformité RGPD - la notification de violation de données
          </Heading>
          <Image src={images.Notification} />
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={6} textColor='secondary'>
            La conformité RGPD - le renforcement des droits des personnes
          </Heading>
          <Image src={images.Droit} />
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={6} textColor='secondary'>
            La conformité RGPD - le délégué à la protection des données
          </Heading>
          <Image src={images.Dpd} />
        </Slide>

        <Slide transition={['spin']} bgColor='bgDark' textColor='pLight'>
          <Heading size={5} textColor='secondary' caps>
            Notre héros sortira t'il victorieux de sa quête ?
          </Heading>
          <Image src={images.IceAge} />
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={6} textColor='secondary' caps>
            En résumé : le RGPD et la gouvernance des données
          </Heading>
          <List ordered>
            <ListItem style={{ paddingBottom: '1em' }}>
              Les informaticiens sont confrontés aux enjeux de la gouvernance des données
            </ListItem>
            <ListItem style={{ paddingBottom: '1em' }}>
              Ces contraintes sont aussi des opportunités
            </ListItem>
            <ListItem style={{ paddingBottom: '1em' }}>
              La gestion des systèmes d'informations est la clé pour réussir !
            </ListItem>
          </List>
        </Slide>

        <Slide transition={['spin']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} textColor='secondary' caps>
            La semaine prochaine...
          </Heading>
          <List bulletStyle='star'>
            <ListItem>Serious Game pour les 3eme années du DIIAGE</ListItem>
            <hr />
            <ListItem>Des audits de services</ListItem>
            <ListItem>Un registre des traitements à réaliser</ListItem>
            <ListItem>Un plan d'action à construire...</ListItem>
            <hr />
            <ListItem><strong>Quelle sera la meilleure équipe ?</strong></ListItem>
          </List>
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            La conformité RGPD - 3 étapes pour commencer
          </Heading>
          <List>
            <ListItem>Désigner le délégué à la protection des données</ListItem>
            <ListItem>Etablir le registre des traitements et identifier les points d'amélioration</ListItem>
            <ListItem>Construire son plan d'action pour la mise en conformité</ListItem>
          </List>
        </Slide>

        <Slide transition={['zoom']} bgColor='bgLight' textColor='primary'>
          <BlockQuote>
            <Quote textSize='2em'>
              Les gagnants seront ceux qui restructurent la manière dont l'information circule dans leur entreprise.
            </Quote>
            <Cite textColor='secondary' textSize='1.5em'>William Henry, dit Bill Gates</Cite>
          </BlockQuote>
        </Slide>
      </Deck>
    )
  }
}

export default PresentationComponent
