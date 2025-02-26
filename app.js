const express = require('express');
const { engine } = require('express-handlebars'); // Use destructuring to import 'engine'
const bodyParser = require('body-parser');
const mysql = require('mysql');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Parsing middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static files
app.use(express.static('public'));

// Template engine
app.engine('hbs', engine({ extname: '.hbs' })); // 'engine' method used in version 8.x
app.set('view engine', 'hbs');

app.get('',(req,res) => {
    res.render('home');
})

// Server start
app.listen(port, () => console.log(`App is listening on port ${port}`));
