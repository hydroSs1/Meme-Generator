'use strict';

const morgan = require('morgan');
const express = require('express');
const {check, oneOf, validationResult} = require('express-validator'); // validation middleware
const dao = require('./dao');
const passport = require('passport'); // auth middleware
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const userDao = require('./user_dao');


/* set up della strategia di login "username e password" */

passport.use(new LocalStrategy(
  function(username, password, done) {
    userDao.getUser(username, password).then((user) => {
      if (!user)
        return done(null, false, { message: 'Incorrect username and/or password.' });
        
      return done(null, user);
    })
  }
));

/* serialize avviene quando metto le cose nella sessione */
passport.serializeUser((user, done) => {
  done(null, user.id);
});


/* partendo dai dati nella sessione si estrae l'utente attualmente loggato */
passport.deserializeUser((id, done) => {
  userDao.getUserById(id)
    .then(user => {
      done(null, user); // this will be available in req.user
    }).catch(err => {
      done(err, null);
    });
});

/* init express */
const app = new express();
const port = 3001;

app.use(express.json());
app.use(morgan('dev'));

/* activate the server */
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

// Enable sessions in Express
app.use(session({
  secret: 'PMNP-secret-signature-sessionID',
  resave: false,
  saveUninitialized: false,
}));


/* init Passport to use sessions */
app.use(passport.initialize()); 
app.use(passport.session());



/* Custom login checker */
const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) {
    
    return next();
  }


  return res.status(401).json({error: 'Not authorized'});
}


/*** API ***/

// GET /api/images

app.get('/api/images', async (req, res) => {
  try{
    const result = await dao.listImages();
    if(result.error)
      res.status(404).json(result);
    else
      res.json(result);
  }
  catch(err){
    res.status(500).end();
  }
})

// GET /api/memes

app.get('/api/memes', async (req, res) =>{
  try{
    const result = await dao.listMemes();
    if(result.error)
      res.status(404).json(result);
    else
      res.json(result);
  }
  catch(err){
    res.status(500).end();
  }
})

// POST /api/memes (check('text1').isLength({min: 1}) || check('text2').isLength({min: 1}) || check('text3').isLength({min: 1})),

app.post('/api/memes',[check('fields').isInt({min: 1, max:  3}) , check('protect').isInt({min:0, max:1})],async (req, res) =>{
                          
                         
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(422).json({errors: errors.array()});
    }
    const meme = {
      
      "background": req.body.background,
      "title": req.body.title,
      "fields": req.body.fields,
      "text1": req.body.text1,
      "text2": req.body.text2,
      "text3": req.body.text3,
      "font": req.body.font,
      "color": req.body.color,
      "protect": req.body.protect,
      "user": req.body.user
    };
    
    try{
      await dao.createMeme(meme);
      res.status(201).end();
    } catch(err){
      res.status(503).json({error: 'Database error during the creation of meme ${meme.id}.'});
    }
});

// DELETE /api/memes/<id>
app.delete('/api/memes/:id', async (req, res) => {
  try {
    
    await dao.deleteExam(req.params.id);
    res.status(204).end();
  } catch(err) {
    res.status(503).json({ error: `Database error during the deletion of the meme with id: ${req.params.id}.`});
  }
});


//GET /api/sessions/current

app.get('/api/sessions/current', isLoggedIn, (req, res) =>{

  
  return res.json(req.user);
})

//DELETE /api/sessions/current
app.delete('/api/sessions/current', isLoggedIn, (req, res) =>{
  req.logout();
  res.end();
})

app.post('/api/sessions', function(req, res) {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return res.status(500).json(err);
    if (!user) {
      // Return error messages
      return res.status(401).json(info);
    }
    // Success, perform the login
    req.login(user, (err) => {
      if (err)
        return res.status(500).json(err);
      // req.user contains the authenticated user, we send all the user info back
      // this is coming from userDao.getUser()
      return res.json(req.user);
    });
  })(req, res);
});