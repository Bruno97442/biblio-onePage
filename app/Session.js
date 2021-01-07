export class Session {

    storageName = 'biblioSession'

    constructor() {
        this.user = user
        this.storage = sessionStorage
    }

    /**
     * lance les mises à jours de l'app selon
     * @param {callback} callback 
     */
    ifActive(callback) {
        return !!this.storage.getItem('biblioSession')
        ? callback()
        : false
    }

    set(user, callback, param) {
        this.storage.setItem(this.storageName, JSON.stringify(user))
        if(callback){
            if (param) {
                callback(param)
            }
            callback()
        }
    }
}