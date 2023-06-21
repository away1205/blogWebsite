const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.send('test')
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Running in 3000')
});

