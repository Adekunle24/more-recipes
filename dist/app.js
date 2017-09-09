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

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _routes = require('./server/routes');

var _routes2 = _interopRequireDefault(_routes);

var _open = require('./server/routes/open');

var _open2 = _interopRequireDefault(_open);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// using express framework
_dotenv2.default.config();

/**
 * create ann express application
 */
var app = (0, _express2.default)();

app.set('port', process.env.PORT || 3000);

app.set('superSecret', _dotenv2.default.API_SECRET);

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

app.use((0, _morgan2.default)('dev'));

app.use(_express2.default.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(_path2.default.resolve(__dirname, 'public', 'index.html'));
});

app.use('/', _open2.default);
app.use('/', _routes2.default);

// path to resources
app.get(['*.png', '*.jpg', '*.css', '*.js', '*.map'], function (req, res) {
  res.sendFile(__dirname + '/public/' + req.path);
});

app.use(function (req, res) {
  res.type('text/plain');
  res.status(404);
  res.json({ status: 'fail', message: '404 - Page cannot be found' });
});

app.use(function (err, req, res, next) {
  res.type('text/plain');
  res.status(500);
  res.json({ status: 'fail', message: '500 - server error' });
});
app.listen(app.get('port'), function () {});
exports.default = app;