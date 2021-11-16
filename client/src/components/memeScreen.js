import React from 'react';

import './../css/custom.css';
import { Button } from 'react-bootstrap';
import {useState} from 'react';
import {ShowImageModal, NewMemeModal, CopyMemeModal} from './modal';






function MemeScreen(props){

    const[memeSelected,setMemeSelected] = useState(1);
    const [memeIDToCopy, setMemeIDToCopy] = useState();
    const [showModal, setShowModal] = useState(false);
    const [showCopyModal, setCopyModal] = useState(false);
    
    
    

return(

    <div style ={{textAlign: "center"}}>
             <li className ="flex-container">
                    {props.memes.map( meme => { 
                            return ( <DisplayMemes key={meme.id} meme = {meme} showModal = {setShowModal} memeSelected ={setMemeSelected} />);
                    })}
            </li>
            <ShowImageModal show = {showModal} manageShow = {setShowModal}  meme = {memeSelected} memes = {props.memes} logged={props.logged} userName = {props.userName} deleteMeme ={props.deleteMeme} deleteLocalMeme = {props.deleteLocalMeme} setCopyModal = {setCopyModal} setMemeIDToCopy ={setMemeIDToCopy} ></ShowImageModal>
            <NewMemeModal show = {props.showModal} manageShow = {props.setShowModal} images ={props.images} addOrUpdateMeme ={props.addOrUpdateMeme} userName = {props.userName} setReload={props.setReload}></NewMemeModal>
            <CopyMemeModal show = {showCopyModal} manageShow = {setCopyModal} memeIDToCopy = {memeIDToCopy} userName = {props.userName} addOrUpdateMeme ={props.addOrUpdateMeme} memes = {props.memes} setReload={props.setReload}></CopyMemeModal> 
            
    </div>
    );
}

function DisplayImages(props){


    const handleClick = (event) =>{                     /*cliccando sul bottone mi salvo l'immagine selezionata in una variabile e abilito la visualizzazione del modal */
        event.preventDefault();
        props.showModal(true);
        props.memeSelected(props.meme.id);   
    }

    const styleObj = {
        width: 300,
        height: 300,
    };

    return (
        <Button id = {props.img.id} onClick = {handleClick}>
        <
        img className = "image"
        style = {styleObj}
        key = {props.img.id}
        src = {process.env.PUBLIC_URL +'templates/'+ props.img.name}
        alt = {props.img.name}
       
       ></img> 
       </Button>  );

}
function DisplayImagesForm(props){


    const handleClick = (event) =>{                     /*cliccando sul bottone mi salvo l'immagine selezionata in una variabile e abilito la visualizzazione del modal */
        event.preventDefault();
       
        props.setSelectedImg(props.img.id);
        
    }

    const styleObj = {
        width: 150,
        height: 150,
    };
    return (
        <Button id = {props.img.id} onClick = {handleClick}>
        <
        img className = "image"
        style = {styleObj}
        key = {props.img.id}
        src = {process.env.PUBLIC_URL +'templates/'+ props.img.name}
        alt = {props.img.name}
       
       ></img> 
       </Button>  );

}

/*display memes riceve come props il meme */

function DisplayMemes(props){
    /* l'oggetto styleObj serve a racchiudere le proprietà del testo (colore, font) che devono essere caricate dinamicamente */
    const styleObj = {
        fontFamily: props.meme.font,
        color: props.meme.color,

    };
    const handleClick = (event) =>{                     /*cliccando sul bottone mi salvo l'immagine selezionata in una variabile e abilito la visualizzazione del modal */
        event.preventDefault();
        props.showModal(true);
        props.memeSelected(props.meme.id);
        
    }

    switch(props.meme.background){
        case('1.jpg'):
        return(
            <ul key = {props.meme.id} >
            <Button id = {props.meme.id} onClick = {handleClick}>
            <h1>{props.meme.title}</h1>
            <div className="container">
                
                <img key = {props.meme.id} className = "imageMeme" src= {process.env.PUBLIC_URL +'templates/'+ props.meme.background}  alt ="" />
                <div className="top-text-1-drake">
                    { props.meme.text1 === "" ?                        /* se il campo è vuoto non lo visualizzo  */
                    <p></p> : <p style={styleObj}>{props.meme.text1}</p> }
                </div>
                <div className="bot-text-1-drake">
                    { props.meme.text2 === "" ? 
                    <p></p> : <p style = {styleObj} >{props.meme.text2}</p> }
                </div>
            </div>
            </Button>
            </ul>
        );
        case('2.jpg'):
            return(
                <ul key = {props.meme.id} >
                <Button id = {props.meme.id} onClick = {handleClick}>
                <h1>{props.meme.title}</h1>
                <div className="container">
                    
                    <img key = {props.meme.id} className = "imageMeme" src= {process.env.PUBLIC_URL +'templates/'+ props.meme.background} alt ="" />
                    <div className="top-text-2-farmer">
                    { props.meme.text1 === "" ? 
                        <p></p> : <p style={styleObj}>{props.meme.text1}</p> }
                    </div>
                </div>
                </Button>
                </ul>);
        case('3.jpg'):
            return(
                <ul key = {props.meme.id} >
                <Button id = {props.meme.id} onClick = {handleClick}>
                <h1>{props.meme.title}</h1>
            <div className="container">
                
                 <img key = {props.meme.id} className = "imageMeme" src= {process.env.PUBLIC_URL +'templates/'+ props.meme.background} alt =""  />
                 <div className="bot-text-3-change">
                    { props.meme.text1 === "" ?                      /* se il campo è vuoto non lo visualizzo  */
                    <p></p> : <p style={styleObj}>{props.meme.text1}</p> }
                </div>
             </div>
             </Button>
             </ul>);
        case('4.jpg'):
        return(
            <ul key = {props.meme.id} >
            <Button id = {props.meme.id} onClick = {handleClick}>
            <h1>{props.meme.title}</h1>
            <div className="container">
                <img key = {props.meme.id} className = "imageMeme" src= {process.env.PUBLIC_URL +'templates/'+ props.meme.background} alt ="" />
                <div className="top-text-4-squid">
                    { props.meme.text1 === "" ?                       /* se il campo è vuoto non lo visualizzo  */
                    <p></p> : <p style={styleObj}>{props.meme.text1}</p> }
                </div>
                <div className="bot-text-4-squid">
                    { props.meme.text2 === "" ? 
                    <p></p> : <p style = {styleObj} >{props.meme.text2}</p> }
                </div>
            </div>
            </Button>
            </ul>
        );
        case('5.jpg'):
        return(
            <ul key = {props.meme.id} >
            <Button id = {props.meme.id} onClick = {handleClick}>
            <h1>{props.meme.title}</h1>
            <div className="container">
                <img key = {props.meme.id} className = "imageMeme" src= {process.env.PUBLIC_URL +'templates/'+ props.meme.background} alt =""  />
                <div className="left-text-5-boyfriend">
                    { props.meme.text1 === "" ? 
                    <p></p> : <p style={styleObj}>{props.meme.text1}</p> }
                </div>
                <div className="central-text-5-boyfriend">
                    { props.meme.text2 === "" ? 
                    <p></p> : <p style={styleObj}>{props.meme.text2}</p> }
                </div>
                <div className="right-text-5-boyfriend">
                    { props.meme.text3 === "" ? 
                    <p></p> : <p style = {styleObj} >{props.meme.text3}</p> }
                </div>
            </div>
            </Button>
            </ul>
        );
        case('6.jpg'):
        return(
            <ul key = {props.meme.id} >
            <Button id = {props.meme.id} onClick = {handleClick}>
            <h1>{props.meme.title}</h1>
            <div className="container">
                <img  key = {props.meme.id} className = "imageMeme" src= {process.env.PUBLIC_URL +'templates/'+ props.meme.background}  alt =""/>
                <div className="bot-text-6-butterfly">
                    { props.meme.text1==="" ?                                  /* se il campo è vuoto non lo visualizzo  */
                    <p></p> : <p style={styleObj}>{props.meme.text1}</p>  }
                    
                </div>
                <div className="central-text-6-butterfly">
                    { props.meme.text2 === "" ? 
                    <p></p> : <p style = {styleObj}>{props.meme.text2}</p> }
                </div>
                <div className="top-text-6-butterfly">
                    { props.meme.text3 === "" ? 
                    <p></p> : <p style = {styleObj}> {props.meme.text3}</p> }
                </div>
            </div>
            </Button>
            </ul>
        ); 
        default:
            return(
                <React.Fragment></React.Fragment>
                
            ); 
    }
}

function DisplayMemeModal(props){
    /* l'oggetto styleObj serve a racchiudere le proprietà del testo (colore, font) che devono essere caricate dinamicamente */
    const styleObj = {
        fontFamily: props.meme.font,
        color: props.meme.color,

    };
    
    

    switch(props.meme.background){
        case('1.jpg'):
        return(
            <div className="container">
                <img key = {props.meme.id} className = "imageMeme" src= {process.env.PUBLIC_URL +'templates/'+ props.meme.background}  alt ="" />
                <div className="top-text-1-drake">
                    { props.meme.text1 === "" ?                        /* se il campo è vuoto non lo visualizzo  */
                    <p></p> : <p style={styleObj}>{props.meme.text1}</p> }
                </div>
                <div className="bot-text-1-drake">
                    { props.meme.text2 === "" ? 
                    <p></p> : <p style = {styleObj} >{props.meme.text2}</p> }
                </div>
            </div>
        );
        case('2.jpg'):
            return(
               
                <div className="container">
                    <img key = {props.meme.id} className = "imageMeme" src= {process.env.PUBLIC_URL +'templates/'+ props.meme.background} alt ="" />
                    <div className="top-text-2-farmer">
                    { props.meme.text1 === "" ? 
                        <p></p> : <p style={styleObj}>{props.meme.text1}</p> }
                    </div>
                </div>
                );
        case('3.jpg'):
            return(
                
            <div className="container">
                 <img key = {props.meme.id} className = "imageMeme" src= {process.env.PUBLIC_URL +'templates/'+ props.meme.background} alt =""  />
                 <div className="bot-text-3-change">
                    { props.meme.text1 === "" ?                      /* se il campo è vuoto non lo visualizzo  */
                    <p></p> : <p style={styleObj}>{props.meme.text1}</p> }
                </div>
             </div>
             );
        case('4.jpg'):
        return(
            
            <div className="container">
                <img key = {props.meme.id} className = "imageMeme" src= {process.env.PUBLIC_URL +'templates/'+ props.meme.background} alt ="" />
                <div className="top-text-4-squid">
                    { props.meme.text1 === "" ?                       /* se il campo è vuoto non lo visualizzo  */
                    <p></p> : <p style={styleObj}>{props.meme.text1}</p> }
                </div>
                <div className="bot-text-4-squid">
                    { props.meme.text2 === "" ? 
                    <p></p> : <p style = {styleObj} >{props.meme.text2}</p> }
                </div>
            </div>
           
        );
        case('5.jpg'):
        return(
            
            <div className="container">
                <img key = {props.meme.id} className = "imageMeme" src= {process.env.PUBLIC_URL +'templates/'+ props.meme.background} alt =""  />
                <div className="left-text-5-boyfriend">
                    { props.meme.text1 === "" ? 
                    <p></p> : <p style={styleObj}>{props.meme.text1}</p> }
                </div>
                <div className="central-text-5-boyfriend">
                    { props.meme.text2 === "" ? 
                    <p></p> : <p style={styleObj}>{props.meme.text2}</p> }
                </div>
                <div className="right-text-5-boyfriend">
                    { props.meme.text3 === "" ? 
                    <p></p> : <p style = {styleObj} >{props.meme.text3}</p> }
                </div>
            </div>
            
        );
        case('6.jpg'):
        return(
            
            <div className="container">
                <img  key = {props.meme.id} className = "imageMeme" src= {process.env.PUBLIC_URL +'templates/'+ props.meme.background}  alt =""/>
                <div className="bot-text-6-butterfly">
                    { props.meme.text1==="" ?                                  /* se il campo è vuoto non lo visualizzo  */
                    <p></p> : <p style={styleObj}>{props.meme.text1}</p>  }
                    
                </div>
                <div className="central-text-6-butterfly">
                    { props.meme.text2 === "" ? 
                    <p></p> : <p style = {styleObj}>{props.meme.text2}</p> }
                </div>
                <div className="top-text-6-butterfly">
                    { props.meme.text3 === "" ? 
                    <p></p> : <p style = {styleObj}> {props.meme.text3}</p> }
                </div>
            </div>
            
        );
        default:
            return(
            
                <div className="container">
                    <img  key = {props.meme.id} className = "imageMeme" src= {process.env.PUBLIC_URL +'templates/'+ props.meme.background}  alt =""/>
                    <div className="bot-text-6-butterfly">
                        { props.meme.text1==="" ?                                  /* se il campo è vuoto non lo visualizzo  */
                        <p></p> : <p style={styleObj}>{props.meme.text1}</p>  }
                        
                    </div>
                    <div className="central-text-6-butterfly">
                        { props.meme.text2 === "" ? 
                        <p></p> : <p style = {styleObj}>{props.meme.text2}</p> }
                    </div>
                    <div className="top-text-6-butterfly">
                        { props.meme.text3 === "" ? 
                        <p></p> : <p style = {styleObj}> {props.meme.text3}</p> }
                    </div>
                </div>
                
            );
            
    }
}
    
export {MemeScreen, DisplayMemes, DisplayMemeModal, DisplayImages, DisplayImagesForm}