
import '../App.css';

import './../css/custom.css';



class Meme{

  constructor(id, background, title, fields, text1,text2,text3,font, color, protect, user){
    this.id = id;
    this.background = background;
    this.title = title;
    this.fields = fields;
    this.text1 = text1;
    this.text2 = text2;
    this.text3 = text3;  
    this.font = font;
    this.color = color;
    this.protect = protect;
    this.user = user;
  }


  static from (json){
      
    return new Meme(json.id, json.background,json.title, json.fields, json.text1, json.text2, json.text3, json.font, json.color, json.protect, json.user);
    }

}

export {Meme};