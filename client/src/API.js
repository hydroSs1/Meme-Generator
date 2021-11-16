//import { ResponsiveEmbed } from 'react-bootstrap';
import Image from './image/Image';
import { Meme } from './meme/Meme';



/* funzione API che ottiene tutte i templates dal db */

async function getAllImages(){
    const response = await fetch('api/images');
    const imgJson = await response.json();
    if(response.ok){
        return imgJson.map((img) => Image.from(img));
    }
    else{
        throw imgJson;
    }

}

async function getAllMemes(){
    const response = await fetch('api/memes');
    const memeJson = await response.json();
    if(response.ok){
        return memeJson.map((meme) => Meme.from(meme));
    }
    else{
        throw memeJson;
    }
}

async function addMeme(meme){
    //call: POST /api/memes
    return new Promise((resolve, reject) =>{
        fetch('api/memes',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ background: meme.background, title: meme.title, fields: meme.fields, 
                                    text1: meme.text1, text2: meme.text2, text3: meme.text3, font:meme.font, color: meme.color, protect: meme.protect, user:meme.user}),
            }).then((response) => {
                if(response.ok){
                    resolve(null);
                }
                else{
                    response.json()
                    .then((message) => {reject(message);})
                    .catch(() => {reject({error: "Cannot parse server response."})});
                }
            }).catch(()=>{reject({error: "Cannot communicate with the server."}) });
    });
}

  // DELETE api/memes/id
  function  deleteMeme(id){
      return new Promise ((resolve, reject) => {
          fetch(`/api/memes/${id}`, {
              method: 'DELETE',
          }).then((response) => {
              if(response.ok){
                  resolve(null);
              }
              else {
                  response.json()
                  .then((message) => {reject(message); })
                  .catch(() => {reject ({error: "Cannot parse server response"})});
              }
          }).catch(() => {reject ({error: "Cannot communicate with the server."})});
          });
      
  }


  async function logIn(credentials) {
    let response = await fetch('/api/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    if(response.ok) {
      const user = await response.json();
      
      return user.name;
    }
    else {
      try {
        const errDetail = await response.json();
        throw errDetail.message;
      }
      catch(err) {
        throw err;
      }
    }
  }


async function logOut() {
    await fetch('/api/sessions/current', { method: 'DELETE' });
  }
  
  async function getUserInfo() {
    const response = await fetch('api/sessions/current');
    const userInfo = await response.json();
    
    
    if (response.ok) {
      return userInfo;
    } else {
      throw userInfo;  // an object with the error coming from the server
    }
  }

const API = {getAllImages, getAllMemes, addMeme, deleteMeme, logIn, logOut, getUserInfo};
export default API;