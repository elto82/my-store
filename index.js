const express = require('express');
const cors = require('cors');
const routerApi = require('./rotes/index');

const {
  errorHandler,
  logErrors,
  boonErrorHandler,
} = require('./middlewares/error.handler');

const app = express();

const port = 3000;

app.use(express.json());

/* const corsOptions = {
  origin: 'http://127.0.0.1:5500',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
};
app.use(cors(corsOptions)); */

const whitelist = [
  'http://127.0.0.1:5500',
  'http://localhost:3001',
  'https://myapp.com',
];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  },
};
app.use(cors(options));

app.get('/', (req, res) => {
  res.send('hi my server in express');
});

app.get('/new-route', (req, res) => {
  res.send('hi i am new route');
});

routerApi(app);
// se deben poner despues del ruoter y el orden adecuado
app.use(logErrors);
app.use(boonErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('http://localhost:' + port);
});
