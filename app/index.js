/**
 * Bruno benard
 * benard.bruno97@gmail.com
 * Biblio-OnePage
 */
import { ael, _, __ } from "./broToolBox.js";
import { ajax, loadManager } from "./ajax.js";
import { Auth } from "./Auth.js";
import { Config } from "../config/Config.js";
import { FormEntity } from "./form/Formentity.js";
import { Nav } from "./Nav.js";
import { navItems } from "../config/navItems.js";
import { Router } from "./Router.js";
import { routes } from "../config/route.js";
import { compoLoop, service } from "./Service.js";
import { Session } from "./Session.js";
import { newsComponant } from "./componant/news.js";
import { rulesComponant } from "./componant/rules.js";
import { awardWiningsComponant } from "./componant/awardWinnings.js";
import { XMLExtractor } from "./XMLExtractor.js";
import { XMLBook } from "./componant/XMLBook.js";
// http://127.0.0.1:5500/public/index.html
/**
 * initialisation des variables globales
 * la gestion des routes est centraliser dans la class router
 * toutes les routes sont dans /config
 * session permet de stocker les droits de l'utilisateur dans le navigateur 
 * La Nav gére les droits d'accés dans la bar de navigation
 */
const R = new Router(routes),
    session = new Session(window[Config.storageMethod], Config.sessionName),
    nav = new Nav(navItems, R, _('.nav-js'))
let loaded = []
// en cas de refraiche de la page 
nav.run(session.ifActive())

let template = {
    rules: rulesComponant,
    awardWinnings: awardWiningsComponant,
    news: newsComponant
}

const loadNeeds = {
    loadedTabs: loaded,
    ajaxFunc: ajax,
    main: _('.main-js'),
    route: {},
    router: R,
    setRoute: settingRoute => {loadNeeds.route = R.getRoute(settingRoute); return loadNeeds},
    setRouteRewrite: settingRoute => {loadNeeds.route = R.getRoute(settingRoute); R.rewrite(settingRoute); return loadNeeds},
    init: ()=> {loadNeeds.route = R.init(); return loadNeeds},
    nav: nav,
    template: template,
    classAnimate: {comeIn: 'comeIn', leave:'leave'},
    service: service,
    compoLoop: compoLoop
}

/**
 * Est-ce un router ou l'utilise seulement
 * autoloader permettrer d'améliorer ça gestion
 * note : problème d'architecture à médité
 * @param {Event} e clickEvent
 */
const clickManager = function (e) {

    let link = e.path.find(ele => ele.localName === 'a')
    if (link) {
        e.preventDefault()
        // récupere la directive routeName | autre directive
        let routeName = link.getAttribute('href')

        if (routeName === "back") {
            history.back()
            routeName = history.state.name
        }
        // gestion des XML leur recherche dans la bdd factice, puis la transformation en XML et sont telechargement
        if (routeName.match("XML")) {
            service(`awardWinnings-${routeName.match(/[0-9]+/)[0]}`).then(data => {
                let xml = new XMLExtractor(data, XMLBook)
                xml.download(`${routeName.match(/['\w]+$/)}.xml`)

            })

            return
        }

        if (routeName === "logOut") {
            sessionStorage.clear()
            nav.run(session.ifActive())
            loadManager(loadNeeds.setRouteRewrite('home'))
            return
        }

        // charge uniquement si différent
        R.getUrl().match(routeName)
            ? null
            : loadManager(loadNeeds.setRoute(routeName))

        R.rewrite(routeName)
        nav.activateLink()

    }
}
const submitManager = e => {
    let form = e.target
    e.preventDefault()

    let submitdata = new FormEntity(form)

    if (form.getAttribute('action') === 'logIn') {
        let auth = new Auth(service)
        auth.validate(submitdata).then(auth => {
            if (auth.isValidated()) {
                session.set(auth.user)
                nav.run(session.ifActive())
                loadManager(loadNeeds.setRoute('dashboard'))

            } else {
                alert('identifiant ou mot de passe érroné !')
            }
        })
    }

    if (form.getAttribute('action') === 'usersInscription') {
        session.set(submitdata)
        loadManager(loadNeeds.setRouteRewrite('dashboard'))
        nav.run(session.ifActive())

    }
}
// init navigation
loadManager(loadNeeds.init())
// ..sur click
ael('click', document, clickManager)
// sur history back and forward
window.onpopstate = function (e) {
    loadManager(loadNeeds.setRoute(e.state.name))

}
// authentification enregistrement d'utilisateur, de livre ...

ael('submit', document, submitManager)
