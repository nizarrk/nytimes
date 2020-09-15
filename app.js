const express = require('express');
const app = express();
const messages = require('./messages.json');
const axios = require('axios');
require('dotenv').config();


app.get('/', (req, res) => {
  res.send(messages.OK);
});

app.get('/articles/get?:fq?:sort', async (req, res) => {
    // use fq to filter such as headline, subject, source etc with standard Lucene syntax
    // use sort oldest / newer to sort data
    try {
        console.log(req.query);
        let get = await axios.get(`${process.env.API}/search/v2/articlesearch.json?sort=${req.query.sort}&api-key=${process.env.API_KEY}&fq=${req.query.fq}`);

        if (get.data.response.docs.length == 0) {
            messages.INVALID.message = 'Not Found!';
            messages.INVALID.data = get.data;
            res.send(messages.INVALID);
        } else {
            messages.OK.data = get.data;
            res.send(messages.OK);
        }
    } catch (error) {
        console.log(error);
        messages.ERR.data = error;
        res.send(messages.ERR);
    }
});

app.get('/books/get?:list', async (req, res) => {
    // use list to search "e-book-fiction" and "hardcover-fiction"
    try {
        console.log(req.query);
        let get = await axios.get(`${process.env.API}/books/v3/lists.json?api-key=${process.env.API_KEY}&list=${req.query.list}`);

        if (get.data.num_results == 0) {
            messages.INVALID.message = 'Not Found!';
            messages.INVALID.data = get.data;
            res.send(messages.INVALID);
        } else {
            messages.OK.data = get.data;
            res.send(messages.OK);
        }
    } catch (error) {
        console.log(error);
        messages.ERR.data = error;
        res.send(messages.ERR);
    }
});

app.listen(process.env.PORT || 3001, () => {
  console.log('App listening on port 3000!');
});