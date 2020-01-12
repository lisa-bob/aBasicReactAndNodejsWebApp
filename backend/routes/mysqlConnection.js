// require holt module ins projekt
// express generiert den Server
var express = require('express');
var router = express.Router();
// leerer Server wurde bis jetzt generiert
var mysql = require('mysql2');
// sequelize ist ein node-module, braucht mySql2 um zu funktionieren
// const ist eine variable, die ich nie mehr für was anderes benutzen werde
// const ist nicht überschreibar
const Sequelize = require('sequelize');
// cors verhindert, dass Cross-Origin Fehler auftauchen
// bdeuted, dass über andere URLs Inhalte geladen werden und verwedet werden
var cors = require('cors');
// in dem Array whitelist stehen die URLs denen Datenaustausch erlaubt ist
// hier muss die URL des Frontends hin
var whitelist = ['http://localhost:8080', 'http://localhost:8081'];
var corsOptions = {
  origin: function (origin, callback) {
    console.log("origin:");
    console.log(origin);
    if (whitelist.indexOf(origin) !== -1 || !origin ) {
      callback(null, true);
    } else {
      callback(new Error('You are not allowed to view this.'));
    }
  }
}

//CONNECTION ZUR DATENBANK
// new Sequelize( Name der Datenbank, Benutzer, Passwort )
const sequelize = new Sequelize('mywebappbasic','user_db', ',,user332', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
});
console.log('const sequelize angelegt')


// eigenes Modul mit der "user-datenbank" wird importiert
// hier müssen alle selbstangelegten Tabellen importiert werden 
// stehen unter backend > database > models
var user = sequelize.import('../database/models/user');
var book = sequelize.import('../database/models/book');

// verbindung wird hergestellt 
sequelize.authenticate().then(function (err) {
  if (err) {
    console.error('Connection Error');
  } else {
    console.log('Successfully connected');
  }
});

//
//
//
// GET
//
//
//
// get all users
router.get('/users', cors(corsOptions), function (req, res, next) {
  user.findAll({attributes: ['idUser', 'name', 'password']}).then(function (allUsers) {
    res.json({"users": allUsers});
  })
});

// get one specific book
// eine zahl wird mit der url mitgegeben 
// :[Parameter]
// wenn nach / ein Doppelunkt kommt, ist es params (req.params.[Parameter])
router.get('/users/:userid', cors(corsOptions), function (req, res, next) {
  var getUserID = req.params.userid;
  user.findAll({where: {idUser: getUserID}}).then(function (selectedUser) {
    res.json({"user": selectedUser});
  })
});

// get all books 
router.get('/books', cors(corsOptions), function (req, res, next) {
  book.findAll({attributes: ['idBook', 'title', 'author', 'read', 'user']}).then(function (allBooks) {
    res.json({"books": allBooks});
  })
});

// get all books from one user
router.get('/books/:userId', cors(corsOptions), function (req, res, next) {
  var idUser = req.params.userId;
  book.findAll({where: {user: idUser}}).then(function (allBooks) {
    res.json({"books": allBooks});
  })
});

// get one specific book
router.get('/books/:bookid', cors(corsOptions), function (req, res, next) {
  var getBookID = req.params.bookid;
  book.findAll({where: {idBook: getBookID}}).then(function (selectedBook) {
    res.json({"book": selectedBook});
  })
});

//
//
//
// POST
//
//
//
//  check if a user exists and check id the password is right
router.post('/users/login', cors(corsOptions), function (req, res, next) {
  var nameLogin = req.body.name;
  var passwordLogin = req.body.password;

  user.findAll({where: {name: nameLogin}}).then(function (selectedUser) {
    if (selectedUser.length != 0) {
      console.log("Name: " + nameLogin + " - " + selectedUser[0].name);
      console.log("PW: " + passwordLogin + " - " + selectedUser[0].password);
      if (selectedUser[0].password == passwordLogin) {
        res.json({
          "response": "user and password correct",
          "user": selectedUser
        });
      } else {  
        res.json({"response": "password incorrect"});
      }
    } else {
      res.json({"response": "user doesn't exists"});
    }
    
  });
});

// add a user
router.post('/users/new', cors(corsOptions), function (req, res, next) {
  var name = req.body.name || "Max";
  var password = req.body.password || "pw";

  var newUser = user.build({
    name: name,
    password: password
  });

  newUser.save().catch(function (error) {
    console.log('User: Error while inserting: ' + error.stack);
  });
  res.json({"info": "added a user"});
});

// add a book
router.post('/books/new', cors(corsOptions), function (req, res, next) {
  var title = req.body.title || "Max";
  var author = req.body.author || "Mustermann";
  var read = req.body.read || false ;
  var user = req.body.user || 0;

  var newBook = book.build({
    title: title,
    author: author,
    read: read,
    user: user
  });

  newBook.save().catch(function (error) {
    console.log('Book: Error while inserting: ' + error.stack);
  });
  res.json({"info": "added a book"});
});

//
//
//
// DELETE
//
//
//
// löschen eines Users
router.delete('/users/:deleteId', cors(corsOptions), function (req, res, next) {
  var userID = req.params.deleteId;
  // user ist tabelle
  // where: sequelize syntax: sache/daten suchen
  user.destroy({where: {idUser: userID}});
  res.json({info: "User deleted"});
});

// löschen eines Buchs
router.delete('/books/:deleteId', cors(corsOptions), function (req, res, next) {
  var bookID = req.params.deleteId;
  book.destroy({where: {idBook: bookID}});
  res.json({info: "Book deleted"});
});

//
//
//
// PUT
//
//
//
// andern des Status eines Buchs
router.put('/books/:updateId', cors(corsOptions), function (req, res, next) {
  var updateId = req.params.updateId;
  	// es soll nur ein user gefunden werden
  	// es muss zuerst gefunden werden, und dann wird die nächste Funktion ausgeführt
    book.findOne({where: {idBook: updateId}}).then(function (book) {
   	// anzahl ist neue Variable
      if (book.read == 0) {
        var readUpdate = true;
      }
      else {
        var readUpdate = false;
      }
      book.updateAttributes({
        read: readUpdate
      }).then(function(result) {
        res.json({"info": 'changed Status of book'});
      });
    });
});


module.exports = router;
