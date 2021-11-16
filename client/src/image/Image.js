


class Image {

    constructor(id, name, textfields){
        this.id = id;
        this.name = name;
        this.textfields = textfields;
    }

    


     

    static from (json){
        
        return new Image(json.id, json.name, json.textfields);
    }
}

export default Image;