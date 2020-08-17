var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  JSA = require('./api/models/jsaModels'), //created model loading here
  bodyParser = require('body-parser');

  // this allows to test with both client and server running on the same machine
  // remove after testing, as it exposes the server to cross-site scripting!
  var cors = require('cors');
  app.use(cors());
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/JSAdb'); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/jsaRoutes'); //importing route
routes(app); //register the route

// gives friendlier error messages on 404
app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('JSA Records Library RESTful API server started on: ' + port);