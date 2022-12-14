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
            et la Gouvernance des Donn??es
          </Text>
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={6} textColor='secondary' caps>
            Au sommaire
          </Heading>
          <List ordered>
            <ListItem style={{ paddingBottom: '1em' }}>
              Un informaticien est confront?? aux enjeux de la gouvernance des donn??es
            </ListItem>
            <ListItem style={{ paddingBottom: '1em' }}>
              O?? l'on comprend que ces contraintes sont aussi des opportunit??s
            </ListItem>
            <ListItem style={{ paddingBottom: '1em' }}>
              L'informaticien apprend les moyens n??cessaires pour triompher et rencontre des alli??s
            </ListItem>
            <ListItem style={{ paddingBottom: '1em' }}>
              Notre h??ros sortira t'il victorieux de sa qu??te ?
            </ListItem>
          </List>
        </Slide>

        <Slide transition={['spin']} bgColor='bgDark' textColor='pLight'>
          <Heading size={5} textColor='secondary' caps>
            Un informaticien est confront?? aux enjeux de la gouvernance des donn??es
          </Heading>
          <Image src={images.AngryTyping} />
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            ??a aurait pu ??tre pire...
          </Heading>
          <List>
            <ListItem style={{ paddingBottom: '1em' }}>
              Un pirate profite d'un vieil acc??s TSE oubli?? pour ex??cuter une ransonware dans la DMZ
            </ListItem>
            <ListItem style={{ paddingBottom: '1em' }}>
              Le service informatique restaure les donn??es ?? partir des sauvegardes. L'impact est limit??.
            </ListItem>
            <ListItem style={{ paddingBottom: '1em' }}>
              Le directeur est conscient d'avoir ??chapp?? au pire. Il vous charge de travailler sur la protection les donn??es de l'entreprise.
            </ListItem>
            <ListItem style={{ paddingBottom: '1em' }}>
              Vous allez d??couvrir l'ampleur du probl??me...
            </ListItem>
          </List>
        </Slide>

        <Slide transition={['spin']} bgColor='bgDark' textColor='pLight'>
          <Heading size={5} textColor='secondary' caps>
            La r??gulation des donn??es
          </Heading>
          <List ordered>
            <ListItem>Ma??triser les donn??es, un probl??me qui ne date pas d'hier</ListItem>
            <ListItem>Les objectifs de la r??gulation</ListItem>
            <ListItem>La l??gislation</ListItem>
            <ListItem>Le G29 (1995)</ListItem>
            <ListItem>La CNIL (1978)</ListItem>
            <ListItem>Exemples de sanctions</ListItem>
            <ListItem>Focus sur le cloud souverain</ListItem>
          </List>
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            Ma??triser les donn??es, un probl??me qui ne date pas d'hier
          </Heading>
          <List>
            <ListItem>
              <strong>Ann??es 1970-1980 - Vigilance face aux gros fichiers de l'Etat</strong><br />
              SAFARI : un projet de ?? mise en fiches ?? de la population fran??aise (INSEE)
            </ListItem>
            <ListItem>
              <strong>Ann??es 1990 - Les donn??es du marketing</strong>
            </ListItem>
            <ListItem>
              <strong>Ann??es 2000 - Mondialisation</strong><br />
              Naissance des g??ants de l'internet
            </ListItem>
            <ListItem>
              <strong>Ann??es 2010 - Prise de conscience collective</strong><br />
              La r??glementation se renforce ; les GAFA dans le viseur ; 2013 - affaire Snowden
            </ListItem>
          </List>
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            Ma??triser les donn??es, un probl??me qui ne date pas d'hier
          </Heading>
          <div style={{ paddingTop: '1em' }}>
            <iframe title='La CNIL a 40 ans' width='560' height='315' src='https://www.youtube.com/embed/Th-rzrc3488' frameBorder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowFullScreen />
          </div>
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            Les objectifs de la r??gulation
          </Heading>
          <List>
            <ListItem><strong>Responsabilit??</strong><br />
            Efficacit?? de la gestion et s??curit?? des donn??es</ListItem>
            <ListItem><strong>Transparence</strong><br />
            Renforcer les relations entre parties prenantes</ListItem>
            <ListItem><strong>Confiance</strong><br />
            D??velopper l'??conomie num??rique et favoriser l'innovation</ListItem>
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
            La l??gislation
          </Heading>
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            Le Comit?? Europ??en de la Protection des donn??es : le G29
          </Heading>
          <Text style={{ paddingTop: '1em' }}>
            L'organisation qui r??unit l'ensemble des CNIL europ??ennes.
          </Text>
          <List>
            <ListItem><strong>Contribue ?? l?????laboration des normes</strong><br />
              europ??ennes en adoptant des recommandations
            </ListItem>
            <ListItem><strong>Rend des avis</strong><br />
              sur le niveau de protection dans les pays hors UE
            </ListItem>
            <ListItem><strong>Conseille la Commission europ??enne</strong><br />
              sur tout projet ayant une incidence la protection des donn??es et libert??s des personnes
            </ListItem>
          </List>
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            La CNIL : ses missions
          </Heading>
          <List>
            <ListItem>Informer, prot??ger les droits</ListItem>
            <ListItem>Accompagner la conformit?? / conseiller</ListItem>
            <ListItem>Anticiper et innover</ListItem>
            <ListItem>Contr??ler et sanctionner</ListItem>
          </List>
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            La CNIL : son fonctionnement
          </Heading>
          <List>
            <ListItem>Autorit?? administrative ind??pendante</ListItem>
            <ListItem>
              Coll??ge pluridisciplinaire de 18 membres (d??put??s, repr??sentant de la CADA, experts, etc.)
            </ListItem>
            <ListItem>Commission pl??ni??re hebdomadaire de 5 membres</ListItem>
          </List>
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            La CNIL : sanctions et cons??quences
          </Heading>
          <List>
            <ListItem><strong>Op??rationnelles</strong><br />
              &nbsp;&nbsp;-&nbsp;Interdiction / suppression<br />
              &nbsp;&nbsp;-&nbsp;Retrait de certification pour les outils de conformit??
            </ListItem>
            <ListItem><strong>Image</strong><br />
              &nbsp;&nbsp;-&nbsp;D??gradation de l'image et de la r??putation
            </ListItem>
            <ListItem><strong>Financi??res</strong><br />
              &nbsp;&nbsp;-&nbsp;Amendes administratives jusqu'?? 20 millions d'euros<br />
              &nbsp;&nbsp;-&nbsp;Actions judiciaires individuelles ou collectives
            </ListItem>
          </List>
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            Le RGPD : bilan 6 mois apr??s
          </Heading>
          <List>
            <ListItem><strong>32000</strong> organismes ont d??sign?? un d??l??gu?? ?? la protection des donn??es</ListItem>
            <ListItem><strong>1000</strong> notifications de violations de donn??es ont ??t?? re??ues, soit environ 7 par jour depuis le 25 mai</ListItem>
            <ListItem><strong>9700</strong> plaintes soit 34% de plus qu???en 2017 sur la m??me p??riode</ListItem>
            <ListItem><strong>345</strong> plaintes transfrontali??res</ListItem>
            <ListItem><strong>3</strong> plaintes collectives</ListItem>
            <ListItem><strong>66%</strong> des Fran??ais se disent plus sensibles que ces derni??res ann??es ?? la protection de leurs donn??es personnelles</ListItem>
          </List>
        </Slide>

        <Slide transition={['zoom']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            Exemples de sanctions
          </Heading>
          <BlockQuote>
            <Quote textSize='1.5em'>
              Ces amis trop empress??s qui vous rendent des services qu'on ne leur a pas demand??s - La pire forme d'indiscr??tion. On ne devrait pas s'occuper de nous sans notre consentement.
            </Quote>
            <Cite textSize='1em' textColor='secondary'>Emil Michel Cioran - Cahiers, 1957-1972</Cite>
          </BlockQuote>
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
          ASSISTANCE CENTRE D???APPELS<br />10 000 ???
          </Heading>
          <BlockQuote>
            <Quote textSize='1.5em'>
              Pour avoir notamment mis en ??uvre ill??galement un syst??me biom??trique ?? des fins de contr??le des horaires des salari??s.
            </Quote>
            <Cite textSize='1em' textColor='secondary'>20 septembre 2018</Cite>
          </BlockQuote>
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            ALLIANCE FRANCAISE<br />PARIS ??LE DE FRANCE<br />30 000 ???
          </Heading>
          <BlockQuote>
            <Quote textSize='1.5em'>
            Pour avoir insuffisamment s??curis?? les donn??es des personnes suivant les cours de fran??ais qu???elle dispense.
            </Quote>
            <Cite textSize='1em' textColor='secondary'>27 septembre 2018</Cite>
          </BlockQuote>
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            UBER<br />400 000 ???
          </Heading>
          <BlockQuote>
            <Quote textSize='1.5em'>
              Pour avoir insuffisamment s??curis?? les donn??es des utilisateurs de son service de VTC.
            </Quote>
            <Cite textSize='1em' textColor='secondary'>20 d??cembre 2018</Cite>
          </BlockQuote>
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            BOUYGUES TELECOM<br />250 000 ???
          </Heading>
          <BlockQuote>
            <Quote textSize='1.5em'>
              Pour avoir insuffisamment prot??g?? les donn??es de clients B&You.
            </Quote>
            <Cite textSize='1em' textColor='secondary'>27 d??cembre 2018</Cite>
          </BlockQuote>
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            Google LLC<br />50 000 000 ???
          </Heading>
          <BlockQuote>
            <Quote textSize='1.5em'>
              En application du RGPD pour manque de transparence, information insatisfaisante et absence de consentement valable pour la personnalisation de la publicit??.
            </Quote>
            <Cite textSize='1em' textColor='secondary'>21 janvier 2019</Cite>
          </BlockQuote>
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            Focus sur le cloud souverain
          </Heading>
          <List>
            <ListItem>Confidentialit?? et s??curit?? des donn??es face aux l??gislations ??trang??res (Patriot Act)</ListItem>
            <ListItem>Les donn??es et documents num??riques consid??r??s commes des "tr??sors nationaux"</ListItem>
            <ListItem>Ne pas soumettre nos donn??es ?? ces lois</ListItem>
            <ListItem>05/04/2016 : circulaire de la Direction g??n??rale des collectivit??s locales, conjointement avec la Direction g??n??rale des patrimoines</ListItem>
          </List>
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            Cloud souverain : quelles options
          </Heading>
          <List>
            <ListItem>Cloud priv?? interne</ListItem>
            <ListItem>Utiliser des datas centers situ??s sur le territoire nationale, par des soci??t??s de droit fran??ais ou europ??en</ListItem>
            <ListItem>Fiasco du programme Androm??de (2009) : Cloudwatt (Orange / Thales), Numergy (SFR / Bull)</ListItem>
            <ListItem>R??f??rentiel de certification : SecNumCloud (ANSSI)</ListItem>
            <ListItem>R??f??rentiel de certification franco-allemand : European Secure Cloud - ESCloud (ANSSI / BSI)</ListItem>
          </List>
        </Slide>

        <Slide transition={['spin']} bgColor='bgDark' textColor='pLight'>
          <Heading size={5} textColor='secondary' caps>
            En r??sum?? : la r??gulation des donn??es
          </Heading>
          <List ordered>
            <ListItem>Ma??triser les donn??es, un probl??me qui ne date pas d'hier</ListItem>
            <ListItem>Les objectifs de la r??gulation</ListItem>
            <ListItem>La l??gislation</ListItem>
            <ListItem>Le G29 (1995)</ListItem>
            <ListItem>La CNIL (1978)</ListItem>
            <ListItem>Exemples de sanctions</ListItem>
            <ListItem>Focus sur le cloud souverain</ListItem>
          </List>
        </Slide>

        <Slide transition={['spin']} bgColor='bgDark' textColor='pLight'>
          <Heading size={5} textColor='secondary' caps>
            O?? l'on comprend que ces contraintes sont aussi des opportunit??s
          </Heading>
          <Image src={images.Joey} />
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            Un monde d'opportunit??s
          </Heading>
          <List>
            <ListItem style={{ paddingBottom: '1em' }}>
              Vous venez de d??couvrir les contraintes qui p??sent sur l'activit?? de votre entreprise et les risques que vous prenez ?? essayer de rester sous le radar de l'autorit?? de r??gulation.
            </ListItem>
            <ListItem style={{ paddingBottom: '1em' }}>
              Mais en passant, vous allez apprendre que les donn??es sont une source de valeur qu'il serait dommage de n??gliger...
            </ListItem>
          </List>
        </Slide>

        <Slide transition={['spin']} bgColor='bgDark' textColor='pLight'>
          <Heading size={5} textColor='secondary' caps>
            L'??conomie de la donn??e et du num??rique en 2018
          </Heading>
          <List ordered>
            <ListItem>Informations publi??es sur le net ?? travers le monde</ListItem>
            <ListItem>Les particuliers en France</ListItem>
            <ListItem>Les entreprises en France</ListItem>
            <ListItem>Plaidoyer pour la qualit?? des donn??es</ListItem>
          </List>
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            Informations publi??es sur le net ?? travers le monde
          </Heading>
          <List>
            <ListItem><strong>3 800 000 000</strong> d???humains utilisent Internet dans le monde.</ListItem>
            <ListItem><strong>90%</strong> des donn??es disponibles dans le monde ont ??t?? cr????es dans les deux derni??res ann??es.</ListItem>
            <ListItem>Un volume d'information de <strong>2,5 quintilions d???octets</strong> est cr???? chaque jour soit <strong>29 000 Gigaoctets</strong> par seconde.</ListItem>
          </List>
          <Cite textColor='secondary'>Source : planetoscope.com</Cite>
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            Les particuliers en France
          </Heading>
          <List>
            <ListItem><strong>46%</strong> de la population se connecte ?? internet via le smartphone</ListItem>
            <ListItem><strong>Une personne sur deux</strong> utilise internet pour rechercher des informations sur sa sant?? ou celle de ses proches</ListItem>
            <ListItem><strong>67%</strong> des particuliers ont r??alis?? au moins une commande en ligne</ListItem>
            <ListItem>En 10 ans le chiffre d'affaires des ventes aux particuliers via internet est pass?? de 20 milliards ?? <strong>81,7 milliards d'euros</strong></ListItem>
          </List>
          <Cite textColor='secondary'>Source : BAROM??TRE DU NUM??RIQUE 2018</Cite>
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            Les entreprises en France
          </Heading>
          <List>
            <ListItem><strong>100%</strong> disposent d'une connexion internet ?? haut d??bit</ListItem>
            <ListItem><strong>51%</strong> ach??tent en ligne et <strong>17%</strong> vendent en ligne</ListItem>
            <ListItem>La vente en ligne g??n??re <strong>19%</strong> du chiffre d'affaires en Europe</ListItem>
            <ListItem>L???Open Data Index classe la France en 4e position mondiale en 2016, derri??re Ta??wan (1er) et
le Royaume-Uni et l???Australie (2??mes ex aequo).</ListItem>
          </List>
          <Cite textColor='secondary'>Source : Chiffres cl??s du num??rique 2018, DGE</Cite>
        </Slide>

        <Slide transition={['zoom']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            Plaidoyer pour la qualit?? des donn??es
          </Heading>
          <BlockQuote>
            <Quote textSize='1em'>
              La paix, Montag. Proposez des concours o?? l'on gagne en se souvenant des paroles de quelque chanson populaire, du nom de la capitale de tel ou tel ??tat ou de la quantit?? de ma??s r??colt??e dans l'Iowa l'ann??e pr??c??dente. Bourrez les gens de donn??es incombustibles, gorgez-les de ???faits???, qu'ils se sentent gav??s, mais absolument ???brillants??? c??t?? information. Ils auront alors l'impression de penser, ils auront le sentiment du mouvement tout en faisant du sur-place.
            </Quote>
            <Cite textSize='1em' textColor='secondary'>Ray Bradbury - Fahrenheit 451 (1955)</Cite>
          </BlockQuote>
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            Plaidoyer pour la qualit?? des donn??es
          </Heading>
          <List>
            <ListItem>Une qualit?? impos??e par le r??glementaire : lutte contre la fraude, RGPD...</ListItem>
            <ListItem>Une qualit?? exig??e par l'usager : tra??abilit??, personnalisation ...</ListItem>
          </List>
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            Plaidoyer pour la qualit?? des donn??es
          </Heading>
          <List>
            <ListItem>Toutes les organisations portent un int??r??t croissant aux donn??es qu'elles produisent</ListItem>
            <ListItem>Les possibilit??s sont multiples : efficacit?? op??rationnelle ou commerciale, informatique d??cisionnelle, cr??ations de nouveaux services, red??finition de mod??les ??conomiques...</ListItem>
            <ListItem>Mais ces finalit??s ne peuvent ??tre atteinte que si l'on ma??trise sa production de donn??es</ListItem>
            <ListItem>Gouverner les donn??es avant qu'elles ne nous gouvernent : s??mantique partag??e, vision unifi??e, m??tadonn??es</ListItem>
          </List>
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            Plaidoyer pour la qualit?? des donn??es
          </Heading>
          <List>
            <ListItem>Gouverner les donn??es avant qu'elles ne nous gouvernent</ListItem>
            <ListItem>S??mantique partag??e</ListItem>
            <ListItem>Vision unifi??e</ListItem>
            <ListItem>M??tadonn??es structur??es</ListItem>
            <ListItem>Au coeur de l'entreprise : sponsor, ??quipes convaincues, etc.</ListItem>
          </List>
        </Slide>

        <Slide transition={['spin']} bgColor='bgDark' textColor='pLight'>
          <Heading size={5} textColor='secondary' caps>
            En r??sum?? : l'??conomie de la donn??e et du num??rique en 2018
          </Heading>
          <List ordered>
            <ListItem>Informations publi??es sur le net ?? travers le monde</ListItem>
            <ListItem>Les particuliers en France</ListItem>
            <ListItem>Les entreprises en France</ListItem>
            <ListItem>Plaidoyer pour la qualit?? des donn??es</ListItem>
          </List>
        </Slide>

        <Slide transition={['spin']} bgColor='bgDark' textColor='pLight'>
          <Heading size={5} textColor='secondary' caps>
            L'informaticien apprend les moyens n??cessaires pour triompher et rencontre des alli??s
          </Heading>
          <Image src={images.Police} />
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            Par o?? commencer ?
          </Heading>
          <List>
            <ListItem style={{ paddingBottom: '1em' }}>
              Vous ??tes face aux menaces et aux opportunit??s qu'incarnent les donn??es dans votre organisation.
            </ListItem>
            <ListItem style={{ paddingBottom: '1em' }}>
              Vous devez maintenant apprendre les outils et les techniques, et rencontrer les alli??s qui vous aideront ?? r??ussir dans votre t??che...
            </ListItem>
          </List>
        </Slide>

        <Slide transition={['spin']} bgColor='bgDark' textColor='pLight'>
          <Heading size={5} textColor='secondary' caps>
            La gouvernance des donn??es
          </Heading>
          <List ordered>
            <ListItem>Les syst??mes d'informations</ListItem>
            <ListItem>L'archiviste, un partenaire privil??gi??</ListItem>
            <ListItem>La conformit?? RGPD</ListItem>
            <ListItem>La s??curit?? des donn??es personnelles</ListItem>
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
            L'archiviste, un partenaire privil??gi??
          </Heading>
          <List>
            <ListItem>L'archiviste est un professionnel de l'information charg?? de la gestion des archives.</ListItem>
            <ListItem>En France, le terme d'?? archiviste ?? s'applique indiff??remment ?? toute personne g??rant des documents, quels qu'en soient l'??ge ou l'usage.</ListItem>
            <ListItem>Les anglo-saxons font la diff??rence entre l'archiviste qui g??re les archives historiques et le Records manager qui est charg?? de la gestion des documents</ListItem>
          </List>
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            La conformit?? RGPD - Quels objectifs
          </Heading>
          <List>
            <ListItem>Recenser <strong>l???exhaustivit?? des traitements de donn??es personnelles r??alis??s</strong> par l???entit?? (responsable de traitement et sous-traitants) et identifier les potentiels facteurs de risque</ListItem>
            <ListItem>D??montrer aux autorit??s de contr??le <strong>la conformit?? au RGPD</strong> des traitements</ListItem>
          </List>
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            La conformit?? RGPD - Qui sont les responsables
          </Heading>
          <List>
            <ListItem><strong>Le responsable de traitement</strong> (celui qui d??finit notamment le p??rim??tre de donn??es personnelles et la finalit?? du traitement) est en charge de la tenue et de la mise ?? jour du registre des traitements qui sont r??alis??s sous sa responsabilit??.</ListItem>
            <ListItem><strong>Chaque sous-traitant</strong> tient un registre de toutes les cat??gories d'activit??s de traitement effectu??es pour le compte du responsable du traitement</ListItem>
          </List>
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={6} textColor='secondary'>
            La conformit?? RGPD - Qu'est ce qu'une donn??e personnelle ?
          </Heading>
          <Image src={images.Definitions0} />
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={6} textColor='secondary'>
            La conformit?? RGPD - Qu'est ce qu'une donn??e personnelle ?
          </Heading>
          <Image src={images.Definitions1} />
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={6} textColor='secondary'>
            La conformit?? RGPD - Qu'est ce qu'une donn??e personnelle ?
          </Heading>
          <Image src={images.Definitions2} />
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={6} textColor='secondary'>
            La conformit?? RGPD - Qui sont les acteurs?
          </Heading>
          <Image src={images.Acteurs0} />
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={6} textColor='secondary'>
            La conformit?? RGPD - Qui sont les acteurs?
          </Heading>
          <Image src={images.Acteurs1} />
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={6} textColor='secondary'>
            La conformit?? RGPD - Qui sont les acteurs?
          </Heading>
          <Image src={images.Acteurs2} />
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={6} textColor='secondary'>
            La conformit?? RGPD - Qui sont les acteurs?
          </Heading>
          <Image src={images.Acteurs3} />
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={6} textColor='secondary'>
            La conformit?? RGPD - Qui sont les acteurs?
          </Heading>
          <Image src={images.Acteurs4} />
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={6} textColor='secondary'>
            La conformit?? RGPD - Les 4 fondamentaux du registre des traitements
          </Heading>
          <Image src={images.Piliers} />
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            La conformit?? RGPD - les finalit??s du traitement
          </Heading>
          <List>
            <ListItem>La finalit?? du traitements est l???objectif poursuivi par le traitement.</ListItem>
            <Text>Les finalit??s doivent ??tre :</Text>
            <ListItem>Homog??nes afin d???alimenter le registre des traitements</ListItem>
            <ListItem>Repr??sentatives des enjeux en mati??re de donn??es personnelles pour l???organisation</ListItem>
          </List>
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={6} textColor='secondary'>
            La conformit?? RGPD - lic??it?? d'un traitement
          </Heading>
          <Image src={images.Liceite} />
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={6} textColor='secondary'>
            La conformit?? RGPD - les sous-traitants
          </Heading>
          <Image src={images.SousTraitants} />
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={6} textColor='secondary'>
            La conformit?? RGPD - la conservation
          </Heading>
          <Image src={images.Conservation} />
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={6} textColor='secondary'>
            La conformit?? RGPD - identifier les traitements ?? risque
          </Heading>
          <Image src={images.Risque} />
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={6} textColor='secondary'>
            La conformit?? RGPD - l'analyse d'impact relative ?? la protection des donn??es
          </Heading>
          <Image src={images.Aipd} />
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={6} textColor='secondary'>
            La conformit?? RGPD - les donn??es sensibles et les donn??es risqu??es
          </Heading>
          <Image src={images.Sensibles} />
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={6} textColor='secondary'>
            La conformit?? RGPD - la notification de violation de donn??es
          </Heading>
          <Image src={images.Notification} />
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={6} textColor='secondary'>
            La conformit?? RGPD - le renforcement des droits des personnes
          </Heading>
          <Image src={images.Droit} />
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={6} textColor='secondary'>
            La conformit?? RGPD - le d??l??gu?? ?? la protection des donn??es
          </Heading>
          <Image src={images.Dpd} />
        </Slide>

        <Slide transition={['spin']} bgColor='bgDark' textColor='pLight'>
          <Heading size={5} textColor='secondary' caps>
            Notre h??ros sortira t'il victorieux de sa qu??te ?
          </Heading>
          <Image src={images.IceAge} />
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={6} textColor='secondary' caps>
            En r??sum?? : le RGPD et la gouvernance des donn??es
          </Heading>
          <List ordered>
            <ListItem style={{ paddingBottom: '1em' }}>
              Les informaticiens sont confront??s aux enjeux de la gouvernance des donn??es
            </ListItem>
            <ListItem style={{ paddingBottom: '1em' }}>
              Ces contraintes sont aussi des opportunit??s
            </ListItem>
            <ListItem style={{ paddingBottom: '1em' }}>
              La gestion des syst??mes d'informations est la cl?? pour r??ussir !
            </ListItem>
          </List>
        </Slide>

        <Slide transition={['spin']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} textColor='secondary' caps>
            La semaine prochaine...
          </Heading>
          <List bulletStyle='star'>
            <ListItem>Serious Game pour les 3eme ann??es du DIIAGE</ListItem>
            <hr />
            <ListItem>Des audits de services</ListItem>
            <ListItem>Un registre des traitements ?? r??aliser</ListItem>
            <ListItem>Un plan d'action ?? construire...</ListItem>
            <hr />
            <ListItem><strong>Quelle sera la meilleure ??quipe ?</strong></ListItem>
          </List>
        </Slide>

        <Slide transition={['slide']} bgColor='bgLight' textColor='primary'>
          <Heading size={5} lineHeight={1} textColor='secondary'>
            La conformit?? RGPD - 3 ??tapes pour commencer
          </Heading>
          <List>
            <ListItem>D??signer le d??l??gu?? ?? la protection des donn??es</ListItem>
            <ListItem>Etablir le registre des traitements et identifier les points d'am??lioration</ListItem>
            <ListItem>Construire son plan d'action pour la mise en conformit??</ListItem>
          </List>
        </Slide>

        <Slide transition={['zoom']} bgColor='bgLight' textColor='primary'>
          <BlockQuote>
            <Quote textSize='2em'>
              Les gagnants seront ceux qui restructurent la mani??re dont l'information circule dans leur entreprise.
            </Quote>
            <Cite textColor='secondary' textSize='1.5em'>William Henry, dit Bill Gates</Cite>
          </BlockQuote>
        </Slide>
      </Deck>
    )
  }
}

export default PresentationComponent
