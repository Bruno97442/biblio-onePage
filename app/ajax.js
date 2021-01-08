import { addClass, rmClass, _, __ } from "./broToolBox.js";
import { service, compoLoop } from "./Service.js";
// import { awards } from "./componant/awardWinnings.js";
import { rulesComponant } from "./componant/rules.js";
import { awardWiningsComponant } from "./componant/awardWinnings.js";
import { newsComponant } from "./componant/news.js";

let template = {
    rules: rulesComponant,
    awardWinnings: awardWiningsComponant,
    news : newsComponant
}

/**
 * charge du text d'une autre page
 * @param {route} route routeObject
 * @returns {Promise}
 */
async function ajax(route) {
    console.log(route.path)
    const r = await fetch(route.path)
    return await r.text()
}

/**
 * Convertir un string en HTMLElement
 * @param {string} string 
 */
const StrToHTML = string => {
    return document.createRange().createContextualFragment(string).firstElementChild
}

const loadDelegate = (route, ajaxFunc, className, template) =>
    // chercher le template page
    ajaxFunc(route).then(pageData => {
        let main = _('.main-js')    
        pageData = StrToHTML(pageData)
        rmClass('leave', pageData)
        addClass(className, pageData)

        // insert data et componant article dans le template
        let receiver = __('.data-js', pageData)
        if (receiver) receiver.forEach(ele => {

            const { componant: componantName, count } = ele.dataset

            service(componantName).then(compoData => {
                let injectable = compoLoop(template[componantName], compoData, count)

                ele.innerHTML = injectable
             
                // loadedTabs.push({
                //     name: Route.name,
                //     content: pageData
                // })
                main.append(pageData)
            })
            return
        })
        main.append(pageData)

    })

/**
 * Charge les templates, vérifie s'ils des directives data,
 * si c'est le cas récupère les données et son composant pour l'afficher
 * note : réduire la structure pour plus de lisibilité
 * @param {Array} loadedTabs 
 * @param {Function} ajaxFunc 
 * @param {Object} Route 
 */
const loadManager = (loadedTabs, ajaxFunc, Route) => {

    let found = loadedTabs.findIndex(x => x.name === Route.name)
    let main = _('.main-js')
    // Stock l'objet en local pour charger plus rapidement après la première
    if (found >= 0 && false) {
        main.firstElementChild.remove()
        main.append(loadedTabs[found].content)
    } else {
        if (main.firstElementChild) {
            let child = main.firstElementChild
            rmClass('comeIn', child)
            addClass('leave', child)
            setTimeout(() => {

                child.remove()
            }, 500)
        }

        loadDelegate(Route, ajaxFunc, 'comeIn', template)

    }
}

export { ajax, loadManager }