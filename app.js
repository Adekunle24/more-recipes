// using express framework
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import env from 'dotenv';
import logger from 'morgan';
import routes from './server/routes/index';
import openRoutes from './server/routes/open';

env.config();
const app = express();


app.set('port', process.env.PORT || 3000);

app.set('superSecret', env.API_SECRET);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}
app.use(express.static(`${__dirname}/public`));

app.use('/api/v1', openRoutes);
app.use('/api/v1', routes);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// path to resources
app.get(['*.png', '*.jpg', '*.css', '*.js', '*.map'], (req, res) => {
  res.sendFile(`${__dirname}/public/${req.path}`);
});

app.use((req, res) => {
  res.type('application/json');
  res.status(404);
  res.json({
    status: 'fail',
    message: '404 - Page cannot be found'
  });
});

app.use((err, req, res, next) => {
  res.type('text/plain');
  res.status(500);
  res.json({
    status: 'fail',
    message: '500 - server error'
  });
});
app.listen(app.get('port'), () => {
  console.log(`App started at port ${app.get('port')}`);
});
export default app;
