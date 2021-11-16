import React from 'react';
import {Form} from 'react-bootstrap';
import {Col, Row} from 'react-bootstrap';
import {useState} from 'react';
import {Button} from 'react-bootstrap';
import {DisplayImagesForm, DisplayMemeModal} from './memeScreen';




function AddMeme(props){

    const [selectedImg, setSelectedImg] = useState(1);
    const [Title, setTitle] = useState("");
    const [Text1, setText1] = useState("");
    const [Text2, setText2] = useState("");
    const [Text3, setText3] = useState("");
    const [Color, setColor] = useState("");
    const [Font, setFont] = useState("Times New Roman");
    const [Protect, setProtect] = useState(0);

    const [errorMessage, setErrorMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [memeReady,setMemeReady] = useState(false);

    const[dispMeme,setDispMeme] = useState(false);
    const[newMeme, setNewMeme] = useState();


    


    let VettCampi = [];
    
    /* creo un array che contiene il numero di campi per ogni immagine */
     VettCampi = props.images.map(img => { return img.textfields});

     let numeroCampi =VettCampi[selectedImg-1];

    /*funzione che verifica la presenza di eventuali errori nei campi del form */

     const findFormErrors = () => {
        const newErrors = {};
        /*check sul titolo vuoto */
        if(Title==='')
            newErrors.title = "Cannot be blank!";

            switch(numeroCampi){
                case 1:
                    if(Text1 === ""){                                                /* caso in cui ho 1 textbox ed è vuoto */
                        newErrors.fields = "At least one field written";    
                                                                     
                    }
                    break;
                case 2:
                    if(Text1 === "" && Text2 === ""){                             /* caso in cui ho 2 textbox e sono tutti vuoti */
                        newErrors.fields = "At least one field written";    
                    }
                    break;
                case 3:
                    if(Text1 === "" && Text2 === "" && Text3 === ""){           /* caso in cui ho 3 textbox e sono tutti vuoti */
                        newErrors.fields = "At least one field written";    
                    }
                    break;
                default:
                    break;
            }

            return newErrors;
    }



   



    /* funzione che viene chiamata quando premo il bottone dopo aver compilato il form */
     const handleSubmit = (event) => {
        event.preventDefault();

        let name = selectedImg+".jpg";
             
        const newErrors = findFormErrors();

        const meme = {id:null, background: name,title: Title, fields:VettCampi[selectedImg-1], text1: Text1, text2: Text2, text3: Text3, font: Font, color: Color, protect: Protect,user: props.userName };
         
        let valid = true;

        /* se ho trovato degli errori il flag valid va a 0 */
        if(Object.keys(newErrors).length>0){
            setErrorMessage(newErrors);
            valid = 0;
        }

        
        

        if(valid)
        {
            setDispMeme(meme);
            setNewMeme(meme);
            setMemeReady(true);
        }
        else {
          
          setErrorMessage('Error(s) in the form, please fix it.')
        }
    };

    /* funzione chiamata dopo aver cliccato il bottone load */
    /* l'utente dopo aver visto il meme lo carica nel db */
    const handleSubmitLoadButton = (event) => {
        event.preventDefault();
        
        let name = selectedImg+".jpg";
        
        const meme = {id:null, background: name, title: Title, fields:VettCampi[selectedImg-1], text1: Text1, text2: Text2, text3: Text3, font: Font, color: Color, protect: Protect,user: props.userName };
        
        let valid = true;

        switch(VettCampi[selectedImg-1]){
            case 1:
                if(Text1 === ""){                                                /* caso in cui ho 1 textbox ed è vuoto */
                    valid = false;                                                  
                }
                break;
            case 2:
                if(Text1 === "" && Text2 === ""){                             /* caso in cui ho 2 textbox e sono tutti vuoti */
                    valid = false;
                }
                break;
            case 3:
                if(Text1 === "" && Text2 === "" && Text3 === ""){           /* caso in cui ho 3 textbox e sono tutti vuoti */
                    valid = false;
                }
                break;
            default:
                break;
        }

        
        if(valid)
        {   
            setNewMeme(meme);  
            props.addOrUpdateMeme(newMeme);
                        
            setSubmitted(true);
            setMemeReady(false);
        }
        else {
          
            setErrorMessage('Error(s) in the form, please fix it.')
        }


    }

    const handleNewMemeButton = (event) => {
        setMemeReady(false);
        setSubmitted(false);
        

        /* ripristino i campi del form */
        setTitle("");
        setText1("");
        setText2("");
        setText3("");
        setColor("black");
        setFont("Times New Roman");
}

return(
    <React.Fragment>
        <Row>
            <Col>

            {submitted? <React.Fragment>
                            <h1>Meme succesfully loaded!</h1>
                            <Button onClick = {handleNewMemeButton}>Create a new Meme!</Button>
            </React.Fragment> : <React.Fragment>
                            
                            {/*se ho generato un meme visualizzo l'anteprima, altrimenti visualizzo i template disponibili */}
                            {memeReady ? <DisplayMemeModal meme = {dispMeme} mode = {"form"} ></DisplayMemeModal> :

                                    <div style ={{textAlign: "center"}}>
                                        <h2>Select a template:</h2>
                                        <li className ="flex-container">
                                            {props.images.map( imag => { 
                                                return ( <DisplayImagesForm img= {imag} setSelectedImg = {setSelectedImg}></DisplayImagesForm> );
                                                    }
                                                )       
                                             }                
                                        </li>
                                    </div>
                            }
                     </React.Fragment>
            }
                </Col>
                <Col>
                {submitted ?  <React.Fragment></React.Fragment> :
                <Form className = "formMeme">

                        <Form.Group controlId="MemeFormTitle">
                            <Form.Label>Insert title</Form.Label>
                                <Form.Control required type= "text" placeholder = "title" defaultValue = {""} onChange = { e => {setTitle(e.target.value)} }/>
                                <Form.Control.Feedback type ='invalid'>{errorMessage.title}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Select template</Form.Label>
                                <Form.Control as="select" defaultValue = {selectedImg}  onChange = {e => {setSelectedImg(e.target.value)} }>
                                    <option value = {1} >1-Drake</option>
                                    <option value = {2} >2-Farmer</option>
                                    <option value = {3} >3-Change</option>
                                    <option value = {4} >4-Squid</option>
                                    <option value = {5} >5-BoyFriend</option>
                                    <option value = {6} >6-Butterfly</option>
                                </Form.Control>
                                
                        </Form.Group>
                        
                        <Form.Group controlId="MemeFormText1">
                            <Form.Label>Insert first text</Form.Label>
                                <Form.Control type= "text" placeholder = "text1" defaultValue = {""} onChange = { e => {setText1(e.target.value)} }/>
                        </Form.Group>
                        {(VettCampi[selectedImg-1]>1)? 
                            (<Form.Group controlId="MemeFormText2">
                            <Form.Label>Insert second text</Form.Label>
                                <Form.Control  type= "text" placeholder = "text2"  defaultValue = {""} onChange = { e => {setText2(e.target.value)} }/>
                        </Form.Group>) : (<React.Fragment></React.Fragment>)
                        }
                        {(VettCampi[selectedImg-1]>2)? 
                            (<Form.Group controlId="MemeFormText3">
                            <Form.Label>Insert third text</Form.Label>
                                <Form.Control type = "text" placeholder = "text3"  defaultValue = {""} onChange = { e => {setText3(e.target.value)} }/>
                        </Form.Group>) : (<React.Fragment></React.Fragment>)
                        }
                        <Form.Group controlId="MemeFormColor">
                                <Form.Label>Select a color for the texts</Form.Label>
                                        <Form.Control as="select" onChange = {e => {setColor(e.target.value)}}>
                                                <option value = {"black"} >Black</option>
                                                <option value = {"red"} >Red</option>
                                                <option value = {"blue"} >Blue</option>
                                                <option value = {"purple"} >Purple</option>
                                                
                                        </Form.Control >
                        </Form.Group>
                        <Form.Group controlId="MemeFormFont">
                                <Form.Label>Select a font for the texts</Form.Label>
                                        <Form.Control as="select" defaultValue = {"Times New Roman"} onChange = {e => {setFont(e.target.value)}}>
                                                <option value = {"Times New Roman"}>Times New Roman</option>
                                                <option value = {"Lucida Console"}>Lucida Console</option>
                                        </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="Visibility">
                                    <Form.Label>Select visibility option</Form.Label>
                                            <Form.Control as="select" defaultValue = {Protect} onChange = {e => {setProtect(e.target.value)}}>
                                                    <option value = {0}>Public</option>
                                                    <option value = {1}>Protected</option>
                                            </Form.Control>
                            </Form.Group>
                        
                        {memeReady? 
                        <Button variant="secondary" type="submit" onClick ={handleSubmit} >
                        Edit Meme
                    </Button>   :
                       
                        <Button variant="primary" type="submit" onClick ={handleSubmit} >
                        Create Meme
                    </Button>}

                        {memeReady ? <Button onClick ={handleSubmitLoadButton}> Load Meme</Button>: <React.Fragment></React.Fragment>}
                    {/*}
                        submitted ? <React.Fragment><Button onClick={handleNewMemeButton}>Create a new meme</Button></React.Fragment> :
                    <React.Fragment>
                        <Button onClick={handleSubmitLoadButton}>Load Meme</Button> <Button>Modify</Button>
                        </React.Fragment> */ }
                    </Form>
                } 


                </Col>
               
                </Row>
    </React.Fragment>
);

     
}

function CopyMeme(props){

    const [errorMessage, setErrorMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [memeReady,setMemeReady] = useState(false);
    const[dispMeme,setDispMeme] = useState(false);
    const[newMeme, setNewMeme] = useState();
    /* creo un array che contiene il numero di campi per ogni immagine */

    let pos = props.memes.map(function(e){return e.id}).indexOf(props.memeIDToCopy);       /*trovo la posizione corrispondente all'id dell'immagine selezionata */
    
    let memeScelto = props.memes[pos];
    let numeroCampi = memeScelto.fields;


    const [Title, setTitle] = useState(memeScelto.title);
    const [Text1, setText1] = useState(memeScelto.text1);
    const [Text2, setText2] = useState(memeScelto.text2);
    const [Text3, setText3] = useState(memeScelto.text3);
    const [Color, setColor] = useState(memeScelto.color);
    const [Font, setFont] = useState(memeScelto.font);
    const [Protect,setProtect] = useState(memeScelto.protect);

    /* funzione che raccoglie gli eventuali errori in un oggetto */
    const findFormErrors = () => {
        const newErrors = {};
        /*check sul titolo vuoto */
        if(Title==='')
            newErrors.title = "Cannot be blank!";

            switch(numeroCampi){
                case 1:
                    if(Text1 === ""){                                                /* caso in cui ho 1 textbox ed è vuoto */
                        newErrors.fields = "At least one field written";    
                                                                     
                    }
                    break;
                case 2:
                    if(Text1 === "" && Text2 === ""){                             /* caso in cui ho 2 textbox e sono tutti vuoti */
                        newErrors.fields = "At least one field written";    
                    }
                    break;
                case 3:
                    if(Text1 === "" && Text2 === "" && Text3 === ""){           /* caso in cui ho 3 textbox e sono tutti vuoti */
                        newErrors.fields = "At least one field written";    
                    }
                    break;
                default:
                    break;
            }

            return newErrors;
    }



    /* funzione che viene chiamata quando premo il bottone dopo aver compilato il form */
     const handleSubmit = (event) => {
        event.preventDefault();

        /*cerco errori nei campi del form */

        const newErrors = findFormErrors();

        const meme = {id:null, background: memeScelto.background,title: Title, fields: numeroCampi, text1: Text1, text2: Text2, text3: Text3, font: Font, color: Color, protect: Protect,user: props.userName };
         
        let valid = true;

        
        /* se ho trovato degli errori il flag valid va a 0 */
        if(Object.keys(newErrors).length>0){
            setErrorMessage(newErrors);
            valid = 0;
        }

        if(valid)
        {
            setDispMeme(meme);
            setNewMeme(meme);
            setMemeReady(true);
        }
        else {
          // show a better error message...
          setErrorMessage('Error(s) in the form, please fix it.')
        }
    };

    /* funzione chiamata dopo aver cliccato il bottone load */
    /* l'utente dopo aver visto il meme lo carica nel db */
    const handleSubmitLoadButton = (event) => {
        event.preventDefault();

        const newErrors = findFormErrors();

        const meme = {id:null, background: memeScelto.background, title: Title, fields:numeroCampi, text1: Text1, text2: Text2, text3: Text3, font: Font, color: Color, protect: Protect,user: props.userName };
        
        let valid = true;

        
        /* se ho trovato degli errori il flag valid va a 0 */
        if(Object.keys(newErrors).length>0){
            setErrorMessage(newErrors);
            valid = 0;
        }

        
        if(valid)
        {
        setNewMeme(meme);
        setSubmitted(true);
          setMemeReady(false);
        props.addOrUpdateMeme(newMeme);
            
        
          
        }
        else {
          
          setErrorMessage('Error(s) in the form, please fix it.')
        }


    }

    const handleNewMemeButton = (event) => {
        setMemeReady(false);
        setSubmitted(false);
        /* ripristino i campi del form */
        setTitle("");
        setText1("");
        setText2("");
        setText3("");
        setColor("black");
        setFont("Times New Roman");
}

return(
    <React.Fragment>
        <Row>
            <Col>

            {submitted? <React.Fragment>
                            <h1>Meme succesfully loaded!</h1>
                            <Button onClick = {handleNewMemeButton}>Create a new Meme!</Button>
            </React.Fragment> : <React.Fragment>

            
                    {/*se ho generato un meme visualizzo l'anteprima, il meme copiato */}
            {memeReady ? <DisplayMemeModal meme = {dispMeme} mode = {"form"} >Copied meme</DisplayMemeModal> :

                        <React.Fragment> Original Meme <DisplayMemeModal meme = {props.memes[pos]} mode = {"form"} ></DisplayMemeModal></React.Fragment>
                    }
                     </React.Fragment>
            }
                </Col>
                <Col>
                {submitted ?  <React.Fragment></React.Fragment> :
                <Form className = "formMeme">

                        <Form.Group controlId="MemeFormTitle">
                            <Form.Label>Modify Title</Form.Label>
                                <Form.Control type= "text" placeholder = {memeScelto.title} defaultValue = {memeScelto.title} onChange = { e => {setTitle(e.target.value)} } isInvalid={!!errorMessage.title }/>
                                <Form.Control.Feedback type='invalid'> {errorMessage.title} </Form.Control.Feedback>
                        </Form.Group>

                        
                                
                        
                        
                        <Form.Group controlId="MemeFormText1">
                            <Form.Label>Modify first text</Form.Label>
                                <Form.Control type= "text" placeholder = {memeScelto.text1} defaultValue = {memeScelto.text1} onChange = { e => {setText1(e.target.value)} }/>
                                <Form.Control.Feedback type='invalid'> {errorMessage.title} {console.log(errorMessage.title)}</Form.Control.Feedback>
                        </Form.Group>
                        {(numeroCampi>1)? 
                            (<Form.Group controlId="MemeFormText2">
                            <Form.Label>Modify second text</Form.Label>
                                <Form.Control type= "text" placeholder = {memeScelto.text2}  defaultValue = {memeScelto.text2} onChange = { e => {setText2(e.target.value)} }/>
                                <Form.Control.Feedback type='invalid'> {errorMessage.title} </Form.Control.Feedback>
                        </Form.Group>) : (<React.Fragment></React.Fragment>)
                        }
                        {(numeroCampi>2)? 
                            (<Form.Group controlId="MemeFormText3">
                            <Form.Label>Modify third text</Form.Label>
                                <Form.Control type = "text" placeholder = {memeScelto.text3}  defaultValue = {memeScelto.text3} onChange = { e => {setText3(e.target.value)} }/>
                                <Form.Control.Feedback type='invalid'> {errorMessage.title} </Form.Control.Feedback>
                        </Form.Group>) : (<React.Fragment></React.Fragment>)
                        }
                        <Form.Group controlId="MemeFormColor">
                                <Form.Label>Select a color for the texts</Form.Label>
                                        <Form.Control as="select" onChange = {e => {setColor(e.target.value)}}>
                                                <option value = {"black"} >Black</option>
                                                <option value = {"red"} >Red</option>
                                                <option value = {"blue"} >Blue</option>
                                                <option value = {"purple"} >Purple</option>
                                                
                                        </Form.Control >
                        </Form.Group>
                        <Form.Group controlId="MemeFormFont">
                                <Form.Label>Select a font for the texts</Form.Label>
                                        <Form.Control as="select" defaultValue = {"Times New Roman"} onChange = {e => {setFont(e.target.value)}}>
                                                <option value = {"Times New Roman"}>Times New Roman</option>
                                                <option value = {"Lucida Console"}>Lucida Console</option>
                                        </Form.Control>
                        </Form.Group>
                        {memeScelto.user===props.userName ? 
                        <Form.Group controlId="Visibility">
                                <Form.Label>Select visibility option</Form.Label>
                                        <Form.Control as="select" defaultValue = {memeScelto.protect} onChange = {e => {setProtect(e.target.value)}}>
                                                <option value = {0}>Public</option>
                                                <option value = {1}>Protected</option>
                                        </Form.Control>
                        </Form.Group>   :
                        <React.Fragment>
                            {memeScelto.protect===1 ? <React.Fragment></React.Fragment>: 
                                    <Form.Group controlId="Visibility">
                                    <Form.Label>Select visibility option</Form.Label>
                                            <Form.Control as="select" defaultValue = {memeScelto.protect} onChange = {e => {setProtect(e.target.value)}}>
                                                    <option value = {0}>Public</option>
                                                    <option value = {1}>Protected</option>
                                            </Form.Control>
                            </Form.Group>
                                }

                        </React.Fragment>
                        }
                        {memeReady? 
                        <Button variant="secondary" type="submit" onClick ={handleSubmit} >
                        Edit Meme
                    </Button>   :
                       
                        <Button variant="primary" type="submit" onClick ={handleSubmit} >
                        Create Meme
                    </Button>}

                        {memeReady ? <Button onClick ={handleSubmitLoadButton}> Load Meme</Button>: <React.Fragment></React.Fragment>}
                     
                    </Form>
                }  
                </Col>
               
                </Row>
    </React.Fragment>
);

     
}


export  { AddMeme, CopyMeme};