var express = require('express');
// der Router ist eine komplette Middleware-Software (Software die größeren/komplexen Datenaustausch zwischen verschiedenen Komponenten ermöglicht und Funktionsaufrufe vermittelt)
// und ein Navigations-System
// arbeitet hier mit den Netzwerkprotokolle von HTTP & REST
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // 'visible' greift auf die visible.ejs Datei zu, die unter views zu finden ist.
  // in der Klammer können Props mitgegeben werden
  res.render('index', { title: 'My Node WebApp' }); 
});

module.exports = router;

