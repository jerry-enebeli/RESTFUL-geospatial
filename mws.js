const express = require('express');
const app = express.Router();
const bodyparser = require('body-parser');
const morgan = require('morgan');

app.use(morgan('combined'));
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());


module.exports = app;