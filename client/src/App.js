import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/custom.css';
import API from './API'
import {useState,useEffect} from 'react';
import React from 'react';
import MyNavbar from './components/navbar'
import {MemeScreen} from './components/memeScreen'
import './components/memeImage.css'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import LoginForm from './components/loginForm';



function App() {

  const [images, setImages] = useState([]);
  const [message, setMessage ] = useState('');
  const [deletedM,setDeletedM] = useState(false);
  const [logged, setLogged] = useState(false);
  const [userName, setUserName] = useState("");
  const [memes, setMemes] = useState([]);
  const [publicMemes, setPublicMemes] = useState([]);
  const [showModal, setShowModal] = useState(false);                           /* per visualizzare il modal quando clicco su new meme nella navbar */
  
  



  useEffect(() => {
    const getImages = async () => {
      const images = await API.getAllImages();
      setImages(images);
    };
    getImages().catch(err => {setMessage("impossible to load your memes! please try again later..");
    console.error(err);
    console.error(message);
  });
},[] );


useEffect(() => {
  const getMemes = async () => {
    const mem = await API.getAllMemes();
    setMemes(mem);
    const publicMem = mem.filter(m => m.protect===0);
    setPublicMemes(publicMem);
  };
  getMemes().catch(err => {setMessage("impossible to load your memes! please try again later..");
  console.error(err);
  
});
},[deletedM] );

useEffect(() => {
  const checkAuth = async () => {
    try {

      const userR = await API.getUserInfo();
      setUserName(userR.username);
      setLogged(true);
      
    } catch (err) {
      // User needs to login
    }
  };
  checkAuth();
}, []);

const doLogin = async (credentials) => {
  try {
    const userR = await API.logIn(credentials);
    setUserName(userR);
    setLogged(true);
    
  } catch(err) {
    return {success: false, errormsg: err};
  }
  return {success: true};
}

const doLogout = async () => {
  await API.logOut();
  setLogged(false);
}

const handleErrors = (err) => {
  if(err.errors)
    setMessage({msg: err.errors[0].msg + ': ' + err.errors[0].param, type: 'danger'});
  else
    setMessage({msg: err.error, type: 'danger'});
  
  
}

/* aggiunge il nuovo meme alla copia locale dei meme */

const addMeme = (mem) => {
  
  API.addMeme(mem)
    .then(() => {
      setMemes( oldMeme => [...oldMeme, mem])
    }).catch(err => handleErrors(err) );
    
}



const deleteMeme = (id) => {
    
    API.deleteMeme(id)
    .then(() =>{
      
      setDeletedM(true);
    }).catch(err => handleErrors(err));

};

function MainPage(props){
  return (<React.Fragment>
        <MyNavbar  logged = {logged} showModal = {setShowModal} doLogout = {doLogout} ></MyNavbar>
        {logged ? 
        <MemeScreen  logged = {logged} memes = {memes}  showModal = {showModal} setShowModal = {setShowModal} images = {images} addOrUpdateMeme = {addMeme} userName = {userName} deleteMeme={deleteMeme} setDeletedM ={ setDeletedM} ></MemeScreen> :
        <MemeScreen  logged = {logged} memes = {publicMemes}  ></MemeScreen>
        } 
  </React.Fragment>);
}
          return (
            <Router>
              <Switch>
                <Route exact path="/" component={MainPage} />
                <Route path="/login" render={() =>
                  <React.Fragment>{logged ? <Redirect to="/" /> : <LoginForm login={doLogin} />}</React.Fragment>
                } />
                
              </Switch>
            </Router>
          );
        }

export default App;