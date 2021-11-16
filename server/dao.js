'use strict'

const sqlite = require('sqlite3');

const db = new sqlite.Database('database.sqlite',(err) => {
    if(err) throw err;
});

exports.listImages = () => {
    return new Promise((resolve, reject) =>{
        const sql = 'SELECT * FROM images';
        db.all(sql,[],(err,rows) => {
            if(err){
                reject(err);
                return;
            }
            const images = rows.map((i) => {
                return {id: i.id, name: i.name, textfields: i.textfields}
            });
            resolve(images);
        });
    });
};

exports.listMemes = () => {
    return new Promise((resolve,reject) =>{
        const sql = 'SELECT * FROM memes';
        db.all(sql,[],(err,rows) => {
            if(err){
                reject(err);
                return;
            }
            const memes = rows.map((m) =>{
                return {id: m.id, background: m.background, title: m.title,
                        fields: m.fields, text1: m.text1, text2: m.text2, text3: m.text3,
                        font: m.font, color: m.color, protect: m.protect, user: m.user}
            });
            resolve(memes);
        });
    })
}

//add a new meme
exports.createMeme = (meme) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO memes(background, title, fields, text1, text2, text3, font, color, protect, user) VALUES (?,?,?,?,?,?,?,?,?,?)';
        db.run(sql,[meme.background, meme.title, meme.fields, meme.text1, meme.text2, meme.text3, meme.font, meme.color, meme.protect, meme.user], function(err){
            if(err){
                reject(err);
                return;
            }
            resolve(this.lastID)
        });
    });
};

exports.createImage = (image) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO images(id, name, textfields) VALUES (?,?,?)';
        db.run(sql,[image.id, image.name, image.textfields], function(err){
            if(err){
                reject(err);
                return;
            }
            resolve(this.lastID)
        });
    });
};


// delete a meme of the user
exports.deleteExam = (id) => {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM memes WHERE id = ?';
      db.run(sql, [id], (err) => {
        if (err) {
          reject(err);
          return;
        } else
          resolve(null);
      });
    });
  }