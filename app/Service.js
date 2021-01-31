import { _ } from "./broToolBox.js";

/**
 * boucle sur le templete en incorporant la data
 * si
 * @param {Function} template 
 * @param {ArrayBuffer} data 
 * @param {string} nb 'all' | nombre d'element à sortir
 */
const compoLoop = (template, data, nb = 'all', single = false) => {

    let block = ''
    data.forEach((element, i) => {
        nb === 'all'
            ? block += template(element, single, i === 0)
            : i < +nb
                ? block += template(element, single)
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
    const isById = dataName.match(/-[0-9]{1,}$/)
    if (isById) {
        const [DATANAME, searchedId] = dataName.split('-'),
            data = await fetch(`../data/${DATANAME}s.json`).then(r => r.json()).then(data => [data.find(items => items._id === +searchedId)]);
        return await data;
    }


    const r = await fetch(`../data/${dataName}.json`);
    return await r.json();

}


export { compoLoop, service }