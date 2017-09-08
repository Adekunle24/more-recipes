'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _routes = require('../server/routes');

var _routes2 = _interopRequireDefault(_routes);

var _serveFavicon = require('serve-favicon');

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

_dotenv2.default.config();

// create express application
// using express framework
var app = (0, _express2.default)();

// set server listening port
app.set('port', process.env.PORT || 3000);
app.set('superSecret', _dotenv2.default.API_SECRET);
app.use((0, _serveFavicon2.default)(_path2.default.join(__dirname, 'public/images', 'logo.png')));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use((0, _morgan2.default)('dev'));

// directory for static files
app.use(_express2.default.static(__dirname + '/public'));
app.get('/test', function (req, res) {
  res.send('test');
});
// Always return the main index.html, so react-router render the route in the client
app.get('/', function (req, res) {
  res.sendFile(_path2.default.resolve(__dirname, 'public', 'index.html'));
});

app.use('/', _routes2.default);

// path to resources
app.get(['*.png', '*.jpg', '*.css', '*.js', '*.map'], function (req, res) {
  res.sendFile(__dirname + '/public/' + req.path);
});

// add homepage route
app.get('/home', function (req, res) {
  _fs2.default.readFile(__dirname + '/public/home.html', function (err, data) {
    if (err) {
      res.send('error occured');
    } else {
      res.end(data);
    }
  });
  // res.render('home',data);
});

app.get('/view-recipes', function (req, res) {
  _fs2.default.readFile(__dirname + '/public/view-recipes.html', function (err, data) {
    if (err) {
      res.send('error occured ' + err);
    } else {
      res.end(data);
    }
  });
});

app.get('/recipe-details', function (req, res) {
  _fs2.default.readFile(__dirname + '/public/recipe-details.html', function (err, data) {
    if (err) {
      res.send('error occured ' + err);
    } else {
      res.end(data);
    }
  });
});
app.get('/favourite-recipes', function (req, res) {
  _fs2.default.readFile(__dirname + '/public/favourite-recipes.html', function (err, data) {
    if (err) {
      res.send('error occured ' + err);
    } else {
      res.end(data);
    }
  });
});
app.get('/user-profile', function (req, res) {
  _fs2.default.readFile(__dirname + '/public/user-profile.html', function (err, data) {
    if (err) {
      res.send('error occured ' + err);
    } else {
      res.end(data);
    }
  });
});
app.get('/add-recipe', function (req, res) {
  _fs2.default.readFile(__dirname + '/public/add-recipe.html', function (err, data) {
    if (err) {
      res.send('error occured ' + err);
    } else {
      res.end(data);
    }
  });
});

// manage test
app.use(function (req, res, next) {
  res.locals.showTests = app.get('env') !== 'production' && req.query.text === '1';
  next();
});

// add dashboard route
app.get('/dashboard', function (req, res) {
  res.type('text/plain');
  res.send('My TeaserPlus application dashboard');
});

// custom 404 page
app.use(function (req, res) {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Page cannot be found');
});

// custom 505 page
app.use(function (err, req, res, next) {
  res.type('text/plain');
  res.status(500);
  res.send('500 - server error');
});

// start node JS Server
app.listen(app.get('port'), function () {});
exports.default = app;
//# sourceMappingURL=compiled.js.map