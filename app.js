const express = require('express');
const app = express();
require('dotenv').config();


app.get('/', (req, res) => {
    console.log(process.env.API_KEY);
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});