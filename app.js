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


// connection pool

const pool = mysql.createPool({
    connectionLimit : 100,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASS,
    database        : process.env.DB_NAME
})

// connect to DB

pool.getConnection((err,connection) => {
    if(err) throw err;
    console.log('connected as ID' + connection.threadId);
})

app.get('',(req,res) => {
    res.render('home');
})

// Server start
app.listen(port, () => console.log(`App is listening on port ${port}`));
