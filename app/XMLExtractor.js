export class XMLExtractor{

    object
    XMLobj
    constructor(object, XMLobjtemplate){

        this.object = object
        this.XMLobjtemplate = XMLobjtemplate
    }

    createXML(){
        return this.XMLobjtemplate(this.object)
    }

    download(filename, text) {
        if(text === undefined) text = this.createXML()
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
      
        element.style.display = 'none';
        element.click();
      }

}

