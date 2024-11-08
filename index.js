const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const createRouter = require('./backend/routes.js');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'fct',
});

connection.connect();

const port = process.env.PORT || 3001;
const app = express()
  .use(cors({origin: '*',}))
  .use(bodyParser.json())
  .use('/api', createRouter(connection));
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
