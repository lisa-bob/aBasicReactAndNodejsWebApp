var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3')

const path = require('path');
const dbPath = path.resolve(__dirname, 'myWebApp.db');

let db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error(err.message);
  }
  initDatabase();
  console.log('Connected to myWebApp database.');
});
 
/* GET home page. */
// localhost:3000/cars --> in diesem Modul
// zusätzlich / --> diese Funktion aufrufen.

function initDatabase() {
  // eine Tabelle erzeugen, falls diese noch nicht existiert.
  var query = "CREATE TABLE IF NOT EXISTS users ( idUser INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL DEFAULT 'Mustername', password TEXT NOT NULL DEFAULT 'password');";
  db.run (query);

  query = "CREATE TABLE IF NOT EXISTS books ( idBook INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL DEFAULT 'a title', author TEXT NOT NULL DEFAULT 'a author', read BOOLEAN NOT NULL DEFAULT false, user INTEGER NOT NULL DEFAULT 0);";
  db.run (query);
}

//
//
//
// GET
// Der GET-Request vom Frontend kommt hier an.
// Die Funktion liest aus der SQLite Datenbank die Daten aus
// und sendet ein JSON mit den Daten zurück
//
// get all users
router.get('/users', function(req, res, next) {
  // res.send( { users: [{name: "Hannes", password: "JF5", id: "0"} ] });
  var query = "SELECT * FROM users";
  db.all(query, [], (err, rows) => {
    if (err) {
      res.send( err.message );
    }
    res.send({ users: rows });
  });
});

// get one specific book
// eine zahl wird mit der url mitgegeben 
// :[Parameter]
// wenn nach / ein Doppelunkt kommt, ist es params (req.params.[Parameter])
router.get('/users/:userid', function(req, res, next) {
    var idUserParam = req.params.userid || -1;
    if (idUserParam == -1) {
        res.send("invalid id");
    }

    var query = "SELECT * FROM users WHERE idUser = ?";
    db.all(query, [idUserParam], (err, rows) => {
      if (err) {
        res.send( err.message );
      }
      res.send({ users: rows });
    });
});

// get all books 
router.get('/books', function(req, res, next) {
    var query = "SELECT * FROM books";
    db.all(query, [], (err, rows) => {
      if (err) {
        res.send( err.message );
      }
      res.send({ books: rows });
    });
});

// get all books from one user
router.get('/books/:userid', function(req, res, next) {
    var idUserParam = req.params.userid || -1;
    if (idUserParam == -1) {
        res.send("invalid id");
    }

    var query = "SELECT * FROM books WHERE user = ?";
    db.all(query, [idUserParam], (err, rows) => {
      if (err) {
        res.send( err.message );
      }
      res.send({ books: rows });
    });
});

//
//
//
// POST
//
//
//
// check if a user exists and check id the password is right
router.post('/users/login', function(req, res, next) {
    var nameLogin = req.body.name;
    var passwordLogin = req.body.password;
  
    if (nameLogin == undefined || passwordLogin == undefined) {
        res.send({response: "invalid login"});
    } else {
        var query = "SELECT * FROM users WHERE name = ?";
        db.all(query, [nameLogin], (err, rows) => {
        if (err) {
            res.send( err.message );
        } 
        else {
            console.log(rows);
            if (rows.length != 0) {
                if (rows[0].password == passwordLogin) {
                    res.send({ 
                        response: "user and password correct",
                        user: rows
                    });
                } 
                else {
                    res.send({"response": "password incorrect"});
                }
            } else {
                res.json({"response": "user doesn't exists"});
            }
        }
        });
    }
});

// add a user
router.post('/users/new', function(req, res, next) {
    var name = req.body.name || "Max";
    var password = req.body.password || "pw";
  
    var query = "INSERT INTO users (name, password) VALUES ( '" + name  + "', '" + password + "') ;";
    console.log(query);
    db.run (query,  function(err) {
        if (err) {
        return res.send(err.message);
        }
    // get the last insert id
    console.log("row added");
    res.send({"response": "user added ok"});
  });
});

// add a book
router.post('/books/new', function(req, res, next) {
    var title = req.body.title || "Mustertitel";
    var author = req.body.author || "Mustermann";
    var read = req.body.read || false ;
    var user = req.body.user || 0;
  
    var query = "INSERT INTO books (title, author, read, user) VALUES ( '" + title  + "', '" + author + "', " + read + ", " + user + ") ;";
    console.log(query);
    db.run (query,  function(err) {
        if (err) {
        return res.send(err.message);
        }
    // get the last insert id
    console.log("row added");
    res.send({"response": "book added ok"});
  });
});

//
//
//
// PUT
//
//
//
// andern des Status eines Buchs
router.put('/books/:updateId', function(req, res, next) {
    var updateId = req.params.updateId;
    // es soll nur ein user gefunden werden
    // es muss zuerst gefunden werden, und dann wird die nächste Funktion ausgeführt
    var queryOne = "SELECT * FROM books WHERE idBook = ?";
    db.all(queryOne, [updateId], (err, rows) => {
      if (err) {
        res.send( err.message );
      } 
      else {
        if (rows[0].read == false) {
            var readUpdate = true;
        }
        else {
            var readUpdate = false;
        }
        var queryTwo = "UPDATE books SET read = " + readUpdate + " WHERE idBook = " + updateId;
        console.log(queryTwo);
        db.run (queryTwo,  function(err) {
            if (err) {
                return res.send(err.message);
            }
            // get the last insert id
            console.log("row modified");
            res.send({"response": "book updated ok"});
        });
      }
    });
});

/*
router.put('/', function(req, res, next) {

    // im body können werte aus dem frontend mitgegeben werden
    var name = req.body.name || '';
    var type = req.body.type || '';
    var powerKw = req.body.powerKw || 0;
    var fin = req.body.fin || '';
    var idCar = req.body.idCar || -1;
    console.log(req.body);

    var query = "UPDATE cars SET name = '" + name  + "', type = '" + type  + "', fin = '" + fin + "', powerKw = " + powerKw + " WHERE idCar = " + idCar;
    console.log(query);
    db.run (query,  function(err) {
        if (err) {
        return res.send(err.message);
        }
        // get the last insert id
        console.log("row modified");
        res.send("ok");
    });
});
*/

//
//
//
// DELETE
//
//
//
// löschen eines Users
router.delete('/users/:deleteId', function(req, res, next) {
  var idUser = req.params.deleteId || -1;
  if (idUser == -1) {
    res.send("invalid id");
  }

  var query = "DELETE FROM users WHERE idUser = " + idUser;
  console.log(query);
  db.run (query,  function(err) {
    if (err) {
      return res.send(err.message);
    }
    // get the last insert id
    console.log("row with idUser " + idUser + " deleted")
    res.send({"response": "user deleted ok"});
  });
});

// löschen eines Book
router.delete('/books/:deleteId', function(req, res, next) {
    var idBook = req.params.deleteId || -1;
    if (idBook == -1) {
      res.send("invalid id");
    }
  
    var query = "DELETE FROM books WHERE idBook = " + idBook;
    console.log(query);
    db.run (query,  function(err) {
      if (err) {
        return res.send(err.message);
      }
      // get the last insert id
      console.log("row with idBook " + idBook + " deleted")
      res.send({"response": "book deleted ok"});
    });
  });




module.exports = router;
