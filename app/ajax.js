import { addClass, rmClass, _, __ } from "./broToolBox.js";
import { FormController } from "../library/broform/app/Formcontroller.js";



/**
 * charge du text d'une autre page
 * @param {route} route routeObject
 * @returns {Promise}
 */
async function ajax(route) {
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


const loadDelegate = ({ route, ajaxFunc, main, classAnimate, template, service, compoLoop }) =>
    // chercher le template page
    ajaxFunc(route).then(pageData => {
        let { comeIn, leave } = classAnimate
        pageData = StrToHTML(pageData)
        rmClass(leave, pageData)
        addClass(comeIn, pageData)

        let formReceiver = __('form', pageData),
            dataReceiver = __('.data-js', pageData)

        if (formReceiver) formReceiver.forEach(form => {
            (new FormController(form,
                {
                    regexObject: {
                        mi10: /.{10}/
                    },
                    inputType: {
                        password: "empty low upp num spe mi10"
                    },
                    alert: {
                        message: { mi10: "..10 caractères au minimum" }
                    }
                }
            )).run()
        })
        // insert data et componant article dans le template
        if (dataReceiver) dataReceiver.forEach(ele => {

            const { componant: componantName, count } = ele.dataset
            let t, single = false
            if (route.name.match(/[\w]+-[\d]+/)) {
                t = route.name.match(/[\w]+-[\d]+/)[0]
                single = true
            }
            else {
                t = componantName
            }
            service(t).then(compoData => {
                console.log(single)
                let injectable = compoLoop(template[componantName], compoData, count, single)

                ele.innerHTML = injectable

                // loadedTabs.push({
                //     name: Route.name,
                //     content: pageData
                // })
                main.append(pageData)
            })

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
const loadManager = (loadNeeds) => {
    let { loadedTabs, main, classAnimate, route, nav } = loadNeeds
    // let found = loadedTabs.findIndex(x => x.name === route.name)
    // Stock l'objet en local pour charger plus rapidement après la première
    // if (found >= 0 && false) {
    //     main.firstElementChild.remove()
    //     main.append(loadedTabs[found].content)
    // } else {

    if (main.firstElementChild) {
        let child = main.firstElementChild
        rmClass(classAnimate.comeIn, child)
        addClass(classAnimate.leave, child)
        nav.disabledAllToggle()
        setTimeout(() => {

            child.remove()
            nav.disabledAllToggle(false)
        }, 500)
    }

    loadDelegate(loadNeeds)


    // }
}

export { ajax, loadManager }