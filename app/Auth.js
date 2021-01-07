import { service } from "./Service.js";

export class Auth {

    _savedUser;
    get user() {
        return this._savedUser;
    }

    constructor() {
        this.service = service
    }

    /**
     * vérifie si l'utilisateur existe dans la bdd
     * @param {FormEntity} user 
     * @returns {Promise<InstanceType>} 
     */
    async validate(user) {
        return await this.service('users').then(users => {
            
            let stand = users.find(savedUser => savedUser._name === user._name && savedUser._password === user._password) ?? false
             !stand ? '' : delete stand._password
             this._savedUser = stand
            return this
        })
    }

    isValidated() {
        return !!this._savedUser
    }
}