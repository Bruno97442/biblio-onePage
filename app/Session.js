export class Session {

    storageName
    user = {}
    /**
     * gére la sauvegarde des données
     * @param {WindowLocalStorage | WindowSessionStorage} browserStorage 
     */
    constructor(browserStorage, storageName) {

        this.storage = browserStorage
        this.storageName = storageName
    }

    /**
     * lance les mises à jours de l'app selon
     * @param {callback} callback 
     */
    ifActive(sessionName) {
        return this.storage.getItem(this.storageName)
            ? JSON.parse(this.storage.getItem(this.storageName))
            : { _role: "false" }
    }

    set(user, callback, param) {
        this.storage.setItem(this.storageName, JSON.stringify(user))
        this.user = user
        if (callback) {
            if (param) {
                callback(param)
            }
            callback()
        }
    }

}