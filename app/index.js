import { ael, _, __ } from "./broToolBox.js";
import { Router } from "/app/router.js";
import { routes } from "../config/route.js";
import { ajax, loadManager } from "./ajax.js";
import { service } from "./Service.js";
import { Auth } from "./Auth.js";
import { FormEntity } from "./form/Formentity.js";
import { Session } from "./Session.js";
import { Nav } from "./Nav.js";
// http://127.0.0.1:5500/public/index.html
// initialisation des variables globales
/**
 * 
 */
const R = new Router(routes)
    // session = new Session(),
//     nav = new Nav(R)
let loaded = []
// nav.render(session.ifActive())



const clickManager = function (e) {
    // gestion des liens

    let link = e.path.find(ele => ele.localName === 'a')
    if (link) {
        e.preventDefault()

        let routeName = link.getAttribute('href')

        if (link.getAttribute('href') === "back") {
            history.back()
            routeName = history.state.name
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
        // let submitForm = new FormData(form)
        let submitUser = new FormEntity(form)
        let auth = new Auth()
        auth.validate(submitUser).then(auth => {
            console.log(auth)
            if (auth.isValidated()) {
                console.log('test')
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
