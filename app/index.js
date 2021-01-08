import { ael, _, __ } from "./broToolBox.js";
import { Router } from "/app/router.js";
import { routes } from "../config/route.js";
import { ajax, loadManager } from "./ajax.js";
import { service } from "./Service.js";
import { Auth } from "./Auth.js";
import { FormEntity } from "./form/Formentity.js";
import { Session } from "./Session.js";
import { Nav } from "./Nav.js";
import { Config } from "../config/config.js";
import { XMLExtractor } from "./XMLExtractor.js";
import { XMLBook } from "./componant/XMLBook.js";
// http://127.0.0.1:5500/public/index.html
// initialisation des variables globales
/**
 * la gestion des routes est centraliser dans la class router
 * toutes les routes sont dans /config
 * session permet de stocker les droits de l'utilisateur dans le navigateur 
 * La Nav gérer les droits d'accés dans la bar de navigation
 */
const R = new Router(routes),
    session = new Session(sessionStorage, Config.sessionName),
    nav = new Nav(R, _('.nav-js'))
let loaded = []
nav.run(session.ifActive())
// nav.render(session.ifActive())



const clickManager = function (e) {
    // gestion des liens

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
            service(`awardWinnings-${routeName.match(/[0-9]+/)[0]}`).then(data =>{
                console.log(data)
                let xml = new XMLExtractor(data, XMLBook)
                xml.download(`${routeName.match(/['\w]+$/)}.xml`)

            })
            
            return
        }

        if (routeName === "logOut") {
            sessionStorage.clear()
            nav.run(session.ifActive())
            loadManager(loaded, ajax, R.getRoute('home'))
            return
        }

        R.getUrl().match(routeName)
            ? null
            : loadManager(loaded, ajax, R.getRoute(routeName))

        R.rewrite(routeName)
    }
}
const submitManager = e => {
    let form = e.target
    e.preventDefault()

    if (form.getAttribute('action') === 'logIn') {
        let submitUser = new FormEntity(form)
        let auth = new Auth(service)
        auth.validate(submitUser).then(auth => {
            console.log(auth)
            if (auth.isValidated()) {
                session.set(auth.user)
                nav.run(session.ifActive())
                loadManager(loaded, ajax, R.getRoute('dashboard'))

            } else {
                alert('identifiant ou mot de passe érroné !')
            }
        })


    }
}
// init navigation
R.rewrite('home')
loadManager(loaded, ajax, R.getRoute('home'))
// ..sur click
ael('click', document, clickManager)
// sur history back and forward
window.onpopstate = function (e) {
    loadManager(loaded, ajax, R.getRoute(e.state.name))

}
// authentification enregistrement d'utilisateur, de livre ...

ael('submit', document, submitManager)
