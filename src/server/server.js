// server.js
const express        = require('express');
const bodyParser     = require('body-parser');
const cors           = require('cors');
const app            = express();

const port = 8000;

app.use(cors());
app.use(bodyParser.json());

require('./routes')(app, {});
app.listen(port, () => {
  console.log('We are live on ' + port);
});
