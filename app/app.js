import { ael, _, __ } from "./broToolBox.js";
import { Router } from "/app/router.js";
import { routes } from "../config/route.js";
import { ajax, loadManager } from "./ajax.js";
// http://127.0.0.1:5500/public/index.html
let R = new Router(routes)
ajax(R.init()).then(data => _('.main-js').innerHTML = data)
let loaded = []
const clickManager = function (e) {
    // gestion des liens
    if (e.target.localName === 'a') {
        
        e.preventDefault()
        
        const routeName = e.target.getAttribute('href')
        R.rewrite(routeName)
        
        loadManager(loaded, ajax, R.getRoute(routeName))
        
        // document.removeEventListener('click', clickManager)
    }
}

document.addEventListener('click', clickManager)


// charger les données
__('.data')


