import { _ } from "./broToolBox.js";

/**
 * boucle sur le templete en incorporant la data
 * si
 * @param {Function} template 
 * @param {ArrayBuffer} data 
 * @param {string} nb 'all' | nombre d'element à sortir
 */
const compoLoop = (template, data, nb = 'all') => {

    let block = ''
    data.forEach((element, i) => {
        nb === 'all'
            ? block += template(element)
            : i < +nb
                ? block += template(element)
                : null
    });

    return block
}

/**
 * récupere des elements de la base de donnée
 * deviendra une class si requete spécifique
 * @param {string} dataName 
 */
const service = async dataName => {
    const r = await fetch(`../data/${dataName}.json`);
    return await r.json();
}

export { compoLoop, service }