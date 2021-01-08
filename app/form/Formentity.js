
export class FormEntity {


    /**
     * 
     * @param {HTMLFormElement} form 
     */
    constructor(form) {

        form.querySelectorAll('input[name]').forEach(input => 
            !!input.value ? this[input.name] =  input.value : null
        )
    }

    toJson(){
        // let json =  Object.entries(this).forEach( )
        // console.log(json)
    }
}