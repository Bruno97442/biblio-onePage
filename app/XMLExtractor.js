export class XMLExtractor{

    object
    XMLobj
    constructor(object, XMLobjtemplate){

        this.object = object
        this.XMLobjtemplate = XMLobjtemplate
    }

    c(element){
        return document.createElement(element)
    }

    createXML(){
        return this.XMLobjtemplate(this.object)

    }

    download(filename, text) {
        console.log(this.createXML())
        if(text === undefined) text = this.createXML()
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
        console.log('data')
      
        element.style.display = 'none';
        // document.body.appendChild(element);
      
        element.click();
      
        // document.body.removeChild(element);
      }

}

