const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const ytsController = require('./controllers/ytsController');

// make express server
const app = express();

// make express server use bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// make router
const router = express.Router();
// make route   
app.use('/api/search',ytsController);


app.use(function(req, res, next) {
    res.setHeader('charset', 'utf-8')
    next();
  });

// listen to port
app.listen(process.env.PORT || 3000, function () {
    console.log('listening on port 3000');
});