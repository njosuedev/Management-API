const mysql = require('mysql');
// connection pool

const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

// user view
exports.view = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query('SELECT * FROM users WHERE status = "active"', (err, rows) => {
            connection.release();
            if (!err) {
                res.render('home', { rows });
            }
            else {
                console.log(err)
            }
        })
    })
}

// find users by search
exports.find = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        let searchTerm = req.body.search;
        connection.query('SELECT * FROM users WHERE  first_name LIKE ? OR last_name LIKE ?' , ['%'+ searchTerm +'%','%'+ searchTerm +'%'], (err, rows) => {
            connection.release();
            if (!err) {
                res.render('home', { rows });
            }
            else {
                console.log(err)
            }
        })
    })
}

exports.form = (req,res) => {
    res.render('add-user')
}

exports.create = (req,res) => {

    const {first_name,last_name,email,phone,comment} = req.body;
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query('INSERT INTO users SET first_name = ? , last_name = ?,email = ?,phone = ?,comment = ?' ,[first_name,last_name,email,phone,comment], (err, rows) => {
            connection.release();
            if (!err) {
                res.render('add-user',{alert: 'user added successfully.'});
            }
            else {
                console.log(err)
            }
        })
    })
}